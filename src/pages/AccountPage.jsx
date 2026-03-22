import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { isWooCommerceEnabled } from "../config/woocommerce.js";
import { fetchOrdersForCustomer } from "../services/woocommerceClient.js";
import { formatPrice } from "../data/products";
import toast from "react-hot-toast";

function getOrderMeta(order, keys) {
  const meta = order.meta_data || [];
  for (const k of keys) {
    const m = meta.find((x) => x.key === k);
    if (m != null && m.value !== "" && m.value != null) return String(m.value);
  }
  return "";
}

function formatOrderMoney(order) {
  const total = Number(order.total);
  const cur = order.currency || "INR";
  try {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: cur }).format(total);
  } catch {
    return formatPrice(total);
  }
}

const TABS = ["Orders", "Wishlist", "Details", "Addresses"];

const MOCK_ORDERS = [
  {
    id: "CO-10428", date: "Feb 12, 2026", status: "Delivered", total: 79.98,
    items: [
      { name: "Full-Grain Leather Case", model: "iPhone 15 Pro", color: "Cognac", qty: 1, price: 49.99, img: "/product4_1.webp" },
      { name: "Sport Silicone Band", model: "45mm", color: "Midnight Black", qty: 1, price: 19.99, img: "/bands.avif" },
    ],
  },
  {
    id: "CO-09871", date: "Jan 28, 2026", status: "Shipped", total: 24.99,
    items: [
      { name: "Leather AirPods Pro Case", model: "AirPods Pro 2nd Gen", color: "Saddle Brown", qty: 1, price: 24.99, img: "/airpods.jpg" },
    ],
  },
];

