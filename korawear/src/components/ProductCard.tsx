import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatNaira } from '../lib/format'
import type { Product } from '../types'
import { ColorDots } from './ColorDots'
import { Garment } from './Garment'

export function ProductCard({ product }: { product: Product }) {
  const [colorIndex, setColorIndex] = useState(0)
  const to = `/product/${product.id}?c=${colorIndex}`

  return (
    <article className="card">
      <Link className="stage" to={to} aria-label={`View ${product.name}`}>
        {product.isNew && <span className="tag">New</span>}
        <Garment product={product} colorIndex={colorIndex} />
      </Link>
      <div className="meta">
        <div>
          <h3><Link to={to}>{product.name}</Link></h3>
          <span className="cat">{product.gender} · {product.category}</span>
        </div>
        <span className="price">{formatNaira(product.price)}</span>
      </div>
      <ColorDots colors={product.colors} value={colorIndex} onChange={setColorIndex} />
      <Link className="btn ghost full sm" to={to}>Choose size</Link>
    </article>
  )
}
