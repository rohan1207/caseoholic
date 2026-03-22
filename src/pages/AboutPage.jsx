import { Link } from 'react-router-dom'

const PILLARS = [
  {
    n: '01',
    title: 'Materials Matter',
    body: 'We source only from the finest suppliers — aerospace-grade aramid fibre from Germany, full-grain Italian leather from Florentine tanneries, and fluoroelastomer formulated for daily endurance.',
  },
  {
    n: '02',
    title: 'Precision Fit',
    body: 'Every Caseoholic product is modelled to within 0.1 mm of the original device dimensions. Buttons click. Ports align. Nothing is left to chance.',
  },
  {
    n: '03',
    title: 'Tested to the Limit',
    body: 'Each design is subjected to MIL-STD-810G drop testing at third-party laboratories before a single unit ships. We do not release anything we wouldn\'t trust with our own devices.',
  },
  {
    n: '04',
    title: 'Designed to Last',
    body: 'We refuse to design for obsolescence. Our cases are engineered to survive the entire lifespan of your device — because good design shouldn\'t be disposable.',
  },
]

export default function AboutPage() {
  return (
    <>
      <style>{`
        .ab-page {
          background: #fafaf9;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          padding-top: 68px;
        }

        /* Hero */
        .ab-hero {
          position: relative; height: 65vmin; min-height: 340px; max-height: 540px;
          overflow: hidden; background: #111;
        }
        .ab-hero-img {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; opacity: 0.5;
        }
        .ab-hero-text {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center; padding: 24px;
        }
        .ab-hero-eyebrow {
          font-size: 10px; font-weight: 700; letter-spacing: 0.28em;
          text-transform: uppercase; color: #d97706; margin-bottom: 12px;
        }
        .ab-hero-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2rem, 6vw, 4rem);
          font-weight: 400; color: #fff; margin: 0 0 14px;
          letter-spacing: -0.03em; line-height: 1.1;
        }
        .ab-hero-title em { font-style: italic; color: #fbbf24; }
        .ab-hero-sub {
          font-size: clamp(13px, 1.8vw, 15px); color: rgba(255,255,255,0.6);
          max-width: 560px; line-height: 1.6;
        }

        /* Story */
        .ab-story {
          max-width: 760px; margin: 0 auto; padding: 72px 24px 56px;
          text-align: center;
        }
        .ab-story-eyebrow {
          font-size: 10px; font-weight: 700; letter-spacing: 0.28em;
          text-transform: uppercase; color: #a8a29e; margin-bottom: 16px; display: block;
        }
        .ab-story-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.6rem, 4vw, 2.6rem);
          font-weight: 400; color: #1c1917; margin: 0 0 24px;
          letter-spacing: -0.02em; line-height: 1.2;
        }
        .ab-story-title em { font-style: italic; color: #d97706; }
        .ab-story p {
          font-size: 15px; color: #57534e; line-height: 1.8; margin-bottom: 16px;
        }
        .ab-story p:last-child { margin-bottom: 0; }

        /* Pillars */
        .ab-pillars { background: #1c1917; padding: 72px 24px; }
        .ab-pillars-inner { max-width: 1080px; margin: 0 auto; }
        .ab-pillars-head {
          text-align: center; margin-bottom: 52px;
        }
        .ab-pillars-eyebrow {
          font-size: 10px; font-weight: 700; letter-spacing: 0.28em;
          text-transform: uppercase; color: #d97706; margin-bottom: 12px; display: block;
        }
        .ab-pillars-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          font-weight: 400; color: #fff; margin: 0;
          letter-spacing: -0.02em;
        }
        .ab-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2px;
        }
        @media (min-width: 640px) { .ab-grid { grid-template-columns: repeat(2, 1fr); } }
        .ab-pillar {
          padding: 36px 32px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          transition: background 0.25s;
        }
        .ab-pillar:hover { background: rgba(255,255,255,0.06); }
        .ab-pillar-num {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 3rem; font-weight: 400; color: rgba(217,119,6,0.25);
          line-height: 1; margin-bottom: 14px;
        }
        .ab-pillar-title {
          font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 10px;
          letter-spacing: -0.01em;
        }
        .ab-pillar-body { font-size: 13px; color: rgba(255,255,255,0.5); line-height: 1.75; }

        /* Stats */
        .ab-stats {
          display: grid; grid-template-columns: repeat(2, 1fr);
          background: #fff; border-top: 1px solid #f0eeea;
        }
        @media (min-width: 768px) { .ab-stats { grid-template-columns: repeat(4, 1fr); } }
        .ab-stat {
          padding: 44px 24px; text-align: center;
          border-right: 1px solid #f0eeea; border-bottom: 1px solid #f0eeea;
        }
        .ab-stat:nth-child(2n) { border-right: none; }
        @media (min-width: 768px) {
          .ab-stat:nth-child(2n) { border-right: 1px solid #f0eeea; }
          .ab-stat:nth-child(4n) { border-right: none; }
          .ab-stat { border-bottom: none; }
        }
        .ab-stat-num {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 400; color: #1c1917;
          letter-spacing: -0.04em; line-height: 1;
          margin-bottom: 8px;
        }
        .ab-stat-num em { font-style: normal; color: #d97706; }
        .ab-stat-label { font-size: 12px; color: #a8a29e; letter-spacing: 0.06em; }

        /* CTA */
        .ab-cta {
          text-align: center; padding: 72px 24px;
          background: #fafaf9;
        }
        .ab-cta-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 400; color: #1c1917; margin: 0 0 24px;
          letter-spacing: -0.02em;
        }
        .ab-cta-title em { font-style: italic; color: #d97706; }
        .ab-cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: #1c1917; color: #fff;
          padding: 15px 36px; border-radius: 2px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; text-decoration: none;
          transition: background 0.25s, transform 0.25s;
        }
        .ab-cta-btn:hover { background: #292524; transform: translateY(-1px); }
        .ab-cta-btn svg { width: 14px; height: 14px; }
      `}</style>

      <div className="ab-page">
        {/* Hero */}
        <section className="ab-hero">
          <img src="/homepage1.webp" alt="" className="ab-hero-img" />
          <div className="ab-hero-text">
            <p className="ab-hero-eyebrow">Our Story</p>
            <h1 className="ab-hero-title">Built for those who<br /><em>demand more.</em></h1>
            <p className="ab-hero-sub">Caseoholic was founded on a single belief: your tech deserves protection as refined as the device itself.</p>
          </div>
        </section>

        {/* Story */}
        <section className="ab-story">
          <span className="ab-story-eyebrow">The Caseoholic Philosophy</span>
          <h2 className="ab-story-title">We didn't settle for <em>good enough</em></h2>
          <p>Caseoholic was born out of frustration. The founders — obsessive about their own devices — could never find a case that truly matched the craftsmanship of the phones they were protecting. Cases were either cheap and forgettable, or premium-priced without the substance to back it up.</p>
          <p>So they built Caseoholic. Starting with a single aramid fibre case for iPhone, they obsessed over every millimetre, every material, every edge. The result? A product that felt like it belonged with the device — not like an afterthought.</p>
          <p>Today, Caseoholic ships to customers across India, offering a curated collection of phone cases, AirPods cases, watch bands, and phone wallets. Every product in the lineup earns its place through ruthless quality standards.</p>
        </section>

        {/* Pillars */}
        <section className="ab-pillars">
          <div className="ab-pillars-inner">
            <div className="ab-pillars-head">
              <span className="ab-pillars-eyebrow">What We Stand For</span>
              <h2 className="ab-pillars-title">Four principles. Zero compromise.</h2>
            </div>
            <div className="ab-grid">
              {PILLARS.map((p) => (
                <div key={p.n} className="ab-pillar">
                  <p className="ab-pillar-num">{p.n}</p>
                  <p className="ab-pillar-title">{p.title}</p>
                  <p className="ab-pillar-body">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <div className="ab-stats">
          {[
            { num: '50K+',  label: 'Happy Customers' },
            { num: '4.7★',  label: 'Average Rating' },
            { num: '70+',   label: 'Premium SKUs' },
            { num: '30',    label: 'Day Return Policy' },
          ].map(({ num, label }) => (
            <div key={label} className="ab-stat">
              <div className="ab-stat-num">{num.includes('★') ? <>{num.replace('★','')}<em>★</em></> : num}</div>
              <div className="ab-stat-label">{label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <section className="ab-cta">
          <h2 className="ab-cta-title">Ready to protect<br />what <em>matters?</em></h2>
          <Link to="/collections/all" className="ab-cta-btn">
            Shop the Collection
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </section>
      </div>
    </>
  )
}


