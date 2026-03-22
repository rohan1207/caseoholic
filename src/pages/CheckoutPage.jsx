import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { formatPrice } from "../data/products";
import { isWooCommerceEnabled, getCheckoutUrl, getOrderPayUrl } from "../config/woocommerce.js";
import { createCheckoutOrder } from "../services/woocommerceClient.js";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { items, totalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    firstName: user?.name?.split(" ")[0] ?? "",
    lastName: user?.name?.split(" ").slice(1).join(" ") ?? "",
    email: user?.email ?? "",
    phone: "",
    address1: "",
    city: "",
    state: "",
    postcode: "",
    country: "IN",
  });

  const wcLineItems = items
    .filter((i) => i.wcProductId != null)
    .map((i) => {
      const line = { product_id: Number(i.wcProductId), quantity: i.quantity };
      if (i.wcVariationId) line.variation_id = Number(i.wcVariationId);
      return line;
    });

  const hasWcItems = wcLineItems.length > 0;
  const hybridUrl = getCheckoutUrl();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!items.length) { toast.error("Your bag is empty"); return; }
    if (!form.email || !form.firstName || !form.address1 || !form.city || !form.postcode) {
      toast.error("Please fill required fields"); return;
    }
    if (!isWooCommerceEnabled()) {
      toast.success("Demo mode — order not sent to a server");
      navigate("/order-confirmation"); return;
    }
    if (!hasWcItems) {
      toast.error("Cart items are from the demo catalog. Add products from WooCommerce to checkout.");
      return;
    }
    setBusy(true);
    try {
      const billing = {
        first_name: form.firstName, last_name: form.lastName,
        email: form.email, phone: form.phone,
        address_1: form.address1, city: form.city,
        state: form.state, postcode: form.postcode, country: form.country,
      };
      const payload = {
        payment_method: "cod", payment_method_title: "Cash on Delivery",
        set_paid: false,
        customer_id: user?.wooCustomerId ? Number(user.wooCustomerId) : 0,
        billing, shipping: billing, line_items: wcLineItems,
      };
      const order = await createCheckoutOrder(payload);
      clearCart();
      const payUrl = order.payment_url || getOrderPayUrl(order);
      if (payUrl) { window.location.href = payUrl; }
      else { toast.success(`Order #${order.id} placed`); navigate("/account"); }
    } catch (err) {
      toast.error(err.message || "Checkout failed");
    } finally {
      setBusy(false);
    }
  };

  const f = (key) => ({ value: form[key], onChange: (e) => setForm({ ...form, [key]: e.target.value }) });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

        .co-page {
          min-height: 100vh;
          background: #fafaf9;
          padding-top: 88px; padding-bottom: 80px;
          font-family: 'Outfit', sans-serif;
          color: #1a1816;
          -webkit-font-smoothing: antialiased;
        }
        @media (max-width: 767px) { .co-page { padding-top: 72px; padding-bottom: 56px; } }

        .co-inner {
          max-width: 980px; margin: 0 auto;
          padding: 48px 2.5rem 0;
        }
        @media (max-width: 767px) { .co-inner { padding: 32px 1.25rem 0; } }

        /* ── Page header ── */
        .co-page-header { margin-bottom: 36px; }
        .co-eyebrow {
          font-family: 'Outfit', sans-serif;
          font-size: 9.5px; font-weight: 600; letter-spacing: 0.22em;
          text-transform: uppercase; color: #1a1816; opacity: 0.4;
          display: block; margin-bottom: 8px;
        }
        .co-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 700; color: #1a1816; margin: 0 0 8px;
          letter-spacing: -0.02em; line-height: 1.1;
        }
        .co-sub {
          font-family: 'Outfit', sans-serif;
          font-size: 13.5px; font-weight: 300; color: #1a1816; opacity: 0.5;
          line-height: 1.6; margin: 0;
        }

        /* ── Main grid: form left, summary right ── */
        .co-grid {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 40px; align-items: start;
        }
        @media (max-width: 900px) {
          .co-grid { grid-template-columns: 1fr; gap: 0; }
        }

        /* ── Section heading ── */
        .co-section-head {
          font-family: 'Outfit', sans-serif;
          font-size: 9.5px; font-weight: 600; letter-spacing: 0.2em;
          text-transform: uppercase; color: #1a1816; opacity: 0.4;
          margin: 0 0 20px; padding-bottom: 12px;
          border-bottom: 1px solid rgba(0,0,0,0.07);
          display: block;
        }

        /* ── Form card ── */
        .co-form-card {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 2px; padding: 28px 28px 32px;
        }
        @media (max-width: 480px) { .co-form-card { padding: 20px 18px 24px; } }

        /* ── Form elements ── */
        .co-label {
          display: block;
          font-family: 'Outfit', sans-serif;
          font-size: 10px; font-weight: 600; letter-spacing: 0.16em;
          text-transform: uppercase; color: #1a1816; opacity: 0.5;
          margin-bottom: 6px;
        }
        .co-input {
          width: 100%; padding: 12px 13px;
          border: 1px solid rgba(0,0,0,0.14); border-radius: 2px;
          font-family: 'Outfit', sans-serif;
          font-size: 14px; font-weight: 400; color: #1a1816;
          background: #fff; outline: none;
          box-sizing: border-box; margin-bottom: 16px;
          transition: border-color 0.2s;
          -webkit-appearance: none;
        }
        .co-input:focus { border-color: #1a1816; }
        .co-input::placeholder { color: rgba(26,24,22,0.28); }

        /* Two column layout within form */
        .co-row2 {
          display: grid; grid-template-columns: 1fr 1fr; gap: 14px;
        }
        @media (max-width: 400px) { .co-row2 { grid-template-columns: 1fr; gap: 0; } }

        /* Submit button */
        .co-submit {
          width: 100%; padding: 15px;
          background: #1a1816; color: #fff; border: none; border-radius: 2px;
          font-family: 'Outfit', sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; cursor: pointer; margin-top: 8px;
          transition: background 0.2s, transform 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .co-submit:hover:not(:disabled) { background: #0f0f0f; transform: translateY(-1px); }
        .co-submit:disabled { opacity: 0.5; cursor: not-allowed; }

        /* Hybrid link */
        .co-hybrid {
          font-family: 'Outfit', sans-serif;
          font-size: 12px; font-weight: 400; color: #1a1816; opacity: 0.45;
          line-height: 1.65; margin-top: 16px;
        }
        .co-hybrid a {
          color: #1a1816; opacity: 1; font-weight: 600;
          text-decoration: underline; text-underline-offset: 3px;
        }

        /* ── Order summary sidebar ── */
        .co-side {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 2px; padding: 24px;
          position: sticky; top: 108px;
        }
        @media (max-width: 900px) {
          .co-side {
            position: static;
            margin-top: 24px;
            border-top: 1px solid rgba(0,0,0,0.07);
            border-radius: 0; border-left: none; border-right: none; border-bottom: none;
            padding: 24px 0 0;
            background: transparent;
          }
        }

        .co-summary-label {
          font-family: 'Outfit', sans-serif;
          font-size: 9.5px; font-weight: 600; letter-spacing: 0.2em;
          text-transform: uppercase; color: #1a1816; opacity: 0.4;
          display: block; margin-bottom: 18px;
        }

        /* Line items */
        .co-line-item {
          display: flex; align-items: center; gap: 12px; margin-bottom: 14px;
        }
        .co-line-img {
          width: 48px; height: 48px; flex-shrink: 0;
          background: #f5f4f2; border-radius: 2px; overflow: hidden;
        }
        .co-line-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .co-line-info { flex: 1; min-width: 0; }
        .co-line-name {
          font-family: 'Outfit', sans-serif;
          font-size: 12.5px; font-weight: 500; color: #1a1816;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          margin-bottom: 2px;
        }
        .co-line-meta {
          font-family: 'Outfit', sans-serif;
          font-size: 11px; font-weight: 400; color: #1a1816; opacity: 0.4;
        }
        .co-line-price {
          font-family: 'Outfit', sans-serif;
          font-size: 13px; font-weight: 600; color: #1a1816; flex-shrink: 0;
        }

        /* Totals */
        .co-totals { border-top: 1px solid rgba(0,0,0,0.07); margin-top: 16px; padding-top: 16px; }
        .co-total-row {
          display: flex; justify-content: space-between; align-items: baseline;
          margin-bottom: 8px;
        }
        .co-total-label {
          font-family: 'Outfit', sans-serif;
          font-size: 12px; font-weight: 400; color: #1a1816; opacity: 0.45;
        }
        .co-total-value {
          font-family: 'Outfit', sans-serif;
          font-size: 12px; font-weight: 500; color: #1a1816;
        }
        .co-grand-row {
          display: flex; justify-content: space-between; align-items: baseline;
          margin-top: 14px; padding-top: 14px;
          border-top: 1px solid rgba(0,0,0,0.07);
        }
        .co-grand-label {
          font-family: 'Outfit', sans-serif;
          font-size: 11px; font-weight: 600; letter-spacing: 0.12em;
          text-transform: uppercase; color: #1a1816; opacity: 0.5;
        }
        .co-grand-value {
          font-family: 'Outfit', sans-serif;
          font-size: 18px; font-weight: 700; color: #1a1816; letter-spacing: -0.01em;
        }

        /* Warning */
        .co-warn {
          font-family: 'Outfit', sans-serif;
          font-size: 12px; font-weight: 400; color: #92400e;
          background: #fffbeb; border: 1px solid #fde68a;
          border-radius: 2px; padding: 10px 12px; margin-top: 14px;
          line-height: 1.6;
        }

        /* Empty cart */
        .co-empty {
          font-family: 'Outfit', sans-serif;
          font-size: 14px; font-weight: 400; color: #1a1816; opacity: 0.5;
          padding: 48px 0; line-height: 1.7;
        }
        .co-empty a {
          color: #1a1816; opacity: 1; font-weight: 600;
          text-decoration: underline; text-underline-offset: 3px;
        }

        /* Trust badges */
        .co-trust {
          display: flex; flex-wrap: wrap; gap: 16px;
          margin-top: 20px; padding-top: 20px;
          border-top: 1px solid rgba(0,0,0,0.07);
        }
        .co-trust-item {
          display: flex; align-items: center; gap: 6px;
          font-family: 'Outfit', sans-serif;
          font-size: 11px; font-weight: 400; color: #1a1816; opacity: 0.45;
        }
        .co-trust-item svg { width: 13px; height: 13px; flex-shrink: 0; }
      `}</style>

      <div className="co-page">
        <div className="co-inner">

          {/* Page header */}
          <div className="co-page-header">
            <span className="co-eyebrow">Caseoholic</span>
            <h1 className="co-title">Checkout</h1>
            <p className="co-sub">
              {isWooCommerceEnabled()
                ? "Complete your details below. You'll be redirected to pay securely."
                : "Demo checkout — connect WooCommerce to place real orders."}
            </p>
          </div>

          {items.length === 0 ? (
            <p className="co-empty">
              Your bag is empty.{" "}
              <Link to="/collections/all">Continue shopping</Link>
            </p>
          ) : (
            <div className="co-grid">

              {/* ── LEFT: Form ── */}
              <div>
                <div className="co-form-card">
                  <span className="co-section-head">Delivery Information</span>

                  <form onSubmit={handleSubmit}>
                    <div className="co-row2">
                      <div>
                        <label className="co-label" htmlFor="co-fn">First name *</label>
                        <input id="co-fn" className="co-input" required placeholder="Rahul" {...f("firstName")} />
                      </div>
                      <div>
                        <label className="co-label" htmlFor="co-ln">Last name *</label>
                        <input id="co-ln" className="co-input" required placeholder="Sharma" {...f("lastName")} />
                      </div>
                    </div>

                    <label className="co-label" htmlFor="co-em">Email *</label>
                    <input id="co-em" className="co-input" type="email" required placeholder="you@email.com" {...f("email")} />

                    <label className="co-label" htmlFor="co-ph">Phone</label>
                    <input id="co-ph" className="co-input" type="tel" placeholder="+91 98765 43210" {...f("phone")} />

                    <label className="co-label" htmlFor="co-a1">Address *</label>
                    <input id="co-a1" className="co-input" required placeholder="House / Flat no., Street, Area" {...f("address1")} />

                    <div className="co-row2">
                      <div>
                        <label className="co-label" htmlFor="co-city">City *</label>
                        <input id="co-city" className="co-input" required placeholder="Mumbai" {...f("city")} />
                      </div>
                      <div>
                        <label className="co-label" htmlFor="co-st">State</label>
                        <input id="co-st" className="co-input" placeholder="Maharashtra" {...f("state")} />
                      </div>
                    </div>

                    <div className="co-row2">
                      <div>
                        <label className="co-label" htmlFor="co-pc">PIN code *</label>
                        <input id="co-pc" className="co-input" required placeholder="400001" {...f("postcode")} />
                      </div>
                      <div>
                        <label className="co-label" htmlFor="co-ct">Country</label>
                        <input id="co-ct" className="co-input" placeholder="IN" {...f("country")} />
                      </div>
                    </div>

                    <button type="submit" className="co-submit" disabled={busy}>
                      {busy ? (
                        "Placing order…"
                      ) : isWooCommerceEnabled() && hasWcItems ? (
                        <>
                          Place Order & Pay
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </>
                      ) : (
                        "Place Order (Demo)"
                      )}
                    </button>

                    {isWooCommerceEnabled() && hybridUrl && (
                      <p className="co-hybrid">
                        Prefer the full WooCommerce checkout?{" "}
                        <a href={hybridUrl} target="_blank" rel="noreferrer">Open WordPress checkout</a>
                      </p>
                    )}
                  </form>
                </div>

                {/* Trust badges */}
                <div className="co-trust">
                  <span className="co-trust-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                    Secure checkout
                  </span>
                  <span className="co-trust-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    30-day returns
                  </span>
                  <span className="co-trust-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                    Free shipping ₹499+
                  </span>
                </div>
              </div>

              {/* ── RIGHT: Order summary ── */}
              <aside className="co-side">
                <span className="co-summary-label">Order Summary</span>

                {items.map((i) => (
                  <div key={`${i.productId}-${i.wcVariationId}-${i.model}`} className="co-line-item">
                    <div className="co-line-img">
                      {i.image
                        ? <img src={i.image} alt={i.name} />
                        : <span style={{ display: "block", width: "100%", height: "100%", background: "#f5f4f2" }} />
                      }
                    </div>
                    <div className="co-line-info">
                      <p className="co-line-name">{i.name}</p>
                      <p className="co-line-meta">
                        {[i.model, i.color].filter(Boolean).join(" · ")} · Qty {i.quantity}
                      </p>
                    </div>
                    <span className="co-line-price">{formatPrice(i.price * i.quantity)}</span>
                  </div>
                ))}

                <div className="co-totals">
                  <div className="co-total-row">
                    <span className="co-total-label">Subtotal</span>
                    <span className="co-total-value">{formatPrice(totalAmount)}</span>
                  </div>
                  <div className="co-total-row">
                    <span className="co-total-label">Shipping</span>
                    <span className="co-total-value">
                      {totalAmount >= 499 ? "Free" : formatPrice(49)}
                    </span>
                  </div>
                  <div className="co-grand-row">
                    <span className="co-grand-label">Total</span>
                    <span className="co-grand-value">
                      {formatPrice(totalAmount >= 499 ? totalAmount : totalAmount + 49)}
                    </span>
                  </div>
                </div>

                {isWooCommerceEnabled() && !hasWcItems && (
                  <p className="co-warn">
                    No WooCommerce products in cart. Browse the live catalog and add products from WordPress.
                  </p>
                )}
              </aside>
            </div>
          )}
        </div>
      </div>
    </>
  );
}