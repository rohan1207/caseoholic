import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import toast from "react-hot-toast";

const FAVOURITES = [
  {
    id: 1,
    badge: "UP TO 50% OFF",
    label: "LIMITLESS",
    name: "Aramid Fibre Protective Phone Case",
    rating: 4.5,
    reviews: "1,340",
    colors: ["#111827", "#b45309", "#4b5563", "#b91c1c"],
    was: "$59.99",
    now: "$29.99",
    image: "/product1_1.webp",
  },
  {
    id: 2,
    badge: "UP TO 72% OFF",
    label: "SCREEN PROTECTOR",
    name: "Premium Screen Protector",
    rating: 0,
    reviews: null,
    colors: [],
    was: "$24.99",
    now: "$6.99",
    image: "/product2_1.webp",
  },
  {
    id: 3,
    badge: "UP TO 42% OFF",
    label: "LIMITLESS",
    name: "Walnut Protective Phone Case",
    rating: 4,
    reviews: "437",
    colors: ["#92400e", "#1e3a5f", "#d4a86a", "#111827"],
    was: "$59.99",
    now: "$34.99",
    image: "/product3_1.webp",
  },
  {
    id: 4,
    badge: "UP TO 73% OFF",
    label: "LIMITLESS",
    name: "Black Leather Protective Phone Case",
    rating: 4,
    reviews: "149",
    colors: ["#111827", "#4b5563", "#b45309", "#b91c1c"],
    was: "$54.99",
    now: "$14.99",
    image: "/product4_1.webp",
  },
];

/* Amber star rating */
function StarRating({ rating }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => {
        const full = i <= Math.floor(rating);
        const half = !full && i === Math.ceil(rating) && rating % 1 !== 0;
        const id = `star-half-${i}-${rating}`;
        return (
          <svg key={i} width="12" height="12" viewBox="0 0 24 24">
            {half && (
              <defs>
                <linearGradient id={id}>
                  <stop offset="50%" stopColor="#d97706" />
                  <stop offset="50%" stopColor="transparent" stopOpacity="0" />
                </linearGradient>
              </defs>
            )}
            <polygon
              points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
              fill={full ? "#d97706" : half ? `url(#${id})` : "none"}
              stroke="#d97706"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        );
      })}
    </div>
  );
}

const SLUG_MAP = {
  1: "aramid-fibre-protective-case",
  2: "premium-screen-protector",
  3: "walnut-protective-case",
  4: "leather-protective-case",
};

