export default function ShippingPage() {
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
          <p className="legal-eyebrow">Customer Service</p>
          <h1 className="legal-title">Shipping Policy</h1>
          <p className="legal-updated">How and when your Caseoholic order reaches you.</p>

          <section className="legal-body">
            <h2 className="legal-section-title">Delivery Timelines</h2>
            <p>
              All products purchased on caseoholic.in are typically dispatched within 1–2 working days.
              Once dispatched, orders are usually delivered within <strong>5–7 working days</strong>,
              depending on your delivery location and courier partner performance.
            </p>

            <h2 className="legal-section-title">Order Processing</h2>
            <p>
              Orders placed on weekends or public holidays will be processed on the next working day.
              You will receive an email or SMS confirmation once your order has been shipped, along with
              tracking details where available.
            </p>

            <h2 className="legal-section-title">Shipping Coverage</h2>
            <p>
              We currently ship across most pin codes in India through trusted courier partners. If your
              address is not serviceable, we will contact you to discuss alternatives or issue a refund.
            </p>

            <h2 className="legal-section-title">Delays</h2>
            <p>
              While we aim to meet the above timelines, unforeseen circumstances such as courier delays,
              weather conditions, or local restrictions may affect delivery times. Caseoholic is not
              liable for delays outside its reasonable control, but our support team will be happy to
              assist you in tracking your order.
            </p>

            <h2 className="legal-section-title">Contact Information</h2>
            <p>
              For any questions about shipping or your order status, please reach out:<br />
              Email: steloratech@gmail.com<br />
              Phone: 94650&nbsp;00669<br />
              Address: New Dashmesh Nagar, Jalandhar, Basti Guzan, Punjab&nbsp;&mdash;&nbsp;144002
            </p>
          </section>
        </div>
      </main>
    </>
  )
}

