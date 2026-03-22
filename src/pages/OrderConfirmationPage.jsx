import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { formatPrice } from "../data/products";

const ORDER_NUM = `CO-${Math.floor(10000 + Math.random() * 90000)}`;

export default function OrderConfirmationPage() {
  const { items, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <style>{`
        .oc-page {
          min-height: 100vh; background: #fafaf9;
          padding: 120px 24px 80px;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          display: flex; flex-direction: column; align-items: center;
        }
        .oc-card {
          background: #fff; border: 1px solid #f0eeea; border-radius: 3px;
          max-width: 560px; width: 100%; padding: 48px 40px;
          text-align: center;
        }
        @media (max-width: 480px) { .oc-card { padding: 36px 24px; } }

        .oc-icon {
          width: 64px; height: 64px; border-radius: 50%;
          background: #d1fae5; display: flex; align-items: center;
          justify-content: center; margin: 0 auto 24px;
        }
        .oc-icon svg { width: 32px; height: 32px; color: #065f46; }

        .oc-eyebrow {
          font-size: 10px; font-weight: 700; letter-spacing: 0.28em;
          text-transform: uppercase; color: #a8a29e; margin-bottom: 8px;
        }
        .oc-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 400; color: #1c1917; margin: 0 0 10px;
          letter-spacing: -0.02em;
        }
        .oc-title em { font-style: italic; color: #d97706; }
        .oc-sub {
          font-size: 14px; color: #78716c; line-height: 1.6; margin-bottom: 28px;
        }

        .oc-order-id {
          display: inline-block;
          background: #fafaf9; border: 1px solid #f0eeea;
          border-radius: 2px; padding: 10px 20px;
          font-size: 13px; font-weight: 700; color: #1c1917;
          letter-spacing: 0.08em; margin-bottom: 32px;
        }

        .oc-steps {
          display: flex; gap: 0; justify-content: center;
          margin-bottom: 32px; position: relative;
        }
        .oc-steps::before {
          content: ''; position: absolute;
          top: 16px; left: 40px; right: 40px;
          height: 1px; background: #f0eeea; z-index: 0;
        }
        .oc-step {
          display: flex; flex-direction: column; align-items: center;
          gap: 6px; flex: 1; position: relative; z-index: 1;
        }
        .oc-step-dot {
          width: 32px; height: 32px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700;
        }
        .oc-step-dot.done { background: #d1fae5; color: #065f46; }
        .oc-step-dot.active { background: #1c1917; color: #fff; }
        .oc-step-dot.pending { background: #f0eeea; color: #a8a29e; }
        .oc-step-label { font-size: 10px; color: #a8a29e; text-align: center; letter-spacing: 0.04em; }

        .oc-divider { border: none; border-top: 1px solid #f0eeea; margin: 0 0 24px; }

        .oc-actions {
          display: flex; flex-direction: column; gap: 10px;
        }
        .oc-primary {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          background: #1c1917; color: #fff;
          padding: 14px; border-radius: 2px; text-decoration: none;
          font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;
          transition: background 0.2s;
        }
        .oc-primary:hover { background: #292524; }
        .oc-primary svg { width: 14px; height: 14px; }
        .oc-secondary {
          display: block; text-align: center;
          font-size: 12px; color: #a8a29e; text-decoration: none;
          transition: color 0.2s;
        }
        .oc-secondary:hover { color: #1c1917; }
      `}</style>

      <div className="oc-page">
        <div className="oc-card">
          <div className="oc-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          <p className="oc-eyebrow">Order Confirmed</p>
          <h1 className="oc-title">
            Thank you for
            <br />
            <em>your order!</em>
          </h1>
          <p className="oc-sub">
            You'll receive a confirmation email shortly with tracking details.
            We typically dispatch within 1–2 business days.
          </p>

          <div className="oc-order-id">Order {ORDER_NUM}</div>

          {/* Progress steps */}
          <div className="oc-steps">
            {[
              { label: "Confirmed", state: "done" },
              { label: "Processing", state: "active" },
              { label: "Shipped", state: "pending" },
              { label: "Delivered", state: "pending" },
            ].map((step) => (
              <div key={step.label} className="oc-step">
                <div className={`oc-step-dot ${step.state}`}>
                  {step.state === "done" ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                      style={{ width: 14, height: 14 }}
                    >
                      <path d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  ) : step.state === "active" ? (
                    "→"
                  ) : (
                    "·"
                  )}
                </div>
                <span className="oc-step-label">{step.label}</span>
              </div>
            ))}
          </div>

          <hr className="oc-divider" />

          <div className="oc-actions">
            <Link to="/collections/all" className="oc-primary">
              Continue Shopping
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link to="/account" className="oc-secondary">
              View your orders in My Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
