import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { CartDrawer } from './components/CartDrawer'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Checkout } from './pages/Checkout'
import { Confirmation } from './pages/Confirmation'
import { ProductPage } from './pages/Product'
import { Shop } from './pages/Shop'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])
  return null
}

export default function App() {
  const { pathname } = useLocation()
  const showFooter = !pathname.startsWith('/checkout') && !pathname.startsWith('/order')

  return (
    <div className="wrap">
      <a className="skip" href="#main">Skip to content</a>
      <ScrollToTop />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/women" element={<Shop gender="Women" />} />
          <Route path="/men" element={<Shop gender="Men" />} />
          <Route path="/unisex" element={<Shop gender="Unisex" />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/confirmation" element={<Confirmation />} />
          <Route path="*" element={<Shop />} />
        </Routes>
      </main>
      {showFooter && <Footer />}
      <CartDrawer />
    </div>
  )
}
