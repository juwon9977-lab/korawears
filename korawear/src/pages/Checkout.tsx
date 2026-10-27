import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Garment } from '../components/Garment'
import { useCart } from '../context/CartContext'
import { getProduct } from '../data/products'
import { EXPRESS_SHIPPING, FREE_SHIPPING_AT, NIGERIAN_STATES, STANDARD_SHIPPING } from '../lib/constants'
import { formatNaira } from '../lib/format'
import { calcTotals, lineKey } from '../lib/pricing'
import {
  EMPTY_FORM, formatCardNumber, formatExpiry, validateCheckout, type CheckoutForm, type FormErrors,
} from '../lib/validation'
import type { PaymentMethod, ShippingMethod } from '../types'

export function estimateDelivery(state: string, method: ShippingMethod): string {
  if (!state) return 'Pick a state for an estimate'
  if (method === 'express') return state === 'Lagos' ? 'Same day if ordered before 2 pm' : 'Next working day'
  return state === 'Lagos' ? '1–2 working days' : '3–5 working days'
}

interface FieldProps {
  id: keyof CheckoutForm
  label: string
  form: CheckoutForm
  errors: FormErrors
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  type?: string
  placeholder?: string
  autoComplete?: string
  wide?: boolean
  inputMode?: 'numeric'
  maxLength?: number
}

