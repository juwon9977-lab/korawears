import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getProduct } from '../data/products'
import { FREE_SHIPPING_AT, PROMO_CODE } from '../lib/constants'
import { formatNaira } from '../lib/format'
import { calcTotals, lineKey } from '../lib/pricing'
import { Garment } from './Garment'

export function CartDrawer() {
  const { lines, promo, drawerOpen, closeDrawer, setQty, remove, applyPromo } = useCart()
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [promoError, setPromoError] = useState('')
  const closeRef = useRef<HTMLButtonElement>(null)
  const returnFocus = useRef<Element | null>(null)

  const t = calcTotals(lines, promo)
  const remaining = Math.max(0, FREE_SHIPPING_AT - t.afterDiscount)
  const progress = Math.min(100, Math.round((t.afterDiscount / FREE_SHIPPING_AT) * 100))

  useEffect(() => {
    if (!drawerOpen) return
    returnFocus.current = document.activeElement
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeDrawer()
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      if (returnFocus.current instanceof HTMLElement) returnFocus.current.focus()
    }
  }, [drawerOpen, closeDrawer])

  const onPromo = (e: FormEvent) => {
    e.preventDefault()
    if (applyPromo(code)) {
      setPromoError('')
      setCode('')
    } else {
      setPromoError(code.trim() ? 'That code isn’t valid.' : 'Enter a code first.')
    }
  }

  const goCheckout = () => {
    closeDrawer()
    navigate('/checkout')
  }

  return (
    <>
      <div className={`scrim${drawerOpen ? ' on' : ''}`} onClick={closeDrawer} />
      <aside className={`drawer${drawerOpen ? ' on' : ''}`} role="dialog" aria-modal="true" aria-label="Shopping bag" aria-hidden={!drawerOpen}>
        <div className="dh">
          <h2>Your bag ({t.count})</h2>
          <button ref={closeRef} className="x" onClick={closeDrawer} aria-label="Close bag">
            <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M1 1l12 12M13 1 1 13" /></svg>
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="db">
            <div className="dempty">
              <h3>Your bag is empty</h3>
              <p>Pieces you add will wait here.</p>
              <p style={{ marginTop: 18 }}>
                <Link className="btn pri sm" to="/" onClick={closeDrawer}>Browse the collection</Link>
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="free">
              <p>
                {remaining > 0
                  ? <>Add <b className="mono">{formatNaira(remaining)}</b> for free delivery</>
                  : 'You have free standard delivery'}
              </p>
              <div className="track"><i style={{ width: `${progress}%` }} /></div>
            </div>

            <div className="db">
              {lines.map((l) => {
                const p = getProduct(l.productId)
                if (!p) return null
                const key = lineKey(l)
                return (
                  <div className="line" key={key}>
                    <div className="stage"><Garment product={p} colorIndex={l.colorIndex} /></div>
                    <div>
                      <h4>{p.name}</h4>
                      <div className="sub">{p.colors[l.colorIndex].name} · Size {l.size}</div>
                      <div className="row">
                        <div className="mini">
                          <button onClick={() => setQty(key, l.qty - 1)} aria-label="Decrease quantity">{'−'}</button>
                          <span>{l.qty}</span>
                          <button onClick={() => setQty(key, l.qty + 1)} aria-label="Increase quantity">+</button>
                        </div>
                        <span className="price">{formatNaira(p.price * l.qty)}</span>
                      </div>
                      <button className="lnk" onClick={() => remove(key)}>Remove</button>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="df">
              <form className="promo" onSubmit={onPromo}>
                <label className="sr" htmlFor="promo-code">Promo code</label>
                <input id="promo-code" placeholder="Promo code" value={code} onChange={(e) => setCode(e.target.value)} autoComplete="off" />
                <button className="btn ghost sm" type="submit">Apply</button>
              </form>
              <p className={`note ${promo ? 'ok' : promoError ? 'bad' : ''}`}>
                {promo ? `${PROMO_CODE} applied: 10% off` : promoError || `Try ${PROMO_CODE} for 10% off.`}
              </p>
              <div className="tot"><span>Subtotal</span><span>{formatNaira(t.subtotal)}</span></div>
              {t.discount > 0 && <div className="tot"><span>Discount</span><span>{'−'}{formatNaira(t.discount)}</span></div>}
              <div className="tot note"><span>Delivery calculated at checkout</span><span /></div>
              <div className="tot big"><span>Estimated total</span><span>{formatNaira(t.afterDiscount)}</span></div>
              <button className="btn pri full" onClick={goCheckout}>Checkout</button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
