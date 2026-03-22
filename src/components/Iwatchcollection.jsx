import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";

// ── Data ────────────────────────────────────────────────────────────────────

const BANNER = {
  image: "/watchband.png",
  eyebrow: "New Arrival",
  title: "iWatch Collection",
  description:
    "Discover the Latest Collection of Premium iWatch Accessories, Including Straps and Cases, Designed for Style and Durability.",
  cta: { label: "Explore More", href: "/collections/watch-bands" },
};

const PRODUCTS = [
  {
    id: 1,
    slug: "alpine-loop-orange",
    image: "/iwatchband11.webp",
    name: "Alpine Loop — Ember",
    price: "$1,299",
    tag: "New",
  },
  {
    id: 2,
    slug: "ocean-band-midnight",
    image: "/iwatchband21.webp",
    name: "Ocean Band — Midnight",
    price: "$999",
    tag: null,
  },
  {
    id: 3,
    slug: "milanese-loop-gold",
    image: "/iwatchband31.webp",
    name: "Milanese Loop — Gold",
    price: "$1,599",
    tag: "Hot",
  },
  {
    id: 4,
    slug: "sport-band-star",
    image: "/iwatchband41.webp",
    name: "Sport Band — Starlight",
    price: "$799",
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

// ── Sub-components ────────────────────────────────────────────────────────────

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
              iWatch Band
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
            {/* Arrow */}
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
              style={{ color: "#78716c" }}
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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600&family=DM+Sans:wght@400;500;600;700&display=swap');

        .iwc-root * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .iwc-root {
          font-family: 'DM Sans', system-ui, sans-serif;
          background: white;
          color: #1c1917;
        }

        /* ── Banner ── */
        .iwc-banner {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: white;
        }
        .iwc-banner-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 520px;
          align-items: center;
        }
        .iwc-banner-img-col {
          position: relative;
          height: 100%;
          min-height: 520px;
          overflow: hidden;
        }
        .iwc-banner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }
        .iwc-banner-content {
          padding: 64px 72px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .iwc-banner-eyebrow {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #a8a29e;
        }
        .iwc-banner-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2.4rem, 4.5vw, 4rem);
          font-weight: 300;
          color: #1c1917;
          line-height: 1.05;
          letter-spacing: -0.02em;
        }
        .iwc-banner-desc {
          font-size: 0.9rem;
          color: #78716c;
          line-height: 1.7;
          max-width: 380px;
          font-weight: 400;
        }
        .iwc-banner-cta {
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
        }
        .iwc-banner-cta:hover {
          background: #1c1917;
          color: #faf9f7;
          gap: 16px;
        }

        /* ── Products section ── */
        .iwc-products {
          padding: 64px 48px 72px;
        }

        .iwc-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        /* ── View All button ── */
        .iwc-viewall-row {
          display: flex;
          justify-content: flex-end;
          margin-top: 36px;
        }
        .iwc-viewall {
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
        .iwc-viewall:hover {
          background: #1c1917;
          color: #faf9f7;
          gap: 16px;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .iwc-products { padding: 52px 32px 60px; }
          .iwc-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
          .iwc-banner-content { padding: 48px 40px; }
        }
        @media (max-width: 768px) {
          .iwc-banner-inner { grid-template-columns: 1fr; }
          .iwc-banner-img-col { min-height: 360px; }
          .iwc-banner-content { padding: 40px 32px; }
        }
        @media (max-width: 640px) {
          .iwc-products { padding: 40px 20px 52px; }
          .iwc-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
        }
        @media (max-width: 380px) {
          .iwc-products { padding: 32px 14px 44px; }
          .iwc-grid { gap: 8px; }
          .iwc-banner-content { padding: 32px 20px; }
        }
      `}</style>

      <div className="iwc-root">
        {/* ── BANNER ── */}
        <div className="iwc-banner">
          <div className="iwc-banner-inner">
            {/* Left: image */}
            <motion.div
              className="iwc-banner-img-col"
              variants={bannerVariants}
              initial="hidden"
              animate="visible"
            >
              <img
                src={BANNER.image}
                alt="iWatch Collection"
                className="iwc-banner-img"
              />
            </motion.div>

            {/* Right: content */}
            <div className="iwc-banner-content">
              <motion.p
                className="iwc-banner-eyebrow"
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
                className="iwc-banner-title"
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
                className="iwc-banner-desc"
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
                <Link to={BANNER.cta.href} className="iwc-banner-cta">
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
          </div>
        </div>

        {/* ── PRODUCTS GRID ── */}
        <div className="iwc-products">
          <div className="iwc-grid" ref={gridRef}>
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
            className="iwc-viewall-row"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link to="/collections/watch-bands" className="iwc-viewall">
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
