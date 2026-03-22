import { useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../contexts/WishlistContext";
import { formatPrice } from "../data/products";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [colorIdx, setColorIdx] = useState(0);
  const { toggle, isWishlisted } = useWishlist();

  const wished = isWishlisted(product.id);
  const img = product.images?.[imgIdx] ?? product.images?.[0];
  const discountPct = product.comparePrice
    ? Math.round((1 - product.price / product.comparePrice) * 100)
    : null;

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
    toast(wished ? "Removed from wishlist" : "Saved to wishlist", {
      icon: wished ? "💔" : "❤️",
    });
  };

  return (
    <>
      <style>{`
        .pc-card {
          display: flex; flex-direction: column;
          position: relative; background: #fff;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
          border-radius: 2px; overflow: hidden;
          border: 1px solid #f3f0ea;
        }
        .pc-card:hover { box-shadow: 0 10px 30px rgba(0,0,0,0.08); transform: translateY(-2px); }

        .pc-img-zone {
          position: relative; aspect-ratio: 3/4;
          background: #fafaf9; overflow: hidden;
        }
        .pc-img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.4,0,0.2,1);
          display: block;
        }
        .pc-card:hover .pc-img { transform: scale(1.03); }

        .pc-badge {
          position: absolute; top: 14px; left: 14px;
          font-size: 9px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; padding: 5px 10px;
          background: #fff; color: #1c1917;
          border-radius: 2px; pointer-events: none;
          border: 1px solid rgba(0,0,0,0.08);
        }

        .pc-heart {
          position: absolute; top: 14px; right: 14px;
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(255,255,255,0.9);
          border: 1px solid rgba(0,0,0,0.06);
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; color: #78716c;
          transition: all 0.2s ease;
        }
        .pc-heart:hover, .pc-heart.active {
          color: #1c1917; background: #fff;
        }
        .pc-heart.active { color: #b91c1c; }
        .pc-heart:hover { background: #fff; }
        .pc-heart svg { width: 16px; height: 16px; }

        .pc-body {
          padding: 20px 14px 18px;
          flex: 1; display: flex; flex-direction: column; gap: 8px;
        }
        .pc-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 16px; font-weight: 400; color: #1c1917;
          letter-spacing: -0.01em; line-height: 1.35;
          text-decoration: none; display: block;
        }
        .pc-name:hover { color: #44403c; }

        .pc-colors {
          display: flex; gap: 6px; align-items: center; flex-wrap: wrap;
        }
        .pc-swatch {
          width: 12px; height: 12px; border-radius: 50%;
          border: 1px solid rgba(0,0,0,0.12); cursor: pointer;
          transition: transform 0.15s;
        }
        .pc-swatch.active { border-color: #1c1917; border-width: 1.5px; }
        .pc-swatch:hover { transform: scale(1.15); }

        .pc-price-row {
          display: flex; align-items: baseline; gap: 8px; margin-top: 2px;
        }
        .pc-price {
          font-size: 15px; font-weight: 600; color: #1c1917;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .pc-compare {
          font-size: 13px; color: #a8a29e; text-decoration: line-through;
        }
        .pc-disc {
          font-size: 11px; font-weight: 600; color: #b45309;
          letter-spacing: 0.04em;
        }

        @media (hover: none) {
          .pc-heart { opacity: 1; }
        }
      `}</style>

      <article className="pc-card">
        <Link
          to={`/products/${product.slug}`}
          className="pc-img-zone"
          tabIndex={-1}
          aria-label={product.name}
        >
          <img
            src={img}
            alt={product.name}
            className="pc-img"
            loading="lazy"
            onMouseEnter={() => product.images?.[1] && setImgIdx(1)}
            onMouseLeave={() => setImgIdx(0)}
          />
          {product.badge && <span className="pc-badge">{product.badge}</span>}
          <button
            type="button"
            className={`pc-heart ${wished ? "active" : ""}`}
            onClick={handleWishlist}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          >
            <svg
              viewBox="0 0 24 24"
              fill={wished ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </button>
        </Link>

        <div className="pc-body">
          <Link to={`/products/${product.slug}`} className="pc-name">
            {product.name}
          </Link>

          {product.colors?.length > 0 && (
            <div className="pc-colors" aria-label="Available colours">
              {product.colors.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  title={c.name}
                  className={`pc-swatch ${colorIdx === i ? "active" : ""}`}
                  style={{ backgroundColor: c.hex }}
                  onClick={(e) => {
                    e.preventDefault();
                    setColorIdx(i);
                  }}
                  aria-label={c.name}
                />
              ))}
            </div>
          )}

          <div className="pc-price-row">
            <span className="pc-price">{formatPrice(product.price)}</span>
            {product.comparePrice && (
              <span className="pc-compare">
                {formatPrice(product.comparePrice)}
              </span>
            )}
            {discountPct && <span className="pc-disc">{discountPct}% off</span>}
          </div>
        </div>
      </article>
    </>
  );
}
