const VALUES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    headline: "Military-Grade Protection",
    body: "Every case is drop-tested to meet MIL-STD-810G standards — without adding bulk.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
      </svg>
    ),
    headline: "Premium Materials Only",
    body: "Aramid fibre, full-grain Italian leather, fluoroelastomer — we source the best, every time.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    headline: "Free Shipping Over ₹499",
    body: "Free standard shipping on all orders above ₹499. Express delivery available nationwide.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
    headline: "30-Day Easy Returns",
    body: "Not in love with your purchase? Return it within 30 days — no questions asked.",
  },
];

export default function BrandValues() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

        .bv-section {
          background: #fafaf9;
          border-top: 1px solid #f0eeea;
          padding: 52px 24px;
          font-family: 'Outfit', sans-serif;
        }
        .bv-grid {
          max-width: 1080px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0;
        }
        @media (min-width: 768px) {
          .bv-grid { grid-template-columns: repeat(4, 1fr); }
        }

        .bv-item {
          display: flex; flex-direction: column;
          align-items: center; text-align: center;
          padding: 28px 20px;
          border-right: 1px solid #ede9e3;
          border-bottom: 1px solid #ede9e3;
        }
        /* Mobile: 2-col grid — remove right border on every 2nd item */
        .bv-item:nth-child(2n) { border-right: none; }
        /* Mobile: remove bottom border on last row */
        .bv-item:nth-child(3),
        .bv-item:nth-child(4) { border-bottom: none; }

        @media (min-width: 768px) {
          .bv-item:nth-child(2n) { border-right: 1px solid #ede9e3; }
          .bv-item:nth-child(4n) { border-right: none; }
          .bv-item { border-bottom: none; }
        }

        /* Small phones: tighter padding */
        @media (max-width: 400px) {
          .bv-item { padding: 22px 14px; }
          .bv-section { padding: 40px 16px; }
        }

        .bv-icon {
          width: 40px; height: 40px;
          color: #1a1816;
          margin-bottom: 14px; flex-shrink: 0;
        }
        .bv-icon svg { width: 100%; height: 100%; }

        .bv-head {
          font-family: 'Outfit', sans-serif;
          font-size: 13px; font-weight: 600;
          color: #1a1816;
          margin-bottom: 6px; letter-spacing: 0em;
          line-height: 1.3;
        }
        .bv-body {
          font-family: 'Outfit', sans-serif;
          font-size: 12.5px; font-weight: 400;
          color: #1a1816; line-height: 1.65;
        }

        @media (max-width: 640px) {
          .bv-head { font-size: 12px; }
          .bv-body { font-size: 11.5px; }
        }
      `}</style>

      <section className="bv-section" aria-label="Our promises">
        <div className="bv-grid">
          {VALUES.map((v) => (
            <div key={v.headline} className="bv-item">
              <div className="bv-icon">{v.icon}</div>
              <p className="bv-head">{v.headline}</p>
              <p className="bv-body">{v.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}