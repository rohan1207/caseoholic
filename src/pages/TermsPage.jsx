export default function TermsPage() {
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
          <h1 className="legal-title">Terms and Conditions</h1>
          <p className="legal-updated">By accessing or using caseoholic.in, you agree to the terms below.</p>

          <section className="legal-body">
            <h2 className="legal-section-title">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the caseoholic.in website, you acknowledge that you have read, understood,
              and agree to be bound by these Terms and Conditions and all applicable laws and regulations.
            </p>

            <h2 className="legal-section-title">2. User Conduct</h2>
            <p>
              You agree not to engage in any activity that disrupts or interferes with the proper functioning of
              the website or its services, including but not limited to attempting to gain unauthorized access,
              introducing malicious code, or abusing any feature of the site.
            </p>

            <h2 className="legal-section-title">3. Intellectual Property</h2>
            <p>
              All content, trademarks, logos, graphics, and materials available on caseoholic.in are the property
              of Caseoholic or its licensors and are protected by applicable intellectual property laws. You may
              not reproduce, distribute, modify, or create derivative works from any content without prior written
              consent.
            </p>

            <h2 className="legal-section-title">4. Limitation of Liability</h2>
            <p>
              Caseoholic shall not be liable for any indirect, incidental, special, consequential, or punitive
              damages arising out of or related to your access to or use of the website, including but not limited
              to loss of data, loss of profits, or business interruption.
            </p>

            <h2 className="legal-section-title">5. Indemnification</h2>
            <p>
              You agree to indemnify and hold Caseoholic, its owners, affiliates, employees, and agents harmless
              from any claims, losses, liabilities, damages, costs, and expenses (including reasonable legal fees)
              arising out of or relating to your use of the website or any violation of these Terms and Conditions.
            </p>

            <h2 className="legal-section-title">6. Governing Law</h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of India,
              without regard to its conflict of law principles. Any disputes shall be subject to the exclusive
              jurisdiction of the courts in Punjab, India.
            </p>

            <h2 className="legal-section-title">7. Contact Information</h2>
            <p>
              Email: steloratech@gmail.com<br />
              Phone: 94650&nbsp;00669<br />
              Address: New Dashmesh Nagar, Jalandhar, Basti Guzan, Punjab&nbsp;&mdash;&nbsp;144002
            </p>

            <h2 className="legal-section-title">8. Ownership</h2>
            <p>
              Caseoholic is owned and operated by <strong>Vikram Bhagat</strong>.
            </p>
          </section>
        </div>
      </main>
    </>
  )
}

