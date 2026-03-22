export default function PrivacyPage() {
  return (
    <>
      <style>{`
        .legal-page {
          padding-top: 80px;
          padding-bottom: 80px;
          background: #fafaf9;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
        }
        .legal-inner {
          max-width: 760px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .legal-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #a8a29e;
          margin-bottom: 10px;
        }
        .legal-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2rem, 4vw, 2.8rem);
          font-weight: 400;
          color: #1c1917;
          margin: 0 0 12px;
          letter-spacing: -0.02em;
        }
        .legal-updated {
          font-size: 12px;
          color: #a8a29e;
          margin-bottom: 28px;
        }
        .legal-section-title {
          font-size: 15px;
          font-weight: 600;
          color: #1c1917;
          margin: 22px 0 8px;
        }
        .legal-body {
          font-size: 14px;
          line-height: 1.8;
          color: #57534e;
        }
      `}</style>

      <main className="legal-page">
        <div className="legal-inner">
          <p className="legal-eyebrow">Legal</p>
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-updated">This Privacy Policy explains how Caseoholic collects and uses your information.</p>

          <section className="legal-body">
            <h2 className="legal-section-title">1. Information We Collect</h2>
            <p>
              We collect personal information such as your name, email address, shipping address, billing address,
              and payment details when you place an order, create an account, or sign up for our newsletter.
            </p>

            <h2 className="legal-section-title">2. How We Use Your Information</h2>
            <p>
              We use your information to process and fulfil your orders, communicate with you about your purchases,
              send updates and promotional communications (where permitted), and improve our products, services,
              and website experience.
            </p>

            <h2 className="legal-section-title">3. Cookies</h2>
            <p>
              We use cookies and similar technologies to personalise content, remember your preferences, analyse
              site traffic, and improve your browsing experience. You can control cookies through your browser
              settings, but disabling them may impact certain site features.
            </p>

            <h2 className="legal-section-title">4. Data Security</h2>
            <p>
              We take reasonable technical and organisational precautions to protect your personal information
              from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission
              over the internet is completely secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="legal-section-title">5. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or applicable
              laws. Any updates will be posted on this page, and your continued use of the website after such
              changes constitutes acceptance of the revised policy.
            </p>

            <h2 className="legal-section-title">6. Contact Information</h2>
            <p>
              Email: steloratech@gmail.com<br />
              Phone: 94650&nbsp;00669<br />
              Address: New Dashmesh Nagar, Jalandhar, Basti Guzan, Punjab&nbsp;&mdash;&nbsp;144002
            </p>

            <h2 className="legal-section-title">7. Ownership</h2>
            <p>
              Caseoholic is owned and operated by <strong>Vikram Bhagat</strong>.
            </p>
          </section>
        </div>
      </main>
    </>
  )
}

