import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Your 4 hero images ──────────────────────────────────────────────────────
const SLIDES = ["/hero11.webp", "/hero12.webp", "/hero13.webp", "/hero14.webp"];
// ─────────────────────────────────────────────────────────────────────────────

// Match these to your Navbar height exactly
const NB_DESKTOP = 70; // px
const NB_MOBILE = 64; // px

const DURATION = 3000;

const variants = {
  enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%" }),
  center: { x: "0%", transition: { duration: 0.75, ease: [0.77, 0, 0.18, 1] } },
  exit: (dir) => ({
    x: dir > 0 ? "-100%" : "100%",
    transition: { duration: 0.75, ease: [0.77, 0, 0.18, 1] },
  }),
};

export default function Hero() {
  const [[cur, dir], setCur] = useState([0, 0]);
  const timerRef = useRef(null);
  const paused = useRef(false);

  const startAuto = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!paused.current) setCur(([c]) => [(c + 1) % SLIDES.length, 1]);
    }, DURATION);
  }, []);

  useEffect(() => {
    startAuto();
    return () => clearInterval(timerRef.current);
  }, [startAuto]);

  const goTo = (next) => setCur(([c]) => [next, next > c ? 1 : -1]);
  const prev = () =>
    setCur(([c]) => [(c - 1 + SLIDES.length) % SLIDES.length, -1]);
  const next = () => setCur(([c]) => [(c + 1) % SLIDES.length, 1]);

  return (
    <>
      <style>{`
        .ch-hero-wrap {
          /* sit directly below the fixed navbar */
          padding-top: ${NB_DESKTOP}px;
          height: 100svh;
          box-sizing: border-box;
          background: #000;
        }
        @media (max-width: 767px) {
          .ch-hero-wrap { padding-top: ${NB_MOBILE}px; }
        }

        .ch-hero {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #000;
        }

        /* Always-visible arrow buttons */
        .ch-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 20;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.32);
          border: 1px solid rgba(255, 255, 255, 0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.25s ease, border-color 0.25s ease, transform 0.2s ease;
        }
        .ch-arrow:hover {
          background: rgba(0, 0, 0, 0.60);
          border-color: rgba(255, 255, 255, 0.50);
          transform: translateY(-50%) scale(1.08);
        }
        .ch-arrow:active { transform: translateY(-50%) scale(0.95); }
        .ch-arrow-l { left: 20px; }
        .ch-arrow-r { right: 20px; }

        .ch-dots {
          position: absolute;
          bottom: 22px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .ch-dot {
          width: 6px; height: 6px; border-radius: 50%;
          border: none; padding: 0; cursor: pointer;
          transition: all 0.35s ease;
        }
      `}</style>

      {/* Wrapper pushes content below fixed navbar */}
      <div className="ch-hero-wrap">
        <div
          className="ch-hero"
          onMouseEnter={() => {
            paused.current = true;
          }}
          onMouseLeave={() => {
            paused.current = false;
          }}
        >
          {/* Slides */}
          <AnimatePresence initial={false} custom={dir} mode="sync">
            <motion.div
              key={cur}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{
                position: "absolute",
                inset: 0,
                willChange: "transform",
              }}
            >
              <img
                src={SLIDES[cur]}
                alt=""
                draggable={false}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  userSelect: "none",
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Left arrow */}
          <button
            className="ch-arrow ch-arrow-l"
            onClick={prev}
            aria-label="Previous slide"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Right arrow */}
          <button
            className="ch-arrow ch-arrow-r"
            onClick={next}
            aria-label="Next slide"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Dots */}
          <div className="ch-dots">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                className="ch-dot"
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                style={{
                  background:
                    i === cur
                      ? "rgba(255,255,255,0.95)"
                      : "rgba(255,255,255,0.32)",
                  transform: i === cur ? "scale(1.35)" : "scale(1)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
