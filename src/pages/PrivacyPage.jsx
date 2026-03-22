export default function PrivacyPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

        .legal-page {
          padding-top: 88px;
          padding-bottom: 96px;
          background: #fff;
          font-family: 'Outfit', sans-serif;
          color: #1a1816;
          -webkit-font-smoothing: antialiased;
        }
        @media (max-width: 767px) {
          .legal-page { padding-top: 72px; padding-bottom: 64px; }
        }

        /* ── Thin top accent bar ── */
        .legal-top-bar {
          height: 1px;
          background: rgba(0,0,0,0.07);
          margin-bottom: 0;
        }

        /* ── Hero header block ── */
        .legal-header {
          border-bottom: 1px solid rgba(0,0,0,0.07);
          padding: 56px 0 40px;
          margin-bottom: 0;
        }
        @media (max-width: 767px) { .legal-header { padding: 40px 0 32px; } }

        .legal-inner {
          max-width: 720px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        @media (max-width: 480px) { .legal-inner { padding: 0 1.25rem; } }

        .legal-eyebrow {
          font-family: 'Outfit', sans-serif;
          font-size: 9.5px; font-weight: 600; letter-spacing: 0.22em;
          text-transform: uppercase; color: #1a1816; opacity: 0.35;
          display: block; margin-bottom: 12px;
        }
        .legal-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(1.75rem, 4vw, 2.6rem);
          font-weight: 700; color: #1a1816;
          margin: 0 0 12px; letter-spacing: -0.025em; line-height: 1.1;
        }
        .legal-updated {
          font-family: 'Outfit', sans-serif;
          font-size: 13px; font-weight: 300;
          color: #1a1816; opacity: 0.45; margin: 0;
          line-height: 1.6;
        }

        /* ── Body ── */
        .legal-body-wrap {
          padding-top: 48px;
        }
        @media (max-width: 767px) { .legal-body-wrap { padding-top: 36px; } }

        .legal-section {
          margin-bottom: 36px;
          padding-bottom: 36px;
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .legal-section:last-child {
          border-bottom: none;
          margin-bottom: 0; padding-bottom: 0;
        }

        .legal-section-num {
          font-family: 'Outfit', sans-serif;
          font-size: 9px; font-weight: 600; letter-spacing: 0.2em;
          text-transform: uppercase; color: #1a1816; opacity: 0.25;
          display: block; margin-bottom: 8px;
        }
        .legal-section-title {
          font-family: 'Outfit', sans-serif;
          font-size: 15px; font-weight: 600;
          color: #1a1816; margin: 0 0 12px; letter-spacing: -0.01em;
          line-height: 1.3;
        }
        .legal-body {
          font-family: 'Outfit', sans-serif;
          font-size: 14px; font-weight: 300;
          line-height: 1.85; color: #1a1816; opacity: 0.65;
          margin: 0;
        }
        .legal-body strong {
          font-weight: 600; opacity: 1; color: #1a1816;
        }
        .legal-body br { display: block; margin-bottom: 4px; content: ""; }

        /* Contact block */
        .legal-contact {
          background: #fafaf9;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 2px; padding: 20px 22px; margin-top: 12px;
        }
        .legal-contact p {
          font-family: 'Outfit', sans-serif;
          font-size: 13.5px; font-weight: 400;
          color: #1a1816; opacity: 0.7;
          line-height: 1.9; margin: 0;
        }
        .legal-contact strong {
          font-weight: 600; opacity: 1;
        }
      `}</style>

      <main className="legal-page">
        <div className="legal-top-bar" />

        {/* Header */}
        <div className="legal-header">
          <div className="legal-inner">
            <span className="legal-eyebrow">Legal</span>
            <h1 className="legal-title">Privacy Policy</h1>
            <p className="legal-updated">
              This Privacy Policy explains how Caseoholic collects and uses your information.
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="legal-inner">
          <div className="legal-body-wrap">

            <div className="legal-section">
              <span className="legal-section-num">01</span>
              <h2 className="legal-section-title">Information We Collect</h2>
              <p className="legal-body">
                We collect personal information such as your name, email address, shipping address, billing address, and payment details when you place an order, create an account, or sign up for our newsletter.
              </p>
            </div>

            <div className="legal-section">
              <span className="legal-section-num">02</span>
              <h2 className="legal-section-title">How We Use Your Information</h2>
              <p className="legal-body">
                We use your information to process and fulfil your orders, communicate with you about your purchases, send updates and promotional communications (where permitted), and improve our products, services, and website experience.
              </p>
            </div>

            <div className="legal-section">
              <span className="legal-section-num">03</span>
              <h2 className="legal-section-title">Cookies</h2>
              <p className="legal-body">
                We use cookies and similar technologies to personalise content, remember your preferences, analyse site traffic, and improve your browsing experience. You can control cookies through your browser settings, but disabling them may impact certain site features.
              </p>
            </div>

            <div className="legal-section">
              <span className="legal-section-num">04</span>
              <h2 className="legal-section-title">Data Security</h2>
              <p className="legal-body">
                We take reasonable technical and organisational precautions to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div className="legal-section">
              <span className="legal-section-num">05</span>
              <h2 className="legal-section-title">Changes to This Privacy Policy</h2>
              <p className="legal-body">
                We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. Any updates will be posted on this page, and your continued use of the website after such changes constitutes acceptance of the revised policy.
              </p>
            </div>

            <div className="legal-section">
              <span className="legal-section-num">06</span>
              <h2 className="legal-section-title">Contact Information</h2>
              <div className="legal-contact">
                <p>
                  <strong>Email:</strong> steloratech@gmail.com<br />
                  <strong>Phone:</strong> 94650 00669<br />
                  <strong>Address:</strong> New Dashmesh Nagar, Jalandhar, Basti Guzan, Punjab — 144002
                </p>
              </div>
            </div>

            <div className="legal-section">
              <span className="legal-section-num">07</span>
              <h2 className="legal-section-title">Ownership</h2>
              <p className="legal-body">
                Caseoholic is owned and operated by <strong>Vikram Bhagat</strong>.
              </p>
            </div>

          </div>
        </div>
      </main>
    </>
  )
}