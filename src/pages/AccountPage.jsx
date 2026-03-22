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
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: cur,
    }).format(total);
  } catch {
    return formatPrice(total);
  }
}

const TABS = ["Orders", "Wishlist", "Details", "Addresses"];

const MOCK_ORDERS = [
  {
    id: "CO-10428",
    date: "Feb 12, 2026",
    status: "Delivered",
    total: 79.98,
    items: [
      {
        name: "Full-Grain Leather Case",
        model: "iPhone 15 Pro",
        color: "Cognac",
        qty: 1,
        price: 49.99,
        img: "/product4_1.webp",
      },
      {
        name: "Sport Silicone Band",
        model: "45mm",
        color: "Midnight Black",
        qty: 1,
        price: 19.99,
        img: "/bands.avif",
      },
    ],
  },
  {
    id: "CO-09871",
    date: "Jan 28, 2026",
    status: "Shipped",
    total: 24.99,
    items: [
      {
        name: "Leather AirPods Pro Case",
        model: "AirPods Pro 2nd Gen",
        color: "Saddle Brown",
        qty: 1,
        price: 24.99,
        img: "/airpods.jpg",
      },
    ],
  },
];

export default function AccountPage() {
  const { user, loginWithCredentials, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("Orders");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupMode, setSignupMode] = useState(false);
  const [wcOrders, setWcOrders] = useState([]);
  const [wcLoading, setWcLoading] = useState(false);

  useEffect(() => {
    if (!isWooCommerceEnabled() || !user?.wooCustomerId) {
      setWcOrders([]);
      return;
    }
    let cancelled = false;
    setWcLoading(true);
    fetchOrdersForCustomer(user.wooCustomerId)
      .then((data) => {
        if (!cancelled) setWcOrders(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!cancelled) setWcOrders([]);
      })
      .finally(() => {
        if (!cancelled) setWcLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user?.wooCustomerId]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      toast.error("Please fill all fields");
      return;
    }
    if (signupMode && isWooCommerceEnabled()) {
      toast(
        "Create your account in WordPress (WooCommerce → My Account), then sign in here.",
      );
      return;
    }
    try {
      await loginWithCredentials({
        email: loginForm.email,
        password: loginForm.password,
      });
      toast.success("Signed in successfully");
    } catch (err) {
      toast.error(err.message || "Login failed");
    }
  };

  const handleLogout = () => {
    logout();
    toast("Signed out");
  };

  if (!user) {
    return (
      <>
        <style>{`
          .ac-auth {
            min-height: 100vh; background: #fafaf9;
            padding-top: 68px; display: flex; align-items: center;
            justify-content: center; padding: 100px 24px 64px;
            font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          }
          .ac-auth-card {
            background: #fff; border: 1px solid #f0eeea;
            border-radius: 3px; padding: 40px 36px;
            width: 100%; max-width: 400px;
          }
          .ac-auth-eyebrow {
            font-size: 10px; font-weight: 700; letter-spacing: 0.28em;
            text-transform: uppercase; color: #a8a29e; margin-bottom: 8px; display: block;
          }
          .ac-auth-title {
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: 1.8rem; font-weight: 400; color: #1c1917;
            margin: 0 0 28px; letter-spacing: -0.02em;
          }
          .ac-auth-title em { font-style: italic; color: #d97706; }
          .ac-label {
            display: block; font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
            text-transform: uppercase; color: #78716c; margin-bottom: 6px;
          }
          .ac-input {
            width: 100%; padding: 11px 14px;
            border: 1.5px solid #e0ddd9; border-radius: 2px;
            font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; color: #1c1917;
            background: #fff; outline: none; margin-bottom: 16px;
            transition: border-color 0.2s; box-sizing: border-box;
          }
          .ac-input:focus { border-color: #d97706; }
          .ac-submit {
            width: 100%; padding: 13px; background: #1c1917; color: #fff;
            border: none; border-radius: 2px;
            font-family: 'Plus Jakarta Sans', sans-serif; font-size: 11px; font-weight: 700;
            letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer;
            transition: background 0.2s; margin-bottom: 14px;
          }
          .ac-submit:hover { background: #292524; }
          .ac-toggle {
            font-size: 12px; color: #78716c; text-align: center;
          }
          .ac-toggle button {
            background: none; border: none; color: #d97706; font-weight: 700;
            cursor: pointer; font-family: inherit; font-size: inherit;
            text-decoration: underline; padding: 0;
          }
        `}</style>
        <div className="ac-auth">
          <div className="ac-auth-card">
            <span className="ac-auth-eyebrow">My Account</span>
            <h1 className="ac-auth-title">
              {signupMode ? (
                "Create an <em>account</em>"
              ) : (
                <>
                  <span>Welcome</span> <em>back</em>
                </>
              )}
            </h1>
            <form onSubmit={handleLogin}>
              {signupMode && (
                <>
                  <label className="ac-label" htmlFor="ac-name">
                    Full Name
                  </label>
                  <input
                    id="ac-name"
                    className="ac-input"
                    type="text"
                    placeholder="Jane Doe"
                  />
                </>
              )}
              <label className="ac-label" htmlFor="ac-email">
                Email
              </label>
              <input
                id="ac-email"
                className="ac-input"
                type="email"
                placeholder="your@email.com"
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, email: e.target.value })
                }
              />
              <label className="ac-label" htmlFor="ac-pass">
                Password
              </label>
              <input
                id="ac-pass"
                className="ac-input"
                type="password"
                placeholder="••••••••"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
              />
              <button type="submit" className="ac-submit">
                {signupMode ? "Create Account" : "Sign In"}
              </button>
            </form>
            <p className="ac-toggle">
              {signupMode
                ? "Already have an account? "
                : "Don't have an account? "}
              <button type="button" onClick={() => setSignupMode((v) => !v)}>
                {signupMode ? "Sign In" : "Create one"}
              </button>
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        .ac-page {
          min-height: 100vh; background: #fafaf9;
          padding-top: 68px;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
        }
        .ac-hero {
          background: #fff; border-bottom: 1px solid #f0eeea;
          padding: 40px 24px 0;
        }
        .ac-hero-inner { max-width: 1000px; margin: 0 auto; }
        .ac-hero-row {
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; margin-bottom: 28px; flex-wrap: wrap;
        }
        .ac-hero-left {}
        .ac-eyebrow {
          font-size: 10px; font-weight: 700; letter-spacing: 0.28em;
          text-transform: uppercase; color: #a8a29e; margin-bottom: 6px; display: block;
        }
        .ac-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.5rem, 3.5vw, 2.2rem);
          font-weight: 400; color: #1c1917; margin: 0;
          letter-spacing: -0.02em;
        }
        .ac-title em { font-style: italic; color: #d97706; }
        .ac-logout {
          font-size: 11px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: #78716c; background: none;
          border: 1px solid #e0ddd9; border-radius: 2px;
          padding: 8px 16px; cursor: pointer; font-family: inherit;
          transition: all 0.18s;
        }
        .ac-logout:hover { border-color: #1c1917; color: #1c1917; }

        .ac-tabs {
          display: flex; gap: 0; overflow-x: auto;
        }
        .ac-tab {
          padding: 12px 18px; background: none; border: none;
          border-bottom: 2px solid transparent; margin-bottom: -1px;
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase; color: #a8a29e;
          cursor: pointer; white-space: nowrap;
          transition: color 0.2s, border-color 0.2s;
        }
        .ac-tab.active { color: #1c1917; border-bottom-color: #1c1917; }

        .ac-body { max-width: 1000px; margin: 0 auto; padding: 32px 24px 64px; }

        /* Orders */
        .ac-order-card {
          background: #fff; border: 1px solid #f0eeea; border-radius: 2px;
          margin-bottom: 16px; overflow: hidden;
        }
        .ac-order-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 20px; border-bottom: 1px solid #f5f5f3;
          flex-wrap: wrap; gap: 8px;
        }
        .ac-order-id { font-size: 13px; font-weight: 700; color: #1c1917; }
        .ac-order-date { font-size: 12px; color: #a8a29e; }
        .ac-order-status {
          font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; padding: 4px 10px; border-radius: 20px;
        }
        .ac-status-delivered { background: #d1fae5; color: #065f46; }
        .ac-status-shipped   { background: #dbeafe; color: #1e40af; }
        .ac-order-items { padding: 16px 20px; display: flex; flex-direction: column; gap: 12px; }
        .ac-order-item { display: flex; gap: 12px; align-items: flex-start; }
        .ac-order-img {
          width: 56px; height: 56px; border-radius: 2px; background: #f0eeea;
          overflow: hidden; flex-shrink: 0;
        }
        .ac-order-img img { width: 100%; height: 100%; object-fit: cover; }
        .ac-order-item-name { font-size: 13px; color: #1c1917; font-weight: 500; margin-bottom: 2px; }
        .ac-order-item-meta { font-size: 11px; color: #a8a29e; }
        .ac-order-foot {
          padding: 14px 20px; border-top: 1px solid #f5f5f3;
          display: flex; align-items: center; justify-content: space-between;
        }
        .ac-order-total { font-size: 14px; font-weight: 700; color: #1c1917; }
        .ac-reorder {
          font-size: 10px; font-weight: 700; letter-spacing: 0.15em;
          text-transform: uppercase; color: #d97706; background: none;
          border: 1px solid #d97706; border-radius: 2px;
          padding: 6px 14px; cursor: pointer; font-family: inherit;
          transition: all 0.18s;
        }
        .ac-reorder:hover { background: #d97706; color: #fff; }
        .ac-tracking {
          font-size: 12px; color: #57534e; margin-top: 8px;
        }
        .ac-tracking strong { color: #1c1917; }

        /* Details form */
        .ac-form-grid {
          display: grid; grid-template-columns: 1fr; gap: 16px;
          max-width: 480px;
        }
        @media (min-width: 480px) { .ac-form-grid { grid-template-columns: 1fr 1fr; } }
        .ac-field { display: flex; flex-direction: column; gap: 6px; }
        .ac-field-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: #78716c;
        }
        .ac-field-input {
          padding: 10px 12px; border: 1.5px solid #e0ddd9; border-radius: 2px;
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; color: #1c1917;
          background: #fff; outline: none; transition: border-color 0.2s;
        }
        .ac-field-input:focus { border-color: #d97706; }
        .ac-save-btn {
          margin-top: 8px; padding: 11px 28px;
          background: #1c1917; color: #fff; border: none; border-radius: 2px;
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 11px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer;
          transition: background 0.2s;
        }
        .ac-save-btn:hover { background: #292524; }
      `}</style>

      <div className="ac-page">
        <div className="ac-hero">
          <div className="ac-hero-inner">
            <div className="ac-hero-row">
              <div className="ac-hero-left">
                <span className="ac-eyebrow">My Account</span>
                <h1 className="ac-title">
                  Hello, <em>{user.name?.split(" ")[0] ?? "there"}</em>
                </h1>
              </div>
              <button
                type="button"
                className="ac-logout"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            </div>
            <div className="ac-tabs">
              {TABS.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`ac-tab ${activeTab === t ? "active" : ""}`}
                  onClick={() => setActiveTab(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="ac-body">
          {activeTab === "Orders" && (
            <div>
              {isWooCommerceEnabled() && user?.wooCustomerId && wcLoading && (
                <p style={{ color: "#78716c", fontSize: 14 }}>
                  Loading orders…
                </p>
              )}
              {isWooCommerceEnabled() &&
                user?.wooCustomerId &&
                !wcLoading &&
                wcOrders.length > 0 &&
                wcOrders.map((order) => {
                  const tracking = getOrderMeta(order, [
                    "_tracking_number",
                    "tracking_number",
                    "_wc_shipment_tracking_items",
                    "ywot_tracking_code",
                  ]);
                  const statusLabel = order.status
                    ? order.status.replace(/-/g, " ")
                    : "";
                  const dateStr = order.date_created
                    ? new Date(order.date_created).toLocaleDateString(
                        undefined,
                        { dateStyle: "medium" },
                      )
                    : "";
                  const items = order.line_items || [];
                  return (
                    <div key={order.id} className="ac-order-card">
                      <div className="ac-order-head">
                        <div>
                          <p className="ac-order-id">
                            Order #{order.number || order.id}
                          </p>
                          <p className="ac-order-date">{dateStr}</p>
                        </div>
                        <span
                          className={`ac-order-status ${order.status === "completed" ? "ac-status-delivered" : "ac-status-shipped"}`}
                        >
                          {statusLabel}
                        </span>
                      </div>
                      {tracking && (
                        <div
                          style={{ padding: "0 20px 12px" }}
                          className="ac-tracking"
                        >
                          <strong>Tracking:</strong> {tracking}
                        </div>
                      )}
                      <div className="ac-order-items">
                        {items.map((item) => (
                          <div key={item.id} className="ac-order-item">
                            <div className="ac-order-img">
                              {item.image?.src ? (
                                <img src={item.image.src} alt={item.name} />
                              ) : (
                                <span
                                  style={{
                                    display: "block",
                                    width: "100%",
                                    height: "100%",
                                    background: "#f5f5f3",
                                  }}
                                />
                              )}
                            </div>
                            <div>
                              <p className="ac-order-item-name">{item.name}</p>
                              <p className="ac-order-item-meta">
                                Qty {item.quantity}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="ac-order-foot">
                        <p className="ac-order-total">
                          Total: {formatOrderMoney(order)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              {(!isWooCommerceEnabled() || !user?.wooCustomerId) &&
                MOCK_ORDERS.map((order) => (
                  <div key={order.id} className="ac-order-card">
                    <div className="ac-order-head">
                      <div>
                        <p className="ac-order-id">Order {order.id}</p>
                        <p className="ac-order-date">{order.date}</p>
                      </div>
                      <span
                        className={`ac-order-status ${order.status === "Delivered" ? "ac-status-delivered" : "ac-status-shipped"}`}
                      >
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
                            <p className="ac-order-item-meta">
                              {item.model} · {item.color} · Qty {item.qty}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="ac-order-foot">
                      <p className="ac-order-total">
                        Total: ${order.total.toFixed(2)}
                      </p>
                      <button type="button" className="ac-reorder">
                        Reorder
                      </button>
                    </div>
                  </div>
                ))}
              {isWooCommerceEnabled() &&
                user?.wooCustomerId &&
                !wcLoading &&
                wcOrders.length === 0 && (
                  <p style={{ color: "#78716c", fontSize: 14 }}>
                    No orders yet. Completed purchases will appear here.
                  </p>
                )}
            </div>
          )}
          {activeTab === "Wishlist" && (
            <p style={{ color: "#78716c", fontSize: 14 }}>
              View and manage your wishlist on the{" "}
              <Link
                to="/wishlist"
                style={{ color: "#d97706", fontWeight: 600 }}
              >
                Wishlist page
              </Link>
              .
            </p>
          )}
          {activeTab === "Details" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Details saved");
              }}
            >
              <div className="ac-form-grid">
                <div className="ac-field">
                  <label className="ac-field-label">First Name</label>
                  <input
                    className="ac-field-input"
                    defaultValue={user.name?.split(" ")[0]}
                  />
                </div>
                <div className="ac-field">
                  <label className="ac-field-label">Last Name</label>
                  <input
                    className="ac-field-input"
                    defaultValue={user.name?.split(" ")[1] ?? ""}
                  />
                </div>
                <div className="ac-field" style={{ gridColumn: "1 / -1" }}>
                  <label className="ac-field-label">Email</label>
                  <input
                    className="ac-field-input"
                    type="email"
                    defaultValue={user.email}
                  />
                </div>
                <div className="ac-field" style={{ gridColumn: "1 / -1" }}>
                  <label className="ac-field-label">Phone</label>
                  <input
                    className="ac-field-input"
                    type="tel"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="ac-save-btn"
                style={{ marginTop: 20 }}
              >
                Save Changes
              </button>
            </form>
          )}
          {activeTab === "Addresses" && (
            <p style={{ color: "#78716c", fontSize: 14 }}>
              Address management will be available after connecting to
              WooCommerce.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
