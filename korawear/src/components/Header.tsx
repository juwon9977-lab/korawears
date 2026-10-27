import { Link, NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { calcTotals } from '../lib/pricing'

const NAV = [
  { to: '/women', label: 'Shop Women' },
  { to: '/men', label: 'Shop Men' },
  { to: '/unisex', label: 'Unisex' },
  { to: '/', label: 'All pieces', end: true },
]

export function Header() {
  const { lines, promo, openDrawer } = useCart()
  const count = calcTotals(lines, promo).count
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const onShop = ['/', '/women', '/men', '/unisex'].includes(pathname)

  const onSearch = (value: string) => {
    const target = onShop ? pathname : '/'
    navigate(value ? `${target}?q=${encodeURIComponent(value)}` : target, { replace: onShop })
  }

  return (
    <header className="top">
      <Link className="logo" to="/" aria-label="KoraWear home">
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <circle cx="11" cy="21" r="9" fill="var(--ochre)" />
          <path d="M11 12V2M15 13.5 22 4M7 13.5 2 5" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M22 4v14M27 7v11" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
        </svg>
        KoraWear
      </Link>

      <nav className="nav" aria-label="Shop by">
        {NAV.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => (isActive ? 'active' : undefined)}>
            {n.label}
          </NavLink>
        ))}
      </nav>

      <div className="search" role="search">
        <label className="sr" htmlFor="q">Search the collection</label>
        <input
          id="q" type="search" placeholder="Search our collection" autoComplete="off"
          value={params.get('q') ?? ''} onChange={(e) => onSearch(e.target.value)}
        />
        <span className="ico" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
          </svg>
        </span>
      </div>

      <button className="bagbtn" onClick={openDrawer} aria-haspopup="dialog">
        Bag <span className="n">{count}</span>
      </button>
    </header>
  )
}
