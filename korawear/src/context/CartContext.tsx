import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState, type ReactNode } from 'react'
import { getProduct } from '../data/products'
import { MAX_QTY, PROMO_CODE } from '../lib/constants'
import { lineKey } from '../lib/pricing'
import type { CartLine, Order } from '../types'

interface State {
  lines: CartLine[]
  promo: string
}

type Action =
  | { type: 'add'; line: CartLine }
  | { type: 'setQty'; key: string; qty: number }
  | { type: 'remove'; key: string }
  | { type: 'promo'; code: string }
  | { type: 'clear' }

const STORAGE_KEY = 'korawear.cart.v1'

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add': {
      const key = lineKey(action.line)
      const exists = state.lines.some((l) => lineKey(l) === key)
      const lines = exists
        ? state.lines.map((l) => (lineKey(l) === key ? { ...l, qty: Math.min(MAX_QTY, l.qty + action.line.qty) } : l))
        : [...state.lines, action.line]
      return { ...state, lines }
    }
    case 'setQty': {
      const lines = state.lines
        .map((l) => (lineKey(l) === action.key ? { ...l, qty: Math.min(MAX_QTY, action.qty) } : l))
        .filter((l) => l.qty > 0)
      return { ...state, lines }
    }
    case 'remove':
      return { ...state, lines: state.lines.filter((l) => lineKey(l) !== action.key) }
    case 'promo':
      return { ...state, promo: action.code }
    case 'clear':
      return { lines: [], promo: '' }
  }
}

function load(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<State>
      const lines = Array.isArray(parsed.lines) ? parsed.lines.filter((l) => getProduct(l.productId)) : []
      return { lines, promo: parsed.promo === PROMO_CODE ? PROMO_CODE : '' }
    }
  } catch {
    /* storage unavailable or corrupt: start empty */
  }
  return { lines: [], promo: '' }
}

interface CartContextValue extends State {
  drawerOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
  add: (line: CartLine) => void
  setQty: (key: string, qty: number) => void
  remove: (key: string) => void
  applyPromo: (code: string) => boolean
  clear: () => void
  lastOrder: Order | null
  setLastOrder: (o: Order | null) => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, load)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [lastOrder, setLastOrder] = useState<Order | null>(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* ignore */
    }
  }, [state])

  const add = useCallback((line: CartLine) => dispatch({ type: 'add', line }), [])
  const setQty = useCallback((key: string, qty: number) => dispatch({ type: 'setQty', key, qty }), [])
  const remove = useCallback((key: string) => dispatch({ type: 'remove', key }), [])
  const clear = useCallback(() => dispatch({ type: 'clear' }), [])
  const applyPromo = useCallback((code: string) => {
    const ok = code.trim().toUpperCase() === PROMO_CODE
    dispatch({ type: 'promo', code: ok ? PROMO_CODE : '' })
    return ok
  }, [])
  const openDrawer = useCallback(() => setDrawerOpen(true), [])
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  const value = useMemo<CartContextValue>(
    () => ({ ...state, drawerOpen, openDrawer, closeDrawer, add, setQty, remove, applyPromo, clear, lastOrder, setLastOrder }),
    [state, drawerOpen, openDrawer, closeDrawer, add, setQty, remove, applyPromo, clear, lastOrder],
  )
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
