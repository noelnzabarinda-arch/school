import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hg">
          <div>
            <div className="tag">
              <b />
              Interactive learning for TVET students
            </div>
            <h1>
              <span>Learn.</span>
              <span className="stroke">Simulate.</span>
              <span className="grad">Master Technology.</span>
            </h1>
            <p className="lead">
              Explore interactive simulations designed to help TVET students understand technology through
              practice, experimentation, and real-time feedback.
            </p>
            <div className="acts">
              <Link to="/simulations" className="btn p">
                Explore Simulations
              </Link>
              <a href="#trades" className="btn g">
                Explore Trades
              </a>
            </div>
          </div>
          <div className="viz" aria-hidden="true">
            <svg viewBox="0 0 500 500">
              <circle cx="250" cy="250" r="200" fill="#22d3ee" fillOpacity=".12" />
              <circle cx="250" cy="250" r="170" fill="none" stroke="rgba(255,255,255,.08)" />
              <path className="flow" d="M250 250 L250 92" stroke="#10b981" strokeWidth="2" fill="none" />
              <path className="flow" d="M250 250 L100 360" stroke="#3b82f6" strokeWidth="2" fill="none" />
              <path className="flow" d="M250 250 L400 360" stroke="#f59e0b" strokeWidth="2" fill="none" />
              <g className="hub">
                <rect x="190" y="200" width="120" height="100" rx="24" fill="#0d141f" stroke="#22d3ee" strokeWidth="2" />
                <text x="250" y="243" textAnchor="middle" fill="#fff" fontFamily="ui-monospace,Consolas,monospace" fontSize="13" fontWeight="700">
                  SIMULATION
                </text>
                <text x="250" y="264" textAnchor="middle" fill="#22d3ee" fontFamily="ui-monospace,Consolas,monospace" fontSize="13" fontWeight="700">
                  LAB
                </text>
              </g>
              <circle cx="250" cy="72" r="42" fill="#0b1f1a" stroke="#10b981" strokeWidth="2" />
              <text x="250" y="78" textAnchor="middle" fill="#10b981" fontFamily="ui-monospace,Consolas,monospace" fontSize="17" fontWeight="800">
                SOD
              </text>
              <circle cx="90" cy="372" r="42" fill="#0c1a33" stroke="#3b82f6" strokeWidth="2" />
              <text x="90" y="378" textAnchor="middle" fill="#60a5fa" fontFamily="ui-monospace,Consolas,monospace" fontSize="17" fontWeight="800">
                CSA
              </text>
              <circle cx="410" cy="372" r="42" fill="#221a0b" stroke="#f59e0b" strokeWidth="2" />
              <text x="410" y="378" textAnchor="middle" fill="#f59e0b" fontFamily="ui-monospace,Consolas,monospace" fontSize="17" fontWeight="800">
                ETE
              </text>
            </svg>
            <span className="chip" style={{ top: '14%', right: '6%', color: '#10b981' }}>
              {'{ code }'}
            </span>
            <span className="chip" style={{ bottom: '10%', left: '40%', color: '#22d3ee', animationDelay: '-2s' }}>
              0110 1001
            </span>
            <span className="chip" style={{ top: '46%', left: 0, color: '#60a5fa', animationDelay: '-4s' }}>
              192.168.1.1
            </span>
            <span className="chip" style={{ top: '50%', right: 0, color: '#f59e0b', animationDelay: '-3s' }}>
              V = I × R
            </span>
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap ig">
          <div>
            <h2>A digital lab for practical learning</h2>
            <p className="sub">Students learn technical concepts by interacting with simulations instead of only reading theory.</p>
          </div>
          <div className="feats">
            <div className="f">
              <div>
                <small>01</small>
                <h3>Interactive</h3>
                <p>Change values and controls, and the system responds.</p>
              </div>
            </div>
            <div className="f">
              <div>
                <small>02</small>
                <h3>Practical</h3>
                <p>Apply concepts to the tasks you meet in your trade.</p>
              </div>
            </div>
            <div className="f">
              <div>
                <small>03</small>
                <h3>Real-time</h3>
                <p>See results the moment an input changes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="trades">
        <div className="wrap">
          <h2>Explore the trades</h2>
          <p className="sub">Choose your technical field and start experimenting.</p>
          <div className="cards">
            <article className="tc">
              <div className="tv">
                <div className="term">
                  <em>$</em> run sort.js
                  <br />
                  &gt; [5, 2, 9, 1] → <em>[1, 2, 5, 9]</em>
                </div>
              </div>
              <span className="code">SOD</span>
              <h3>Software Development</h3>
              <p>Explore programming, algorithms, and problem solving through interactive simulations.</p>
              <Link to="/sod" className="btn">
                Explore SOD
              </Link>
            </article>
            <article className="tc csa">
              <div className="tv">
                <svg viewBox="0 0 300 130" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M50 65L150 25M50 65L150 105M150 25L250 65M150 105L250 65" opacity=".5" />
                  <circle cx="50" cy="65" r="14" fill="#0c1a33" />
                  <circle cx="150" cy="25" r="14" fill="#0c1a33" />
                  <circle cx="250" cy="65" r="14" fill="#0c1a33" />
                </svg>
              </div>
              <span className="code">CSA</span>
              <h3>Computer Systems & Architecture</h3>
              <p>Understand architecture, networking, digital logic, and system operations.</p>
              <Link to="/csa" className="btn">
                Explore CSA
              </Link>
            </article>
            <article className="tc ete">
              <div className="tv">
                <svg viewBox="0 0 300 130" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M10 65h60l10-22 14 44 14-44 14 44 10-22h32" />
                  <path d="M164 65h30M194 45v40M206 45v40M206 65h84" />
                </svg>
              </div>
              <span className="code">ETE</span>
              <h3>Electronics & Telecommunication</h3>
              <p>Experiment with circuits, electricity, digital communication, and electronics.</p>
              <Link to="/ete" className="btn">
                Explore ETE
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <h2>Learning that you can actually interact with</h2>
          <p className="sub">Change inputs, run experiments, observe results, and understand what happens.</p>
          <div className="sg">
            <article className="sc2" style={{ ['--c' as string]: 'var(--sod)' }}>
              <span className="code">SOD</span>
              <h3>Code Runner</h3>
              <p>Write short programs and watch each line run with its output.</p>
              <Link to="/simulations?id=codeRunner" className="btn">
                Try Simulation
              </Link>
            </article>
            <article className="sc2" style={{ ['--c' as string]: 'var(--sod)' }}>
              <span className="code">SOD</span>
              <h3>Sorting Algorithms</h3>
              <p>Compare how algorithms reorder data, step by step.</p>
              <Link to="/simulations?id=sorting" className="btn">
                Try Simulation
              </Link>
            </article>
            <article className="sc2 ete">
              <span className="code">ETE</span>
              <h3>Ohm's Law</h3>
              <p>Change voltage and resistance and watch current and power update live.</p>
              <Link to="/simulations?id=ohm" className="btn">
                Try Simulation
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>How a lab session works</h2>
          <div className="steps">
            <div className="st">
              <b>01</b>
              <h3>Choose</h3>
              <p>Pick a trade and a simulation that matches what you are learning.</p>
            </div>
            <div className="st">
              <b>02</b>
              <h3>Configure</h3>
              <p>Set inputs, algorithms, voltages, or network nodes.</p>
            </div>
            <div className="st">
              <b>03</b>
              <h3>Run</h3>
              <p>Start, pause, or step through the experiment.</p>
            </div>
            <div className="st">
              <b>04</b>
              <h3>Understand</h3>
              <p>Read live meters, traces, and explanations.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <div className="stg">
            <div className="s">
              <strong>9</strong>
              <span>LIVE SIMULATIONS</span>
            </div>
            <div className="s">
              <strong>3</strong>
              <span>TVET TRADES</span>
            </div>
            <div className="s">
              <strong>45</strong>
              <span>QUIZ QUESTIONS</span>
            </div>
            <div className="s">
              <strong>100%</strong>
              <span>HANDS-ON</span>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <div className="cb">
            <h2>Ready to enter the lab?</h2>
            <p>Stop only reading about technology. Experiment with it.</p>
            <div className="acts">
              <Link to="/simulations" className="btn p">
                Start Simulations
              </Link>
              <Link to="/quiz" className="btn g">
                Take a Quiz
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
