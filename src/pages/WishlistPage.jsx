import { Link } from "react-router-dom";
import { useWishlist } from "../contexts/WishlistContext";
import { PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard.jsx";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const items = PRODUCTS.filter((p) => ids.includes(p.id));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

        .wl-page {
          min-height: 100vh;
          background: #fafaf9;
          padding-top: 88px;
          font-family: 'Outfit', sans-serif;
          color: #1a1816;
        }
        @media (max-width: 767px) { .wl-page { padding-top: 72px; } }

        /* ── Header ── */
        .wl-header {
          background: #fff;
          border-bottom: 1px solid rgba(0,0,0,0.07);
          padding: 36px 2.5rem 28px;
        }
        @media (max-width: 767px) { .wl-header { padding: 28px 1.25rem 22px; } }

        .wl-header-inner { max-width: 1200px; margin: 0 auto; }

        .wl-eyebrow {
          font-family: 'Outfit', sans-serif;
          font-size: 9.5px; font-weight: 600; letter-spacing: 0.22em;
          text-transform: uppercase; color: #1a1816; opacity: 0.4;
          margin-bottom: 10px; display: block;
        }
        .wl-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          font-weight: 700; color: #1a1816; margin: 0 0 6px;
          letter-spacing: -0.025em; line-height: 1.1;
        }
        .wl-count {
          font-family: 'Outfit', sans-serif;
          font-size: 13px; font-weight: 400;
          color: #1a1816; opacity: 0.45;
        }

        /* ── Body ── */
        .wl-body {
          max-width: 1200px; margin: 0 auto;
          padding: 32px 2.5rem 64px;
        }
        @media (max-width: 767px) { .wl-body { padding: 24px 1.25rem 52px; } }

        /* ── Grid ── */
        .wl-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        @media (min-width: 640px)  { .wl-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; } }
        @media (min-width: 1024px) { .wl-grid { grid-template-columns: repeat(4, 1fr); gap: 20px; } }

        /* ── Empty state ── */
        .wl-empty {
          text-align: center;
          padding: 80px 24px 60px;
          display: flex; flex-direction: column;
          align-items: center; gap: 20px;
        }
        .wl-empty-icon {
          width: 52px; height: 52px;
          color: #1a1816; opacity: 0.12;
        }
        .wl-empty-title {
          font-family: 'Outfit', sans-serif;
          font-size: 17px; font-weight: 600;
          color: #1a1816; margin: 0;
          letter-spacing: -0.01em;
        }
        .wl-empty-sub {
          font-family: 'Outfit', sans-serif;
          font-size: 14px; font-weight: 400;
          color: #1a1816; opacity: 0.45;
          max-width: 300px; line-height: 1.65; margin: 0;
        }
        .wl-empty-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: #1a1816; color: #fff;
          padding: 13px 30px; border-radius: 2px;
          font-family: 'Outfit', sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; text-decoration: none;
          transition: background 0.2s, gap 0.2s;
          margin-top: 4px;
        }
        .wl-empty-btn:hover { background: #0f0f0f; gap: 14px; }
        .wl-empty-btn svg { width: 13px; height: 13px; }
      `}</style>

      <div className="wl-page">

        {/* Header */}
        <div className="wl-header">
          <div className="wl-header-inner">
            <span className="wl-eyebrow">Your saved items</span>
            <h1 className="wl-title">Wishlist</h1>
            <p className="wl-count">
              {items.length > 0
                ? `${items.length} saved item${items.length !== 1 ? "s" : ""}`
                : "Nothing saved yet"}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="wl-body">
          {items.length > 0 ? (
            <div className="wl-grid">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="wl-empty">
              <svg className="wl-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              <p className="wl-empty-title">Your wishlist is empty</p>
              <p className="wl-empty-sub">
                Browse the collection and save the pieces you love.
              </p>
              <Link to="/collections/all" className="wl-empty-btn">
                Browse All Products
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>

      </div>
    </>
  );
}