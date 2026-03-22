import { useState } from 'react'
import { Link } from 'react-router-dom'

const SHOP_LINKS = [
  { label: 'New Arrivals',  to: '/collections/all' },
  { label: 'Best Sellers',  to: '/collections/all' },
  { label: 'Phone Cases',   to: '/collections/phone-cases' },
  { label: 'AirPods Cases', to: '/collections/airpods-cases' },
  { label: 'Watch Bands',   to: '/collections/watch-bands' },
  { label: 'Phone Wallets', to: '/collections/phone-wallets' },
]
const INFO_LINKS = [
  { label: 'About Us',   to: '/about' },
  { label: 'Contact Us', to: '/about' },
  { label: 'My Account', to: '/account' },
  { label: 'Wishlist',   to: '/wishlist' },
]
const SERVICE_LINKS = [
  { label: 'Privacy Policy',     to: '/legal/privacy' },
  { label: 'Shipping Policy',    to: '/legal/shipping' },
  { label: 'Terms & Conditions', to: '/legal/terms' },
]

/* Mobile accordion column */
function FooterCol({ title, links }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="ft-col">
      <button className="ft-col-toggle" onClick={() => setOpen(v => !v)} aria-expanded={open}>
        <span className="ft-col-title">{title}</span>
        <svg
          className={`ft-toggle-icon${open ? ' ft-toggle-open' : ''}`}
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
        >
          <path d="M2 4l4 4 4-4" />
        </svg>
      </button>
      <ul className={`ft-links${open ? ' ft-links-open' : ''}`}>
        {links.map(l => (
          <li key={l.label}><Link to={l.to}>{l.label}</Link></li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

        .ft-root {
          background: #1a1816;
          font-family: 'Outfit', sans-serif;
          color: #fff;
        }

        /* ── MAIN ── */
        .ft-main {
          max-width: 1320px; margin: 0 auto;
          padding: 64px 48px 56px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1.5fr;
          gap: 0 32px;
        }

        /* Column heading */
        .ft-col-title {
          font-family: 'Outfit', sans-serif;
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: #fff; margin: 0 0 22px 0;
          display: block;
        }

        /* Desktop: hide toggle button behaviour */
        .ft-col-toggle {
          background: none; border: none; padding: 0; cursor: default;
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; text-align: left;
        }
        .ft-toggle-icon { display: none; color: rgba(255,255,255,0.5); flex-shrink: 0; }

        /* Links */
        .ft-links {
          list-style: none; margin: 0; padding: 0;
          display: flex; flex-direction: column; gap: 13px;
        }
        .ft-links a {
          font-family: 'Outfit', sans-serif;
          font-size: 13.5px; font-weight: 300;
          color: rgba(255,255,255,0.65);
          text-decoration: none; letter-spacing: 0.01em;
          transition: color 0.18s;
        }
        .ft-links a:hover { color: #fff; }

        /* Newsletter */
        .ft-nl-desc {
          font-family: 'Outfit', sans-serif;
          font-size: 13px; font-weight: 300;
          color: rgba(255,255,255,0.65); line-height: 1.6;
          margin: 0 0 20px 0; letter-spacing: 0.01em;
        }
        .ft-nl-row { display: flex; gap: 0; margin-bottom: 28px; }
        .ft-nl-input {
          flex: 1; background: transparent;
          border: 1px solid rgba(255,255,255,0.35); border-right: none;
          color: #fff; font-family: 'Outfit', sans-serif;
          font-size: 13px; font-weight: 300;
          padding: 13px 16px; outline: none; border-radius: 0;
          transition: border-color 0.2s; min-width: 0;
        }
        .ft-nl-input::placeholder { color: rgba(255,255,255,0.32); }
        .ft-nl-input:focus { border-color: rgba(255,255,255,0.75); }
        .ft-nl-btn {
          background: #fff; color: #1a1816;
          border: 1px solid #fff;
          font-family: 'Outfit', sans-serif;
          font-size: 11px; font-weight: 700;
          padding: 13px 22px; cursor: pointer; border-radius: 0;
          letter-spacing: 0.16em; text-transform: uppercase;
          transition: background 0.22s, color 0.22s, border-color 0.22s;
          white-space: nowrap; flex-shrink: 0;
        }
        .ft-nl-btn:hover { background: transparent; color: #fff; }

        /* Socials */
        .ft-socials { display: flex; gap: 10px; }
        .ft-social-btn {
          width: 38px; height: 38px; border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.4);
          background: transparent;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #fff; padding: 0;
          transition: border-color 0.18s, background 0.18s;
        }
        .ft-social-btn:hover { border-color: #fff; background: rgba(255,255,255,0.08); }

        /* ── BOTTOM BAR ── */
        .ft-bottom { border-top: 1px solid rgba(255,255,255,0.1); }
        .ft-bottom-inner {
          max-width: 1320px; margin: 0 auto; padding: 24px 48px;
          display: grid; grid-template-columns: 1fr auto 1fr;
          align-items: center;
        }
        .ft-copy {
          font-family: 'Outfit', sans-serif;
          font-size: 12px; font-weight: 300;
          color: rgba(255,255,255,0.45); letter-spacing: 0.01em;
        }
        .ft-logo-img {
          height: 32px; width: auto; display: block;
          filter: brightness(0) invert(1); opacity: 0.85;
        }
        .ft-payments { display: flex; align-items: center; gap: 8px; justify-content: flex-end; }
        .ft-pay-chip {
          background: #2a2826;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 5px; padding: 5px 9px;
          display: flex; align-items: center; justify-content: center; height: 30px;
        }
        .ft-pay-chip span { font-size: 11px; font-weight: 600; letter-spacing: 0.02em; white-space: nowrap; }

        /* ══════════════════════
           RESPONSIVE
        ══════════════════════ */

        /* Tablet */
        @media (max-width: 1024px) {
          .ft-main { grid-template-columns: 1fr 1fr; gap: 40px 32px; padding: 52px 32px 48px; }
        }

        /* Mobile */
        @media (max-width: 767px) {
          .ft-main {
            grid-template-columns: 1fr;
            gap: 0; padding: 0;
          }

          /* Accordion columns */
          .ft-col {
            border-bottom: 1px solid rgba(255,255,255,0.08);
          }
          .ft-col-toggle {
            cursor: pointer; padding: 18px 20px;
          }
          .ft-col-title { margin: 0; }
          .ft-toggle-icon { display: block; transition: transform 0.25s ease; }
          .ft-toggle-icon.ft-toggle-open { transform: rotate(180deg); }

          /* Links — hidden by default, revealed on open */
          .ft-links {
            max-height: 0; overflow: hidden;
            transition: max-height 0.3s ease, padding 0.3s ease;
            padding: 0 20px;
            gap: 0;
          }
          .ft-links.ft-links-open {
            max-height: 400px;
            padding: 0 20px 18px;
            gap: 13px;
          }

          /* Newsletter col — always open, no toggle */
          .ft-nl-col { padding: 28px 20px 32px; }
          .ft-nl-col .ft-col-title { margin-bottom: 16px; }
          .ft-nl-col .ft-col-toggle { cursor: default; }
          .ft-nl-col .ft-toggle-icon { display: none !important; }

          /* Bottom bar — stack on mobile */
          .ft-bottom-inner {
            grid-template-columns: 1fr;
            gap: 16px; padding: 24px 20px;
            text-align: center;
          }
          .ft-payments { justify-content: center; flex-wrap: wrap; }
          .ft-logo-img { margin: 0 auto; }
          .ft-copy { text-align: center; }
        }

        @media (max-width: 400px) {
          .ft-nl-row { flex-direction: column; }
          .ft-nl-input { border-right: 1px solid rgba(255,255,255,0.35); border-bottom: none; }
          .ft-nl-btn { width: 100%; padding: 13px; }
        }
      `}</style>

      <footer className="ft-root">

        {/* ── MAIN ── */}
        <div className="ft-main">

          {/* SHOP */}
          <FooterCol title="Shop" links={SHOP_LINKS} />

          {/* INFORMATION */}
          <FooterCol title="Information" links={INFO_LINKS} />

          {/* CUSTOMER SERVICE */}
          <FooterCol title="Customer Service" links={SERVICE_LINKS} />

          {/* NEWSLETTER — always expanded */}
          <div className="ft-col ft-nl-col">
            <div className="ft-col-toggle">
              <span className="ft-col-title">Newsletter Sign Up</span>
            </div>
            <p className="ft-nl-desc">
              Sign up for exclusive updates, new arrivals &amp; insider only discounts
            </p>
            <div className="ft-nl-row">
              <input
                className="ft-nl-input"
                type="email"
                placeholder="enter your email address"
              />
              <button className="ft-nl-btn">Subscribe</button>
            </div>
            <div className="ft-socials">
              <button className="ft-social-btn" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </button>
              <button className="ft-social-btn" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
                </svg>
              </button>
            </div>
          </div>

        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="ft-bottom">
          <div className="ft-bottom-inner">

            <p className="ft-copy">© CaseoholicIndia. All Rights Reserved 2026</p>

            <img src="/logo.png" alt="Logo" className="ft-logo-img" />

            <div className="ft-payments">
              <div className="ft-pay-chip">
                <span style={{ color:"#fff", fontFamily:"Arial,sans-serif", fontStyle:"italic", fontWeight:700, fontSize:13 }}>VISA</span>
              </div>
              <div className="ft-pay-chip">
                <svg width="34" height="20" viewBox="0 0 34 20">
                  <circle cx="12" cy="10" r="9" fill="#EB001B"/>
                  <circle cx="22" cy="10" r="9" fill="#F79E1B"/>
                  <path d="M17 3.3a9 9 0 0 1 0 13.4A9 9 0 0 1 17 3.3z" fill="#FF5F00"/>
                </svg>
              </div>
              <div className="ft-pay-chip">
                <svg width="34" height="20" viewBox="0 0 34 20">
                  <circle cx="12" cy="10" r="9" fill="#0099DF"/>
                  <circle cx="22" cy="10" r="9" fill="#E30713"/>
                  <path d="M17 3.3a9 9 0 0 1 0 13.4A9 9 0 0 1 17 3.3z" fill="#6C6BBD"/>
                </svg>
              </div>
              <div className="ft-pay-chip">
                <span style={{ fontSize:11, fontWeight:600, letterSpacing:"0.01em" }}>
                  <span style={{color:"#4285F4"}}>G</span>
                  <span style={{color:"#EA4335"}}>o</span>
                  <span style={{color:"#FBBC04"}}>o</span>
                  <span style={{color:"#4285F4"}}>g</span>
                  <span style={{color:"#34A853"}}>l</span>
                  <span style={{color:"#EA4335"}}>e </span>
                  <span style={{color:"#fff"}}>Pay</span>
                </span>
              </div>
            </div>

          </div>
        </div>

      </footer>
    </>
  )
}