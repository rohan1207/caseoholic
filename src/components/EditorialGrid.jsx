import { Link } from 'react-router-dom'

const CELLS = [
  {
    id: "top-left",
    eyebrow: "Phone Cases",
    headline: "Better with\nprotection",
    cta: "Find your next case",
    href: "/collections/phone-cases",
    image: "/product5.webp",
  },
  {
    id: "top-right",
    eyebrow: "New Arrivals",
    headline: "Become a leader\nof the pack",
    cta: "Shop New Arrivals",
    href: "/collections/all",
    image: "/product1_1.webp",
  },
  {
    id: "bottom-left",
    eyebrow: "Leather Series",
    headline: "Aged to\nperfection",
    cta: "Shop Heritage Collection",
    href: "/collections/phone-cases",
    image: "/product6.webp",
  },
  {
    id: "bottom-right",
    eyebrow: "Watch Bands",
    headline: "Elevate every\nday",
    cta: "Shop Watch Bands",
    href: "/collections/watch-bands",
    image: "/product7.webp",
  },
]

export default function EditorialGrid() {
  return (
    <>
      <style>{`
        .eg-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          width: 100%;
          min-height: 50vh;
          gap: 0;
          background: #fafaf9;
        }

        .eg-cell {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          min-height: 360px;
        }

        .eg-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .eg-cell:hover .eg-img {
          transform: scale(1.05);
        }

        .eg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.72) 0%,
            rgba(0, 0, 0, 0.22) 45%,
            rgba(0, 0, 0, 0.02) 75%
          );
          z-index: 2;
          pointer-events: none;
          transition: background 0.35s ease;
        }
        .eg-cell:hover .eg-overlay {
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.82) 0%,
            rgba(0, 0, 0, 0.32) 50%,
            rgba(0, 0, 0, 0.04) 78%
          );
        }

        .eg-text {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 3;
          padding: 0 32px 32px;
        }

        .eg-eyebrow {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.55);
          margin: 0 0 8px;
        }

        .eg-headline {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 400;
          font-size: clamp(1.5rem, 2.8vw, 2.25rem);
          color: #fff;
          margin: 0 0 14px;
          line-height: 1.12;
          letter-spacing: -0.02em;
          white-space: pre-line;
        }

        .eg-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.82);
          text-decoration: none;
          transition: color 0.25s ease, gap 0.25s ease;
        }
        .eg-cell:hover .eg-cta {
          color: #fff;
          gap: 12px;
        }
        .eg-cta svg {
          width: 12px;
          height: 12px;
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }
        .eg-cell:hover .eg-cta svg {
          transform: translateX(2px);
        }

        @media (max-width: 767px) {
          .eg-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            min-height: 0;
          }
          .eg-cell {
            min-height: 320px;
            aspect-ratio: 4 / 3;
          }
          .eg-text {
            padding: 0 24px 24px;
          }
          .eg-headline {
            font-size: clamp(1.35rem, 5vw, 1.75rem);
          }
        }

        @media (max-width: 480px) {
          .eg-cell {
            min-height: 280px;
          }
        }
      `}</style>

      <section className="eg-grid" aria-label="Editorial collection">
        {CELLS.map((cell) => (
          <Link key={cell.id} to={cell.href ?? '/collections/all'} className="eg-cell">
            <img
              src={cell.image}
              alt={cell.headline.replace(/\n/g, ' ')}
              className="eg-img"
              loading="lazy"
            />
            <div className="eg-overlay" aria-hidden="true" />
            <div className="eg-text">
              <p className="eg-eyebrow">{cell.eyebrow}</p>
              <h2 className="eg-headline">{cell.headline}</h2>
              <span className="eg-cta">
                {cell.cta}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </section>
    </>
  )
}
