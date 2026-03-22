import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";

// ── Data ────────────────────────────────────────────────────────────────────

const BANNER = {
  image: "/phonewallet.jpeg",
  eyebrow: "Carry Smarter",
  title: "Phone Wallet Collection",
  description:
    "Slim, structured, and effortlessly refined — our phone wallets merge everyday carry with understated luxury. Card slots, cash pockets, and magnetic closures, all in one.",
  cta: { label: "Explore More", href: "/collections/phone-wallets" },
};

const PRODUCTS = [
  {
    id: 1,
    slug: "folio-wallet-tan",
    image: "/wallet1.webp",
    name: "Folio Wallet — Tan",
    price: "$1,499",
    tag: "New",
  },
  {
    id: 2,
    slug: "slim-wallet-onyx",
    image: "/wallet2.jpeg",
    name: "Slim Wallet — Onyx",
    price: "$1,199",
    tag: null,
  },
  {
    id: 3,
    slug: "magnetic-wallet-sand",
    image: "/wallet3.jpg",
    name: "Magnetic Wallet — Sand",
    price: "$999",
    tag: "Hot",
  },
  {
    id: 4,
    slug: "bifold-wallet-mocha",
    image: "/wallet4.jpeg",
    name: "Bifold Wallet — Mocha",
    price: "$1,699",
    tag: null,
  },
];

// ── Variants ─────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 },
  }),
};

const bannerVariants = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── ProductCard ───────────────────────────────────────────────────────────────

