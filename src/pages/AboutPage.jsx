import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const PILLARS = [
  {
    n: '01',
    title: 'Materials Matter',
    body: 'Aerospace-grade aramid fibre from Germany. Full-grain Italian leather from Florentine tanneries. We source from the world\'s finest suppliers — because what protects your device should be extraordinary itself.',
  },
  {
    n: '02',
    title: 'Precision at 0.1mm',
    body: 'Every product is modelled to within 0.1mm of original device dimensions. Buttons click. Ports align. Wireless charging works uninterrupted. Nothing is left to chance.',
  },
  {
    n: '03',
    title: 'Third-Party Tested',
    body: 'Each design passes MIL-STD-810G drop testing at independent laboratories before a single unit ships. We do not release anything we wouldn\'t trust with our own devices.',
  },
  {
    n: '04',
    title: 'Built to Outlast',
    body: 'We engineer for the entire lifespan of your device. No planned obsolescence. No cutting corners. Good design shouldn\'t be disposable — and neither should the things you buy.',
  },
]

const STATS = [
  { num: '50,000+', label: 'Customers across India' },
  { num: '4.8', label: 'Average rating' },
  { num: '70+', label: 'Premium products' },
  { num: '30', label: 'Day returns, always' },
]

// Simple intersection observer hook for scroll reveals
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || '0'
            entry.target.style.transitionDelay = delay + 'ms'
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

