import { useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Hero } from '../components/Hero'
import { ProductCard } from '../components/ProductCard'
import { PRODUCTS } from '../data/products'
import { CATEGORY_TABS, PRICE_FILTER_MAX, PRICE_FILTER_MIN, SIZES, type CategoryTab } from '../lib/constants'
import { formatNaira } from '../lib/format'
import type { Gender, Size } from '../types'

type SortKey = 'featured' | 'new' | 'low' | 'high'

const SORTS: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'new', label: 'Newest' },
  { value: 'low', label: 'Price: low to high' },
  { value: 'high', label: 'Price: high to low' },
]

export function Shop({ gender }: { gender?: Gender }) {
  const [params, setParams] = useSearchParams()
  const query = (params.get('q') ?? '').trim().toLowerCase()
  const [tab, setTab] = useState<CategoryTab>('All')
  const [sort, setSort] = useState<SortKey>('featured')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [sizes, setSizes] = useState<Size[]>([])
  const [maxPrice, setMaxPrice] = useState(PRICE_FILTER_MAX)
  const shelf = useRef<HTMLDivElement>(null)

  const products = useMemo(() => {
    const list = PRODUCTS.filter((p) => {
      if (gender && p.gender !== gender) return false
      if (tab === 'New in' && !p.isNew) return false
      if (tab !== 'All' && tab !== 'New in' && p.category !== tab) return false
      if (p.price > maxPrice) return false
      if (query && !`${p.name} ${p.category} ${p.gender} ${p.pattern}`.toLowerCase().includes(query)) return false
      if (sizes.length) {
        const anyInStock = sizes.some((s) => p.colors.some((_, i) => !(p.soldOut[i] ?? []).includes(s)))
        if (!anyInStock) return false
      }
      return true
    })
    if (sort === 'low') list.sort((a, b) => a.price - b.price)
    if (sort === 'high') list.sort((a, b) => b.price - a.price)
    if (sort === 'new') list.sort((a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false))
    return list
  }, [gender, tab, sort, sizes, maxPrice, query])

  const activeFilters = sizes.length + (maxPrice < PRICE_FILTER_MAX ? 1 : 0)
  const toggleSize = (s: Size) => setSizes((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]))
  const reset = () => {
    setSizes([])
    setMaxPrice(PRICE_FILTER_MAX)
    setTab('All')
    setParams({})
  }

  return (
    <>
      <Hero onShop={() => shelf.current?.scrollIntoView({ block: 'start' })} />

      <div className="bar" ref={shelf}>
        <button className="pill" onClick={() => setFiltersOpen((o) => !o)} aria-expanded={filtersOpen} aria-controls="filters">
          <span>Filter{activeFilters ? ` (${activeFilters})` : ''}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M3 5h18l-7 8v6l-4 2v-8z" /></svg>
        </button>

        <div className="tabs" role="group" aria-label="Category">
          {CATEGORY_TABS.map((t) => (
            <button key={t} aria-pressed={tab === t} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>

        <label className="pill">
          <span className="sr">Sort by</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
            {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </label>
      </div>

      <div className="fpanel" id="filters" hidden={!filtersOpen}>
        <div>
          <h4>Available in size</h4>
          <div className="chips">
            {SIZES.map((s) => (
              <button key={s} className="chip" aria-pressed={sizes.includes(s)} onClick={() => toggleSize(s)}>{s}</button>
            ))}
          </div>
        </div>
        <div>
          <h4>Up to <span className="mono">{formatNaira(maxPrice)}</span></h4>
          <label className="sr" htmlFor="max-price">Maximum price</label>
          <input id="max-price" type="range" min={PRICE_FILTER_MIN} max={PRICE_FILTER_MAX} step={5000} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
        </div>
        <div style={{ alignSelf: 'end' }}>
          <button className="btn ghost sm" onClick={reset}>Reset filters</button>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="empty">
          <h3>Nothing matches yet</h3>
          <p>Try a different search or clear the filters.</p>
          <p style={{ marginTop: 14 }}><button className="btn pri sm" onClick={reset}>Clear filters</button></p>
        </div>
      ) : (
        <>
          <p className="count" role="status">
            {products.length} {products.length === 1 ? 'piece' : 'pieces'}{gender ? ` · ${gender}` : ''}
          </p>
          <div className="grid">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </>
      )}
    </>
  )
}
