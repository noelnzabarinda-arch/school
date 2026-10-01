import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import type { SimId } from '../data/sims'
import { SIMS } from '../data/sims'

type Status = 'ready' | 'running' | 'paused' | 'completed' | 'error'
type Speed = 'slow' | 'normal' | 'fast'
const SPEED_MS: Record<Speed, number> = { slow: 900, normal: 450, fast: 120 }
const rnd = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a
const fmt = (x: number) => String(Number(x.toPrecision(6)))

function Side({ trade, name, status, inputs, results, explain }: {
  trade: string
  name: string
  status: string
  inputs: string
  results: Record<string, string | number>
  explain: string
}) {
  return (
    <aside>
      <div className="pn">
        <h4>ACTIVE LAB</h4>
        <dl>
          <dt>Trade</dt>
          <dd>{trade.toUpperCase()}</dd>
          <dt>Simulation</dt>
          <dd>{name}</dd>
          <dt>Status</dt>
          <dd>{status.toUpperCase()}</dd>
          <dt>Inputs</dt>
          <dd>{inputs}</dd>
        </dl>
      </div>
      <div className="pn">
        <h4>EXPERIMENT RESULTS</h4>
        <dl>
          {Object.entries(results).map(([k, v]) => (
            <span key={k} style={{ display: 'contents' }}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </span>
          ))}
        </dl>
      </div>
      <div className="pn">
        <h4>WHAT IS HAPPENING?</h4>
        <p>{explain}</p>
      </div>
    </aside>
  )
}

function CodeRunner() {
  const EX = 'const x = 10;\nconst y = 20;\nconsole.log(x + y);'
  const [code, setCode] = useState(EX)
  const [out, setOut] = useState('Press Start to run your code.')
  const [status, setStatus] = useState<Status>('ready')
  const [explain, setExplain] = useState('Edit the code and press Start. It will execute in a sandboxed iframe.')
  const frame = useRef<HTMLIFrameElement | null>(null)

  const kill = () => {
    frame.current?.remove()
    frame.current = null
  }

  const run = () => {
    kill()
    setOut('')
    setStatus('running')
    setExplain('Your code is running inside a sandboxed iframe. console.log messages are sent back here.')
    const id = Math.random().toString(36).slice(2)
    const f = document.createElement('iframe')
    f.sandbox.add('allow-scripts')
    f.hidden = true
    frame.current = f
    let lines = 0
    const onMsg = (e: MessageEvent) => {
      const d = e.data as { id?: string; t?: string; m?: string }
      if (e.source !== f.contentWindow || !d || d.id !== id) return
      if (d.t === 'log') {
        setOut((o) => o + d.m + '\n')
        lines++
      } else if (d.t === 'err') {
        setOut((o) => o + 'Error: ' + d.m + '\n')
        setStatus('error')
        cleanup()
      } else if (d.t === 'done') {
        setOut((o) => o || '(no output — use console.log)')
        setStatus('completed')
        setExplain(`Finished. ${lines} console.log line(s) captured.`)
        cleanup()
      }
    }
    const cleanup = () => {
      window.removeEventListener('message', onMsg)
      kill()
    }
    window.addEventListener('message', onMsg)
    const src = JSON.stringify(code).replace(/</g, '\\u003c')
    f.srcdoc = `<script>const P=(t,m)=>parent.postMessage({id:"${id}",t,m},"*");const S=v=>{try{return typeof v==="string"?v:(JSON.stringify(v)??String(v))}catch(e){return String(v)}};console.log=(...a)=>P("log",a.map(S).join(" "));try{new Function(${src})();P("done")}catch(e){P("err",e.message)}<\/script>`
    document.body.appendChild(f)
    window.setTimeout(() => {
      if (frame.current === f) {
        setOut((o) => o + 'Error: timed out after 3 s\n')
        setStatus('error')
        cleanup()
      }
    }, 3000)
  }

  return (
    <>
      <div className="ctl">
        <label style={{ gridColumn: '1 / -1' }}>
          JavaScript editor
          <textarea value={code} onChange={(e) => setCode(e.target.value)} spellCheck={false} rows={7} />
        </label>
      </div>
      <div className="btns">
        <button className="btn p" onClick={run}>Run</button>
        <button className="btn" onClick={() => { setCode(EX); setOut('Press Start to run your code.'); setStatus('ready') }}>Reset</button>
        <button className="btn" onClick={() => setCode(EX)}>Example</button>
      </div>
      <div className="stage">
        <pre className="out">{out}</pre>
      </div>
      <Side trade="sod" name="Interactive Code Runner" status={status} inputs={`${code.split('\n').length} lines of JS`} results={{ Status: status }} explain={explain} />
    </>
  )
}

