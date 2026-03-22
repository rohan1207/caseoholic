import { useState, useRef } from "react";
import { Link } from "react-router-dom";

const PRODUCTS = [
  {
    id: 1,
    collection: "Festive",
    name: "Happiness Rides In",
    variant: "Amber",
    image: "/spectra.webp",
    bg: "#d4845a",
  },
  {
    id: 2,
    collection: "Festive",
    name: "Happiness Rides In",
    variant: "Indigo",
    image: "/spectra2.webp",
    bg: "#2e6e8e",
  },
  {
    id: 3,
    collection: "Essential",
    name: "Caseoholic Monogram",
    variant: "Golden Green",
    image: "/spectra3.webp",
    bg: "#7a5c3a",
  },
  {
    id: 4,
    collection: "Essential",
    name: "Caseoholic Monogram",
    variant: "Golden Red",
    image: "/spectra4.webp",
    bg: "#c5c8c2",
  },
  {
    id: 5,
    collection: "Signature",
    name: "Carbon Weave",
    variant: "Midnight Black",
    image: "/spectra5.webp",
    bg: "#1a1a2e",
  },
  {
    id: 6,
    collection: "Signature",
    name: "Carbon Weave",
    variant: "Rose Gold",
    image: "/spectra6.webp",
    bg: "#b5836a",
  },
];