const SHARED_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

  /* ── Inputs ── */
  .ac-label {
    display: block;
    font-family: 'Outfit', sans-serif;
    font-size: 10px; font-weight: 600; letter-spacing: 0.16em;
    text-transform: uppercase; color: #1a1816; opacity: 0.5;
    margin-bottom: 6px;
  }
  .ac-input {
    width: 100%; padding: 12px 14px;
    border: 1px solid rgba(0,0,0,0.14); border-radius: 2px;
    font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 400;
    color: #1a1816; background: #fff; outline: none;
    margin-bottom: 16px; transition: border-color 0.2s; box-sizing: border-box;
  }
  .ac-input:focus { border-color: #1a1816; }
  .ac-input::placeholder { color: rgba(26,24,22,0.3); }

  .ac-submit {
    width: 100%; padding: 14px;
    background: #1a1816; color: #fff;
    border: none; border-radius: 2px;
    font-family: 'Outfit', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    cursor: pointer; transition: background 0.2s; margin-bottom: 14px;
  }
  .ac-submit:hover { background: #0f0f0f; }
`;

export default function AccountPage() {
  const { user, loginWithCredentials, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("Orders");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupMode, setSignupMode] = useState(false);
  const [wcOrders, setWcOrders] = useState([]);
  const [wcLoading, setWcLoading] = useState(false);

  useEffect(() => {
    if (!isWooCommerceEnabled() || !user?.wooCustomerId) { setWcOrders([]); return; }
    let cancelled = false;
    setWcLoading(true);
    fetchOrdersForCustomer(user.wooCustomerId)
      .then((data) => { if (!cancelled) setWcOrders(Array.isArray(data) ? data : []); })
      .catch(() => { if (!cancelled) setWcOrders([]); })
      .finally(() => { if (!cancelled) setWcLoading(false); });
    return () => { cancelled = true; };
  }, [user?.wooCustomerId]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) { toast.error("Please fill all fields"); return; }
    if (signupMode && isWooCommerceEnabled()) {
      toast("Create your account in WordPress (WooCommerce → My Account), then sign in here.");
      return;
    }
    try {
      await loginWithCredentials({ email: loginForm.email, password: loginForm.password });
      toast.success("Signed in successfully");
    } catch (err) {
      toast.error(err.message || "Login failed");
    }
  };

  const handleLogout = () => { logout(); toast("Signed out"); };

  // ── LOGIN / SIGNUP ──────────────────────────────────────────────────────────
  if (!user) {
    return (
      <>
        <style>{`
          ${SHARED_STYLES}

          .ac-auth {
            min-height: 100vh;
            background: #fafaf9;
            display: flex; align-items: center; justify-content: center;
            padding: 108px 20px 64px;
            font-family: 'Outfit', sans-serif;
          }

          .ac-auth-card {
            background: #fff;
            border: 1px solid rgba(0,0,0,0.08);
            border-radius: 2px;
            padding: 44px 40px;
            width: 100%; max-width: 400px;
          }
          @media (max-width: 480px) {
            .ac-auth-card { padding: 32px 24px; }
          }

          .ac-auth-eyebrow {
            font-family: 'Outfit', sans-serif;
            font-size: 9.5px; font-weight: 600; letter-spacing: 0.22em;
            text-transform: uppercase; color: #1a1816; opacity: 0.4;
            margin-bottom: 10px; display: block;
          }
          .ac-auth-title {
            font-family: 'Outfit', sans-serif;
            font-size: 1.75rem; font-weight: 700; color: #1a1816;
            margin: 0 0 32px; letter-spacing: -0.02em; line-height: 1.1;
          }
          .ac-auth-title span { opacity: 0.3; font-weight: 300; }

          .ac-toggle {
            font-family: 'Outfit', sans-serif;
            font-size: 12.5px; font-weight: 400; color: #1a1816;
            opacity: 0.5; text-align: center; margin-top: 4px;
          }
          .ac-toggle button {
            background: none; border: none; color: #1a1816; opacity: 1;
            font-weight: 600; cursor: pointer; font-family: inherit;
            font-size: inherit; text-decoration: underline; padding: 0;
          }
        `}</style>
        <div className="ac-auth">
          <div className="ac-auth-card">
            <span className="ac-auth-eyebrow">My Account</span>
            <h1 className="ac-auth-title">
              {signupMode ? (
                <>Create an account</>
              ) : (
                <>Welcome <span>back.</span></>
              )}
            </h1>
            <form onSubmit={handleLogin}>
              {signupMode && (
                <>
                  <label className="ac-label" htmlFor="ac-name">Full Name</label>
                  <input id="ac-name" className="ac-input" type="text" placeholder="Your name" />
                </>
              )}
              <label className="ac-label" htmlFor="ac-email">Email</label>
              <input
                id="ac-email" className="ac-input" type="email"
                placeholder="your@email.com"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              />
              <label className="ac-label" htmlFor="ac-pass">Password</label>
              <input
                id="ac-pass" className="ac-input" type="password"
                placeholder="••••••••"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              />
              <button type="submit" className="ac-submit">
                {signupMode ? "Create Account" : "Sign In"}
              </button>
            </form>
            <p className="ac-toggle">
              {signupMode ? "Already have an account? " : "Don't have an account? "}
              <button type="button" onClick={() => setSignupMode((v) => !v)}>
                {signupMode ? "Sign In" : "Create one"}
              </button>
            </p>
          </div>
        </div>
      </>
    );
  }

  // ── LOGGED IN ───────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        ${SHARED_STYLES}

        .ac-page {
          min-height: 100vh;
          background: #fafaf9;
          padding-top: 88px;
          font-family: 'Outfit', sans-serif;
          color: #1a1816;
        }
        @media (max-width: 767px) { .ac-page { padding-top: 72px; } }

        /* ── Header ── */
        .ac-header {
          background: #fff;
          border-bottom: 1px solid rgba(0,0,0,0.07);
          padding: 0 2.5rem;
        }
        @media (max-width: 767px) { .ac-header { padding: 0 1.25rem; } }

        .ac-header-inner { max-width: 1000px; margin: 0 auto; }

        .ac-header-top {
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; padding: 28px 0 24px;
          flex-wrap: wrap;
        }

        .ac-eyebrow {
          font-family: 'Outfit', sans-serif;
          font-size: 9.5px; font-weight: 600; letter-spacing: 0.22em;
          text-transform: uppercase; color: #1a1816; opacity: 0.4;
          margin-bottom: 6px; display: block;
        }
        .ac-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(1.4rem, 3.5vw, 2rem);
          font-weight: 700; color: #1a1816; margin: 0;
          letter-spacing: -0.02em; line-height: 1.1;
        }
        .ac-title span { opacity: 0.3; font-weight: 300; }

        .ac-logout {
          font-family: 'Outfit', sans-serif;
          font-size: 10.5px; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: #1a1816; opacity: 0.5;
          background: none; border: 1px solid rgba(0,0,0,0.14); border-radius: 2px;
          padding: 9px 18px; cursor: pointer;
          transition: opacity 0.18s, border-color 0.18s;
        }
        .ac-logout:hover { opacity: 1; border-color: #1a1816; }

        /* Tabs */
        .ac-tabs {
          display: flex; gap: 0; overflow-x: auto;
          scrollbar-width: none; -webkit-overflow-scrolling: touch;
        }
        .ac-tabs::-webkit-scrollbar { display: none; }

        .ac-tab {
          padding: 12px 20px;
          background: none; border: none;
          border-bottom: 2px solid transparent; margin-bottom: -1px;
          font-family: 'Outfit', sans-serif; font-size: 11px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #1a1816; opacity: 0.35;
          cursor: pointer; white-space: nowrap;
          transition: opacity 0.2s, border-color 0.2s;
        }
        .ac-tab.active { opacity: 1; border-bottom-color: #1a1816; }

        /* Body */
        .ac-body {
          max-width: 1000px; margin: 0 auto;
          padding: 36px 2.5rem 64px;
        }
        @media (max-width: 767px) { .ac-body { padding: 28px 1.25rem 52px; } }

        /* ── Order cards ── */
        .ac-order-card {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 2px; margin-bottom: 14px; overflow: hidden;
        }

        .ac-order-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 20px; border-bottom: 1px solid rgba(0,0,0,0.06);
          flex-wrap: wrap; gap: 10px;
        }

        .ac-order-id {
          font-family: 'Outfit', sans-serif;
          font-size: 13px; font-weight: 600; color: #1a1816; margin-bottom: 2px;
        }
        .ac-order-date {
          font-family: 'Outfit', sans-serif;
          font-size: 11.5px; font-weight: 400; color: #1a1816; opacity: 0.4;
        }
        .ac-order-status {
          font-family: 'Outfit', sans-serif;
          font-size: 9.5px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; padding: 5px 12px; border-radius: 2px;
        }
        .ac-status-delivered { background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; }
        .ac-status-shipped   { background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; }
        .ac-status-default   { background: #fafaf9; color: #1a1816; border: 1px solid rgba(0,0,0,0.1); }

        .ac-order-items {
          padding: 16px 20px; display: flex; flex-direction: column; gap: 14px;
        }
        .ac-order-item { display: flex; gap: 14px; align-items: flex-start; }
        .ac-order-img {
          width: 58px; height: 58px; border-radius: 2px;
          background: #f5f4f2; overflow: hidden; flex-shrink: 0;
        }
        .ac-order-img img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .ac-order-item-name {
          font-family: 'Outfit', sans-serif;
          font-size: 13px; font-weight: 500; color: #1a1816; margin-bottom: 3px;
        }
        .ac-order-item-meta {
          font-family: 'Outfit', sans-serif;
          font-size: 11.5px; font-weight: 400; color: #1a1816; opacity: 0.45;
        }

        .ac-order-foot {
          padding: 14px 20px; border-top: 1px solid rgba(0,0,0,0.06);
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 10px;
        }
        .ac-order-total {
          font-family: 'Outfit', sans-serif;
          font-size: 14px; font-weight: 700; color: #1a1816;
        }
        .ac-reorder {
          font-family: 'Outfit', sans-serif;
          font-size: 10px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: #1a1816; background: none;
          border: 1px solid rgba(0,0,0,0.2); border-radius: 2px;
          padding: 7px 16px; cursor: pointer;
          transition: background 0.18s, color 0.18s, border-color 0.18s;
        }
        .ac-reorder:hover { background: #1a1816; color: #fff; border-color: #1a1816; }

        .ac-tracking {
          font-family: 'Outfit', sans-serif;
          font-size: 12px; font-weight: 400; color: #1a1816; opacity: 0.55;
          padding: 0 20px 14px;
        }
        .ac-tracking strong { font-weight: 600; opacity: 1; }

        /* Empty / loading states */
        .ac-empty {
          font-family: 'Outfit', sans-serif;
          font-size: 14px; font-weight: 400; color: #1a1816; opacity: 0.45;
          padding: 40px 0;
        }

        /* ── Details form ── */
        .ac-form-grid {
          display: grid; grid-template-columns: 1fr; gap: 16px;
          max-width: 480px;
        }
        @media (min-width: 480px) { .ac-form-grid { grid-template-columns: 1fr 1fr; } }

        .ac-field { display: flex; flex-direction: column; gap: 6px; }
        .ac-field-label {
          font-family: 'Outfit', sans-serif;
          font-size: 10px; font-weight: 600; letter-spacing: 0.16em;
          text-transform: uppercase; color: #1a1816; opacity: 0.5;
        }
        .ac-field-input {
          padding: 11px 13px;
          border: 1px solid rgba(0,0,0,0.14); border-radius: 2px;
          font-family: 'Outfit', sans-serif; font-size: 13.5px; font-weight: 400;
          color: #1a1816; background: #fff; outline: none;
          transition: border-color 0.2s;
        }
        .ac-field-input:focus { border-color: #1a1816; }
        .ac-field-input::placeholder { color: rgba(26,24,22,0.3); }

        .ac-save-btn {
          margin-top: 8px; padding: 12px 32px;
          background: #1a1816; color: #fff; border: none; border-radius: 2px;
          font-family: 'Outfit', sans-serif; font-size: 11px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          cursor: pointer; transition: background 0.2s;
        }
        .ac-save-btn:hover { background: #0f0f0f; }

        /* Wishlist / addresses empty state */
        .ac-info-state {
          font-family: 'Outfit', sans-serif;
          font-size: 14px; font-weight: 400; color: #1a1816; opacity: 0.5;
          padding: 40px 0; line-height: 1.7;
        }
        .ac-info-state a {
          color: #1a1816; opacity: 1; font-weight: 600;
          text-decoration: underline; text-underline-offset: 3px;
        }
      `}</style>

      <div className="ac-page">
        <div className="ac-header">
          <div className="ac-header-inner">
            <div className="ac-header-top">
              <div>
                <span className="ac-eyebrow">My Account</span>
                <h1 className="ac-title">
                  Hello, <span>{user.name?.split(" ")[0] ?? "there"}.</span>
                </h1>
              </div>
              <button type="button" className="ac-logout" onClick={handleLogout}>
                Sign Out
              </button>
            </div>
            <div className="ac-tabs">
              {TABS.map((t) => (
                <button
                  key={t} type="button"
                  className={`ac-tab${activeTab === t ? " active" : ""}`}
                  onClick={() => setActiveTab(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="ac-body">

          {/* ── ORDERS ── */}
          {activeTab === "Orders" && (
            <div>
              {isWooCommerceEnabled() && user?.wooCustomerId && wcLoading && (
                <p className="ac-empty">Loading your orders…</p>
              )}

              {/* WooCommerce orders */}
              {isWooCommerceEnabled() && user?.wooCustomerId && !wcLoading && wcOrders.length > 0 &&
                wcOrders.map((order) => {
                  const tracking = getOrderMeta(order, ["_tracking_number","tracking_number","_wc_shipment_tracking_items","ywot_tracking_code"]);
                  const statusLabel = order.status ? order.status.replace(/-/g, " ") : "";
                  const dateStr = order.date_created ? new Date(order.date_created).toLocaleDateString(undefined, { dateStyle: "medium" }) : "";
                  const items = order.line_items || [];
                  return (
                    <div key={order.id} className="ac-order-card">
                      <div className="ac-order-head">
                        <div>
                          <p className="ac-order-id">Order #{order.number || order.id}</p>
                          <p className="ac-order-date">{dateStr}</p>
                        </div>
                        <span className={`ac-order-status ${order.status === "completed" ? "ac-status-delivered" : "ac-status-shipped"}`}>
                          {statusLabel}
                        </span>
                      </div>
                      {tracking && (
                        <div className="ac-tracking">
                          <strong>Tracking:</strong> {tracking}
                        </div>
                      )}
                      <div className="ac-order-items">
                        {items.map((item) => (
                          <div key={item.id} className="ac-order-item">
                            <div className="ac-order-img">
                              {item.image?.src
                                ? <img src={item.image.src} alt={item.name} />
                                : <span style={{ display: "block", width: "100%", height: "100%", background: "#f5f4f2" }} />
                              }
                            </div>
                            <div>
                              <p className="ac-order-item-name">{item.name}</p>
                              <p className="ac-order-item-meta">Qty {item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="ac-order-foot">
                        <p className="ac-order-total">Total: {formatOrderMoney(order)}</p>
                      </div>
                    </div>
                  );
                })
              }

              {/* Mock orders fallback */}
              {(!isWooCommerceEnabled() || !user?.wooCustomerId) &&
                MOCK_ORDERS.map((order) => (
                  <div key={order.id} className="ac-order-card">
                    <div className="ac-order-head">
                      <div>
                        <p className="ac-order-id">Order {order.id}</p>
                        <p className="ac-order-date">{order.date}</p>
                      </div>
                      <span className={`ac-order-status ${order.status === "Delivered" ? "ac-status-delivered" : "ac-status-shipped"}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="ac-order-items">
                      {order.items.map((item, i) => (
                        <div key={i} className="ac-order-item">
                          <div className="ac-order-img">
                            <img src={item.img} alt={item.name} />
                          </div>
                          <div>
                            <p className="ac-order-item-name">{item.name}</p>
                            <p className="ac-order-item-meta">{item.model} · {item.color} · Qty {item.qty}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="ac-order-foot">
                      <p className="ac-order-total">Total: ₹{order.total.toFixed(2)}</p>
                      <button type="button" className="ac-reorder">Reorder</button>
                    </div>
                  </div>
                ))
              }

              {isWooCommerceEnabled() && user?.wooCustomerId && !wcLoading && wcOrders.length === 0 && (
                <p className="ac-empty">No orders yet. Your purchases will appear here.</p>
              )}
            </div>
          )}

          {/* ── WISHLIST ── */}
          {activeTab === "Wishlist" && (
            <p className="ac-info-state">
              View and manage your saved items on the{" "}
              <Link to="/wishlist">Wishlist page</Link>.
            </p>
          )}

          {/* ── DETAILS ── */}
          {activeTab === "Details" && (
            <form onSubmit={(e) => { e.preventDefault(); toast.success("Details saved"); }}>
              <div className="ac-form-grid">
                <div className="ac-field">
                  <label className="ac-field-label">First Name</label>
                  <input className="ac-field-input" defaultValue={user.name?.split(" ")[0]} />
                </div>
                <div className="ac-field">
                  <label className="ac-field-label">Last Name</label>
                  <input className="ac-field-input" defaultValue={user.name?.split(" ")[1] ?? ""} />
                </div>
                <div className="ac-field" style={{ gridColumn: "1 / -1" }}>
                  <label className="ac-field-label">Email</label>
                  <input className="ac-field-input" type="email" defaultValue={user.email} />
                </div>
                <div className="ac-field" style={{ gridColumn: "1 / -1" }}>
                  <label className="ac-field-label">Phone</label>
                  <input className="ac-field-input" type="tel" placeholder="+91 98765 43210" />
                </div>
              </div>
              <button type="submit" className="ac-save-btn" style={{ marginTop: 24 }}>
                Save Changes
              </button>
            </form>
          )}

          {/* ── ADDRESSES ── */}
          {activeTab === "Addresses" && (
            <p className="ac-info-state">
              Address management will be available after connecting to WooCommerce.
            </p>
          )}

        </div>
      </div>
    </>
  );
}