import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DEVICES } from "../data/products";

const BRANDS = [
  { id: "iphone", label: "iPhone", icon: "🍎" },
  { id: "samsung", label: "Samsung", icon: "🔵" },
  { id: "pixel", label: "Pixel", icon: "🟢" },
];

const CATEGORY_SLUGS = {
  iphone: "iphone-cases",
  samsung: "samsung-cases",
  pixel: "pixel-cases",
};

export default function DeviceFinder() {
  const [brand, setBrand] = useState("iphone");
  const [model, setModel] = useState("");
  const navigate = useNavigate();

  const devices = DEVICES[brand] || [];

  const handleShop = () => {
    if (!model) return;
    navigate(
      `/collections/${CATEGORY_SLUGS[brand]}?device=${encodeURIComponent(model)}`,
    );
  };

  return (
    <>
      <style>{`
        .df-section {
          --df-bg: #f5f0e8;
          --df-leather: rgba(139, 90, 43, 0.04);
          --df-border: rgba(139, 90, 43, 0.12);
          --df-accent: #b45309;
          --df-accent-hover: #92400a;
          --df-control-h: 44px;
          background: var(--df-bg);
          background-image:
            linear-gradient(120deg, var(--df-leather) 0%, transparent 50%),
            linear-gradient(240deg, var(--df-leather) 0%, transparent 50%),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(139, 90, 43, 0.03) 2px,
              rgba(139, 90, 43, 0.03) 3px
            );
          padding: 56px 24px;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          border-top: 1px solid var(--df-border);
          border-bottom: 1px solid var(--df-border);
          transition: box-shadow 0.35s ease, transform 0.35s ease;
        }
        .df-section:hover {
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.6), 0 4px 24px rgba(139, 90, 43, 0.06);
        }
        .df-inner {
          max-width: 800px; margin: 0 auto; text-align: center;
        }
        .df-eyebrow {
          font-size: 10px; font-weight: 700; letter-spacing: 0.28em;
          text-transform: uppercase; color: var(--df-accent);
          margin-bottom: 12px; display: block;
        }
        .df-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.6rem, 4vw, 2.2rem);
          font-weight: 400; color: #1c1917;
          margin: 0 0 8px; letter-spacing: -0.02em;
        }
        .df-sub {
          font-size: 14px; color: #57534e;
          margin: 0 0 32px;
        }
        .df-row {
          display: flex; align-items: center; justify-content: center;
          gap: 12px; flex-wrap: wrap;
        }

        /* Brand tabs — same height as select & button */
        .df-brands {
          display: flex; align-items: center; gap: 4px;
          height: var(--df-control-h);
          background: rgba(139, 90, 43, 0.06);
          border: 1px solid var(--df-border);
          border-radius: 8px;
          padding: 0 5px;
          transition: background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .df-brands:hover {
          background: rgba(139, 90, 43, 0.08);
          box-shadow: 0 2px 12px rgba(139, 90, 43, 0.06);
        }
        .df-brand-btn {
          height: calc(var(--df-control-h) - 8px);
          padding: 0 18px; border: none; border-radius: 6px;
          background: transparent; color: #57534e;
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 600;
          letter-spacing: 0.04em; cursor: pointer;
          transition: all 0.22s ease; white-space: nowrap;
          display: inline-flex; align-items: center; justify-content: center;
          box-sizing: border-box;
        }
        .df-brand-btn.active {
          background: #fff; color: #1c1917;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        }
        .df-brand-btn:not(.active):hover {
          color: #1c1917;
          background: rgba(255,255,255,0.6);
        }

        /* Model select — same height as row */
        .df-select-wrap {
          position: relative; min-width: 220px;
          height: var(--df-control-h);
          transition: transform 0.2s ease;
        }
        .df-select-wrap:focus-within { transform: translateY(-1px); }
        .df-select {
          appearance: none; -webkit-appearance: none;
          width: 100%; height: 100%;
          padding: 0 40px 0 16px;
          background: rgba(255,255,255,0.85);
          border: 1px solid var(--df-border);
          border-radius: 8px; color: #1c1917;
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px;
          line-height: var(--df-control-h);
          cursor: pointer; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          box-sizing: border-box;
        }
        .df-select:hover {
          background: #fff;
          border-color: rgba(139, 90, 43, 0.2);
          box-shadow: 0 2px 8px rgba(139, 90, 43, 0.06);
        }
        .df-select:focus { border-color: var(--df-accent); box-shadow: 0 0 0 3px rgba(180, 83, 9, 0.15); }
        .df-select option { background: #f5f0e8; color: #1c1917; }
        .df-chevron {
          position: absolute; right: 14px; top: 50%;
          transform: translateY(-50%); pointer-events: none;
          color: #78716c; width: 14px; height: 14px;
        }

        /* CTA — same height, aligned with others */
        .df-btn {
          height: var(--df-control-h);
          padding: 0 24px;
          background: var(--df-accent); color: #fff; border: none; border-radius: 8px;
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 11px;
          font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
          cursor: pointer; white-space: nowrap;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          box-sizing: border-box;
        }
        .df-btn:hover:not(:disabled) {
          background: var(--df-accent-hover);
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(180, 83, 9, 0.35);
        }
        .df-btn:active:not(:disabled) { transform: translateY(0); }
        .df-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .df-btn svg { width: 14px; height: 14px; flex-shrink: 0; }

        @media (max-width: 600px) {
          .df-row { flex-direction: column; align-items: stretch; max-width: 340px; margin: 0 auto; }
          .df-brands { justify-content: center; }
          .df-select-wrap, .df-btn { width: 100%; }
          .df-btn { justify-content: center; }
        }
      `}</style>

      <section className="df-section">
        <div className="df-inner">
          <span className="df-eyebrow">Smart Shopping</span>
          <h2 className="df-title">Find cases for your device</h2>
          <p className="df-sub">
            Select your brand and model — we'll show you perfect-fit cases.
          </p>

          <div className="df-row">
            {/* Brand selector */}
            <div className="df-brands">
              {BRANDS.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  className={`df-brand-btn ${brand === b.id ? "active" : ""}`}
                  onClick={() => {
                    setBrand(b.id);
                    setModel("");
                  }}
                >
                  {b.label}
                </button>
              ))}
            </div>

            {/* Model selector */}
            <div className="df-select-wrap">
              <select
                className="df-select"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              >
                <option value="">Select model</option>
                {devices.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
              <svg
                className="df-chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>

            {/* Shop button */}
            <button
              type="button"
              className="df-btn"
              onClick={handleShop}
              disabled={!model}
            >
              Shop Cases
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
      </section>
    </>
  );
}
