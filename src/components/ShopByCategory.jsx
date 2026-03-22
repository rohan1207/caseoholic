import { Link } from "react-router-dom";

const CATEGORIES = [
  {
    id: 1,
    slug: "phone-cases",
    name: "Phone Covers & Cases",
    image: "/product1_1.webp",
    count: "120+ styles",
  },
  {
    id: 2,
    slug: "phone-wallets",
    name: "Phone Wallets",
    image: "/wallet.webp",
    count: "40+ styles",
  },
  {
    id: 3,
    slug: "airpods-cases",
    name: "Airpods Cases",
    image: "/airpods.png",
    count: "60+ styles",
  },
  {
    id: 4,
    slug: "watch-bands",
    name: "Watch Bands",
    image: "/bands.avif",
    count: "50+ styles",
  },
];

export default function ShopByCategory() {
  return (
    <>
      <style>{`
        .sbc-section {
          padding: 80px 48px 88px;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          overflow-x: hidden;
        }

        /* ── Header ── */
        .sbc-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 44px;
          gap: 24px;
        }

        .sbc-eyebrow {
          margin: 0 0 10px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #a8a29e;
        }

        .sbc-title {
          margin: 0;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.9rem, 3.5vw, 2.8rem);
          font-weight: 400;
          color: #1c1917;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        .sbc-title em {
          font-style: normal;
          color: #b45309;
        }

        .sbc-viewall {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #1c1917;
          text-decoration: none;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          font-family: 'Plus Jakarta Sans', sans-serif;
          white-space: nowrap;
          flex-shrink: 0;
          transition: gap 0.25s ease, opacity 0.25s ease;
        }
        .sbc-viewall:hover {
          gap: 13px;
          opacity: 0.7;
        }
        .sbc-viewall svg {
          width: 14px;
          height: 14px;
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }
        .sbc-viewall:hover svg {
          transform: translateX(2px);
        }

        /* ── 4-col grid ── */
        .sbc-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        /* ── Card ── */
        .sbc-card {
          display: block;
          text-decoration: none;
          position: relative;
          cursor: pointer;
        }

        .sbc-card-img-wrap {
          position: relative;
          aspect-ratio: 3 / 4;
          overflow: hidden;
        }

        .sbc-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .sbc-card:hover .sbc-card-img {
          transform: scale(1.06);
        }

        /* Caption below image — no overlay, minimal & premium */
        .sbc-card-body {
          padding: 18px 4px 0;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }

        .sbc-card-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .sbc-card-count {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #a8a29e;
        }

        .sbc-card-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.05rem, 1.5vw, 1.25rem);
          font-weight: 400;
          color: #1c1917;
          line-height: 1.25;
          letter-spacing: -0.01em;
        }

        .sbc-card-arrow {
          flex-shrink: 0;
          color: #78716c;
          margin-top: 2px;
          transition: color 0.2s ease, transform 0.2s ease;
        }
        .sbc-card-arrow svg {
          width: 14px;
          height: 14px;
        }
        .sbc-card:hover .sbc-card-arrow {
          color: #1c1917;
          transform: translateX(2px);
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .sbc-section {
            padding: 64px 32px 72px;
          }
          .sbc-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
          }
        }

        @media (max-width: 640px) {
          .sbc-section {
            padding: 52px 20px 60px;
          }
          .sbc-header {
            margin-bottom: 32px;
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .sbc-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          .sbc-card-body {
            padding: 14px 2px 0;
          }
          .sbc-card-name {
            font-size: 1rem;
          }
          .sbc-card-count {
            font-size: 9px;
          }
        }

        @media (max-width: 380px) {
          .sbc-section {
            padding: 40px 16px 48px;
          }
          .sbc-grid {
            gap: 8px;
          }
        }
      `}</style>

      <section className="sbc-section">
        {/* ── Header ── */}
        <div className="sbc-header">
          <div>
            <p className="sbc-eyebrow">What are you looking for?</p>
            <h2 className="sbc-title">
              Shop by <em>Category</em>
            </h2>
          </div>
          <Link to="/collections/all" className="sbc-viewall">
            View All
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* ── Grid ── */}
        <div className="sbc-grid">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/collections/${cat.slug}`}
              className="sbc-card"
              aria-label={`Shop ${cat.name}`}
            >
              <div className="sbc-card-img-wrap">
                <img
                  src={cat.image}
                  alt=""
                  className="sbc-card-img"
                  loading="lazy"
                />
              </div>
              <div className="sbc-card-body">
                <div className="sbc-card-info">
                  <span className="sbc-card-count">{cat.count}</span>
                  <span className="sbc-card-name">{cat.name}</span>
                </div>
                <div className="sbc-card-arrow" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
