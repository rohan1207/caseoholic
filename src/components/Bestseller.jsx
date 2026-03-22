import { useState, useCallback } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";

const BESTSELLER_TABS = [
  { key: "Phone Cases", label: "Phone Cases" },
  { key: "AirPods Cases", label: "AirPods Cases" },
  { key: "Watch Bands", label: "Watch Bands" },
  { key: "Phone Wallets", label: "MagSafe" },
];

const products = {
  "Phone Cases": [
    { id: "pc1", name: "Clear Shield Case", subtitle: "iPhone 15 Pro", price: 1299, image: "/iphone11.webp", hoverImage: "/iphone12.webp" },
    { id: "pc2", name: "Leather Folio Case", subtitle: "iPhone 15 Pro Max", price: 2499, image: "/iphone21.webp", hoverImage: "/iphone22.webp" },
    { id: "pc3", name: "MagSafe Silicone", subtitle: "iPhone 15 / 14", price: 1799, image: "/iphone31.webp", hoverImage: "/iphone32.webp" },
    { id: "pc4", name: "Carbon Armor", subtitle: "Samsung S24 Ultra", price: 1599, image: "/iphone41.webp", hoverImage: "/iphone42.webp" },
  ],
  "AirPods Cases": [
    { id: "ac1", name: "Leather Pod Case", subtitle: "AirPods Pro 2nd Gen", price: 999, image: "/airpod11.webp", hoverImage: "/airpod12.webp" },
    { id: "ac2", name: "Clear Snap Case", subtitle: "AirPods 3rd Gen", price: 699, image: "/airpod21.webp", hoverImage: "/airpod22.webp" },
    { id: "ac3", name: "Silicone Hook Case", subtitle: "AirPods Pro 2nd Gen", price: 849, image: "/airpod31.webp", hoverImage: "/airpod32.webp" },
    { id: "ac4", name: "Woven Fabric Case", subtitle: "AirPods 2nd Gen", price: 749, image: "/airpod41.webp", hoverImage: "/airpod42.webp" },
  ],
  "Watch Bands": [
    { id: "wb1", name: "Milanese Loop", subtitle: "Apple Watch 45mm", price: 1999, image: "/iwatchband11.webp", hoverImage: "/iwatchband12.webp" },
    { id: "wb2", name: "Braided Solo Loop", subtitle: "Apple Watch 41mm", price: 2299, image: "/iwatchband21.webp", hoverImage: "/iwatchband22.webp" },
    { id: "wb3", name: "Leather Link", subtitle: "Apple Watch 45mm", price: 2799, image: "/iwatchband31.webp", hoverImage: "/iwatchband32.webp" },
    { id: "wb4", name: "Sport Fluoroelastomer", subtitle: "Apple Watch 41 / 45mm", price: 1499, image: "/iwatchband41.webp", hoverImage: "/iwatchband42.webp" },
  ],
  "Phone Wallets": [
    { id: "pw1", name: "MagSafe Card Wallet", subtitle: "iPhone 14 / 15 Series", price: 1699, image: "/magsafe11.webp", hoverImage: "/magsafe12.webp" },
    { id: "pw2", name: "Leather Sleeve Wallet", subtitle: "Universal Fit", price: 2199, image: "/magsafe21.webp", hoverImage: "/magsafe22.webp" },
    { id: "pw3", name: "Bifold Card Case", subtitle: "iPhone 15 Pro", price: 1499, image: "/magsafe31.webp", hoverImage: "/magsafe32.webp" },
    { id: "pw4", name: "Zip Pouch Wallet", subtitle: "Universal Fit", price: 1899, image: "/magsafe41.webp", hoverImage: "/magsafe42.webp" },
  ],
};

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

function ProductCard({ product, index, onCardEnter, onCardLeave, onAdd, added }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={(e) => { setHovered(true); onCardEnter(e); }}
      onMouseLeave={(e) => { setHovered(false); onCardLeave(e); }}
      onClick={() => onAdd(product.id)}
      style={{ cursor: "none" }}
    >
      {/* Image container */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "3/4", overflow: "hidden", background: "white" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
            opacity: hovered ? 0 : 1,
            transform: hovered ? "scale(1.07)" : "scale(1)",
            transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
        <img
          src={product.hoverImage}
          alt={product.name + " alt"}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "scale(1)" : "scale(1.05)",
            transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
          }}
        />

        {/* Corner bag button */}
        <Motion.button
          className="bs-bag-btn"
          onClick={(e) => { e.stopPropagation(); onAdd(product.id); }}
          animate={{ opacity: hovered ? 0 : 1, scale: hovered ? 0.4 : 1, y: hovered ? 10 : 0 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute", bottom: 12, right: 12,
            width: 44, height: 44, borderRadius: "50%",
            background: added ? "#2a7a4a" : "#1a1816",
            border: "none", display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", pointerEvents: hovered ? "none" : "auto",
            transition: "background 0.3s ease",
          }}
        >
          {added ? <TickIcon /> : <BagIcon />}
        </Motion.button>
      </div>

      {/* Product info */}
      <div style={{ paddingTop: 14 }}>
        <p style={{
          fontSize: "0.6rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#1a1816",
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 500,
          marginBottom: 5,
        }}>
          {product.subtitle}
        </p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <p style={{
            fontSize: "0.92rem",
            fontWeight: 500,
            color: "#1a1816",
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: "0.01em",
            margin: 0,
            lineHeight: 1.3,
          }}>
            {product.name}
          </p>
          <p style={{
            fontSize: "0.88rem",
            fontWeight: 600,
            color: "#1a1816",
            fontFamily: "'Outfit', sans-serif",
            margin: 0,
            flexShrink: 0,
            marginLeft: 10,
            letterSpacing: "0.01em",
          }}>
            Rs.{product.price.toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </Motion.div>
  );
}

