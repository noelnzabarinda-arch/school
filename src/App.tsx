import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Sod from './pages/Sod'
import Csa from './pages/Csa'
import Ete from './pages/Ete'
import Simulations from './pages/Simulations'
import Quiz from './pages/Quiz'
import Contact from './pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sod" element={<Sod />} />
          <Route path="/csa" element={<Csa />} />
          <Route path="/ete" element={<Ete />} />
          <Route path="/simulations" element={<Simulations />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
