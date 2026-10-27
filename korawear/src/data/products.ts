import type { Colorway, Product } from '../types'

const c = (name: string, bg: string, fg: string, acc: string): Colorway => ({ name, bg, fg, acc })

export const PRODUCTS: Product[] = [
  {
    id: 'adire-wrap-dress', name: 'Adire Wrap Dress', gender: 'Women', category: 'Dresses', price: 42000,
    type: 'dress', pattern: 'adire', isNew: true,
    colors: [c('Indigo', '#23307A', '#E9ECF8', '#7F93E0'), c('Ochre', '#C98A1B', '#FFF1D0', '#6B3D0B'), c('Fern', '#2F5D4A', '#E4EFE6', '#A8CDB0')],
    soldOut: { 0: ['XS'], 2: ['XL', 'XXL'] },
    description: 'A true wrap with a deep V and a self-tie at the waist, resist-dyed in the adire tradition of Abeokuta. It skims, then swings.',
    fabric: '100% cotton, hand-dyed in small batches', fit: 'Relaxed through the skirt. Size down for a closer waist.',
  },
  {
    id: 'ankara-maxi-dress', name: 'Ankara Maxi Dress', gender: 'Women', category: 'Dresses', price: 38500,
    type: 'dress', pattern: 'dots',
    colors: [c('Cobalt', '#1D4FD7', '#FFD34D', '#FFFFFF'), c('Coral', '#D4452F', '#FBE8C8', '#1B1B1B'), c('Forest', '#1F5B3F', '#F3C84B', '#F5EBD9')],
    soldOut: { 1: ['XS'] },
    description: 'Floor-skimming and cut from a bold concentric-circle wax print. Pockets sit in the side seams, where they should be.',
    fabric: '100% cotton wax print, double-sided', fit: 'True to size. Falls at ankle on a 168 cm frame.',
  },
  {
    id: 'kente-panel-shirt', name: 'Kente Panel Shirt', gender: 'Men', category: 'Shirts', price: 28000,
    type: 'shirt', pattern: 'kente', isNew: true,
    colors: [c('Gold on Black', '#1A1A1A', '#E8B21C', '#C23B22'), c('Green', '#1E5A3C', '#F1C232', '#101010')],
    soldOut: { 1: ['S'] },
    description: 'A camp-collar shirt woven in narrow strip panels, matched at every seam so the pattern runs unbroken across the chest.',
    fabric: 'Cotton-silk blend strip weave', fit: 'Boxy. Take your usual size.',
  },
  {
    id: 'dashiki-resort-set', name: 'Dashiki Resort Set', gender: 'Men', category: 'Sets', price: 46000,
    type: 'set', pattern: 'zig',
    colors: [c('Sand', '#E9D9B8', '#7A3B12', '#2B3A8C'), c('Teal', '#0F6B6B', '#F6E7C1', '#E2872B')],
    soldOut: { 0: ['XXL'] },
    description: 'A short-sleeve top and drawstring shorts, sold together because they were designed together. Easy for Lagos heat.',
    fabric: 'Lightweight cotton poplin', fit: 'Relaxed. Shorts sit above the knee.',
  },
  {
    id: 'mudcloth-bomber', name: 'Mudcloth Bomber', gender: 'Unisex', category: 'Outerwear', price: 64000,
    type: 'jacket', pattern: 'mud', isNew: true,
    colors: [c('Ecru', '#E8E0CF', '#1E1B18', '#8A5A2B'), c('Charcoal', '#26262B', '#E8E0CF', '#C98A1B')],
    soldOut: { 1: ['XS', 'XXL'] },
    description: 'The harmattan layer. Mudcloth-inspired marks on a quilted body with rib-knit cuffs and a brass zip.',
    fabric: 'Cotton canvas outer, lightweight quilted lining', fit: 'Cropped and roomy. Layers over a hoodie.',
  },
  {
    id: 'aso-oke-trousers', name: 'Aso-Oke Trousers', gender: 'Unisex', category: 'Bottoms', price: 31500,
    type: 'trousers', pattern: 'bars',
    colors: [c('Wine', '#5B1F2E', '#E7B24A', '#F0E3D0'), c('Indigo', '#1F2A6B', '#D8DDF5', '#E3A22B')],
    soldOut: {},
    description: 'Straight-leg trousers with a banded aso-oke pattern down the leg. Smart enough for owambe, easy enough for Tuesday.',
    fabric: 'Woven cotton with metallic thread', fit: 'Straight leg, mid rise. True to size.',
  },
  {
    id: 'ankara-wrap-skirt', name: 'Ankara Wrap Skirt', gender: 'Women', category: 'Bottoms', price: 24000,
    type: 'skirt', pattern: 'dots',
    colors: [c('Magenta', '#A81C5B', '#FFE08A', '#2A1A6E'), c('Teal', '#12766F', '#FFD9A0', '#FFFFFF')],
    soldOut: { 0: ['XL'] },
    description: 'A midi wrap skirt with an adjustable tie, so one size sits right across a few. Lined to the knee.',
    fabric: 'Cotton wax print, cotton lining', fit: 'Adjustable waist. Midi length.',
  },
  {
    id: 'indigo-duster-coat', name: 'Indigo Duster Coat', gender: 'Women', category: 'Outerwear', price: 72000,
    type: 'coat', pattern: 'adire',
    colors: [c('Indigo', '#1C2760', '#DDE3FA', '#6F86E0'), c('Black', '#1B1B1F', '#D9D5CB', '#8C9BFF')],
    soldOut: { 1: ['XS'] },
    description: 'A long open-front coat with a hand-resisted indigo body and deep patch pockets. Wear it over everything.',
    fabric: 'Heavy cotton twill, adire-dyed', fit: 'Oversized. Falls below the calf.',
  },
  {
    id: 'zigzag-camp-shirt', name: 'Zigzag Camp Shirt', gender: 'Men', category: 'Shirts', price: 26500,
    type: 'shirt', pattern: 'zig',
    colors: [c('Olive', '#6C6A2E', '#F2E7B7', '#D1642A'), c('Sky', '#7FB2D9', '#123A5E', '#FFFFFF')],
    soldOut: { 0: ['S', 'XL'] },
    description: 'A short-sleeve shirt printed with a rolling zigzag that echoes carved Yoruba stools. Corozo-nut buttons.',
    fabric: 'Cotton-linen blend', fit: 'Regular fit.',
  },
  {
    id: 'kente-block-skirt', name: 'Kente Block Skirt', gender: 'Women', category: 'Bottoms', price: 27000,
    type: 'skirt', pattern: 'kente',
    colors: [c('Rust', '#A4421F', '#F4C94B', '#1E1E1E'), c('Navy', '#172554', '#F0B429', '#E8E3D6')],
    soldOut: {},
    description: 'A structured A-line skirt in a blocked strip weave. Hidden zip, deep hem, a little weight to it.',
    fabric: 'Cotton-silk strip weave, fully lined', fit: 'Fitted at the waist, A-line from the hip.',
  },
  {
    id: 'mudcloth-midi-dress', name: 'Mudcloth Midi Dress', gender: 'Women', category: 'Dresses', price: 36000,
    type: 'dress', pattern: 'mud',
    colors: [c('Ink', '#1B1B1F', '#E9E2D0', '#B7742B'), c('Clay', '#B36B45', '#2A1710', '#F2E5CF')],
    soldOut: { 0: ['M'] },
    description: 'A midi with a smocked back and bold hand-stamped marks. It moves with you from market to dinner.',
    fabric: 'Washed cotton, hand-stamped', fit: 'Stretch at the back. True to size.',
  },
  {
    id: 'diamond-weave-trousers', name: 'Diamond Weave Trousers', gender: 'Men', category: 'Bottoms', price: 29000,
    type: 'trousers', pattern: 'diamond', isNew: true,
    colors: [c('Stone', '#CBBFA8', '#2E3A8C', '#E39B1B'), c('Midnight', '#141B3A', '#E8B84A', '#7F93E0')],
    soldOut: { 1: ['L'] },
    description: 'Tapered trousers in a small diamond weave. The pattern is quiet from a distance and rewarding up close.',
    fabric: 'Cotton jacquard', fit: 'Tapered leg. Take your usual size.',
  },
]

export const getProduct = (id: string): Product | undefined => PRODUCTS.find((p) => p.id === id)
