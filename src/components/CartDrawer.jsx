import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart, cartItemKey } from "../contexts/CartContext";
import { formatPrice, FREE_SHIPPING_THRESHOLD } from "../data/products";

export default function CartDrawer() {
  const navigate = useNavigate();
  const {
    items,
    totalItems,
    totalAmount,
    shippingGap,
    open,
    setOpen,
    removeItem,
    updateQty,
  } = useCart();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const pct = Math.min(100, (totalAmount / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <>
      <style>{`
        .cd-backdrop {
          position: fixed; inset: 0; background: rgba(0,0,0,0.45);
          backdrop-filter: blur(2px); z-index: 200;
          opacity: 0; pointer-events: none;
          transition: opacity 0.35s ease;
        }
        .cd-backdrop.open { opacity: 1; pointer-events: auto; }

        .cd-panel {
          position: fixed; top: 0; right: 0; bottom: 0;
          width: min(420px, 100vw);
          background: #fff;
          z-index: 201;
          display: flex; flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.38s cubic-bezier(0.4,0,0.2,1);
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
        }
        .cd-panel.open { transform: translateX(0); }

        .cd-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid #f0eeea;
          flex-shrink: 0;
        }
        .cd-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.35rem; font-weight: 400; color: #1c1917;
          letter-spacing: -0.01em;
        }
        .cd-close {
          width: 34px; height: 34px; border-radius: 50%;
          border: 1px solid #e0ddd9; background: #fff;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #57534e;
          transition: all 0.2s ease;
        }
        .cd-close:hover { background: #1c1917; color: #fff; border-color: #1c1917; }
        .cd-close svg { width: 14px; height: 14px; }

        /* Shipping bar */
        .cd-ship-bar {
          padding: 12px 24px;
          background: #fafaf9;
          border-bottom: 1px solid #f0eeea;
          flex-shrink: 0;
        }
        .cd-ship-text {
          font-size: 11.5px; color: #78716c;
          margin-bottom: 8px; line-height: 1.4;
        }
        .cd-ship-text strong { color: #1c1917; }
        .cd-ship-track {
          height: 3px; background: #e7e5e4; border-radius: 2px; overflow: hidden;
        }
        .cd-ship-fill {
          height: 100%; background: #d97706; border-radius: 2px;
          transition: width 0.5s ease;
        }

        /* Items */
        .cd-items {
          flex: 1; overflow-y: auto; padding: 8px 0;
        }
        .cd-empty {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; height: 100%;
          gap: 12px; color: #a8a29e; padding: 40px 24px;
          text-align: center;
        }
        .cd-empty svg { width: 48px; height: 48px; opacity: 0.3; }
        .cd-empty p { font-size: 14px; line-height: 1.5; }
        .cd-empty a {
          font-size: 11px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: #1c1917; text-decoration: none;
          border-bottom: 1px solid #1c1917; padding-bottom: 2px;
          transition: opacity 0.2s;
        }
        .cd-empty a:hover { opacity: 0.6; }

        .cd-item {
          display: flex; gap: 14px; padding: 16px 24px;
          border-bottom: 1px solid #f5f5f3;
        }
        .cd-item-img {
          width: 72px; height: 72px; border-radius: 2px;
          background: #f0eeea; flex-shrink: 0; overflow: hidden;
        }
        .cd-item-img img {
          width: 100%; height: 100%; object-fit: cover;
        }
        .cd-item-info { flex: 1; min-width: 0; }
        .cd-item-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 14px; font-weight: 400; color: #1c1917;
          margin: 0 0 3px; line-height: 1.3;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .cd-item-meta {
          font-size: 11px; color: #a8a29e; margin-bottom: 10px;
          line-height: 1.4;
        }
        .cd-item-row {
          display: flex; align-items: center; justify-content: space-between;
          gap: 8px;
        }
        .cd-qty {
          display: flex; align-items: center; gap: 0;
          border: 1px solid #e0ddd9; border-radius: 2px;
        }
        .cd-qty-btn {
          width: 28px; height: 28px;
          display: flex; align-items: center; justify-content: center;
          background: none; border: none; cursor: pointer;
          color: #44403c; font-size: 14px;
          transition: background 0.15s;
        }
        .cd-qty-btn:hover { background: #f5f5f3; }
        .cd-qty-num {
          width: 28px; text-align: center;
          font-size: 12px; font-weight: 600; color: #1c1917;
        }
        .cd-item-price {
          font-size: 14px; font-weight: 700; color: #1c1917;
          letter-spacing: -0.02em;
          font-family: 'Cormorant Garamond', Georgia, serif;
        }
        .cd-remove {
          font-size: 10px; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; color: #a8a29e;
          background: none; border: none; cursor: pointer;
          padding: 0; font-family: inherit;
          transition: color 0.2s;
        }
        .cd-remove:hover { color: #ef4444; }

        /* Footer */
        .cd-foot {
          padding: 20px 24px 28px;
          border-top: 1px solid #f0eeea;
          flex-shrink: 0;
        }
        .cd-summary {
          display: flex; flex-direction: column; gap: 8px;
          margin-bottom: 16px;
        }
        .cd-summary-row {
          display: flex; justify-content: space-between;
          font-size: 13px; color: #57534e;
        }
        .cd-summary-row.total {
          font-size: 16px; font-weight: 700; color: #1c1917;
          margin-top: 4px; padding-top: 12px;
          border-top: 1px solid #f0eeea;
        }
        .cd-checkout {
          display: block; width: 100%;
          background: #1c1917; color: #fff;
          border: none; border-radius: 2px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          padding: 15px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; text-align: center;
          text-decoration: none; cursor: pointer;
          transition: background 0.25s ease, transform 0.25s ease;
          margin-bottom: 10px;
        }
        .cd-checkout:hover { background: #292524; transform: translateY(-1px); }
        .cd-continue {
          display: block; width: 100%; text-align: center;
          font-size: 11px; font-weight: 600; letter-spacing: 0.15em;
          text-transform: uppercase; color: #78716c;
          background: none; border: none; cursor: pointer;
          padding: 8px; font-family: inherit;
          transition: color 0.2s;
        }
        .cd-continue:hover { color: #1c1917; }
      `}</style>

      {/* Backdrop */}
      <div
        className={`cd-backdrop ${open ? "open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`cd-panel ${open ? "open" : ""}`}
        role="dialog"
        aria-label="Your cart"
        aria-modal="true"
      >
        {/* Header */}
        <div className="cd-head">
          <span className="cd-title">
            Your Bag{" "}
            {totalItems > 0 && (
              <span style={{ fontSize: "0.9rem", color: "#a8a29e" }}>
                ({totalItems})
              </span>
            )}
          </span>
          <button
            className="cd-close"
            onClick={() => setOpen(false)}
            aria-label="Close cart"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Free shipping bar */}
        {totalItems > 0 && (
          <div className="cd-ship-bar">
            <p className="cd-ship-text">
              {shippingGap <= 0 ? (
                <>
                  <strong>You've unlocked free shipping!</strong> 🎉
                </>
              ) : (
                <>
                  Add <strong>{formatPrice(shippingGap)}</strong> more for{" "}
                  <strong>free shipping</strong>
                </>
              )}
            </p>
            <div className="cd-ship-track">
              <div className="cd-ship-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="cd-items">
          {items.length === 0 ? (
            <div className="cd-empty">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <p>
                Your bag is empty.
                <br />
                Time to find something you love.
              </p>
              <Link to="/collections/all" onClick={() => setOpen(false)}>
                Shop All
              </Link>
            </div>
          ) : (
            items.map((item) => {
              const k = cartItemKey(item);
              return (
                <div key={k} className="cd-item">
                  <div className="cd-item-img">
                    {item.image && <img src={item.image} alt={item.name} />}
                  </div>
                  <div className="cd-item-info">
                    <p className="cd-item-name">{item.name}</p>
                    <p className="cd-item-meta">
                      {[item.model, item.color].filter(Boolean).join(" · ")}
                    </p>
                    <div className="cd-item-row">
                      <div className="cd-qty">
                        <button
                          className="cd-qty-btn"
                          onClick={() => updateQty(k, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="cd-qty-num">{item.quantity}</span>
                        <button
                          className="cd-qty-btn"
                          onClick={() => updateQty(k, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className="cd-item-price">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                    <button className="cd-remove" onClick={() => removeItem(k)}>
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cd-foot">
            <div className="cd-summary">
              <div className="cd-summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>
              <div className="cd-summary-row">
                <span>Shipping</span>
                <span>
                  {shippingGap <= 0 ? "FREE" : "Calculated at checkout"}
                </span>
              </div>
              <div className="cd-summary-row total">
                <span>Total</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>
            </div>
            <button
              type="button"
              className="cd-checkout"
              onClick={() => {
                setOpen(false);
                navigate("/checkout");
              }}
            >
              Proceed to Checkout
            </button>
            <button className="cd-continue" onClick={() => setOpen(false)}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
