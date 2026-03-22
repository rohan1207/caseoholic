export default function ShippingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

        .legal-page {
          padding-top: 88px; padding-bottom: 96px;
          background: #fff; font-family: 'Outfit', sans-serif;
          color: #1a1816; -webkit-font-smoothing: antialiased;
        }
        @media (max-width: 767px) { .legal-page { padding-top: 72px; padding-bottom: 64px; } }

        .legal-top-bar { height: 1px; background: rgba(0,0,0,0.07); }

        .legal-header {
          border-bottom: 1px solid rgba(0,0,0,0.07);
          padding: 56px 0 40px;
        }
        @media (max-width: 767px) { .legal-header { padding: 40px 0 32px; } }

        .legal-inner { max-width: 720px; margin: 0 auto; padding: 0 2rem; }
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
          color: #1a1816; opacity: 0.45; margin: 0; line-height: 1.6;
        }

        .legal-body-wrap { padding-top: 48px; }
        @media (max-width: 767px) { .legal-body-wrap { padding-top: 36px; } }

        .legal-section {
          margin-bottom: 36px; padding-bottom: 36px;
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .legal-section:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }

        .legal-section-num {
          font-family: 'Outfit', sans-serif;
          font-size: 9px; font-weight: 600; letter-spacing: 0.2em;
          text-transform: uppercase; color: #1a1816; opacity: 0.25;
          display: block; margin-bottom: 8px;
        }
        .legal-section-title {
          font-family: 'Outfit', sans-serif;
          font-size: 15px; font-weight: 600; color: #1a1816;
          margin: 0 0 12px; letter-spacing: -0.01em; line-height: 1.3;
        }
        .legal-body {
          font-family: 'Outfit', sans-serif;
          font-size: 14px; font-weight: 300;
          line-height: 1.85; color: #1a1816; opacity: 0.65; margin: 0;
        }
        .legal-body strong { font-weight: 600; color: #1a1816; }

        /* Highlight box for key info */
        .legal-highlight {
          background: #fafaf9; border-left: 3px solid #1a1816;
          padding: 16px 20px; margin-top: 16px; border-radius: 0 2px 2px 0;
        }
        .legal-highlight p {
          font-family: 'Outfit', sans-serif;
          font-size: 13.5px; font-weight: 500; color: #1a1816;
          margin: 0; line-height: 1.7;
        }

        .legal-contact {
          background: #fafaf9; border: 1px solid rgba(0,0,0,0.07);
          border-radius: 2px; padding: 20px 22px; margin-top: 12px;
        }
        .legal-contact p {
          font-family: 'Outfit', sans-serif;
          font-size: 13.5px; font-weight: 400;
          color: #1a1816; opacity: 0.7; line-height: 1.9; margin: 0;
        }
        .legal-contact strong { font-weight: 600; }
      `}</style>

      <main className="legal-page">
        <div className="legal-top-bar" />

        <div className="legal-header">
          <div className="legal-inner">
            <span className="legal-eyebrow">Customer Service</span>
            <h1 className="legal-title">Shipping Policy</h1>
            <p className="legal-updated">
              How and when your Caseoholic order reaches you.
            </p>
          </div>
        </div>

        <div className="legal-inner">
          <div className="legal-body-wrap">

            <div className="legal-section">
              <span className="legal-section-num">01</span>
              <h2 className="legal-section-title">Delivery Timelines</h2>
              <p className="legal-body">
                All products purchased on caseoholic.in are typically dispatched within 1–2 working days. Once dispatched, orders are usually delivered within 5–7 working days, depending on your delivery location and courier partner performance.
              </p>
              <div className="legal-highlight">
                <p>📦 Estimated delivery: <strong>5–7 working days</strong> after dispatch.</p>
              </div>
            </div>

            <div className="legal-section">
              <span className="legal-section-num">02</span>
              <h2 className="legal-section-title">Order Processing</h2>
              <p className="legal-body">
                Orders placed on weekends or public holidays will be processed on the next working day. You will receive an email or SMS confirmation once your order has been shipped, along with tracking details where available.
              </p>
            </div>

            <div className="legal-section">
              <span className="legal-section-num">03</span>
              <h2 className="legal-section-title">Shipping Coverage</h2>
              <p className="legal-body">
                We currently ship across most pin codes in India through trusted courier partners. If your address is not serviceable, we will contact you to discuss alternatives or issue a full refund.
              </p>
            </div>

            <div className="legal-section">
              <span className="legal-section-num">04</span>
              <h2 className="legal-section-title">Delays</h2>
              <p className="legal-body">
                While we aim to meet the above timelines, unforeseen circumstances such as courier delays, weather conditions, or local restrictions may affect delivery times. Caseoholic is not liable for delays outside its reasonable control, but our support team will be happy to assist you in tracking your order.
              </p>
            </div>

            <div className="legal-section">
              <span className="legal-section-num">05</span>
              <h2 className="legal-section-title">Contact Us</h2>
              <p className="legal-body" style={{ marginBottom: 12 }}>
                For any questions about shipping or your order status, please reach out:
              </p>
              <div className="legal-contact">
                <p>
                  <strong>Email:</strong> steloratech@gmail.com<br />
                  <strong>Phone:</strong> 94650 00669<br />
                  <strong>Address:</strong> New Dashmesh Nagar, Jalandhar, Basti Guzan, Punjab — 144002
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  )
}