function ProductCard({ product, index }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="group relative cursor-pointer"
    >
      <Link to={`/products/${product.slug}`} className="block no-underline">
        {/* Image wrapper */}
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: "3/4", background: "white" }}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out"
            style={{ transform: "scale(1)", willChange: "transform" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.06)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />

          {/* Tag badge */}
          {product.tag && (
            <span
              className="absolute top-3 left-3 text-white font-bold tracking-widest uppercase"
              style={{
                fontSize: "9px",
                background: "#1c1917",
                padding: "4px 8px",
                letterSpacing: "0.18em",
              }}
            >
              {product.tag}
            </span>
          )}

          {/* Quick CTA — slides up on hover */}
          <div
            className="absolute bottom-0 left-0 right-0 flex items-center justify-center transition-transform duration-300 ease-out group-hover:translate-y-0"
            style={{
              background: "rgba(28,25,23,0.88)",
              padding: "13px 0",
              transform: "translateY(100%)",
              backdropFilter: "blur(4px)",
            }}
          >
            <span
              className="text-white uppercase tracking-widest font-semibold"
              style={{ fontSize: "10px", letterSpacing: "0.22em" }}
            >
              Quick View
            </span>
          </div>
        </div>

        {/* Caption */}
        <div
          className="flex items-start justify-between gap-3"
          style={{ padding: "16px 2px 0" }}
        >
          <div className="flex flex-col gap-[3px]">
            <span
              className="font-semibold uppercase tracking-widest text-stone-400"
              style={{ fontSize: "9px", letterSpacing: "0.18em" }}
            >
              Phone Wallet
            </span>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
                fontWeight: 400,
                color: "#1c1917",
                lineHeight: 1.25,
                letterSpacing: "-0.01em",
              }}
            >
              {product.name}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <span
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.05rem",
                fontWeight: 600,
                color: "#1c1917",
              }}
            >
              {product.price}
            </span>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#78716c"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-200 group-hover:translate-x-1"
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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600&family=DM+Sans:wght@400;500;600;700&display=swap');

        .pwc-root * { box-sizing: border-box; margin: 0; padding: 0; }

        .pwc-root {
          font-family: 'DM Sans', system-ui, sans-serif;
          background: white;
          color: #1c1917;
        }

        /* ── Banner ── */
        .pwc-banner {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: white;
        }
        .pwc-banner-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 520px;
          align-items: center;
        }

        /* content LEFT, image RIGHT — mirror of iWatch */
        .pwc-banner-content {
          padding: 64px 72px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          order: 1;
        }
        .pwc-banner-img-col {
          position: relative;
          height: 100%;
          min-height: 520px;
          overflow: hidden;
          order: 2;
        }
        .pwc-banner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        .pwc-banner-eyebrow {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #a8a29e;
        }
        .pwc-banner-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2.4rem, 4.5vw, 4rem);
          font-weight: 300;
          color: #1c1917;
          line-height: 1.05;
          letter-spacing: -0.02em;
        }
        .pwc-banner-desc {
          font-size: 0.9rem;
          color: #78716c;
          line-height: 1.7;
          max-width: 380px;
          font-weight: 400;
        }
        .pwc-banner-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 8px;
          text-decoration: none;
          border: 1.5px solid #1c1917;
          padding: 13px 26px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #1c1917;
          background: transparent;
          transition: background 0.25s ease, color 0.25s ease, gap 0.25s ease;
          width: fit-content;
          font-family: 'DM Sans', sans-serif;
        }
        .pwc-banner-cta:hover {
          background: #1c1917;
          color: #faf9f7;
          gap: 16px;
        }

        /* ── Products ── */
        .pwc-products {
          padding: 64px 48px 72px;
        }
        .pwc-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        /* ── View All ── */
        .pwc-viewall-row {
          display: flex;
          justify-content: flex-end;
          margin-top: 36px;
        }
        .pwc-viewall {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          border: 1.5px solid #1c1917;
          padding: 12px 22px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #1c1917;
          background: transparent;
          transition: background 0.22s ease, color 0.22s ease, gap 0.22s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .pwc-viewall:hover {
          background: #1c1917;
          color: #faf9f7;
          gap: 16px;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .pwc-products { padding: 52px 32px 60px; }
          .pwc-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
          .pwc-banner-content { padding: 48px 40px; }
        }
        @media (max-width: 768px) {
          .pwc-banner-inner { grid-template-columns: 1fr; }
          .pwc-banner-img-col { min-height: 360px; order: 1; }
          .pwc-banner-content { order: 2; padding: 40px 32px; }
        }
        @media (max-width: 640px) {
          .pwc-products { padding: 40px 20px 52px; }
          .pwc-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
        }
        @media (max-width: 380px) {
          .pwc-products { padding: 32px 14px 44px; }
          .pwc-grid { gap: 8px; }
          .pwc-banner-content { padding: 32px 20px; }
        }
      `}</style>

      <div className="pwc-root">
        {/* ── BANNER ── */}
        <div className="pwc-banner">
          <div className="pwc-banner-inner">
            {/* Left: content */}
            <div className="pwc-banner-content">
              <motion.p
                className="pwc-banner-eyebrow"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {BANNER.eyebrow}
              </motion.p>

              <motion.h1
                className="pwc-banner-title"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {BANNER.title}
              </motion.h1>

              <motion.p
                className="pwc-banner-desc"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {BANNER.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.68,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link to={BANNER.cta.href} className="pwc-banner-cta">
                  {BANNER.cta.label}
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            </div>

            {/* Right: image */}
            <motion.div
              className="pwc-banner-img-col"
              variants={bannerVariants}
              initial="hidden"
              animate="visible"
            >
              <img
                src={BANNER.image}
                alt="Phone Wallet Collection"
                className="pwc-banner-img"
              />
            </motion.div>
          </div>
        </div>

        {/* ── PRODUCTS GRID ── */}
        <div className="pwc-products">
          <div className="pwc-grid" ref={gridRef}>
            {PRODUCTS.map((product, i) =>
              inView ? (
                <ProductCard key={product.id} product={product} index={i} />
              ) : (
                <div
                  key={product.id}
                  style={{
                    aspectRatio: "3/4",
                    background: "white",
                    opacity: 0,
                  }}
                />
              ),
            )}
          </div>

          {/* View All */}
          <motion.div
            className="pwc-viewall-row"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link to="/collections/phone-wallets" className="pwc-viewall">
              View All
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
