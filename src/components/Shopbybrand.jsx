import { Link } from 'react-router-dom'

// ── Update filenames to match your /public folder ─────────────────────────────
const BRANDS = [
  { label: 'Youngkit',   sub: 'Shop collection', href: '#',   img: '/youngkit.avif'   },
  { label: 'Benks',      sub: 'Shop collection', href: '#',      img: '/benks.avif'      },
  { label: 'Nimmy',      sub: 'Shop collection', href: '#',      img: '/nimmy.avif'      },
  { label: 'Luxo Life',  sub: 'Shop collection', href: '#',  img: '/luxo.webp'   },
]
// ─────────────────────────────────────────────────────────────────────────────

export default function ShopByBrand() {
  return (
    <>
      <style>{`
        .sbb-section {
          padding: 3.5rem 1rem 3rem;
          text-align: center;
          font-family: 'DM Sans', sans-serif;
        }
        .sbb-eyebrow {
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #9c9890;
          margin: 0 0 0.4rem;
        }
        .sbb-title {
          font-size: 12.5px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #1c1917;
          margin: 0 0 2.75rem;
        }
        .sbb-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 3rem;
          flex-wrap: wrap;
        }
        .sbb-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.9rem;
          text-decoration: none;
          cursor: pointer;
        }
        .sbb-circle {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          border: 1px solid rgba(0,0,0,0.08);
          overflow: hidden;
          transition: border-color 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease;
          background: #f5f4f2;
        }
        .sbb-circle img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }
        .sbb-item:hover .sbb-circle {
          border-color: rgba(0,0,0,0.2);
          transform: translateY(-4px);
          box-shadow: 0 10px 28px rgba(0,0,0,0.08);
        }
        .sbb-label {
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: #1c1917;
          margin: 0;
        }
        .sbb-sub {
          font-size: 10.5px;
          letter-spacing: 0.04em;
          color: #9c9890;
          margin: -0.4rem 0 0;
        }
        @media (max-width: 700px) {
          .sbb-row { gap: 2rem; }
          .sbb-circle { width: 104px; height: 104px; }
        }
      `}</style>

      <section className="sbb-section">
        <p className="sbb-eyebrow">Explore our brands</p>
        <p className="sbb-title">Shop by brand</p>
        <div className="sbb-row">
          {BRANDS.map(({ label, sub, href, img }) => (
            <Link key={label} to={href} className="sbb-item">
              <div className="sbb-circle">
                <img src={img} alt={label} />
              </div>
              <p className="sbb-label">{label}</p>
              <p className="sbb-sub">{sub}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}