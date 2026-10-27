import { getProduct } from '../data/products'
import type { CartLine, ShippingMethod, Totals } from '../types'
import {
  EXPRESS_SHIPPING, FREE_SHIPPING_AT, PROMO_CODE, PROMO_RATE, STANDARD_SHIPPING, VAT_RATE,
} from './constants'

export const lineKey = (l: Pick<CartLine, 'productId' | 'colorIndex' | 'size'>): string =>
  `${l.productId}|${l.colorIndex}|${l.size}`

export function calcTotals(lines: CartLine[], promo: string, method: ShippingMethod = 'standard'): Totals {
  let subtotal = 0
  let count = 0
  for (const l of lines) {
    const p = getProduct(l.productId)
    if (!p) continue
    subtotal += p.price * l.qty
    count += l.qty
  }
  const discount = promo === PROMO_CODE ? Math.round(subtotal * PROMO_RATE) : 0
  const afterDiscount = subtotal - discount
  let shipping = 0
  if (lines.length) {
    shipping = method === 'express' ? EXPRESS_SHIPPING : afterDiscount >= FREE_SHIPPING_AT ? 0 : STANDARD_SHIPPING
  }
  const total = afterDiscount + shipping
  // Prices include VAT, so extract it rather than adding it on.
  const vat = Math.round((total * VAT_RATE) / (1 + VAT_RATE))
  return { subtotal, discount, shipping, total, vat, count, afterDiscount }
}