function Field({ id, label, form, errors, onChange, type = 'text', placeholder, autoComplete, wide, inputMode, maxLength }: FieldProps) {
  const err = errors[id]
  return (
    <div className={`f${wide ? ' w' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id} name={id} type={type} placeholder={placeholder} autoComplete={autoComplete}
        inputMode={inputMode} maxLength={maxLength} value={form[id]} onChange={onChange}
        aria-invalid={err ? true : undefined} aria-describedby={err ? `e-${id}` : undefined}
      />
      <div className="em" id={`e-${id}`}>{err}</div>
    </div>
  )
}

export function Checkout() {
  const { lines, promo, clear, setLastOrder } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState<CheckoutForm>(EMPTY_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [shipping, setShipping] = useState<ShippingMethod>('standard')
  const [payment, setPayment] = useState<PaymentMethod>('card')
  const formRef = useRef<HTMLFormElement>(null)

  if (lines.length === 0) {
    return (
      <div className="empty" style={{ marginTop: 20 }}>
        <h3>Your bag is empty</h3>
        <p>Add a piece before checking out.</p>
        <p style={{ marginTop: 14 }}><Link className="btn pri sm" to="/">Back to shop</Link></p>
      </div>
    )
  }

  const isLagos = form.state === 'Lagos'
  const totals = calcTotals(lines, promo, shipping)
  const standardFree = calcTotals(lines, promo, 'standard').afterDiscount >= FREE_SHIPPING_AT

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    let next = value
    if (name === 'card') next = formatCardNumber(value)
    if (name === 'expiry') next = formatExpiry(value)
    if (name === 'cvc') next = value.replace(/\D/g, '').slice(0, 4)
    setForm((f) => ({ ...f, [name]: next }))
    setErrors((er) => (er[name as keyof CheckoutForm] ? { ...er, [name]: undefined } : er))
    if (name === 'state' && next !== 'Lagos' && payment === 'cod') setPayment('card')
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const found = validateCheckout(form, payment)
    setErrors(found)
    const firstKey = (Object.keys(found) as (keyof CheckoutForm)[])[0]
    if (firstKey) {
      const el = formRef.current?.querySelector<HTMLElement>(`#${firstKey}`)
      el?.focus()
      el?.scrollIntoView({ block: 'center' })
      return
    }
    setLastOrder({
      number: `KW-${Math.floor(10000 + Math.random() * 89999)}`,
      firstName: form.firstName.trim(), email: form.email.trim(), address: form.address.trim(),
      city: form.city.trim(), state: form.state, estimate: estimateDelivery(form.state, shipping),
      payment, cardLast4: form.card.replace(/\s/g, '').slice(-4), lines, totals,
    })
    clear()
    navigate('/order/confirmation')
  }

  const fp = { form, errors, onChange }

  return (
    <>
      <nav className="crumbs"><Link to="/" style={{ color: 'var(--ink)', textDecoration: 'underline', fontWeight: 500 }}>{'←'} Keep shopping</Link></nav>
      <div className="ck">
        <form ref={formRef} onSubmit={submit} noValidate>
          <h1>Checkout</h1>
          <div className="steps"><b>Details</b><span>{'→'}</span><span>Delivery</span><span>{'→'}</span><span>Payment</span></div>
          <div className="demo" role="note">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" style={{ flex: '0 0 auto', marginTop: 1 }}>
              <circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16.5v.1" />
            </svg>
            <span>Demo store for a portfolio. Nothing is charged, sent or saved. Use any made-up details.</span>
          </div>

          <fieldset>
            <legend>Contact</legend>
            <div className="fg">
              <Field {...fp} id="email" label="Email" type="email" placeholder="ada@email.com" autoComplete="email" wide />
              <Field {...fp} id="phone" label="Phone" type="tel" placeholder="0803 000 0000" autoComplete="tel" wide />
            </div>
          </fieldset>

          <fieldset>
            <legend>Delivery address</legend>
            <div className="fg">
              <Field {...fp} id="firstName" label="First name" placeholder="Ada" autoComplete="given-name" />
              <Field {...fp} id="lastName" label="Last name" placeholder="Okafor" autoComplete="family-name" />
              <Field {...fp} id="address" label="Street address" placeholder="12 Admiralty Way, Lekki Phase 1" autoComplete="street-address" wide />
              <Field {...fp} id="city" label="City / Area" placeholder="Lekki" autoComplete="address-level2" />
              <div className="f">
                <label htmlFor="state">State</label>
                <select id="state" name="state" value={form.state} onChange={onChange} autoComplete="address-level1" aria-invalid={errors.state ? true : undefined}>
                  <option value="">Select state</option>
                  {NIGERIAN_STATES.map((s) => <option key={s}>{s}</option>)}
                </select>
                <div className="em" id="e-state">{errors.state}</div>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Delivery method</legend>
            <label className="opt">
              <input type="radio" name="shipping" checked={shipping === 'standard'} onChange={() => setShipping('standard')} />
              <span className="t"><b>Standard</b><small>{estimateDelivery(form.state, 'standard')}</small></span>
              <span className="p">{standardFree ? 'Free' : formatNaira(STANDARD_SHIPPING)}</span>
            </label>
            <label className="opt">
              <input type="radio" name="shipping" checked={shipping === 'express'} onChange={() => setShipping('express')} />
              <span className="t"><b>Express</b><small>{estimateDelivery(form.state || 'Other state', 'express')}</small></span>
              <span className="p">{formatNaira(EXPRESS_SHIPPING)}</span>
            </label>
          </fieldset>

          <fieldset>
            <legend>Payment</legend>
            <label className="opt">
              <input type="radio" name="payment" checked={payment === 'card'} onChange={() => setPayment('card')} />
              <span className="t"><b>Card</b><small>Debit or credit card</small></span>
            </label>
            <div className="paybox" hidden={payment !== 'card'}>
              <div className="fg">
                <Field {...fp} id="card" label="Card number" placeholder="0000 0000 0000 0000" autoComplete="off" wide inputMode="numeric" maxLength={19} />
                <Field {...fp} id="expiry" label="Expiry" placeholder="MM/YY" autoComplete="off" inputMode="numeric" maxLength={5} />
                <Field {...fp} id="cvc" label="CVC" placeholder="123" autoComplete="off" inputMode="numeric" maxLength={4} />
              </div>
            </div>
            <label className="opt">
              <input type="radio" name="payment" checked={payment === 'transfer'} onChange={() => setPayment('transfer')} />
              <span className="t"><b>Bank transfer</b><small>Account details appear after you place the order</small></span>
            </label>
            <label className="opt">
              <input type="radio" name="payment" checked={payment === 'cod'} disabled={!isLagos} onChange={() => setPayment('cod')} />
              <span className="t"><b>Pay on delivery</b><small>{isLagos ? 'Cash or transfer to the rider. Lagos only.' : 'Available in Lagos only'}</small></span>
            </label>
          </fieldset>

          <button className="btn pri full" type="submit" style={{ padding: 16 }}>
            Place order · <span className="mono">{formatNaira(totals.total)}</span>
          </button>
        </form>

        <aside>
          <div className="sum">
            <h2>Order summary</h2>
            {lines.map((l) => {
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
            <div className="tot"><span>Subtotal</span><span>{formatNaira(totals.subtotal)}</span></div>
            {totals.discount > 0 && <div className="tot"><span>Discount (KORA10)</span><span>{'−'}{formatNaira(totals.discount)}</span></div>}
            <div className="tot"><span>Delivery</span><span>{totals.shipping ? formatNaira(totals.shipping) : 'Free'}</span></div>
            <div className="tot big"><span>Total</span><span>{formatNaira(totals.total)}</span></div>
            <p className="note">Includes {formatNaira(totals.vat)} VAT at 7.5%</p>
          </div>
        </aside>
      </div>
    </>
  )
}
