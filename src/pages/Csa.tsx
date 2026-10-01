import { Link } from 'react-router-dom'

export default function Csa() {
  return (
    <>
      <section className="hero csa">
        <div className="wrap hg">
          <div>
            <div className="tag">
              <b />
              Computer Systems & Architecture
            </div>
            <h1 className="csa">
              <span>Compute.</span>
              <span className="stroke">Connect.</span>
              <span className="grad">Control.</span>
            </h1>
            <p className="h1sub">Computer Systems & Architecture (CSA)</p>
            <p className="lead">
              Watch packets hop across a network, step a CPU through fetch-decode-execute, and toggle live logic gates.
            </p>
            <div className="acts">
              <Link to="/simulations?id=cpu" className="btn csa">
                Open CSA Lab
              </Link>
              <Link to="/quiz" className="btn g">
                CSA Quiz
              </Link>
            </div>
          </div>
          <div className="viz">
            <svg viewBox="0 0 440 320">
              <path className="flow" d="M80 80h280M220 80v160M80 240h280" fill="none" stroke="#3b82f6" strokeWidth="2" />
              <rect x="150" y="50" width="140" height="50" rx="12" fill="#0a1730" stroke="#22d3ee" />
              <text x="220" y="80" textAnchor="middle" fill="#22d3ee" fontFamily="monospace" fontWeight="700">
                SWITCH
              </text>
              <rect x="20" y="210" width="120" height="50" rx="12" fill="#0a1730" stroke="#3b82f6" />
              <text x="80" y="240" textAnchor="middle" fill="#60a5fa" fontFamily="monospace" fontWeight="700">
                PC1
              </text>
              <rect x="300" y="210" width="120" height="50" rx="12" fill="#0a1730" stroke="#3b82f6" />
              <text x="360" y="240" textAnchor="middle" fill="#60a5fa" fontFamily="monospace" fontWeight="700">
                SERVER
              </text>
            </svg>
          </div>
        </div>
      </section>
      <section className="alt">
        <div className="wrap">
          <h2>Core CSA simulations</h2>
          <div className="sg">
            {[
              ['network', 'Network Packet Simulator', 'Send a packet hop by hop and disconnect nodes.'],
              ['cpu', 'CPU Architecture Simulator', 'FETCH → DECODE → EXECUTE → STORE with a real PC.'],
              ['logic', 'Digital Logic Lab', 'AND, OR, NOT, NAND, NOR, XOR with truth tables.'],
            ].map(([id, title, blurb]) => (
              <article className="sc2 csa" key={id}>
                <span className="code">CSA</span>
                <h3>{title}</h3>
                <p>{blurb}</p>
                <Link className="btn" to={`/simulations?id=${id}`}>
                  Launch
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
