import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import { ColorDots } from '../components/ColorDots'
import { Garment } from '../components/Garment'
import { ProductCard } from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import { getProduct, PRODUCTS } from '../data/products'
import { EXPRESS_SHIPPING, FREE_SHIPPING_AT, MAX_QTY, SIZES, SIZE_GUIDE, STANDARD_SHIPPING } from '../lib/constants'
import { formatNaira } from '../lib/format'
import type { Size } from '../types'

export function ProductPage() {
  const { id = '' } = useParams()
  const product = getProduct(id)
  const [params] = useSearchParams()
  const { add, openDrawer } = useCart()

  const initialColor = Math.max(0, Math.min(Number(params.get('c')) || 0, (product?.colors.length ?? 1) - 1))
  const [colorIndex, setColorIndex] = useState(initialColor)
  const [size, setSize] = useState<Size | null>(null)
  const [qty, setQty] = useState(1)
  const [error, setError] = useState('')
  const guide = useRef<HTMLDetailsElement>(null)

  useEffect(() => {
    setColorIndex(initialColor)
    setSize(null)
    setQty(1)
    setError('')
    window.scrollTo({ top: 0 })
  }, [id, initialColor])

  if (!product) return <Navigate to="/" replace />

  const soldOut = product.soldOut[colorIndex] ?? []
  const pickColor = (i: number) => {
    setColorIndex(i)
    if (size && (product.soldOut[i] ?? []).includes(size)) setSize(null)
  }

  const addToBag = () => {
    if (!size) return setError('Choose a size to add this to your bag.')
    add({ productId: product.id, colorIndex, size, qty })
    setError('')
    openDrawer()
  }

  const showGuide = () => {
    if (guide.current) {
      guide.current.open = true
      guide.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
  }

  const related = PRODUCTS.filter((p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender)).slice(0, 4)

  return (
    <>
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/" style={{ color: 'var(--ink)', textDecoration: 'underline', fontWeight: 500 }}>Shop</Link>
        <span>/</span><span>{product.gender}</span><span>/</span><span>{product.category}</span>
      </nav>

      <div className="pdp">
        <div className="gal">
          <div className="stage">
            {product.isNew && <span className="tag">New</span>}
            <Garment product={product} colorIndex={colorIndex} />
          </div>
          <div className="thumbs" role="group" aria-label="Colours">
            {product.colors.map((c, i) => (
              <button key={c.name} aria-pressed={i === colorIndex} aria-label={c.name} onClick={() => pickColor(i)}>
                <Garment product={product} colorIndex={i} />
              </button>
            ))}
          </div>
        </div>

        <div className="info">
          <span className="eyebrow">{product.gender} · {product.category}</span>
          <h1>{product.name}</h1>
          <div className="pr">{formatNaira(product.price)}</div>
          <p className="desc">{product.description}</p>

          <div className="lbl"><b>Colour</b><span>{product.colors[colorIndex].name}</span></div>
          <ColorDots colors={product.colors} value={colorIndex} onChange={pickColor} large />

          <div className="lbl"><b>Size</b><button onClick={showGuide}>Size guide</button></div>
          <div className="chips" role="group" aria-label="Size">
            {SIZES.map((s) => {
              const out = soldOut.includes(s)
              return (
                <button
                  key={s} className="chip" disabled={out} aria-pressed={size === s}
                  aria-label={out ? `${s}, sold out` : s}
                  onClick={() => { setSize(s); setError('') }}
                >
                  {s}
                </button>
              )
            })}
          </div>
          <p className="err" role="alert">{error}</p>

          <div className="buyrow">
            <div className="qty">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">{'−'}</button>
              <span aria-live="polite">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))} aria-label="Increase quantity">+</button>
            </div>
            <button className="btn pri" onClick={addToBag}>
              Add to bag · <span className="mono">{formatNaira(product.price * qty)}</span>
            </button>
          </div>

          <div className="acc">
            <details ref={guide}>
              <summary>Size guide (cm)</summary>
              <div className="tblwrap">
                <table>
                  <thead><tr><th>Size</th><th>Bust / Chest</th><th>Waist</th><th>Hip</th></tr></thead>
                  <tbody>
                    {SIZE_GUIDE.map(([s, bust, waist, hip]) => (
                      <tr key={s}><td>{s}</td><td>{bust}</td><td>{waist}</td><td>{hip}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
            <details open>
              <summary>Fabric and fit</summary>
              <ul><li>{product.fabric}</li><li>{product.fit}</li></ul>
            </details>
            <details>
              <summary>Delivery and exchanges</summary>
              <p>
                Free standard delivery over {formatNaira(FREE_SHIPPING_AT)}, otherwise {formatNaira(STANDARD_SHIPPING)}.
                Express is {formatNaira(EXPRESS_SHIPPING)}. Exchange any piece within 14 days, unworn with tags.
              </p>
            </details>
          </div>
        </div>
      </div>

      <section className="more">
        <h2>You may also like</h2>
        <div className="grid">{related.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </section>
    </>
  )
}
