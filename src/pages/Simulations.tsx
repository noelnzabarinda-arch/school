import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SIMS, type SimId } from '../data/sims'
import { LabBench, Tools } from '../lab/LabBench'

const IDS = SIMS.map((s) => s.id)

export default function Simulations() {
  const [params, setParams] = useSearchParams()
  const raw = params.get('id')
  const id = (IDS.includes(raw as SimId) ? raw : 'codeRunner') as SimId
  const [filter, setFilter] = useState<'all' | 'sod' | 'csa' | 'ete'>('all')
  const [focus, setFocus] = useState(false)

  const list = useMemo(() => SIMS.filter((s) => filter === 'all' || s.trade === filter), [filter])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && focus) setFocus(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [focus])

  const open = (next: SimId) => {
    setParams({ id: next })
    document.getElementById('lab')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <section className="hero">
        <div className="wrap hg">
          <div>
            <div className="tag">
              <b />
              Real algorithms · real formulas · real state
            </div>
            <h1>
              <span>Interactive</span>
              <span className="stroke">Simulation</span>
              <span className="grad">Lab</span>
            </h1>
            <p className="lead">
              <strong>Learn by building, testing, measuring, and solving.</strong> Explore practical simulations
              across SOD, CSA, and ETE.
            </p>
            <div className="acts">
              <a className="btn p" href="#lab">
                Start Experimenting
              </a>
              <a className="btn g" href="#trades">
                Explore Trades
              </a>
            </div>
          </div>
          <div className="viz">
            <svg viewBox="0 0 500 440">
              <path className="flow" stroke="#10b981" fill="none" strokeWidth="2" d="M250 100v90" />
              <path className="flow" stroke="#3b82f6" fill="none" strokeWidth="2" d="M210 250L120 330" />
              <path className="flow" stroke="#f59e0b" fill="none" strokeWidth="2" d="M290 250L380 330" />
              <rect x="160" y="20" width="180" height="80" rx="16" fill="#0d1f1a" stroke="#10b981" />
              <text x="250" y="55" textAnchor="middle" fill="#10b981" fontWeight="700" fontFamily="monospace">
                SOD
              </text>
              <rect x="120" y="190" width="260" height="60" rx="16" fill="#0d1a24" stroke="#22d3ee" />
              <text x="250" y="226" textAnchor="middle" fill="#22d3ee" fontWeight="700" fontFamily="monospace">
                SIMULATION LAB
              </text>
              <rect x="20" y="330" width="200" height="80" rx="16" fill="#0f1c33" stroke="#3b82f6" />
              <text x="120" y="365" textAnchor="middle" fill="#3b82f6" fontWeight="700" fontFamily="monospace">
                CSA
              </text>
              <rect x="280" y="330" width="200" height="80" rx="16" fill="#241a0c" stroke="#f59e0b" />
              <text x="380" y="365" textAnchor="middle" fill="#f59e0b" fontWeight="700" fontFamily="monospace">
                ETE
              </text>
            </svg>
          </div>
        </div>
      </section>

      <section className="alt" id="trades">
        <div className="wrap">
          <h2>Choose your laboratory</h2>
          <p className="sub">Choose → Configure → Run → Observe → Measure → Understand.</p>
          <div className="filters">
            {(['all', 'sod', 'csa', 'ete'] as const).map((f) => (
              <button key={f} className={`fb ${f} ${filter === f ? 'on' : ''}`} onClick={() => setFilter(f)}>
                <b>{f.toUpperCase()}</b>
                <small>{f === 'all' ? 'All Simulations' : f === 'sod' ? 'Software Development' : f === 'csa' ? 'Computer Systems' : 'Electronics & Telecom'}</small>
              </button>
            ))}
          </div>
          <p className="sub">Showing {list.length} simulation{list.length === 1 ? '' : 's'}.</p>
          <div className="sg">
            {list.map((s) => (
              <article key={s.id} className={`sc2 ${s.trade}${s.id === id ? ' on' : ''}`} style={{ ['--c' as string]: `var(--${s.trade})` }}>
                <span className="code">{s.trade.toUpperCase()}</span>
                <h3>{s.name}</h3>
                <p>{s.blurb}</p>
                <div className="bd">
                  {s.badges.map((b) => (
                    <i key={b}>{b}</i>
                  ))}
                </div>
                <button className="btn" onClick={() => open(s.id)}>
                  Launch Simulation
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <LabBench id={id} focus={focus} onToggleFocus={() => setFocus((v) => !v)} />
        </div>
      </section>

      {(filter === 'all' || filter === 'ete') && (
        <section className="alt" id="tools">
          <div className="wrap">
            <h2>ETE mini-tools</h2>
            <p className="sub">Instant calculators using real maths.</p>
            <Tools />
          </div>
        </section>
      )}
    </>
  )
}