export default function ExploreStyles() {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.72;
    scrollRef.current.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  /* Drag-to-scroll */
  const onMouseDown = (e) => {
    setIsDragging(false);
    dragStart.current = {
      x: e.pageX - scrollRef.current.offsetLeft,
      scrollLeft: scrollRef.current.scrollLeft,
    };
    scrollRef.current.style.cursor = "grabbing";
    scrollRef.current.style.userSelect = "none";

    const onMouseMove = (ev) => {
      const dx = ev.pageX - scrollRef.current.offsetLeft - dragStart.current.x;
      if (Math.abs(dx) > 4) setIsDragging(true);
      scrollRef.current.scrollLeft = dragStart.current.scrollLeft - dx;
    };
    const onMouseUp = () => {
      scrollRef.current.style.cursor = "grab";
      scrollRef.current.style.userSelect = "";
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

        .es-section {
          background: #fafaf9;
          padding: 80px 0 0;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Header row ── */
        .es-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding: 0 48px 44px;
          gap: 24px;
        }

        .es-eyebrow {
          margin: 0 0 10px;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #b0aca7;
        }

        .es-title {
          margin: 0 0 6px;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.9rem, 3.5vw, 2.8rem);
          font-weight: 500;
          color: #1c1917;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        .es-title em {
          font-style: italic;
          color: #1c1917;
        }

        .es-sub {
          margin: 0;
          font-size: 13px;
          font-weight: 300;
          color: #7a7772;
          line-height: 1.65;
          max-width: 380px;
        }

        /* Right-side controls */
        .es-controls {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-shrink: 0;
          padding-bottom: 4px;
        }

        .es-viewall {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #1c1917;
          text-decoration: none;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
          transition: gap 0.25s ease, opacity 0.25s ease;
        }
        .es-viewall:hover {
          gap: 12px;
          opacity: 0.55;
        }
        .es-viewall svg {
          width: 13px;
          height: 13px;
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }
        .es-viewall:hover svg {
          transform: translateX(2px);
        }

        .es-arrows {
          display: flex;
          gap: 6px;
        }
        .es-arrow {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(0,0,0,0.12);
          background: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #7a7772;
          padding: 0;
          transition: all 0.22s ease;
          flex-shrink: 0;
        }
        .es-arrow svg {
          width: 15px;
          height: 15px;
        }
        .es-arrow:hover {
          background: #1c1917;
          border-color: #1c1917;
          color: #fff;
        }

        /* ── Scroll track ── */
        .es-track {
          display: flex;
          gap: 3px;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          cursor: grab;
        }
        .es-track::-webkit-scrollbar { display: none; }

        /* ── Card ── */
        .es-card {
          flex: 0 0 calc(25% - 3px);
          min-width: 240px;
          position: relative;
          aspect-ratio: 3 / 4.2;
          overflow: hidden;
          cursor: pointer;
        }

        .es-card-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform;
        }
        .es-card:hover .es-card-img {
          transform: scale(1.06);
        }

        /* Top-to-mid gradient for text legibility */
        .es-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.55) 0%,
            rgba(0, 0, 0, 0.08) 45%,
            rgba(0, 0, 0, 0.0) 60%,
            rgba(0, 0, 0, 0.35) 100%
          );
          z-index: 1;
          pointer-events: none;
          transition: background 0.4s ease;
        }
        .es-card:hover .es-card-overlay {
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.62) 0%,
            rgba(0, 0, 0, 0.1) 48%,
            rgba(0, 0, 0, 0.0) 62%,
            rgba(0, 0, 0, 0.42) 100%
          );
        }

        /* Card text — top */
        .es-card-text {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 2;
          padding: 22px 20px;
        }

        .es-card-collection {
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.58);
          margin: 0 0 6px;
          font-family: 'DM Sans', sans-serif;
        }

        .es-card-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1rem, 1.4vw, 1.2rem);
          font-weight: 500;
          color: #fff;
          margin: 0 0 3px;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }

        .es-card-variant {
          font-size: 11px;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.62);
          margin: 0;
          letter-spacing: 0.04em;
          font-family: 'DM Sans', sans-serif;
        }

        /* Discover CTA — bottom of card */
        .es-discover {
          position: absolute;
          bottom: 20px;
          left: 20px;
          z-index: 3;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.35);
          border-radius: 2px;
          padding: 9px 18px;
          font-family: 'DM Sans', sans-serif;
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.3s ease, transform 0.3s ease,
            background 0.25s ease, border-color 0.25s ease;
        }
        .es-card:hover .es-discover {
          opacity: 1;
          transform: translateY(0);
        }
        .es-discover:hover {
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.7);
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .es-card {
            flex: 0 0 calc(33.333% - 3px);
          }
        }

        @media (max-width: 767px) {
          .es-section {
            padding: 52px 0 0;
          }
          .es-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
            padding: 0 20px 32px;
          }
          .es-controls {
            width: 100%;
            justify-content: space-between;
          }
          .es-card {
            flex: 0 0 80vw;
            min-width: 0;
          }
          .es-discover {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 480px) {
          .es-card {
            flex: 0 0 88vw;
          }
        }
      `}</style>

      <section className="es-section">
        {/* ── Header ── */}
        <div className="es-header">
          <div>
            <p className="es-eyebrow">Curated for you</p>
            <h2 className="es-title">Explore Styles</h2>
            <p className="es-sub">
              Premium cases crafted from aramid fibre — protection, elegance,
              and a refined texture built to last.
            </p>
          </div>

          <div className="es-controls">
            <div className="es-arrows">
              <button
                type="button"
                className="es-arrow"
                aria-label="Scroll left"
                onClick={() => scroll(-1)}
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
                className="es-arrow"
                aria-label="Scroll right"
                onClick={() => scroll(1)}
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
            <Link to="/collections/all" className="es-viewall">
              View All
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
            </Link>
          </div>
        </div>

        {/* ── Scroll track ── */}
        <div className="es-track" ref={scrollRef} onMouseDown={onMouseDown}>
          {PRODUCTS.map((p) => (
            <div
              key={p.id}
              className="es-card"
              style={{ backgroundColor: p.bg }}
              onClick={(e) => {
                if (isDragging) e.preventDefault();
              }}
            >
              <img
                src={p.image}
                alt={`${p.collection} — ${p.name} ${p.variant}`}
                className="es-card-img"
                draggable="false"
                loading="lazy"
              />

              <div className="es-card-overlay" />

              <div className="es-card-text">
                <p className="es-card-collection">{p.collection}</p>
                <p className="es-card-name">{p.name}</p>
                <p className="es-card-variant">{p.variant}</p>
              </div>

              <button
                className="es-discover"
                type="button"
                onClick={(e) => isDragging && e.stopPropagation()}
              >
                Discover
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