export default function Bestseller() {
  const [activeTab, setActiveTab] = useState(BESTSELLER_TABS[0].key);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });
  const [added, setAdded] = useState({});
  const [cursorAdded, setCursorAdded] = useState(false);

  const visible = products[activeTab] ?? [];

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
    <section style={{ backgroundColor: "white", width: "100%", fontFamily: "'Outfit', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

        .bs-section { padding: 72px 52px 96px; }
        .bs-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 48px 24px; }
        .bs-tabs {
          display: flex; gap: 0;
          border-bottom: 0.5px solid #e4e0da;
          margin-bottom: 52px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .bs-tabs::-webkit-scrollbar { display: none; }

        @media (max-width: 1024px) {
          .bs-section { padding: 56px 32px 72px; }
          .bs-grid { grid-template-columns: repeat(3, 1fr); gap: 36px 20px; }
        }
        @media (max-width: 640px) {
          .bs-section { padding: 40px 16px 60px; }
          .bs-grid { grid-template-columns: repeat(2, 1fr); gap: 28px 12px; }
          .bs-cursor { display: none !important; }
          .bs-header-row { flex-direction: column !important; align-items: flex-start !important; gap: 4px !important; }
          .bs-mb { margin-bottom: 36px !important; }
        }
        @media (max-width: 360px) {
          .bs-section { padding: 32px 12px 48px; }
          .bs-grid { gap: 20px 10px; }
        }

        /* On touch/mobile: bag button always visible, never hides */
        @media (max-width: 1024px) {
          .bs-bag-btn {
            opacity: 1 !important;
            scale: 1 !important;
            transform: none !important;
            pointer-events: auto !important;
          }
        }
      `}</style>

      {/* Custom cursor */}
      <div className="bs-cursor" style={{
        position: "fixed", top: 0, left: 0,
        pointerEvents: "none", zIndex: 9999,
        transform: `translate(${cursor.x}px, ${cursor.y}px) translate(-50%, -50%)`,
      }}>
        <Motion.div
          animate={{ opacity: cursor.visible ? 1 : 0, scale: cursor.visible ? 1 : 0.3 }}
          transition={{ duration: 0.22, ease: [0.19, 1, 0.22, 1] }}
          style={{
            width: 52, height: 52, borderRadius: "50%",
            background: cursorAdded ? "#2a7a4a" : "#1a1816",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.3s ease",
          }}
        >
          {cursorAdded ? <TickIcon /> : <BagIcon />}
        </Motion.div>
      </div>

      <div className="bs-section" style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* Header */}
        <div className="bs-mb" style={{ marginBottom: 52 }}>
          <p style={{
            fontSize: "0.6rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#1a1816",
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 600,
            marginBottom: 10,
          }}>
            Curated for you
          </p>
          <div className="bs-header-row" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <h2 style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.8rem)",
              fontWeight: 700,
              fontFamily: "'Outfit', sans-serif",
              color: "#1a1816",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              margin: 0,
            }}>
              Best Sellers
            </h2>
            <p style={{
              fontSize: "0.72rem",
              color: "#1a1816",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 400,
              letterSpacing: "0.06em",
              margin: 0,
            }}>
              {visible.length} products
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bs-tabs">
          {BESTSELLER_TABS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              style={{
                background: "none", border: "none",
                borderBottom: activeTab === key ? "1px solid #1a1816" : "1px solid transparent",
                marginBottom: "-0.5px",
                cursor: "pointer",
                padding: "11px 28px 13px",
                fontSize: "0.65rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: activeTab === key ? 600 : 400,
                color: "#1a1816",
                transition: "font-weight 0.2s ease",
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div
          className="bs-grid"
          style={{ cursor: cursor.visible ? "none" : "auto" }}
          onMouseMove={onMouseMove}
        >
          <AnimatePresence mode="popLayout">
            {visible.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onCardEnter={onCardEnter}
                onCardLeave={onCardLeave}
                onAdd={handleAdd}
                added={!!added[product.id]}
              />
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}