function* bubble(a: number[], S: { c: number; s: number }) {
  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - 1 - i; j++) {
      S.c++
      yield { h: [j, j + 1], m: 'cmp', t: `Comparing neighbours ${a[j]} and ${a[j + 1]}.` }
      if (a[j] > a[j + 1]) {
        ;[a[j], a[j + 1]] = [a[j + 1], a[j]]
        S.s++
        yield { h: [j, j + 1], m: 'swap', t: 'Those two values were swapped.' }
      }
    }
  }
}
function* selection(a: number[], S: { c: number; s: number }) {
  for (let i = 0; i < a.length - 1; i++) {
    let m = i
    for (let j = i + 1; j < a.length; j++) {
      S.c++
      yield { h: [j], min: m, m: 'cmp', t: `Looking for the minimum: is ${a[j]} smaller than ${a[m]}?` }
      if (a[j] < a[m]) m = j
    }
    if (m !== i) {
      ;[a[i], a[m]] = [a[m], a[i]]
      S.s++
      yield { h: [i, m], m: 'swap', t: `Minimum ${a[i]} swapped into position ${i}.` }
    }
  }
}
function* insertion(a: number[], S: { c: number; s: number }) {
  for (let i = 1; i < a.length; i++) {
    const k = a[i]
    let j = i - 1
    while (j >= 0) {
      S.c++
      yield { h: [j, j + 1], m: 'cmp', t: `Comparing key ${k} with ${a[j]}.` }
      if (a[j] > k) {
        a[j + 1] = a[j]
        S.s++
        yield { h: [j + 1], m: 'shift', t: `${a[j]} shifts one place right.` }
        j--
      } else break
    }
    a[j + 1] = k
    yield { h: [j + 1], m: 'swap', t: `Key ${k} inserted at position ${j + 1}.` }
  }
}

