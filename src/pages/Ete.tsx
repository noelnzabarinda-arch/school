import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const BITS = '10110101'
const TH = [92, 38, 70, 55, 84, 26, 62, 47]

export default function Ete() {
  const [on, setOn] = useState(true)
  const [V, setV] = useState(12)
  const [R, setR] = useState(100)
  const [noise, setNoise] = useState(0)

  const I = on ? V / R : 0
  const P = on ? V * I : 0
  const hot = on && P > 10

  const recv = useMemo(() => {
    return BITS.split('').map((b, i) => (noise > TH[i] ? (b === '1' ? '0' : '1') : b))
  }, [noise])
  const errs = recv.filter((b, i) => b !== BITS[i]).length
  const str = 100 - Math.round(noise * 0.8)

  return (
    <>
      <section className="hero ete">
        <div className="wrap hg">
          <div>
            <div className="tag">
              <b />
              Electronics & Telecommunication Engineering
            </div>
            <h1 className="ete">
              <span>Power.</span>
              <span className="stroke">Connect.</span>
              <span className="grad">Transmit.</span>
            </h1>
            <p className="h1sub">Electronics & Telecommunication Engineering</p>
            <p className="lead">
              Explore circuits, calculate electrical values, visualize signals, and follow data through a noisy channel.
            </p>
            <div className="acts">
              <Link to="/simulations?id=ohm" className="btn ete">
                Explore ETE Simulations
              </Link>
              <a href="#lab" className="btn g">
                Try live preview
              </a>
            </div>
          </div>
          <div className="viz">
            <svg viewBox="0 0 500 340">
              <path className={`flow${on ? '' : ''}`} d="M70 160V60h110M240 60h190v40M430 130v100H70V190" fill="none" stroke="#f59e0b" strokeWidth="3" opacity={on ? 1 : 0.25} />
              <rect x="180" y="46" width="60" height="28" rx="6" fill="#1a1715" stroke="#f97316" strokeWidth="2" />
              <g className="led">
                <circle cx="430" cy="115" r="22" fill="#f97316" opacity=".3" />
              </g>
              <g stroke="#f59e0b" strokeWidth="3" fill="none">
                <path d="M440 320V265M440 265l-16-26M440 265l16-26" />
                <circle className="ring" cx="440" cy="240" r="30" />
              </g>
            </svg>
          </div>
        </div>
      </section>

      <section className="alt" id="lab">
        <div className="wrap">
          <h2>See electricity in action</h2>
          <p className="sub">Change voltage and resistance. Current and power use I = V / R and P = V × I.</p>
          <div className="pv">
            <div className="panel">
              <div className="meters">
                <div className="m">
                  <small>Voltage</small>
                  <strong>{V.toFixed(1)} V</strong>
                </div>
                <div className="m">
                  <small>Resistance</small>
                  <strong>{R} Ω</strong>
                </div>
                <div className="m">
                  <small>Current</small>
                  <strong>{I.toFixed(3)} A</strong>
                </div>
                <div className="m">
                  <small>Power</small>
                  <strong>{P.toFixed(3)} W</strong>
                </div>
              </div>
              <div className={`stat${hot ? ' warn' : on ? '' : ' off'}`}>
                <i />
                {!on ? 'Circuit OFF: no current' : hot ? `Warning: high power (${P.toFixed(1)} W)` : 'Circuit ON: current flowing'}
              </div>
            </div>
            <div className="panel">
              <div className="switch">
                <span>Power switch</span>
                <button className={`toggle${on ? ' on' : ''}`} aria-pressed={on} onClick={() => setOn(!on)} />
              </div>
              <label>
                Voltage {V} V
                <input type="range" min={1} max={24} value={V} onChange={(e) => setV(+e.target.value)} />
              </label>
              <label>
                Resistance {R} Ω
                <input type="range" min={10} max={1000} step={10} value={R} onChange={(e) => setR(+e.target.value)} />
              </label>
              <Link to="/simulations?id=ohm" className="btn ete" style={{ marginTop: 16 }}>
                Open Full Circuit Simulator
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>From data to signal</h2>
          <p className="sub">1 is HIGH, 0 is LOW. Add noise and watch the receiver make mistakes.</p>
          <div className="pv">
            <div className="panel">
              <div className="bits" aria-label="Transmitted">
                {BITS.split('').map((b, i) => (
                  <span key={`t${i}`}>{b}</span>
                ))}
              </div>
              <div className="bits" aria-label="Received">
                {recv.map((b, i) => (
                  <span key={`r${i}`} className={b !== BITS[i] ? 'bad' : ''}>
                    {b}
                  </span>
                ))}
              </div>
            </div>
            <div className="panel">
              <label>
                Noise {noise}%
                <input type="range" min={0} max={100} value={noise} onChange={(e) => setNoise(+e.target.value)} />
              </label>
              <p className="sub">Signal strength {str}%</p>
              <div className={`stat${errs ? ' warn' : ''}`}>
                <i />
                {errs ? `${errs} of ${BITS.length} bits corrupted` : 'Clean signal: all bits received correctly'}
              </div>
              <Link to="/simulations?id=comm" className="btn ete" style={{ marginTop: 16 }}>
                Explore Communication Simulator
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <h2>Meet the components</h2>
          <div className="cg">
            {['Resistor', 'Capacitor', 'LED', 'Diode', 'Battery', 'Transistor', 'Switch', 'Antenna'].map((name) => (
              <article className="cp" key={name}>
                <h3>{name}</h3>
                <p>A building block you will meet in every ETE circuit and communication lab.</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
