import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

/** Viewports at or below this width see the “use desktop” message (phones & small tablets). */
const MOBILE_MAX_WIDTH_PX = 1024

function useIsNarrowViewport() {
  const [narrow, setNarrow] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= MOBILE_MAX_WIDTH_PX : false
  )
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH_PX}px)`)
    const update = () => setNarrow(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return narrow
}

function MobileExperienceNotice() {
  return (
    <div
      className="fixed inset-0 z-[9999] flex min-h-[100dvh] flex-col items-center justify-center gap-6 bg-[#0c0a09] px-8 text-center"
      role="alertdialog"
      aria-live="polite"
      aria-label="Mobile experience notice"
    >
      <p
        className="font-['Cormorant_Garamond',Georgia,serif] text-2xl font-medium tracking-tight text-[#fafaf9] sm:text-3xl"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        Phone experience is in progress
      </p>
      <p className="max-w-md text-sm font-light leading-relaxed text-stone-400" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
        Will be available soon. For the best experience, please open Caseoholic on a{' '}
        <span className="font-medium text-stone-200">desktop or laptop</span> screen.
      </p>
      <div className="mt-2 h-px w-16 bg-amber-400/60" aria-hidden />
    </div>
  )
}
import Navbar                 from './components/Navbar.jsx'
import Footer                 from './components/Footer.jsx'
import CartDrawer             from './components/CartDrawer.jsx'
import Home                   from './pages/Home.jsx'
import CategoryPage           from './pages/CategoryPage.jsx'
import ProductPage            from './pages/ProductPage.jsx'
import AboutPage              from './pages/AboutPage.jsx'
import TermsPage              from './pages/TermsPage.jsx'
import PrivacyPage            from './pages/PrivacyPage.jsx'
import ShippingPage           from './pages/ShippingPage.jsx'
import WishlistPage           from './pages/WishlistPage.jsx'
import AccountPage            from './pages/AccountPage.jsx'
import OrderConfirmationPage  from './pages/OrderConfirmationPage.jsx'
import SearchPage             from './pages/SearchPage.jsx'
import CheckoutPage           from './pages/CheckoutPage.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

export default function App() {
  const isNarrowViewport = useIsNarrowViewport()

  if (isNarrowViewport) {
    return <MobileExperienceNotice />
  }

  return (
    <div className="min-h-screen w-full max-w-full min-w-0 bg-[var(--page-bg)] text-slate-900">
      <ScrollToTop />
      <Navbar />
      <CartDrawer />

      <Routes>
        <Route path="/"                      element={<Home />} />
        <Route path="/collections/:category" element={<CategoryPage />} />
        <Route path="/products/:slug"        element={<ProductPage />} />
        <Route path="/about"                 element={<AboutPage />} />
        <Route path="/legal/terms"          element={<TermsPage />} />
        <Route path="/legal/privacy"        element={<PrivacyPage />} />
        <Route path="/legal/shipping"       element={<ShippingPage />} />
        <Route path="/wishlist"              element={<WishlistPage />} />
        <Route path="/account"              element={<AccountPage />} />
        <Route path="/order-confirmation"   element={<OrderConfirmationPage />} />
        <Route path="/checkout"             element={<CheckoutPage />} />
        <Route path="/search"               element={<SearchPage />} />
        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Routes>

      <Footer />
    </div>
  )
}
