import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";

// ── Data ─────────────────────────────────────────────────────────────────────

const BANNER = {
  image: "/watchband.png",
  eyebrow: "New Arrival",
  title: "iWatch Collection",
  description:
    "Discover the Latest Collection of Premium iWatch Accessories, Including Straps and Cases, Designed for Style and Durability.",
  cta: { label: "Explore More", href: "/collections/watch-bands" },
};

const PRODUCTS = [
  { id: 1, slug: "alpine-loop-orange", image: "/iwatchband11.webp", name: "Alpine Loop — Ember", price: "Rs.1,299", tag: "New" },
  { id: 2, slug: "ocean-band-midnight", image: "/iwatchband21.webp", name: "Ocean Band — Midnight", price: "Rs.999", tag: null },
  { id: 3, slug: "milanese-loop-gold", image: "/iwatchband31.webp", name: "Milanese Loop — Gold", price: "Rs.1,599", tag: "Hot" },
  { id: 4, slug: "sport-band-star", image: "/iwatchband41.webp", name: "Sport Band — Starlight", price: "Rs.799", tag: null },
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
            className="iwc-quickview"
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
            className="iwc-bag-btn"
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
              iWatch Band
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

export default function IWatchCollectionSection() {
  const gridRef = useRef(null);
  const inView = useInView(gridRef, { once: true, margin: "-80px" });

  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });
  const [added, setAdded] = useState({});
  const [cursorAdded, setCursorAdded] = useState(false);

  const onMouseMove = useCallback((e) => setCursor((p) => ({ ...p, x: e.clientX, y: e.clientY })), []);
  const onCardEnter = useCallback((e) => setCursor({ x: e.clientX, y: e.clientY, visible: true }), []);
  const onCardLeave = useCallback(() => setCursor((p) => ({ ...p, visible: false })), []);

  const handleAdd = useCallback((id) => {
    setAdded((prev) => ({ ...prev, [id]: true }));
    setCursorAdded(true);
    setTimeout(() => {
      setAdded((prev) => ({ ...prev, [id]: false }));
      setCursorAdded(false);
    }, 1800);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

        .iwc-root *, .iwc-root *::before, .iwc-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .iwc-root {
          font-family: 'Outfit', sans-serif;
          background: white;
          color: #1a1816;
        }

        /* ── Banner ── */
        .iwc-banner { position: relative; width: 100%; overflow: hidden; background: white; }
        .iwc-banner-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 520px;
          align-items: center;
        }
        .iwc-banner-img-col { position: relative; height: 100%; min-height: 520px; overflow: hidden; }
        .iwc-banner-img { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; }
        .iwc-banner-content { padding: 64px 72px; display: flex; flex-direction: column; gap: 20px; }

        .iwc-banner-eyebrow {
          font-family: 'Outfit', sans-serif;
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #1a1816;
        }
        .iwc-banner-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 700; color: #1a1816;
          line-height: 1.08; letter-spacing: -0.02em;
        }
        .iwc-banner-desc {
          font-family: 'Outfit', sans-serif;
          font-size: 0.92rem; font-weight: 400;
          color: #1a1816; line-height: 1.7; max-width: 380px;
        }
        .iwc-banner-cta {
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
        .iwc-banner-cta:hover { background: #1a1816; color: #fff; gap: 16px; }

        /* ── Products ── */
        .iwc-products { padding: 64px 48px 72px; }
        .iwc-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }

        /* ── View All ── */
        .iwc-viewall-row { display: flex; justify-content: flex-end; margin-top: 36px; }
        .iwc-viewall {
          display: inline-flex; align-items: center; gap: 10px;
          text-decoration: none;
          border: 1.5px solid #1a1816; padding: 12px 22px;
          font-family: 'Outfit', sans-serif;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #1a1816; background: transparent;
          transition: background 0.22s ease, color 0.22s ease, gap 0.22s ease;
        }
        .iwc-viewall:hover { background: #1a1816; color: #fff; gap: 16px; }

        .iwc-bag-btn {
          opacity: 1 !important;
          transform: none !important;
          pointer-events: auto !important;
        }
        .iwc-quickview { display: none !important; }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .iwc-products { padding: 52px 32px 60px; }
          .iwc-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
          .iwc-banner-content { padding: 48px 40px; }
        }
        @media (max-width: 768px) {
          .iwc-banner-inner { grid-template-columns: 1fr; }
          .iwc-banner-img-col { min-height: 300px; }
          .iwc-banner-content { padding: 36px 28px; }
          .iwc-banner-title { font-size: clamp(1.6rem, 6vw, 2.4rem); }
        }
        @media (max-width: 640px) {
          .iwc-products { padding: 36px 16px 52px; }
          .iwc-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .iwc-banner-content { padding: 28px 20px; gap: 14px; }
        }
        @media (max-width: 380px) {
          .iwc-products { padding: 28px 12px 40px; }
          .iwc-grid { gap: 8px; }
        }
      `}</style>

      <div className="iwc-root">

        {/* ── BANNER ── */}
        <div className="iwc-banner">
          <div className="iwc-banner-inner">
            <motion.div className="iwc-banner-img-col" variants={bannerVariants} initial="hidden" animate="visible">
              <img src={BANNER.image} alt="iWatch Collection" className="iwc-banner-img" />
            </motion.div>

            <div className="iwc-banner-content">
              <motion.p className="iwc-banner-eyebrow"
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {BANNER.eyebrow}
              </motion.p>

              <motion.h1 className="iwc-banner-title"
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {BANNER.title}
              </motion.h1>

              <motion.p className="iwc-banner-desc"
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {BANNER.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.68, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link to={BANNER.cta.href} className="iwc-banner-cta">
                  {BANNER.cta.label}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── PRODUCTS GRID ── */}
        <div className="iwc-products">
          <div
            className="iwc-grid"
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
            className="iwc-viewall-row"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to="/collections/watch-bands" className="iwc-viewall">
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