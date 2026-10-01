import { Link } from 'react-router-dom'

export default function Sod() {
  return (
    <>
      <section className="hero sod">
        <div className="wrap hg">
          <div>
            <div className="tag">
              <b />
              Software Development
            </div>
            <h1 className="sod">
              <span>Code.</span>
              <span className="stroke">Logic.</span>
              <span className="grad">Solve.</span>
            </h1>
            <p className="h1sub">Software Development (SOD)</p>
            <p className="lead">
              Explore programming, algorithms, and problem-solving through interactive SOD simulations that run real code and real steps.
            </p>
            <div className="acts">
              <Link to="/simulations?id=codeRunner" className="btn p">
                Open SOD Lab
              </Link>
              <Link to="/quiz" className="btn g">
                SOD Quiz
              </Link>
            </div>
          </div>
          <div className="win">
            <div className="wb">
              <b />
              <b />
              <b />
              <span>sort.js — SOD terminal</span>
            </div>
            <div className="cl">
              {`function sort(arr) {
  return arr.sort((a, b) => a - b)
}

console.log(sort([5, 2, 9, 1]))
// [1, 2, 5, 9]`}
            </div>
          </div>
        </div>
      </section>
      <section className="alt">
        <div className="wrap">
          <h2>Your SOD learning path</h2>
          <p className="sub">From writing a first program to watching algorithms rearrange data.</p>
          <div className="steps">
            <div className="st">
              <b>01</b>
              <h3>Write</h3>
              <p>Type JavaScript and see console output in a sandbox.</p>
            </div>
            <div className="st">
              <b>02</b>
              <h3>Sort</h3>
              <p>Step through bubble, selection, and insertion sort.</p>
            </div>
            <div className="st">
              <b>03</b>
              <h3>Search</h3>
              <p>Watch binary search cut a sorted array in half.</p>
            </div>
            <div className="st">
              <b>04</b>
              <h3>Master</h3>
              <p>Connect code, complexity, and visual results.</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="wrap">
          <h2>Core SOD simulations</h2>
          <div className="sg">
            {[
              ['codeRunner', 'Interactive Code Runner', 'Write JavaScript and run it in an isolated sandbox.'],
              ['sorting', 'Sorting Algorithm Lab', 'Compare bubble, selection, and insertion sort.'],
              ['binary', 'Binary Search Simulator', 'Follow low, mid, and high until the target is found.'],
            ].map(([id, title, blurb]) => (
              <article className="sc2" key={id} style={{ ['--c' as string]: 'var(--sod)' }}>
                <span className="code">SOD</span>
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
