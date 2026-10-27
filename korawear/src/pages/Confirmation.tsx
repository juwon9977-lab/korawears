import { Link, Navigate } from 'react-router-dom'
import { Garment } from '../components/Garment'
import { useCart } from '../context/CartContext'
import { getProduct } from '../data/products'
import { formatNaira } from '../lib/format'
import { lineKey } from '../lib/pricing'

export function Confirmation() {
  const { lastOrder: o } = useCart()
  if (!o) return <Navigate to="/" replace />

  const payNote =
    o.payment === 'transfer' ? 'Bank transfer details would be shown here in a live store.'
    : o.payment === 'cod' ? 'Have the amount ready for the rider.'
    : `Card ending ${o.cardLast4}.`

  return (
    <div className="done">
      <div className="check">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7" /></svg>
      </div>
      <h1>Thank you, {o.firstName}.</h1>
      <p className="note" style={{ fontSize: 16 }}>
        Order <span className="ordno">{o.number}</span> is confirmed. A receipt would go to {o.email}.
      </p>

      <div className="sum">
        <h2>Delivering to</h2>
        <p>{o.address}, {o.city}, {o.state}</p>
        <p className="note">{o.estimate} · {payNote}</p>
        <hr className="hr" />
        {o.lines.map((l) => {
          const p = getProduct(l.productId)
          if (!p) return null
          return (
            <div className="sline" key={lineKey(l)}>
              <div className="stage"><span className="q">{l.qty}</span><Garment product={p} colorIndex={l.colorIndex} /></div>
              <div><div className="nm">{p.name}</div><div className="sb">{p.colors[l.colorIndex].name} · {l.size}</div></div>
              <div className="pp">{formatNaira(p.price * l.qty)}</div>
            </div>
          )
        })}
        <hr className="hr" />
        <div className="tot"><span>Subtotal</span><span>{formatNaira(o.totals.subtotal)}</span></div>
        {o.totals.discount > 0 && <div className="tot"><span>Discount</span><span>{'−'}{formatNaira(o.totals.discount)}</span></div>}
        <div className="tot"><span>Delivery</span><span>{o.totals.shipping ? formatNaira(o.totals.shipping) : 'Free'}</span></div>
        <div className="tot big"><span>Total</span><span>{formatNaira(o.totals.total)}</span></div>
      </div>

      <p style={{ marginTop: 26 }}><Link className="btn pri" to="/">Continue shopping</Link></p>
    </div>
  )
}