function FavCard({ item }) {
  const [wishlisted, setWishlisted] = useState(false);
  const { addItem } = useCart();
  const { toggle } = useWishlist();
  const slug = SLUG_MAP[item.id] ?? "aramid-fibre-protective-case";

  const handleAdd = (e) => {
    e.preventDefault();
    addItem({
      productId: item.id,
      slug,
      name: item.name,
      price: parseFloat(item.now.replace("$", "")),
      image: item.image,
      color: null,
      model: null,
    });
    toast.success(`${item.name} added to bag`);
  };
  const handleHeart = (e) => {
    e.preventDefault();
    setWishlisted((v) => !v);
    toggle(item.id);
    toast(wishlisted ? "Removed from wishlist" : "Saved to wishlist", {
      icon: wishlisted ? "💔" : "❤️",
    });
  };

  return (
    <article className="fav-card">
      {/* ── Image zone ── */}
      <Link
        to={`/products/${slug}`}
        className="fav-img-zone"
        style={{ textDecoration: "none", display: "block" }}
      >
        {/* Sale badge */}
        <span className="fav-badge">{item.badge}</span>

        <img
          src={item.image}
          alt={item.name}
          className="fav-img"
          loading="lazy"
        />

        {/* Wishlist — overlays image top-right */}
        <button
          type="button"
          className={`fav-heart ${wishlisted ? "fav-heart-active" : ""}`}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={handleHeart}
        >
          <svg
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </Link>

      {/* ── Body ── */}
      <div className="fav-body">
        <p className="fav-label">{item.label}</p>
        <p className="fav-name">{item.name}</p>

        <div className="fav-meta">
          {/* Stars */}
          <div className="fav-stars-row">
            {item.rating > 0 && (
              <>
                <StarRating rating={item.rating} />
                <span className="fav-reviews">{item.reviews} reviews</span>
              </>
            )}
          </div>

          {/* Swatches */}
          <div className="fav-swatches-row">
            {item.colors.map((c) => (
              <span
                key={c}
                className="fav-swatch"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          {/* Price */}
          <div className="fav-price-row">
            <span className="fav-was">{item.was}</span>
            <span className="fav-now">{item.now}</span>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="fav-footer">
        <button type="button" className="fav-add-btn" onClick={handleAdd}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="b-icon"
          >
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          Add to Bag
        </button>
      </div>
    </article>
  );
}

function OurFavourites() {
  const [mobileIndex, setMobileIndex] = useState(0);

  const goPrev = () =>
    setMobileIndex((i) => (i - 1 + FAVOURITES.length) % FAVOURITES.length);
  const goNext = () => setMobileIndex((i) => (i + 1) % FAVOURITES.length);

  return (
    <>
      <style>{`
        .fav-root {
          background: #ffffff;
          padding: 80px 48px 88px;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        /* ── Header ── */
        .fav-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 44px;
          gap: 24px;
        }

        .fav-eyebrow {
          margin: 0 0 10px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #a8a29e;
        }

        .fav-title {
          margin: 0;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.9rem, 3.5vw, 2.8rem);
          font-weight: 400;
          color: #1c1917;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        .fav-title em {
          font-style: normal;
          color: #b45309;
        }

        /* Nav arrows — mobile only */
        .fav-nav {
          display: none;
          gap: 6px;
        }
        .fav-nav-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1.5px solid #e2e2df;
          background: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #57534e;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .fav-nav-btn svg {
          width: 16px;
          height: 16px;
        }
        .fav-nav-btn:hover {
          background: #1c1917;
          border-color: #1c1917;
          color: #fff;
          box-shadow: 0 4px 16px rgba(0,0,0,0.18);
        }

        /* ── Desktop grid ── */
        .fav-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        /* ── Mobile carousel ── */
        .fav-carousel-mobile { display: none; }

        /* ── Card ── */
        .fav-card {
          height: 560px;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 3px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          position: relative;
          transition: box-shadow 0.28s ease, transform 0.28s ease;
        }
        .fav-card:hover {
          box-shadow: 0 16px 56px rgba(0,0,0,0.11);
          transform: translateY(-4px);
        }

        /* ── Image zone ── */
        .fav-img-zone {
          position: relative;
          height: 310px;
          flex-shrink: 0;
          background: #f0eeea;
          overflow: hidden;
        }

        .fav-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .fav-card:hover .fav-img {
          transform: scale(1.05);
        }

        /* Subtle vignette */
        .fav-img-zone::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, transparent 50%, rgba(0,0,0,0.06) 100%);
          pointer-events: none;
        }

        /* Sale badge — brand amber */
        .fav-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 3;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #92400e;
          background: rgba(254, 243, 199, 0.97);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          padding: 5px 11px;
          border-radius: 2px;
          border: 1px solid rgba(217, 119, 6, 0.28);
        }

        /* Wishlist heart — image overlay top-right */
        .fav-heart {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 3;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.6);
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.22s ease;
          opacity: 0;
          transform: scale(0.85);
        }
        .fav-heart svg {
          width: 14px;
          height: 14px;
          stroke: #78716c;
          fill: none;
          transition: stroke 0.2s, fill 0.2s;
        }
        .fav-card:hover .fav-heart {
          opacity: 1;
          transform: scale(1);
        }
        .fav-heart:hover {
          border-color: rgba(239,68,68,0.3);
          background: rgba(255,255,255,0.97);
        }
        .fav-heart:hover svg {
          stroke: #ef4444;
        }
        .fav-heart-active {
          opacity: 1 !important;
          transform: scale(1) !important;
          border-color: rgba(239,68,68,0.3) !important;
          background: rgba(255,255,255,0.97) !important;
        }
        .fav-heart-active svg {
          stroke: #ef4444 !important;
          fill: #ef4444 !important;
        }

        /* ── Body ── */
        .fav-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 18px 18px 0;
          min-height: 0;
        }

        .fav-label {
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #a8a29e;
          margin-bottom: 5px;
        }

        .fav-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 16px;
          font-weight: 400;
          color: #1c1917;
          line-height: 1.35;
          letter-spacing: -0.01em;
        }

        .fav-meta {
          margin-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .fav-stars-row {
          height: 16px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .fav-reviews {
          font-size: 11px;
          color: #a8a29e;
          line-height: 1;
        }

        .fav-swatches-row {
          height: 16px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .fav-swatch {
          width: 13px;
          height: 13px;
          border-radius: 50%;
          border: 1.5px solid rgba(0,0,0,0.1);
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .fav-swatch:hover {
          transform: scale(1.4);
          box-shadow: 0 2px 8px rgba(0,0,0,0.18);
        }

        .fav-price-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }

        .fav-was {
          font-size: 12px;
          color: #c4bdb6;
          text-decoration: line-through;
        }

        .fav-now {
          font-size: 19px;
          font-weight: 700;
          color: #1c1917;
          letter-spacing: -0.03em;
          font-family: 'Cormorant Garamond', Georgia, serif;
        }

        /* ── Footer / CTA ── */
        .fav-footer {
          margin-top: auto;
          padding: 14px 18px 18px;
          border-top: 1px solid #f5f5f3;
        }

        .fav-add-btn {
          width: 100%;
          border-radius: 2px;
          border: 1.5px solid #e0ddd9;
          background: #fafaf8;
          padding: 12px 0;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #44403c;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          cursor: pointer;
          transition: all 0.24s ease;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .fav-add-btn:hover {
          background: #1c1917;
          border-color: #1c1917;
          color: #fff;
          box-shadow: 0 8px 28px rgba(0,0,0,0.18);
          transform: translateY(-1px);
        }
        .b-icon {
          width: 13px;
          height: 13px;
          stroke: currentColor;
          fill: none;
          flex-shrink: 0;
        }

        /* ── Responsive ── */
        @media (max-width: 1080px) {
          .fav-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 767px) {
          .fav-root {
            padding: 52px 20px 60px;
          }
          .fav-header {
            margin-bottom: 28px;
          }
          .fav-nav {
            display: flex;
          }
          .fav-grid {
            display: none;
          }
          .fav-carousel-mobile {
            display: block;
          }
          .fav-card {
            height: auto;
            min-height: 500px;
          }
          .fav-img-zone {
            height: 270px;
          }
          /* Always show heart on mobile */
          .fav-heart {
            opacity: 1;
            transform: scale(1);
          }
          .fav-dots {
            display: flex;
            justify-content: center;
            gap: 7px;
            margin-top: 20px;
          }
          .fav-dot {
            height: 2px;
            border: none;
            border-radius: 1px;
            padding: 0;
            cursor: pointer;
            background: rgba(0,0,0,0.15);
            transition: width 0.35s ease, background 0.35s ease;
          }
          .fav-dot-active {
            background: #1c1917;
          }
        }

        @media (max-width: 480px) {
          .fav-root {
            padding: 40px 16px 48px;
          }
        }
      `}</style>

      <section className="fav-root">
        <div className="fav-header">
          <div>
            <p className="fav-eyebrow">Hand-picked for you</p>
            <h2 className="fav-title">
              Our <em>Favourites</em>
            </h2>
          </div>
          {/* Nav arrows — mobile only (controlled by CSS display) */}
          <div className="fav-nav">
            <button
              type="button"
              className="fav-nav-btn"
              aria-label="Previous"
              onClick={goPrev}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              className="fav-nav-btn"
              aria-label="Next"
              onClick={goNext}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop / tablet: static grid */}
        <div className="fav-grid">
          {FAVOURITES.map((item) => (
            <FavCard key={item.id} item={item} />
          ))}
        </div>

        {/* Mobile: single-card carousel */}
        <div className="fav-carousel-mobile">
          <FavCard item={FAVOURITES[mobileIndex]} />
          <div
            className="fav-dots"
            role="tablist"
            aria-label="Product navigation"
          >
            {FAVOURITES.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === mobileIndex}
                aria-label={`Go to product ${i + 1}`}
                className={`fav-dot ${i === mobileIndex ? "fav-dot-active" : ""}`}
                style={{ width: i === mobileIndex ? 24 : 14 }}
                onClick={() => setMobileIndex(i)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default OurFavourites;
