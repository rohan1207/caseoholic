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
        .wl-page {
          min-height: 100vh; background: #fafaf9;
          padding-top: 68px;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
        }
        .wl-hero {
          background: #fff; border-bottom: 1px solid #f0eeea;
          padding: 40px 24px 28px;
        }
        .wl-hero-inner { max-width: 1200px; margin: 0 auto; }
        .wl-eyebrow {
          font-size: 10px; font-weight: 700; letter-spacing: 0.28em;
          text-transform: uppercase; color: #a8a29e; margin-bottom: 8px; display: block;
        }
        .wl-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.6rem, 4vw, 2.5rem);
          font-weight: 400; color: #1c1917; margin: 0 0 4px;
          letter-spacing: -0.02em;
        }
        .wl-title em { font-style: italic; color: #d97706; }
        .wl-sub { font-size: 13px; color: #78716c; }

        .wl-body {
          max-width: 1200px; margin: 0 auto;
          padding: 28px 24px 64px;
        }
        .wl-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        @media (min-width: 640px)  { .wl-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; } }
        @media (min-width: 1024px) { .wl-grid { grid-template-columns: repeat(4, 1fr); gap: 20px; } }

        .wl-empty {
          text-align: center; padding: 80px 24px;
          display: flex; flex-direction: column; align-items: center; gap: 16px;
        }
        .wl-empty svg { width: 64px; height: 64px; color: #d4d0ca; }
        .wl-empty p { font-size: 15px; color: #a8a29e; max-width: 320px; line-height: 1.6; }
        .wl-empty a {
          display: inline-flex; align-items: center; gap: 8px;
          background: #1c1917; color: #fff;
          padding: 13px 28px; border-radius: 2px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; text-decoration: none;
          transition: background 0.2s;
        }
        .wl-empty a:hover { background: #292524; }
      `}</style>

      <div className="wl-page">
        <div className="wl-hero">
          <div className="wl-hero-inner">
            <span className="wl-eyebrow">Your Saved Items</span>
            <h1 className="wl-title">
              My <em>Wishlist</em>
            </h1>
            <p className="wl-sub">
              {items.length > 0
                ? `${items.length} saved item${items.length !== 1 ? "s" : ""}`
                : "Nothing saved yet"}
            </p>
          </div>
        </div>

        <div className="wl-body">
          {items.length > 0 ? (
            <div className="wl-grid">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="wl-empty">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              <p>
                Your wishlist is empty. Explore the collection and save the
                pieces you love.
              </p>
              <Link to="/collections/all">
                Browse All Products
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  style={{ width: 14, height: 14 }}
                >
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
