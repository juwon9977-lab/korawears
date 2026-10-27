export type Gender = 'Women' | 'Men' | 'Unisex'
export type Category = 'Dresses' | 'Shirts' | 'Sets' | 'Outerwear' | 'Bottoms'
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'
export type GarmentType = 'dress' | 'shirt' | 'set' | 'jacket' | 'trousers' | 'skirt' | 'coat'
export type PatternKind = 'dots' | 'zig' | 'diamond' | 'adire' | 'bars' | 'kente' | 'mud'

export interface Colorway {
  name: string
  bg: string
  fg: string
  acc: string
}

export interface Product {
  id: string
  name: string
  gender: Gender
  category: Category
  price: number
  type: GarmentType
  pattern: PatternKind
  isNew?: boolean
  colors: Colorway[]
  /** Sold-out sizes, keyed by colourway index. */
  soldOut: Partial<Record<number, Size[]>>
  description: string
  fabric: string
  fit: string
}

export interface CartLine {
  productId: string
  colorIndex: number
  size: Size
  qty: number
}

export type ShippingMethod = 'standard' | 'express'
export type PaymentMethod = 'card' | 'transfer' | 'cod'

export interface Totals {
  subtotal: number
  discount: number
  shipping: number
  total: number
  vat: number
  count: number
  afterDiscount: number
}

export interface Order {
  number: string
  firstName: string
  email: string
  address: string
  city: string
  state: string
  estimate: string
  payment: PaymentMethod
  cardLast4: string
  lines: CartLine[]
  totals: Totals
}