export default function AboutPage() {
  useReveal()

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

        /* ── Scroll reveal base ── */
        [data-reveal] {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1);
        }
        [data-reveal].revealed {
          opacity: 1;
          transform: translateY(0);
        }
        [data-reveal="left"] { transform: translateX(-28px); }
        [data-reveal="left"].revealed { transform: translateX(0); }
        [data-reveal="right"] { transform: translateX(28px); }
        [data-reveal="right"].revealed { transform: translateX(0); }
        [data-reveal="scale"] { transform: scale(0.94); }
        [data-reveal="scale"].revealed { transform: scale(1); }

        /* ── Page ── */
        .ab-page {
          background: #fff;
          font-family: 'Outfit', sans-serif;
          padding-top: 88px;
          color: #1a1816;
          -webkit-font-smoothing: antialiased;
        }
        @media (max-width: 767px) { .ab-page { padding-top: 72px; } }

        /* ═══════════════════════════════
           HERO — full-bleed, editorial
        ═══════════════════════════════ */
        .ab-hero {
          position: relative;
          height: calc(100vh - 88px);
          min-height: 520px;
          max-height: 860px;
          overflow: hidden;
          background: #0d0c0b;
          display: flex; align-items: flex-end;
        }
        @media (max-width: 767px) {
          .ab-hero { height: 75vh; min-height: 420px; }
        }

        .ab-hero-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center 30%;
          opacity: 0.45;
          transform: scale(1.05);
          animation: heroZoom 12s ease-out forwards;
        }
        @keyframes heroZoom {
          to { transform: scale(1); opacity: 0.55; }
        }

        /* Gradient: bottom heavy for text */
        .ab-hero-grad {
          position: absolute; inset: 0;
          background: linear-gradient(
            to top,
            rgba(13,12,11,0.92) 0%,
            rgba(13,12,11,0.4) 45%,
            rgba(13,12,11,0.05) 100%
          );
        }

        .ab-hero-content {
          position: relative; z-index: 2;
          padding: 0 4rem 5rem;
          max-width: 1320px; margin: 0 auto; width: 100%;
        }
        @media (max-width: 767px) { .ab-hero-content { padding: 0 1.5rem 3.5rem; } }

        .ab-hero-label {
          font-size: 10px; font-weight: 600; letter-spacing: 0.26em;
          text-transform: uppercase; color: rgba(255,255,255,0.45);
          display: block; margin-bottom: 20px;
          animation: fadeUp 0.8s 0.2s cubic-bezier(0.16,1,0.3,1) both;
        }
        .ab-hero-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(2.8rem, 7vw, 6rem);
          font-weight: 700; color: #fff;
          margin: 0 0 24px; line-height: 1.0;
          letter-spacing: -0.03em;
          animation: fadeUp 0.9s 0.35s cubic-bezier(0.16,1,0.3,1) both;
          max-width: 720px;
        }
        .ab-hero-title span {
          color: rgba(255,255,255,0.35);
          font-weight: 300;
        }
        .ab-hero-sub {
          font-size: clamp(14px, 1.8vw, 16px); font-weight: 300;
          color: rgba(255,255,255,0.55);
          max-width: 440px; line-height: 1.65;
          animation: fadeUp 0.9s 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }

        /* Scroll indicator */
        .ab-scroll-hint {
          position: absolute; bottom: 2.5rem; right: 4rem;
          z-index: 2; display: flex; flex-direction: column;
          align-items: center; gap: 8px;
          animation: fadeUp 1s 0.9s cubic-bezier(0.16,1,0.3,1) both;
        }
        @media (max-width: 767px) { .ab-scroll-hint { display: none; } }
        .ab-scroll-line {
          width: 1px; height: 52px; background: rgba(255,255,255,0.2);
          position: relative; overflow: hidden;
        }
        .ab-scroll-line::after {
          content: ''; position: absolute; top: -100%;
          width: 100%; height: 100%;
          background: rgba(255,255,255,0.6);
          animation: scrollLine 1.8s 1.5s ease-in-out infinite;
        }
        @keyframes scrollLine { 0% { top: -100%; } 100% { top: 100%; } }
        .ab-scroll-text {
          font-size: 8px; font-weight: 600; letter-spacing: 0.2em;
          text-transform: uppercase; color: rgba(255,255,255,0.3);
          writing-mode: vertical-rl;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ═══════════════════════════════
           STORY — generous whitespace
        ═══════════════════════════════ */
        .ab-story {
          max-width: 680px; margin: 0 auto;
          padding: 100px 2rem 80px;
          text-align: center;
        }
        @media (max-width: 767px) { .ab-story { padding: 64px 1.5rem 56px; } }

        .ab-story-tag {
          display: inline-block;
          font-size: 9.5px; font-weight: 600; letter-spacing: 0.22em;
          text-transform: uppercase; color: #1a1816; opacity: 0.35;
          margin-bottom: 24px;
        }
        .ab-story-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(1.75rem, 4vw, 2.8rem);
          font-weight: 700; color: #1a1816;
          margin: 0 0 32px; letter-spacing: -0.025em; line-height: 1.1;
        }
        .ab-story-body {
          font-size: 15.5px; font-weight: 300; color: #1a1816;
          opacity: 0.65; line-height: 1.85;
          margin-bottom: 20px;
        }
        .ab-story-body:last-child { margin-bottom: 0; }

        /* ═══════════════════════════════
           IMAGE BREAK — cinematic strip
        ═══════════════════════════════ */
        .ab-imgstrip {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          height: 380px;
          overflow: hidden;
        }
        @media (max-width: 767px) {
          .ab-imgstrip { height: 220px; }
        }
        @media (max-width: 480px) {
          .ab-imgstrip { grid-template-columns: 1fr 1fr; height: 200px; }
          .ab-imgstrip-item:last-child { display: none; }
        }
        .ab-imgstrip-item {
          overflow: hidden; position: relative;
        }
        .ab-imgstrip-item img {
          width: 100%; height: 100%; object-fit: cover;
          object-position: center;
          transition: transform 0.9s cubic-bezier(0.16,1,0.3,1);
          filter: grayscale(20%);
        }
        .ab-imgstrip-item:hover img { transform: scale(1.06); filter: grayscale(0%); }

        /* ═══════════════════════════════
           PILLARS — clean grid, dark bg
        ═══════════════════════════════ */
        .ab-pillars {
          background: #1a1816;
          padding: 100px 2rem;
        }
        @media (max-width: 767px) { .ab-pillars { padding: 64px 1.5rem; } }

        .ab-pillars-inner { max-width: 1080px; margin: 0 auto; }

        .ab-pillars-header {
          margin-bottom: 64px;
          display: flex; align-items: flex-end;
          justify-content: space-between; gap: 24px;
          flex-wrap: wrap;
        }
        @media (max-width: 767px) { .ab-pillars-header { margin-bottom: 40px; } }

        .ab-pillars-tag {
          font-size: 9.5px; font-weight: 600; letter-spacing: 0.22em;
          text-transform: uppercase; color: rgba(255,255,255,0.3);
          display: block; margin-bottom: 14px;
        }
        .ab-pillars-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(1.6rem, 3.5vw, 2.4rem);
          font-weight: 700; color: #fff;
          margin: 0; letter-spacing: -0.02em; line-height: 1.1;
        }

        .ab-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: rgba(255,255,255,0.07);
        }
        @media (max-width: 640px) { .ab-grid { grid-template-columns: 1fr; } }

        .ab-pillar {
          padding: 44px 36px;
          background: #1a1816;
          transition: background 0.3s ease;
          cursor: default;
        }
        @media (max-width: 767px) { .ab-pillar { padding: 32px 24px; } }
        .ab-pillar:hover { background: #242220; }

        .ab-pillar-num {
          font-family: 'Outfit', sans-serif;
          font-size: 11px; font-weight: 600; letter-spacing: 0.2em;
          color: rgba(255,255,255,0.2);
          margin-bottom: 20px; display: block;
        }
        .ab-pillar-title {
          font-family: 'Outfit', sans-serif;
          font-size: 17px; font-weight: 600;
          color: #fff; margin-bottom: 12px; letter-spacing: -0.01em;
          line-height: 1.2;
        }
        .ab-pillar-body {
          font-size: 13.5px; font-weight: 300;
          color: rgba(255,255,255,0.45); line-height: 1.8;
        }

        /* ═══════════════════════════════
           STATS — brutally clean
        ═══════════════════════════════ */
        .ab-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-bottom: 1px solid rgba(0,0,0,0.07);
        }
        @media (max-width: 767px) { .ab-stats { grid-template-columns: repeat(2, 1fr); } }

        .ab-stat {
          padding: 52px 24px; text-align: center;
          border-right: 1px solid rgba(0,0,0,0.07);
          border-bottom: 1px solid rgba(0,0,0,0.07);
          transition: background 0.25s;
        }
        .ab-stat:hover { background: #fafaf9; }
        .ab-stat:last-child { border-right: none; }
        @media (max-width: 767px) {
          .ab-stat:nth-child(2n) { border-right: none; }
          .ab-stat:nth-child(3), .ab-stat:nth-child(4) { border-bottom: none; }
        }
        @media (min-width: 768px) {
          .ab-stat:nth-child(4n) { border-right: none; }
          .ab-stat { border-bottom: none; }
        }

        .ab-stat-num {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700; color: #1a1816;
          letter-spacing: -0.03em; line-height: 1;
          margin-bottom: 10px; display: block;
        }
        .ab-stat-label {
          font-family: 'Outfit', sans-serif;
          font-size: 11px; font-weight: 400;
          color: #1a1816; opacity: 0.4;
          letter-spacing: 0.06em; text-transform: uppercase;
        }

        /* ═══════════════════════════════
           PROMISE STRIP
        ═══════════════════════════════ */
        .ab-promise {
          padding: 80px 2rem;
          max-width: 860px; margin: 0 auto;
          text-align: center;
        }
        @media (max-width: 767px) { .ab-promise { padding: 56px 1.5rem; } }

        .ab-promise-tag {
          font-size: 9.5px; font-weight: 600; letter-spacing: 0.22em;
          text-transform: uppercase; color: #1a1816; opacity: 0.35;
          display: block; margin-bottom: 24px;
        }
        .ab-promise-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(1.6rem, 3.5vw, 2.6rem);
          font-weight: 700; color: #1a1816;
          margin: 0 0 36px; letter-spacing: -0.025em; line-height: 1.15;
        }
        .ab-promise-title span { opacity: 0.3; font-weight: 300; }

        /* ═══════════════════════════════
           CTA — minimal, confident
        ═══════════════════════════════ */
        .ab-cta {
          background: #1a1816;
          padding: 100px 2rem;
          text-align: center;
          position: relative; overflow: hidden;
        }
        @media (max-width: 767px) { .ab-cta { padding: 64px 1.5rem; } }

        /* Subtle texture */
        .ab-cta::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(circle at 30% 50%, rgba(255,255,255,0.03) 0%, transparent 60%),
                            radial-gradient(circle at 70% 50%, rgba(255,255,255,0.02) 0%, transparent 60%);
          pointer-events: none;
        }

        .ab-cta-tag {
          font-size: 9.5px; font-weight: 600; letter-spacing: 0.22em;
          text-transform: uppercase; color: rgba(255,255,255,0.3);
          display: block; margin-bottom: 24px; position: relative; z-index: 1;
        }
        .ab-cta-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 700; color: #fff;
          margin: 0 0 40px; letter-spacing: -0.03em; line-height: 1.05;
          position: relative; z-index: 1;
        }
        .ab-cta-title span { color: rgba(255,255,255,0.3); font-weight: 300; }

        .ab-cta-btn {
          display: inline-flex; align-items: center; gap: 12px;
          background: #fff; color: #1a1816;
          padding: 16px 36px; border-radius: 2px;
          font-family: 'Outfit', sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; text-decoration: none;
          transition: background 0.25s, color 0.25s, gap 0.25s, transform 0.25s;
          position: relative; z-index: 1;
        }
        .ab-cta-btn:hover {
          background: rgba(255,255,255,0.9);
          gap: 18px; transform: translateY(-2px);
        }
        .ab-cta-btn svg { width: 14px; height: 14px; }

        /* Divider line */
        .ab-divider {
          width: 1px; height: 80px; background: rgba(0,0,0,0.08);
          margin: 0 auto;
        }
        .ab-divider-dark { background: rgba(255,255,255,0.1); }
      `}</style>

      <div className="ab-page">

        {/* ══ HERO ══ */}
        <section className="ab-hero">
          <img src="/homepage1.webp" alt="Caseoholic" className="ab-hero-img" />
          <div className="ab-hero-grad" />
          <div className="ab-hero-content">
            <span className="ab-hero-label">Caseoholic — Est. India</span>
            <h1 className="ab-hero-title">
              Protection as refined<br />
              <span>as the device itself.</span>
            </h1>
            <p className="ab-hero-sub">
              We founded Caseoholic on a single frustration — we couldn't find a case worthy of the phone it was meant to protect. So we built one.
            </p>
          </div>
          <div className="ab-scroll-hint">
            <div className="ab-scroll-line" />
            <span className="ab-scroll-text">Scroll</span>
          </div>
        </section>

        {/* ══ STORY ══ */}
        <section className="ab-story">
          <span className="ab-story-tag" data-reveal>The Caseoholic story</span>
          <h2 className="ab-story-title" data-reveal data-delay="80">
            Born from frustration.<br />Built with obsession.
          </h2>
          <p className="ab-story-body" data-reveal data-delay="140">
            The founders were obsessive about their devices. They could never find a case that matched the craftsmanship of the phones they were protecting — cheap and forgettable, or premium-priced without the substance to back it up.
          </p>
          <p className="ab-story-body" data-reveal data-delay="180">
            Starting with a single aramid fibre case for iPhone, they obsessed over every millimetre, every material, every edge. Today, Caseoholic ships to customers across India — every product earning its place through ruthless quality standards.
          </p>
        </section>

        <div className="ab-divider" data-reveal />

        {/* ══ IMAGE STRIP ══ */}
        <div className="ab-imgstrip" data-reveal="scale">
          <div className="ab-imgstrip-item">
            <img src="/iphone11.webp" alt="Phone cases" />
          </div>
          <div className="ab-imgstrip-item">
            <img src="/iwatchband11.webp" alt="Watch bands" />
          </div>
          <div className="ab-imgstrip-item">
            <img src="/airpod11.webp" alt="AirPods cases" />
          </div>
        </div>

        {/* ══ PILLARS ══ */}
        <section className="ab-pillars">
          <div className="ab-pillars-inner">
            <div className="ab-pillars-header">
              <div>
                <span className="ab-pillars-tag" data-reveal>What we stand for</span>
                <h2 className="ab-pillars-title" data-reveal data-delay="80">
                  Four principles.<br />Zero compromise.
                </h2>
              </div>
            </div>
            <div className="ab-grid">
              {PILLARS.map((p, i) => (
                <div key={p.n} className="ab-pillar" data-reveal data-delay={i * 80}>
                  <span className="ab-pillar-num">{p.n}</span>
                  <p className="ab-pillar-title">{p.title}</p>
                  <p className="ab-pillar-body">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ STATS ══ */}
        <div className="ab-stats">
          {STATS.map((s, i) => (
            <div key={s.label} className="ab-stat" data-reveal data-delay={i * 60}>
              <span className="ab-stat-num">{s.num}</span>
              <span className="ab-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ══ PROMISE ══ */}
        <section className="ab-promise">
          <span className="ab-promise-tag" data-reveal>Our promise to you</span>
          <h2 className="ab-promise-title" data-reveal data-delay="80">
            If it doesn't meet our standards,<br />
            <span>it doesn't leave our hands.</span>
          </h2>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 15, fontWeight: 300, color: '#1a1816', opacity: 0.55,
            lineHeight: 1.8, maxWidth: 540, margin: '0 auto 40px',
          }} data-reveal data-delay="140">
            Every order ships with our 30-day no-questions return policy. If you're not completely satisfied, we'll make it right. That's not a marketing line — it's how we operate.
          </p>
          <div className="ab-divider" data-reveal />
        </section>

        {/* ══ CTA ══ */}
        <section className="ab-cta">
          <span className="ab-cta-tag" data-reveal>Ready when you are</span>
          <h2 className="ab-cta-title" data-reveal data-delay="80">
            Find your perfect case.<br />
            <span>We'll handle the rest.</span>
          </h2>
          <div data-reveal data-delay="160">
            <Link to="/collections/all" className="ab-cta-btn">
              Shop the Collection
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

      </div>
    </>
  )
}