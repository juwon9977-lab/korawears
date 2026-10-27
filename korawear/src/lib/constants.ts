import type { Size } from '../types'

export const FREE_SHIPPING_AT = 100_000
export const STANDARD_SHIPPING = 3_500
export const EXPRESS_SHIPPING = 7_500
export const VAT_RATE = 0.075
export const PROMO_CODE = 'KORA10'
export const PROMO_RATE = 0.1
export const MAX_QTY = 9

export const SIZES: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export const CATEGORY_TABS = ['All', 'New in', 'Dresses', 'Shirts', 'Sets', 'Outerwear', 'Bottoms'] as const
export type CategoryTab = (typeof CATEGORY_TABS)[number]

export const PRICE_FILTER_MAX = 80_000
export const PRICE_FILTER_MIN = 20_000

export const NIGERIAN_STATES = [
  'Lagos', 'Abuja (FCT)', 'Ogun', 'Oyo', 'Rivers', 'Kano', 'Kaduna', 'Enugu',
  'Anambra', 'Delta', 'Edo', 'Kwara', 'Plateau', 'Ondo', 'Osun', 'Other state',
]

/** Body measurements in cm: [size, bust/chest, waist, hip]. */
export const SIZE_GUIDE: [Size, string, string, string][] = [
  ['XS', '80–84', '62–66', '86–90'],
  ['S', '85–89', '67–71', '91–95'],
  ['M', '90–94', '72–76', '96–100'],
  ['L', '95–101', '77–83', '101–107'],
  ['XL', '102–108', '84–91', '108–114'],
  ['XXL', '109–116', '92–100', '115–122'],
]
