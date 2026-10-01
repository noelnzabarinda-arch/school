import { useState } from 'react'
import { Link } from 'react-router-dom'
import { pickQuiz, PROFILE_QUESTIONS, QUESTIONS, type Level, type Trade } from '../data/quiz'

type Mode = 'home' | 'quiz' | 'profile' | 'done' | 'profileDone'
type QuizItem = ReturnType<typeof pickQuiz>[number]
const LETTERS = ['A', 'B', 'C', 'D']

export default function Quiz() {
  const [mode, setMode] = useState<Mode>('home')
  const [trade, setTrade] = useState<Trade | 'ALL'>('SOD')
  const [level, setLevel] = useState<Level | 'mixed'>('beginner')
  const [count, setCount] = useState(8)
  const [i, setI] = useState(0)
  const [score, setScore] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [pi, setPi] = useState(0)
  const [ps, setPs] = useState({ SOD: 0, CSA: 0, ETE: 0 })
  const [set, setSet] = useState<QuizItem[]>([])
  const q = set[i]
  const pct = set.length ? Math.round(((i + (picked !== null ? 1 : 0)) / set.length) * 100) : 0

  const start = () => {
    setSet(pickQuiz(trade, level, count))
    setMode('quiz')
    setI(0)
    setScore(0)
    setPicked(null)
  }

  const choose = (idx: number) => {
    if (picked !== null || !q) return
    setPicked(idx)
    if (q.options[idx].correct) setScore((s) => s + 1)
  }

  const next = () => {
    if (i + 1 >= set.length) setMode('done')
    else {
      setI(i + 1)
      setPicked(null)
    }
  }

  const winner = (['SOD', 'CSA', 'ETE'] as Trade[]).sort((a, b) => ps[b] - ps[a])[0]

  return (
    <>
      <section className="hero quiz">
        <div className="wrap hg">
          <div>
            <div className="tag">
              <b />
              Check what you know — then find your fit
            </div>
            <h1 className="quiz">
              <span>Quiz.</span>
              <span className="stroke">Profile.</span>
              <span className="grad">Grow.</span>
            </h1>
            <p className="lead">
              Test SOD, CSA, and ETE knowledge, then explore which technology path you currently enjoy most.
            </p>
            <div className="acts">
              <button className="btn quiz" onClick={() => setMode('home')}>
                Start a quiz
              </button>
              <button className="btn g" onClick={() => { setMode('profile'); setPi(0); setPs({ SOD: 0, CSA: 0, ETE: 0 }) }}>
                Who am I?
              </button>
            </div>
          </div>
          <div className="stg" style={{ marginTop: 0 }}>
            <div className="s">
              <strong>{QUESTIONS.length}</strong>
              <span>QUESTIONS</span>
            </div>
            <div className="s">
              <strong>3</strong>
              <span>TRADES</span>
            </div>
            <div className="s">
              <strong>2</strong>
              <span>LEVELS</span>
            </div>
            <div className="s">
              <strong>11</strong>
              <span>PROFILE ITEMS</span>
            </div>
          </div>
        </div>
      </section>

      {mode === 'home' && (
        <section className="alt">
          <div className="wrap">
            <h2>Set up your quiz</h2>
            <div className="qpanel">
              <div className="ctl">
                <label>
                  Trade
                  <select value={trade} onChange={(e) => setTrade(e.target.value as Trade | 'ALL')}>
                    <option value="ALL">All trades</option>
                    <option value="SOD">SOD</option>
                    <option value="CSA">CSA</option>
                    <option value="ETE">ETE</option>
                  </select>
                </label>
                <label>
                  Difficulty
                  <select value={level} onChange={(e) => setLevel(e.target.value as Level | 'mixed')}>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="mixed">Mixed</option>
                  </select>
                </label>
                <label>
                  Questions
                  <select value={count} onChange={(e) => setCount(+e.target.value)}>
                    {[5, 8, 10, 12].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <button className="btn quiz" onClick={start}>
                Start quiz
              </button>
            </div>
          </div>
        </section>
      )}

      {mode === 'quiz' && q && (
        <section>
          <div className="wrap">
            <div className="qpanel">
              <p className="code">
                {q.trade} · {q.topic} · {i + 1}/{set.length}
              </p>
              <div className="track">
                <div className="fill" style={{ width: `${pct}%` }} />
              </div>
              <h2 style={{ maxWidth: '34ch' }}>{q.question}</h2>
              <div style={{ display: 'grid', gap: 12, marginTop: 24 }}>
                {q.options.map((o, idx) => {
                  let cls = 'opt'
                  if (picked !== null) {
                    if (o.correct) cls += ' good'
                    else if (idx === picked) cls += ' bad'
                  }
                  return (
                    <button key={o.text} className={cls} onClick={() => choose(idx)}>
                      <span className="l">{LETTERS[idx]}</span>
                      <span>{o.text}</span>
                    </button>
                  )
                })}
              </div>
              {picked !== null && (
                <p className="sub">{q.explanation}</p>
              )}
              {picked !== null && (
                <button className="btn quiz" style={{ marginTop: 20 }} onClick={next}>
                  {i + 1 >= set.length ? 'See results' : 'Next'}
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      {mode === 'done' && (
        <section>
          <div className="wrap">
            <div className="qpanel">
              <h2>Quiz complete</h2>
              <p className="lead">
                You scored {score} / {set.length} ({Math.round((score / set.length) * 100)}%).
              </p>
              <div className="acts">
                <button className="btn quiz" onClick={start}>
                  Try again
                </button>
                <Link className="btn g" to="/simulations">
                  Open simulations
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {mode === 'profile' && (
        <section>
          <div className="wrap">
            <div className="qpanel">
              <p className="code">WHO AM I? · {pi + 1}/{PROFILE_QUESTIONS.length}</p>
              <h2>{PROFILE_QUESTIONS[pi].q}</h2>
              <div style={{ display: 'grid', gap: 12, marginTop: 24 }}>
                {PROFILE_QUESTIONS[pi].o.map((o) => (
                  <button
                    key={o.text}
                    className="opt"
                    onClick={() => {
                      setPs((s) => ({ SOD: s.SOD + o.scores.SOD, CSA: s.CSA + o.scores.CSA, ETE: s.ETE + o.scores.ETE }))
                      if (pi + 1 >= PROFILE_QUESTIONS.length) setMode('profileDone')
                      else setPi(pi + 1)
                    }}
                  >
                    <span className="l">→</span>
                    <span>{o.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {mode === 'profileDone' && (
        <section>
          <div className="wrap">
            <div className="qpanel">
              <h2>Your current leaning: {winner}</h2>
              <p className="lead">
                SOD {ps.SOD} · CSA {ps.CSA} · ETE {ps.ETE}. This is a learning profile, not a career verdict.
              </p>
              <Link className="btn quiz" to={winner === 'SOD' ? '/sod' : winner === 'CSA' ? '/csa' : '/ete'}>
                Explore {winner}
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
