import { Link } from "react-router-dom";

// ── Update filenames to match your /public folder ─────────────────────────────
const DEVICES = [
  {
    label: "Apple",
    sub: "iPhone cases",
    href: "/collections/iphone-cases",
    img: "/apple.png",
  },
  {
    label: "Samsung",
    sub: "Galaxy cases",
    href: "/collections/samsung-cases",
    img: "/samsung.png",
  },
  {
    label: "Google",
    sub: "Pixel cases",
    href: "/collections/pixel-cases",
    img: "/google.png",
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function ShopByDevice() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

        .sbd-section {
          padding: 3.5rem 1rem 3rem;
          text-align: center;
          font-family: 'Outfit', sans-serif;
        }
        .sbd-eyebrow {
          font-family: 'Outfit', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #aaa8a5;
          margin: 0 0 0.4rem;
        }
        .sbd-title {
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #1a1816;
          margin: 0 0 2.75rem;
        }
        .sbd-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4rem;
          flex-wrap: wrap;
        }
        .sbd-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.9rem;
          text-decoration: none;
          cursor: pointer;
        }
        .sbd-circle {
          width: 160px;
          height: 160px;
          border-radius: 50%;
          border: 1px solid rgba(0,0,0,0.08);
          overflow: hidden;
          transition: border-color 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          box-sizing: border-box;
        }
        .sbd-circle img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          display: block;
        }
        .sbd-item:hover .sbd-circle {
          border-color: rgba(0,0,0,0.18);
          transform: translateY(-4px);
          box-shadow: 0 10px 28px rgba(0,0,0,0.07);
        }
        .sbd-label {
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: #1a1816;
          margin: 0;
        }
        .sbd-sub {
          font-family: 'Outfit', sans-serif;
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0.03em;
          color: #aaa8a5;
          margin: -0.4rem 0 0;
        }
        @media (max-width: 600px) {
          .sbd-row { gap: 2rem; }
          .sbd-circle { width: 110px; height: 110px; padding: 12px; }
          .sbd-label { font-size: 13px; }
          .sbd-sub { font-size: 11px; }
        }
      `}</style>

      <section className="sbd-section">
        <p className="sbd-eyebrow">Browse by brand</p>
        <p className="sbd-title">Shop by device</p>
        <div className="sbd-row">
          {DEVICES.map(({ label, sub, href, img }) => (
            <Link key={label} to={href} className="sbd-item">
              <div className="sbd-circle">
                <img src={img} alt={label} />
              </div>
              <p className="sbd-label">{label}</p>
              <p className="sbd-sub">{sub}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}