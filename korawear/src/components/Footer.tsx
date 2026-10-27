import { useState, type FormEvent } from 'react'
import { useToast } from '../context/ToastContext'
import { FREE_SHIPPING_AT } from '../lib/constants'
import { formatNaira } from '../lib/format'

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

export function Footer() {
  const [email, setEmail] = useState('')
  const toast = useToast()

  const subscribe = (e: FormEvent) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return toast('Enter a valid email address')
    setEmail('')
    toast('You’re on the list')
  }

  return (
    <>
      <section className="band" aria-label="Our promises">
        <div>
          <Icon d="M2 6h11v10H2zM13 10h4l4 3v3h-8M7 17.5h.01M17 17.5h.01" />
          <span><h4>Free delivery over {formatNaira(FREE_SHIPPING_AT)}</h4><p>Lagos in 1–2 days, nationwide in 3–5.</p></span>
        </div>
        <div>
          <Icon d="M4 8h14l-3-3M20 16H6l3 3" />
          <span><h4>Free exchanges within 14 days</h4><p>Wrong size? We collect and swap it.</p></span>
        </div>
        <div>
          <Icon d="M4 20 18 6l2 2L6 22zM14 4l6 6" />
          <span><h4>Cut and sewn in Lagos</h4><p>Small runs, so pieces stay special.</p></span>
        </div>
      </section>

      <section className="news">
        <div>
          <h3 style={{ fontSize: 20 }}>New drops, first</h3>
          <p className="note">One email when a new edit lands. No spam.</p>
        </div>
        <form onSubmit={subscribe} noValidate>
          <label className="sr" htmlFor="newsletter">Email address</label>
          <input id="newsletter" type="email" placeholder="you@email.com" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className="btn pri sm" type="submit">Subscribe</button>
        </form>
      </section>

      <footer className="foot">
        <div><b>KoraWear</b><br />A fictional brand. Demo store for portfolio use.</div>
        <div><b>Shop</b><br />Women · Men · Unisex</div>
        <div><b>Help</b><br />Sizing · Delivery · Exchanges</div>
      </footer>
    </>
  )
}
