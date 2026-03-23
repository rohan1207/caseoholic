import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";

// ── Data ─────────────────────────────────────────────────────────────────────

const BANNER = {
  image: "/phonewallet.jpeg",
  eyebrow: "Carry Smarter",
  title: "Phone Wallet Collection",
  description:
    "Slim, structured, and effortlessly refined — our phone wallets merge everyday carry with understated luxury. Card slots, cash pockets, and magnetic closures, all in one.",
  cta: { label: "Explore More", href: "/collections/phone-wallets" },
};

const PRODUCTS = [
  { id: 1, slug: "folio-wallet-tan", image: "/magsafe11.webp", name: "Folio Wallet — Tan", price: "Rs.1,499", tag: "New" },
  { id: 2, slug: "slim-wallet-onyx", image: "/magsafe21.webp", name: "Slim Wallet — Onyx", price: "Rs.1,199", tag: null },
  { id: 3, slug: "magnetic-wallet-sand", image: "/magsafe31.webp", name: "Magnetic Wallet — Sand", price: "Rs.999", tag: "Hot" },
  { id: 4, slug: "bifold-wallet-mocha", image: "/magsafe41.webp", name: "Bifold Wallet — Mocha", price: "Rs.1,699", tag: null },
];

// ── Variants ──────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 },
  }),
};

const bannerVariants = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

// ── Icons ─────────────────────────────────────────────────────────────────────

