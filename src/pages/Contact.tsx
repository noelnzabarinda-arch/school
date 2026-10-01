import { useState, type FormEvent } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [open, setOpen] = useState<number | null>(0)
  const [form, setForm] = useState({ name: '', email: '', topic: 'Simulations', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Please enter a valid email.'
    if (form.message.trim().length < 12) next.message = 'Please write at least a short message.'
    setErrors(next)
    if (Object.keys(next).length) return
    setSent(true)
  }

  const faqs = [
    ['Do these simulations replace official TVET exams?', 'No. They are educational practice tools, not official certified assessments.'],
    ['Why does the code runner time out?', 'Programs are limited to 3 seconds in a sandbox so the page stays responsive.'],
    ['Can I use this offline?', 'After the React app is built, you can host the files on any static server.'],
  ]

  return (
    <>
      <section className="hero contact">
        <div className="wrap hg">
          <div>
            <div className="tag">
              <b />
              Questions, bugs, and feedback
            </div>
            <h1>
              <span>Talk to</span>
              <span className="stroke">the lab.</span>
            </h1>
            <p className="hs" style={{ fontWeight: 700, marginTop: 18, background: 'linear-gradient(90deg,var(--sod),var(--contact))', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              Ask about simulations, quizzes, or the learning content.
            </p>
            <p className="lead">This form is a front-end demo. It validates your message locally and shows a success state.</p>
          </div>
        </div>
      </section>
      <section className="alt">
        <div className="wrap fwrap">
          <form className="form" onSubmit={submit} noValidate>
            <div className="row">
              <div className="fld">
                <label>Name</label>
                <input className="inp" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} aria-invalid={!!errors.name} />
                {errors.name && <span className="err" style={{ display: 'flex' }}>{errors.name}</span>}
              </div>
              <div className="fld">
                <label>Email</label>
                <input className="inp" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} aria-invalid={!!errors.email} />
                {errors.email && <span className="err" style={{ display: 'flex' }}>{errors.email}</span>}
              </div>
            </div>
            <div className="fld">
              <label>Topic</label>
              <select className="inp" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}>
                <option>Simulations</option>
                <option>Quiz</option>
                <option>Bug report</option>
                <option>Other</option>
              </select>
            </div>
            <div className="fld">
              <label>Message</label>
              <textarea className="inp" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              {errors.message && <span className="err" style={{ display: 'flex' }}>{errors.message}</span>}
            </div>
            <button className="btn contact" type="submit">
              Send message
            </button>
            {sent && (
              <div className="readybox">
                <strong>MESSAGE READY</strong>
                <p>Thanks {form.name}. Your {form.topic.toLowerCase()} note was validated in the browser.</p>
              </div>
            )}
          </form>
          <div className="side">
            <div className="sd">
              <h3>What to include</h3>
              <p>Which trade, which simulation, and what you expected versus what you saw.</p>
            </div>
            <div className="term">
              <em>&gt;</em> status: listening
              <br />
              <em>&gt;</em> queue: contact-form
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="wrap">
          <h2>FAQ</h2>
          <div className="faq">
            {faqs.map(([q, a], i) => (
              <div className={`fq${open === i ? ' open' : ''}`} key={q}>
                <button type="button" onClick={() => setOpen(open === i ? null : i)}>
                  {q}
                  <span>{open === i ? '−' : '+'}</span>
                </button>
                {open === i && <p className="ans">{a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