function SortingLab() {
  const [algo, setAlgo] = useState('Bubble Sort')
  const [n, setN] = useState(16)
  const [speed, setSpeed] = useState<Speed>('normal')
  const [arr, setArr] = useState<number[]>(() => Array.from({ length: 16 }, () => rnd(5, 99)))
  const [hl, setHl] = useState<{ h: number[]; m: string; min?: number } | null>(null)
  const [stats, setStats] = useState({ c: 0, s: 0 })
  const [status, setStatus] = useState<Status>('ready')
  const [explain, setExplain] = useState('New random array generated. Press Start or Step.')
  const [done, setDone] = useState(false)
  const gen = useRef<Generator | null>(null)
  const S = useRef({ c: 0, s: 0 })
  const timer = useRef<number | null>(null)

  const stop = () => {
    if (timer.current) window.clearInterval(timer.current)
    timer.current = null
  }

  const reset = useCallback(() => {
    stop()
    const size = Math.min(40, Math.max(5, n))
    const a = Array.from({ length: size }, () => rnd(5, 99))
    S.current = { c: 0, s: 0 }
    gen.current = null
    setArr(a)
    setHl(null)
    setStats({ c: 0, s: 0 })
    setDone(false)
    setStatus('ready')
    setExplain('New random array generated. Press Start or Step.')
  }, [n])

  const step = useCallback(() => {
    if (done) return
    const a = arr
    if (!gen.current) {
      const copy = [...a]
      const fn = algo === 'Selection Sort' ? selection : algo === 'Insertion Sort' ? insertion : bubble
      gen.current = fn(copy, S.current)
      setArr(copy)
    }
    const r = gen.current.next() as IteratorResult<{ h: number[]; m: string; min?: number; t: string }>
    if (r.done) {
      stop()
      setDone(true)
      setHl(null)
      setStatus('completed')
      setExplain('Finished: every value is in order.')
      return
    }
    setArr([...arr])
    setHl(r.value)
    setStats({ ...S.current })
    setExplain(r.value.t)
    setStatus(timer.current ? 'running' : 'paused')
  }, [algo, arr, done])

  const start = () => {
    if (done) return
    setStatus('running')
    stop()
    timer.current = window.setInterval(() => step(), SPEED_MS[speed])
  }

  useEffect(() => () => stop(), [])

  const mx = Math.max(...arr, 1)
  return (
    <>
      <div className="ctl">
        <label>
          Algorithm
          <select value={algo} onChange={(e) => { setAlgo(e.target.value); gen.current = null; setDone(false) }}>
            {['Bubble Sort', 'Selection Sort', 'Insertion Sort'].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label>
          Array size
          <input type="number" min={5} max={40} value={n} onChange={(e) => setN(+e.target.value)} />
        </label>
        <label>
          Speed
          <select value={speed} onChange={(e) => setSpeed(e.target.value as Speed)}>
            <option value="slow">slow</option>
            <option value="normal">normal</option>
            <option value="fast">fast</option>
          </select>
        </label>
      </div>
      <div className="btns">
        <button className="btn p" onClick={start}>Start</button>
        <button className="btn" onClick={() => { stop(); setStatus('paused') }}>Pause</button>
        <button className="btn" onClick={() => { stop(); step() }}>Step</button>
        <button className="btn" onClick={reset}>Reset</button>
      </div>
      <div className="stage">
        <div className="bars">
          {arr.map((v, i) => {
            let cls = 'b'
            if (done) cls += ' ok'
            else if (hl?.h.includes(i)) cls += ' ' + hl.m
            else if (hl?.min === i) cls += ' min'
            return <div key={i} className={cls} style={{ height: `${(v / mx) * 100}%` }} title={String(v)} />
          })}
        </div>
      </div>
      <Side trade="sod" name="Sorting Algorithm Lab" status={status} inputs={`${algo}, n=${arr.length}`} results={{ Comparisons: stats.c, 'Swaps / shifts': stats.s, Array: arr.join(' ') }} explain={explain} />
    </>
  )
}

function BinaryLab() {
  const make = (n: number) => {
    const s = new Set<number>()
    while (s.size < n) s.add(rnd(1, 99))
    return [...s].sort((x, y) => x - y)
  }
  const [n, setN] = useState(12)
  const [a, setA] = useState(() => make(12))
  const [target, setTarget] = useState(0)
  const [lo, setLo] = useState(0)
  const [hi, setHi] = useState(11)
  const [mid, setMid] = useState(-1)
  const [steps, setSteps] = useState(0)
  const [found, setFound] = useState<number | null>(null)
  const [status, setStatus] = useState<Status>('ready')
  const [explain, setExplain] = useState('A sorted array was generated. Binary search halves the range at every step.')
  const [speed, setSpeed] = useState<Speed>('normal')
  const timer = useRef<number | null>(null)

  useEffect(() => {
    setTarget(a[rnd(0, a.length - 1)])
  }, [a])

  const reset = () => {
    if (timer.current) window.clearInterval(timer.current)
    const arr = make(Math.min(20, Math.max(5, n)))
    setA(arr)
    setLo(0)
    setHi(arr.length - 1)
    setMid(-1)
    setSteps(0)
    setFound(null)
    setStatus('ready')
  }

  const step = () => {
    if (found !== null || lo > hi) {
      setStatus('completed')
      if (timer.current) window.clearInterval(timer.current)
      return
    }
    const m = (lo + hi) >> 1
    setMid(m)
    setSteps((s) => s + 1)
    if (a[m] === target) {
      setFound(m)
      setStatus('completed')
      setExplain(`Target ${target} found at index ${m}.`)
      if (timer.current) window.clearInterval(timer.current)
    } else if (a[m] < target) {
      setLo(m + 1)
      setExplain(`${a[m]} < ${target}: search the right half.`)
      setStatus('paused')
    } else {
      setHi(m - 1)
      setExplain(`${a[m]} > ${target}: search the left half.`)
      setStatus('paused')
    }
  }

  return (
    <>
      <div className="ctl">
        <label>Target <input type="number" value={target} onChange={(e) => setTarget(+e.target.value)} /></label>
        <label>Array size <input type="number" min={5} max={20} value={n} onChange={(e) => setN(+e.target.value)} /></label>
        <label>Speed
          <select value={speed} onChange={(e) => setSpeed(e.target.value as Speed)}>
            <option value="slow">slow</option>
            <option value="normal">normal</option>
            <option value="fast">fast</option>
          </select>
        </label>
      </div>
      <div className="btns">
        <button className="btn p" onClick={() => { timer.current = window.setInterval(step, SPEED_MS[speed]); setStatus('running') }}>Start</button>
        <button className="btn" onClick={step}>Step</button>
        <button className="btn" onClick={reset}>Reset</button>
      </div>
      <div className="stage">
        <div className="cells">
          {a.map((v, i) => {
            let c = 'cell'
            if (i < lo || i > hi) c += ' el'
            if (i === mid) c += found === i ? ' hit' : ' mid'
            const tag = [i === lo ? 'LOW' : '', i === mid ? 'MID' : '', i === hi ? 'HIGH' : ''].filter(Boolean).join('/')
            return (
              <div key={i} className={c}>
                {tag ? <small>{tag}</small> : null}
                {v}
              </div>
            )
          })}
        </div>
      </div>
      <Side trade="sod" name="Binary Search Simulator" status={status} inputs={`target=${target}`} results={{ Steps: steps, Result: found !== null ? 'FOUND' : lo > hi ? 'NOT FOUND' : 'Searching' }} explain={explain} />
    </>
  )
}

function NetworkLab() {
  const [src, setSrc] = useState('PC1')
  const [proto, setProto] = useState('TCP')
  const [up, setUp] = useState({ Switch: true, Router: true, Server: true })
  const [pos, setPos] = useState(0)
  const [status, setStatus] = useState<Status>('ready')
  const [explain, setExplain] = useState('Choose source and protocol, then send a packet.')
  const [result, setResult] = useState('—')
  const timer = useRef<number | null>(null)
  const path = [src, 'Switch', 'Router', 'Server']

  const tick = () => {
    const nx = path[pos + 1]
    if (nx !== src && !up[nx as keyof typeof up]) {
      setStatus('error')
      setResult('FAILED')
      setExplain(`The packet reached ${path[pos]} but ${nx} is offline.`)
      if (timer.current) window.clearInterval(timer.current)
      return
    }
    const next = pos + 1
    setPos(next)
    if (next === 3) {
      setStatus('completed')
      setResult('DELIVERED')
      setExplain('The packet has reached the server.')
      if (timer.current) window.clearInterval(timer.current)
    } else {
      setExplain(`The packet has reached the ${path[next]}.`)
    }
  }

  return (
    <>
      <div className="ctl">
        <label>Source
          <select value={src} onChange={(e) => setSrc(e.target.value)}><option>PC1</option><option>PC2</option></select>
        </label>
        <label>Protocol
          <select value={proto} onChange={(e) => setProto(e.target.value)}><option>TCP</option><option>UDP</option><option>ICMP</option></select>
        </label>
      </div>
      <div className="btns">
        {(['Switch', 'Router', 'Server'] as const).map((n) => (
          <button key={n} className="btn" onClick={() => setUp((u) => ({ ...u, [n]: !u[n] }))}>
            {up[n] ? 'Disconnect' : 'Reconnect'} {n}
          </button>
        ))}
        <button className="btn p" onClick={() => { setPos(0); setStatus('running'); timer.current = window.setInterval(tick, 700) }}>Send Packet</button>
        <button className="btn" onClick={() => { if (timer.current) window.clearInterval(timer.current); setPos(0); setStatus('ready'); setUp({ Switch: true, Router: true, Server: true }) }}>Reset</button>
      </div>
      <div className="stage">
        <div className="net">
          <div className="pk" style={{ left: `calc(${12.5 + pos * 25}% - 11px)` }}>▣</div>
          {path.map((n, i) => {
            const online = i === 0 || up[n as keyof typeof up]
            return (
              <div key={n} className={`nd${online ? '' : ' off'}${i === pos && status !== 'ready' ? ' has' : ''}`}>
                <b>{n}</b>
                {!online ? 'OFFLINE' : i === pos && status !== 'ready' ? 'HAS PACKET' : 'ONLINE'}
              </div>
            )
          })}
        </div>
      </div>
      <Side trade="csa" name="Network Packet Simulator" status={status} inputs={`${src} → Server via ${proto}`} results={{ Result: result, Protocol: proto, Hops: pos }} explain={explain} />
    </>
  )
}

function CpuLab() {
  const DEF = 'LOAD 5\nADD 3\nSTORE 8'
  const [progText, setProgText] = useState(DEF)
  const [pc, setPc] = useState(0)
  const [acc, setAcc] = useState(0)
  const [ph, setPh] = useState(-1)
  const [ir, setIr] = useState<{ op: string; v?: number } | null>(null)
  const [act, setAct] = useState('')
  const [cyc, setCyc] = useState(0)
  const [data, setData] = useState<number[]>(() => Array(16).fill(0))
  const [status, setStatus] = useState<Status>('ready')
  const [explain, setExplain] = useState('Each instruction goes through FETCH → DECODE → EXECUTE → STORE.')
  const [err, setErr] = useState('')
  const timer = useRef<number | null>(null)
  const PH = ['FETCH', 'DECODE', 'EXECUTE', 'STORE']

  const parse = () => {
    const ln = progText.split('\n').map((x) => x.trim()).filter(Boolean)
    const prog: { op: string; v?: number }[] = []
    for (let i = 0; i < ln.length; i++) {
      const m = /^(LOAD|STORE|ADD|SUB|INC|DEC)(?:\s+(-?\d+))?$/i.exec(ln[i])
      if (!m) { setErr(`Line ${i + 1}: "${ln[i]}" is not valid.`); return null }
      const op = m[1].toUpperCase()
      const v = m[2] === undefined ? undefined : +m[2]
      prog.push({ op, v })
    }
    setErr('')
    return prog
  }

  const step = () => {
    const prog = parse()
    if (!prog) { setStatus('error'); return }
    if (pc >= prog.length) {
      setStatus('completed')
      setExplain('Program finished (HALT).')
      if (timer.current) window.clearInterval(timer.current)
      return
    }
    const nextPh = (ph + 1) % 4
    setPh(nextPh)
    const phase = PH[nextPh]
    const m = (x: number) => ((x % 256) + 256) % 256
    if (phase === 'FETCH') {
      setIr(prog[pc])
      setAct('pc')
      setExplain(`Fetching instruction ${pc} from memory.`)
    } else if (phase === 'DECODE') {
      setAct('cu')
      setExplain(`Control unit decodes ${prog[pc].op}.`)
    } else if (phase === 'EXECUTE') {
      setAct('alu')
      const { op, v = 0 } = prog[pc]
      setAcc((cur) => (op === 'LOAD' ? m(v) : op === 'ADD' ? m(cur + v) : op === 'SUB' ? m(cur - v) : op === 'INC' ? m(cur + 1) : op === 'DEC' ? m(cur - 1) : cur))
      setExplain(`ALU executes ${op}.`)
    } else {
      setAct('reg')
      const ins = prog[pc]
      if (ins.op === 'STORE' && ins.v !== undefined) {
        setData((d) => { const n = [...d]; n[ins.v!] = acc; return n })
        setExplain(`ACC (${acc}) written to address ${ins.v}.`)
      } else setExplain('Result stays in ACC.')
      setPc((p) => p + 1)
      setCyc((c) => c + 1)
    }
    setStatus('running')
  }

  return (
    <>
      <div className="ctl">
        <label style={{ gridColumn: '1 / -1' }}>
          Program
          <textarea value={progText} onChange={(e) => setProgText(e.target.value)} rows={5} />
        </label>
      </div>
      {err ? <p className="err">{err}</p> : null}
      <div className="btns">
        <button className="btn p" onClick={() => { timer.current = window.setInterval(step, 450) }}>Start</button>
        <button className="btn" onClick={step}>Step</button>
        <button className="btn" onClick={() => { if (timer.current) window.clearInterval(timer.current); setPc(0); setAcc(0); setPh(-1); setIr(null); setCyc(0); setData(Array(16).fill(0)); setStatus('ready') }}>Reset</button>
      </div>
      <div className="stage">
        <div className="cpu">
          <div className={`cbx${act === 'pc' ? ' act' : ''}`}>PROGRAM COUNTER<br />PC = {String(pc).padStart(2, '0')}</div>
          <div className={`cbx${act === 'cu' ? ' act' : ''}`}>CONTROL UNIT<br />{ir ? `${ir.op} ${ir.v ?? ''}` : 'idle'}</div>
          <div className={`cbx${act === 'alu' ? ' act' : ''}`}>ALU<br />{act === 'alu' ? 'computing' : 'idle'}</div>
          <div className={`cbx${act === 'reg' ? ' act' : ''}`}>REGISTERS<br />ACC = {String(acc).padStart(2, '0')}</div>
        </div>
        <div className="mem">
          {parse()?.map((p, i) => (
            <div key={i} className={i === pc && ph >= 0 ? 'cur' : ''}>
              {String(i).padStart(2, '0')}: {p.op} {p.v ?? ''}
            </div>
          ))}
          {data.map((d, i) =>
            d ? (
              <div key={`d${i}`}>[D{i}] = {d}</div>
            ) : null,
          )}
        </div>
      </div>
      <Side trade="csa" name="CPU Architecture Simulator" status={status} inputs={`${progText.split('\n').filter((x) => x.trim()).length} instructions`} results={{ PC: String(pc).padStart(2, '0'), ACC: String(acc).padStart(2, '0'), Cycles: cyc }} explain={explain} />
    </>
  )
}

const GATES: Record<string, (a: number, b: number) => number> = {
  AND: (a, b) => a & b,
  OR: (a, b) => a | b,
  NOT: (a) => a ^ 1,
  NAND: (a, b) => (a & b) ^ 1,
  NOR: (a, b) => (a | b) ^ 1,
  XOR: (a, b) => a ^ b,
}

function LogicLab() {
  const [gate, setGate] = useState('AND')
  const [A, setA] = useState(0)
  const [B, setB] = useState(0)
  const not = gate === 'NOT'
  const o = GATES[gate](A, B) & 1
  const rows = not ? [[0], [1]] : [[0, 0], [0, 1], [1, 0], [1, 1]]
  return (
    <>
      <div className="ctl">
        <label>Gate
          <select value={gate} onChange={(e) => setGate(e.target.value)}>
            {Object.keys(GATES).map((g) => <option key={g}>{g}</option>)}
          </select>
        </label>
        <button className={`btn tgl${A ? ' on' : ''}`} onClick={() => setA(A ^ 1)}>INPUT A: {A}</button>
        {!not && <button className={`btn tgl${B ? ' on' : ''}`} onClick={() => setB(B ^ 1)}>INPUT B: {B}</button>}
      </div>
      <div className="stage">
        <p style={{ fontFamily: 'var(--mono)', marginBottom: 12 }}>{gate}: A={A}{not ? '' : ` B=${B}`} → OUT={o}</p>
        <table className="tg">
          <thead><tr><th>A</th>{!not && <th>B</th>}<th>Output</th></tr></thead>
          <tbody>
            {rows.map((r) => {
              const q = GATES[gate](r[0], r[1] || 0) & 1
              const cur = r[0] === A && (not || r[1] === B)
              return (
                <tr key={r.join()} className={cur ? 'cur' : ''}>
                  {r.map((v, i) => <td key={i}>{v}</td>)}
                  <td>{q}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <Side trade="csa" name="Digital Logic Lab" status="running" inputs={`${gate}, A=${A}, B=${B}`} results={{ Output: o }} explain={`${gate} evaluates to ${o}.`} />
    </>
  )
}

function OhmLab() {
  const [V, setV] = useState(12)
  const [R, setR] = useState(100)
  const [on, setOn] = useState(false)
  const bad = V < 0 || V > 1000 || R <= 0
  const I = on && !bad ? V / R : 0
  const P = on && !bad ? V * I : 0
  return (
    <>
      <div className="ctl">
        <label>Voltage (V)<input type="number" value={V} onChange={(e) => setV(+e.target.value)} /></label>
        <label>Resistance (Ω)<input type="number" value={R} onChange={(e) => setR(+e.target.value)} /></label>
      </div>
      {bad ? <p className="err">Enter voltage 0–1000 V and resistance greater than 0 Ω.</p> : null}
      <div className="btns">
        <button className="btn p" onClick={() => setOn(true)}>Circuit ON</button>
        <button className="btn" onClick={() => setOn(false)}>Circuit OFF</button>
        <button className="btn" onClick={() => { setOn(false); setV(12); setR(100) }}>Reset</button>
      </div>
      <div className="stage">
        <svg viewBox="0 0 420 180">
          <path d="M60 90V30H360V90M360 90v60H60V90" fill="none" stroke={I > 0 ? '#f59e0b' : '#475569'} strokeWidth="3" strokeDasharray="8 8" className={I > 0 ? 'flow' : ''} />
          <circle cx="360" cy="90" r="18" fill="#fde047" fillOpacity={0.12 + Math.min(1, I / 0.05) * 0.88} stroke="#fde047" />
          <text x="210" y="170" textAnchor="middle" fill="#e8eef6" fontFamily="monospace">{on ? 'ON' : 'OFF'} · I = {fmt(I)} A</text>
        </svg>
      </div>
      <Side trade="ete" name="Ohm's Law Laboratory" status={on ? 'running' : 'ready'} inputs={`${V} V, ${R} Ω`} results={{ Current: `${fmt(I)} A`, Power: `${fmt(P)} W`, Circuit: on ? 'ON' : 'OFF' }} explain={on ? `I = ${fmt(V)} / ${fmt(R)} = ${fmt(I)} A. P = V × I = ${fmt(P)} W.` : 'Circuit is OFF so I = 0 A.'} />
    </>
  )
}

function CircuitLab() {
  const [mode, setMode] = useState<'Series' | 'Parallel'>('Series')
  const [V, setV] = useState(12)
  const [r1, setR1] = useState(100)
  const [r2, setR2] = useState(200)
  const [r3, setR3] = useState('')
  const R = [r1, r2, ...(r3 === '' ? [] : [+r3])].filter((r) => r > 0)
  const se = mode === 'Series'
  const Rt = se ? R.reduce((a, b) => a + b, 0) : 1 / R.reduce((a, b) => a + 1 / b, 0)
  const It = V / Rt
  const part = R.map((r) => (se ? It * r : V / r))
  const mx = Math.max(...part, 1e-12)
  return (
    <>
      <div className="ctl">
        <button className={`btn tgl${se ? ' on' : ''}`} onClick={() => setMode('Series')}>Series</button>
        <button className={`btn tgl${!se ? ' on' : ''}`} onClick={() => setMode('Parallel')}>Parallel</button>
        <label>Voltage<input type="number" value={V} onChange={(e) => setV(+e.target.value)} /></label>
        <label>R1<input type="number" value={r1} onChange={(e) => setR1(+e.target.value)} /></label>
        <label>R2<input type="number" value={r2} onChange={(e) => setR2(+e.target.value)} /></label>
        <label>R3 optional<input value={r3} onChange={(e) => setR3(e.target.value)} /></label>
      </div>
      <div className="stage">
        {R.map((r, i) => (
          <div className="rb" key={i}>
            <span style={{ width: '12ch' }}>R{i + 1}={fmt(r)}Ω</span>
            <div style={{ width: `${(part[i] / mx) * 55}%` }} />
            <span>{se ? 'V' : 'I'}{i + 1}={fmt(part[i])} {se ? 'V' : 'A'}</span>
          </div>
        ))}
      </div>
      <Side trade="ete" name="Series & Parallel Circuits" status="running" inputs={`${mode}, ${V} V`} results={{ 'Total R': `${fmt(Rt)} Ω`, 'Total I': `${fmt(It)} A`, Power: `${fmt(V * It)} W` }} explain={se ? 'In series resistances add. Same current through all.' : 'In parallel each branch sees full voltage.'} />
    </>
  )
}

const STG = ['Binary data', 'Encoder', 'Digital signal', 'Channel', 'Noise', 'Receiver', 'Decoder', 'Output']

function CommLab() {
  const [bits, setBits] = useState('10110101')
  const [noise, setNoise] = useState(15)
  const [n, setN] = useState(-1)
  const [tx, setTx] = useState('10110101')
  const [rx, setRx] = useState('10110101')
  const [bad, setBad] = useState<number[]>([])
  const [status, setStatus] = useState<Status>('ready')
  const [explain, setExplain] = useState('Enter binary data, set noise, and transmit.')
  const timer = useRef<number | null>(null)

  const start = () => {
    if (!/^[01]{1,32}$/.test(bits)) { setStatus('error'); setExplain('Enter 1–32 binary digits.'); return }
    const p = noise / 100
    const rec = bits.split('').map((v) => (Math.random() < p ? (v === '1' ? '0' : '1') : v)).join('')
    setTx(bits)
    setRx(rec)
    setBad([...bits].map((v, i) => (v !== rec[i] ? i : -1)).filter((i) => i >= 0))
    setN(0)
    setStatus('running')
    let k = 0
    if (timer.current) window.clearInterval(timer.current)
    timer.current = window.setInterval(() => {
      k++
      setN(k)
      if (k >= 7) {
        if (timer.current) window.clearInterval(timer.current)
        setStatus('completed')
      }
    }, 540)
  }

  const ber = tx.length ? (bad.length / tx.length) * 100 : 0
  const msgs = [
    'The transmitter holds the binary data.',
    'The encoder maps 1 → HIGH and 0 → LOW.',
    'The digital signal is a sequence of levels.',
    'The signal travels through the channel.',
    `Noise can flip bits (${noise}% chance).`,
    'The receiver samples HIGH or LOW.',
    'The decoder converts levels back to bits.',
    `BER = ${fmt(ber)}%.`,
  ]

  return (
    <>
      <div className="ctl">
        <label>Binary data<input value={bits} maxLength={32} onChange={(e) => setBits(e.target.value)} /></label>
        <label>Noise {noise}%<input type="range" min={0} max={50} value={noise} onChange={(e) => setNoise(+e.target.value)} /></label>
      </div>
      <div className="btns">
        <button className="btn p" onClick={start}>Transmit</button>
        <button className="btn" onClick={() => { if (timer.current) window.clearInterval(timer.current); setN(-1); setStatus('ready') }}>Reset</button>
      </div>
      <div className="stage">
        <div className="seg">
          {STG.map((s, i) => (
            <span key={s} className={i === n ? 'on' : ''}>{i + 1}. {s}</span>
          ))}
        </div>
        <p className="out" style={{ minHeight: 60, marginTop: 12 }}>TX {tx}{n >= 4 ? `\nRX ${rx}` : ''}</p>
      </div>
      <Side trade="ete" name="Digital Communication Lab" status={status} inputs={`${bits}, noise ${noise}%`} results={{ Errors: bad.length, BER: `${fmt(ber)}%` }} explain={n >= 0 ? msgs[Math.min(n, 7)] : explain} />
    </>
  )
}

function Tools() {
  const [d, setD] = useState('255')
  const [b, setB] = useState('11111111')
  const [h, setH] = useState('FF')
  const [msg, setMsg] = useState('')
  const conv = (from: 'D' | 'B' | 'H', val: string) => {
    const re = { D: /^\d+$/, B: /^[01]+$/, H: /^[0-9a-fA-F]+$/ }[from]
    if (!re.test(val)) { setMsg(val === '' ? 'Enter a value.' : 'Invalid number.'); return }
    const n = parseInt(val, { D: 10, B: 2, H: 16 }[from])
    if (!Number.isSafeInteger(n)) { setMsg('Number too large.'); return }
    setD(String(n)); setB(n.toString(2)); setH(n.toString(16).toUpperCase())
    setMsg(`Decimal ${n} = Binary ${n.toString(2)} = Hex ${n.toString(16).toUpperCase()}`)
  }
  const CL = ['Black', 'Brown', 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Violet', 'Grey', 'White']
  const [b1, setB1] = useState(1)
  const [b2, setB2] = useState(0)
  const [mu, setMu] = useState(2)
  const [tol, setTol] = useState(5)
  const MU = [...CL.map((_, i) => Math.pow(10, i)), 0.1, 0.01]
  const TO = [1, 2, 0.5, 0.25, 0.1, 5, 10]
  const rv = (b1 * 10 + b2) * MU[mu]
  const u = rv >= 1e6 ? `${fmt(rv / 1e6)} MΩ` : rv >= 1e3 ? `${fmt(rv / 1e3)} kΩ` : `${fmt(rv)} Ω`
  const [dv, setDv] = useState(1)
  const [du, setDu] = useState('GB')
  const U = ['Bit', 'Byte', 'KB', 'MB', 'GB', 'TB']
  const UV = [1 / 8, 1, 1024, 1024 ** 2, 1024 ** 3, 1024 ** 4]
  const B = dv * UV[U.indexOf(du)]

  return (
    <div className="tools">
      <div className="tl">
        <h3>Number Converter</h3>
        <label>Decimal<input value={d} onChange={(e) => { setD(e.target.value); conv('D', e.target.value) }} /></label>
        <label>Binary<input value={b} onChange={(e) => { setB(e.target.value); conv('B', e.target.value) }} /></label>
        <label>Hex<input value={h} onChange={(e) => { setH(e.target.value); conv('H', e.target.value) }} /></label>
        <output>{msg}</output>
      </div>
      <div className="tl">
        <h3>Resistor Color Code</h3>
        <label>Band 1<select value={b1} onChange={(e) => setB1(+e.target.value)}>{CL.map((c, i) => <option key={c} value={i}>{c}</option>)}</select></label>
        <label>Band 2<select value={b2} onChange={(e) => setB2(+e.target.value)}>{CL.map((c, i) => <option key={c} value={i}>{c}</option>)}</select></label>
        <label>Multiplier<select value={mu} onChange={(e) => setMu(+e.target.value)}>{MU.map((m, i) => <option key={i} value={i}>×{m}</option>)}</select></label>
        <label>Tolerance<select value={tol} onChange={(e) => setTol(+e.target.value)}>{TO.map((t, i) => <option key={i} value={i}>±{t}%</option>)}</select></label>
        <output>{u} ±{TO[tol]}%</output>
      </div>
      <div className="tl">
        <h3>Data Size Converter</h3>
        <label>Value<input type="number" value={dv} onChange={(e) => setDv(+e.target.value)} /></label>
        <label>Unit<select value={du} onChange={(e) => setDu(e.target.value)}>{U.map((u) => <option key={u}>{u}</option>)}</select></label>
        <output>{U.map((u, j) => `${u}: ${fmt(B / UV[j])}`).join(' · ')}</output>
      </div>
    </div>
  )
}

function CssStudio() {
  const [pad, setPad] = useState(18)
  const [mar, setMar] = useState(12)
  const [bor, setBor] = useState(3)
  const [rad, setRad] = useState(16)
  const [gap, setGap] = useState(10)
  const [dir, setDir] = useState<'row' | 'column'>('row')
  const [justify, setJustify] = useState('space-between')
  const [bg, setBg] = useState('#10b981')
  const css = `.card {
  margin: ${mar}px;
  padding: ${pad}px;
  border: ${bor}px solid #22d3ee;
  border-radius: ${rad}px;
  display: flex;
  flex-direction: ${dir};
  justify-content: ${justify};
  gap: ${gap}px;
  background: ${bg};
}`
  return (
    <>
      <div className="ctl">
        <label>Padding {pad}px<input type="range" min={0} max={48} value={pad} onChange={(e) => setPad(+e.target.value)} /></label>
        <label>Margin {mar}px<input type="range" min={0} max={40} value={mar} onChange={(e) => setMar(+e.target.value)} /></label>
        <label>Border {bor}px<input type="range" min={0} max={12} value={bor} onChange={(e) => setBor(+e.target.value)} /></label>
        <label>Radius {rad}px<input type="range" min={0} max={40} value={rad} onChange={(e) => setRad(+e.target.value)} /></label>
        <label>Gap {gap}px<input type="range" min={0} max={32} value={gap} onChange={(e) => setGap(+e.target.value)} /></label>
        <label>Direction
          <select value={dir} onChange={(e) => setDir(e.target.value as 'row' | 'column')}>
            <option value="row">row</option>
            <option value="column">column</option>
          </select>
        </label>
        <label>Justify
          <select value={justify} onChange={(e) => setJustify(e.target.value)}>
            <option>flex-start</option>
            <option>center</option>
            <option>space-between</option>
            <option>space-around</option>
          </select>
        </label>
        <label>Background<input type="color" value={bg} onChange={(e) => setBg(e.target.value)} /></label>
      </div>
      <div className="btns">
        <button className="btn" onClick={() => { setPad(18); setMar(12); setBor(3); setRad(16); setGap(10); setDir('row'); setJustify('space-between'); setBg('#10b981') }}>Reset</button>
      </div>
      <div className="stage css-stage">
        <div className="css-canvas">
          <div
            className="css-card"
            style={{
              margin: mar,
              padding: pad,
              border: `${bor}px solid #22d3ee`,
              borderRadius: rad,
              display: 'flex',
              flexDirection: dir,
              justifyContent: justify,
              gap,
              background: bg,
              color: '#04141a',
              fontWeight: 700,
            }}
          >
            <span className="css-chip">NAV</span>
            <span className="css-chip">HERO</span>
            <span className="css-chip">CTA</span>
          </div>
        </div>
        <pre className="out css-code">{css}</pre>
      </div>
      <Side
        trade="sod"
        name="CSS Box & Flex Studio"
        status="running"
        inputs={`pad ${pad}, flex ${dir}`}
        results={{ Padding: `${pad}px`, Margin: `${mar}px`, 'Border-radius': `${rad}px`, Gap: `${gap}px` }}
        explain="Padding is space inside the border. Margin is space outside. Flex-direction and justify-content arrange the children."
      />
    </>
  )
}

function RcLab() {
  const [R, setR] = useState(10)
  const [C, setC] = useState(100)
  const [V, setV] = useState(12)
  const [t, setT] = useState(0)
  const [on, setOn] = useState(false)
  const tau = R * 1000 * C * 1e-6
  const Vc = V * (1 - Math.exp(-t / Math.max(tau, 1e-9)))
  const I = ((V - Vc) / (R * 1000)) * 1000
  useEffect(() => {
    if (!on) return
    const id = window.setInterval(() => {
      setT((prev) => {
        const next = prev + 0.05
        if (next >= 5 * tau) return 5 * tau
        return next
      })
    }, 50)
    return () => window.clearInterval(id)
  }, [on, tau])
  const pts = Array.from({ length: 80 }, (_, i) => {
    const x = (i / 79) * 5 * Math.max(tau, 0.05)
    const y = V * (1 - Math.exp(-x / Math.max(tau, 1e-9)))
    return `${20 + (i / 79) * 360},${160 - (y / Math.max(V, 1)) * 120}`
  }).join(' ')
  const cursorX = 20 + Math.min(1, t / Math.max(5 * tau, 0.05)) * 360
  const cursorY = 160 - (Vc / Math.max(V, 1)) * 120
  return (
    <>
      <div className="ctl">
        <label>R (kΩ)<input type="number" min={1} max={1000} value={R} onChange={(e) => setR(+e.target.value)} /></label>
        <label>C (µF)<input type="number" min={1} max={1000} value={C} onChange={(e) => setC(+e.target.value)} /></label>
        <label>Supply V<input type="number" min={1} max={24} value={V} onChange={(e) => setV(+e.target.value)} /></label>
      </div>
      <div className="btns">
        <button className="btn p" onClick={() => { setT(0); setOn(true) }}>Charge</button>
        <button className="btn" onClick={() => { setOn(false); setT(0) }}>Reset</button>
      </div>
      <div className="stage">
        <svg viewBox="0 0 400 180" className="rc-svg">
          <line x1="20" y1="160" x2="380" y2="160" stroke="#334155" />
          <line x1="20" y1="40" x2="20" y2="160" stroke="#334155" />
          <polyline fill="none" stroke="#f59e0b" strokeWidth="2.5" points={pts} />
          <circle cx={cursorX} cy={cursorY} r="5" fill="#fde047" />
          <text x="28" y="36" fill="#94a3b8" fontSize="11" fontFamily="monospace">Vc</text>
          <text x="350" y="176" fill="#94a3b8" fontSize="11" fontFamily="monospace">t</text>
        </svg>
      </div>
      <Side
        trade="ete"
        name="RC Time Constant Lab"
        status={on ? (t >= 5 * tau - 0.08 ? 'completed' : 'running') : 'ready'}
        inputs={`${R} kΩ, ${C} µF, ${V} V`}
        results={{ 'τ = RC': `${tau.toFixed(3)} s`, 'Vc(t)': `${Vc.toFixed(3)} V`, 'i(t)': `${I.toFixed(3)} mA`, Time: `${t.toFixed(2)} s` }}
        explain={`τ = R × C = ${tau.toFixed(3)} s. After about 5τ the capacitor is nearly at ${V} V. Instant current is (V − Vc) / R.`}
      />
    </>
  )
}

const MAP: Record<SimId, () => ReactNode> = {
  codeRunner: CodeRunner,
  sorting: SortingLab,
  binary: BinaryLab,
  cssStudio: CssStudio,
  network: NetworkLab,
  cpu: CpuLab,
  logic: LogicLab,
  ohm: OhmLab,
  circuits: CircuitLab,
  comm: CommLab,
  rc: RcLab,
}

export function LabBench({ id, focus, onToggleFocus }: { id: SimId; focus: boolean; onToggleFocus: () => void }) {
  const meta = SIMS.find((s) => s.id === id)!
  const Sim = MAP[id]
  return (
    <div className={`lab ${meta.trade}${focus ? ' focus' : ''}`} id="lab">
      <div className="lh">
        <div>
          <span className="code" style={{ color: 'var(--c)' }}>{meta.trade.toUpperCase()}</span>
          <h3>{meta.name}</h3>
        </div>
        <button className="btn" onClick={onToggleFocus}>{focus ? 'Exit focus' : 'Focus mode'}</button>
      </div>
      <div className="lg" key={id}>
        <Sim />
      </div>
    </div>
  )
}

export { Tools }