const BagIcon = ({ color = "#fff" }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

const TickIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 7l3.5 3.5L12 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── ProductCard ───────────────────────────────────────────────────────────────

function ProductCard({ product, index, onAdd, added }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      style={{ position: "relative", cursor: "auto" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/products/${product.slug}`} style={{ display: "block", textDecoration: "none" }}>
        {/* Image wrapper */}
        <div style={{ position: "relative", overflow: "hidden", aspectRatio: "3/4", background: "white" }}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            style={{
              width: "100%", height: "100%", objectFit: "cover", objectPosition: "center",
              display: "block",
              transform: hovered ? "scale(1.06)" : "scale(1)",
              transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
            }}
          />

          {/* Tag badge */}
          {product.tag && (
            <span style={{
              position: "absolute", top: 10, left: 10,
              background: "#1a1816", color: "#fff",
              fontSize: "9px", fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase",
              padding: "4px 8px",
              fontFamily: "'Outfit', sans-serif",
            }}>
              {product.tag}
            </span>
          )}

          {/* Quick View — desktop hover only */}
          <div
            className="pwc-quickview"
            style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "rgba(26,24,22,0.88)",
              backdropFilter: "blur(4px)",
              padding: "13px 0",
              display: "flex", alignItems: "center", justifyContent: "center",
              transform: hovered ? "translateY(0)" : "translateY(100%)",
              transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <span style={{
              color: "#fff", fontSize: "10px", fontWeight: 600,
              letterSpacing: "0.22em", textTransform: "uppercase",
              fontFamily: "'Outfit', sans-serif",
            }}>
              Quick View
            </span>
          </div>

          {/* Bag button — always visible; explicit click adds to cart */}
          <button
            type="button"
            className="pwc-bag-btn"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAdd(product.id); }}
            style={{
              position: "absolute", bottom: 12, right: 12,
              width: 44, height: 44, borderRadius: "50%",
              background: added ? "#2a7a4a" : "#1a1816",
              border: "none", display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              pointerEvents: "auto",
              transition: "background 0.3s ease",
              zIndex: 10,
            }}
          >
            {added ? <TickIcon /> : <BagIcon />}
          </button>
        </div>

        {/* Caption */}
        <div style={{ padding: "14px 2px 0", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "9px", fontWeight: 600,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "#1a1816",
            }}>
              Phone Wallet
            </span>
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
              fontWeight: 500,
              color: "#1a1816",
              lineHeight: 1.3,
              letterSpacing: "0.01em",
            }}>
              {product.name}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.95rem", fontWeight: 600,
              color: "#1a1816", letterSpacing: "0.01em",
            }}>
              {product.price}
            </span>
            <svg
              width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="#1a1816" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ transition: "transform 0.2s ease", transform: hovered ? "translateX(3px)" : "translateX(0)" }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function PhoneWalletCollection() {
  const gridRef = useRef(null);
  const inView = useInView(gridRef, { once: true, margin: "-80px" });

  const [added, setAdded] = useState({});

  const handleAdd = useCallback((id) => {
    setAdded((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAdded((prev) => ({ ...prev, [id]: false }));
    }, 1800);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

        .pwc-root *, .pwc-root *::before, .pwc-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .pwc-root {
          font-family: 'Outfit', sans-serif;
          background: white;
          color: #1a1816;
        }

        /* ── Banner ── */
        .pwc-banner { position: relative; width: 100%; overflow: hidden; background: white; }
        .pwc-banner-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 520px;
          align-items: center;
        }

        /* content LEFT, image RIGHT */
        .pwc-banner-content {
          padding: 64px 72px;
          display: flex; flex-direction: column; gap: 20px;
          order: 1;
        }
        .pwc-banner-img-col {
          position: relative; height: 100%; min-height: 520px; overflow: hidden;
          order: 2;
        }
        .pwc-banner-img { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; }

        .pwc-banner-eyebrow {
          font-family: 'Outfit', sans-serif;
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #1a1816;
        }
        .pwc-banner-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 700; color: #1a1816;
          line-height: 1.08; letter-spacing: -0.02em;
        }
        .pwc-banner-desc {
          font-family: 'Outfit', sans-serif;
          font-size: 0.92rem; font-weight: 400;
          color: #1a1816; line-height: 1.7; max-width: 380px;
        }
        .pwc-banner-cta {
          display: inline-flex; align-items: center; gap: 10px;
          margin-top: 8px; text-decoration: none;
          border: 1.5px solid #1a1816; padding: 13px 26px;
          font-family: 'Outfit', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #1a1816; background: transparent;
          transition: background 0.25s ease, color 0.25s ease, gap 0.25s ease;
          width: fit-content;
        }
        .pwc-banner-cta:hover { background: #1a1816; color: #fff; gap: 16px; }

        /* ── Products ── */
        .pwc-products { padding: 64px 48px 72px; }
        .pwc-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }

        /* ── View All ── */
        .pwc-viewall-row { display: flex; justify-content: flex-end; margin-top: 36px; }
        .pwc-viewall {
          display: inline-flex; align-items: center; gap: 10px;
          text-decoration: none;
          border: 1.5px solid #1a1816; padding: 12px 22px;
          font-family: 'Outfit', sans-serif;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #1a1816; background: transparent;
          transition: background 0.22s ease, color 0.22s ease, gap 0.22s ease;
        }
        .pwc-viewall:hover { background: #1a1816; color: #fff; gap: 16px; }

        .pwc-bag-btn {
          opacity: 1 !important;
          transform: none !important;
          pointer-events: auto !important;
        }
        .pwc-quickview { display: none !important; }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .pwc-products { padding: 52px 32px 60px; }
          .pwc-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
          .pwc-banner-content { padding: 48px 40px; }
        }
        @media (max-width: 768px) {
          .pwc-banner-inner { grid-template-columns: 1fr; }
          .pwc-banner-img-col { min-height: 300px; order: 1; }
          .pwc-banner-content { order: 2; padding: 36px 28px; }
          .pwc-banner-title { font-size: clamp(1.6rem, 6vw, 2.4rem); }
        }
        @media (max-width: 640px) {
          .pwc-products { padding: 36px 16px 52px; }
          .pwc-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .pwc-banner-content { padding: 28px 20px; gap: 14px; }
        }
        @media (max-width: 380px) {
          .pwc-products { padding: 28px 12px 40px; }
          .pwc-grid { gap: 8px; }
        }
      `}</style>

      <div className="pwc-root">

        {/* ── BANNER ── */}
        <div className="pwc-banner">
          <div className="pwc-banner-inner">

            {/* Left: content */}
            <div className="pwc-banner-content">
              <motion.p className="pwc-banner-eyebrow"
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {BANNER.eyebrow}
              </motion.p>

              <motion.h1 className="pwc-banner-title"
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {BANNER.title}
              </motion.h1>

              <motion.p className="pwc-banner-desc"
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {BANNER.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.68, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link to={BANNER.cta.href} className="pwc-banner-cta">
                  {BANNER.cta.label}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            </div>

            {/* Right: image */}
            <motion.div className="pwc-banner-img-col" variants={bannerVariants} initial="hidden" animate="visible">
              <img src={BANNER.image} alt="Phone Wallet Collection" className="pwc-banner-img" />
            </motion.div>
          </div>
        </div>

        {/* ── PRODUCTS GRID ── */}
        <div className="pwc-products">
          <div
            className="pwc-grid"
            ref={gridRef}
          >
            {PRODUCTS.map((product, i) =>
              inView ? (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={i}
                  onAdd={handleAdd}
                  added={!!added[product.id]}
                />
              ) : (
                <div key={product.id} style={{ aspectRatio: "3/4", background: "white", opacity: 0 }} />
              )
            )}
          </div>

          {/* View All */}
          <motion.div
            className="pwc-viewall-row"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to="/collections/phone-wallets" className="pwc-viewall">
              View All
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>

      </div>
    </>
  );
}