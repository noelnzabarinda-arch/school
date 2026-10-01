import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const links = [
  ['/', 'Home'],
  ['/sod', 'SOD'],
  ['/csa', 'CSA'],
  ['/ete', 'ETE'],
  ['/simulations', 'Simulations'],
  ['/quiz', 'Quiz'],
  ['/contact', 'Contact'],
] as const

export default function Layout() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia('(min-width: 861px)').matches) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <header className={scrolled ? 'sc' : ''}>
        <div className="wrap nav">
          <NavLink to="/" className="logo" aria-label="TVET Simulation Lab home" onClick={() => setOpen(false)}>
            <i>{'</>'}</i>TVET SIM LAB
          </NavLink>
          <nav aria-label="Main navigation">
            <ul className={`links${open ? ' open' : ''}`}>
              {links.map(([to, label]) => (
                <li key={to}>
                  <NavLink to={to} end={to === '/'} onClick={() => setOpen(false)}>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <NavLink to="/simulations" className="btn p menu-cta">
            Explore Simulations
          </NavLink>
          <button
            className="burger"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
          </button>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <div className="wrap">
          <div className="fgd">
            <div>
              <NavLink to="/" className="logo">
                <i>{'</>'}</i>TVET SIMULATION LAB
              </NavLink>
              <p style={{ marginTop: 14, maxWidth: '32ch' }}>
                Interactive technology learning for students. Learn. Simulate. Master Technology.
              </p>
            </div>
            <div>
              <h4>Explore</h4>
              <ul>
                {links.map(([to, label]) => (
                  <li key={to}>
                    <NavLink to={to}>{label}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Labs</h4>
              <ul>
                <li>
                  <NavLink to="/simulations?id=codeRunner">Code Runner</NavLink>
                </li>
                <li>
                  <NavLink to="/simulations?id=cpu">CPU Simulator</NavLink>
                </li>
                <li>
                  <NavLink to="/simulations?id=ohm">Ohm's Law</NavLink>
                </li>
              </ul>
            </div>
            <div>
              <h4>About</h4>
              <p>An independent learning project. Not affiliated with or endorsed by any government body.</p>
            </div>
          </div>
          <p className="copy">
            <span>© 2026 TVET Simulation Lab</span>
            <span>Learn. Simulate. Master Technology.</span>
          </p>
        </div>
      </footer>
    </>
  )
}
