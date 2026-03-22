import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { formatPrice } from "../data/products";
import {
  isWooCommerceEnabled,
  getCheckoutUrl,
  getOrderPayUrl,
} from "../config/woocommerce.js";
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
      const line = {
        product_id: Number(i.wcProductId),
        quantity: i.quantity,
      };
      if (i.wcVariationId) line.variation_id = Number(i.wcVariationId);
      return line;
    });

  const hasWcItems = wcLineItems.length > 0;
  const hybridUrl = getCheckoutUrl();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!items.length) {
      toast.error("Your bag is empty");
      return;
    }
    if (
      !form.email ||
      !form.firstName ||
      !form.address1 ||
      !form.city ||
      !form.postcode
    ) {
      toast.error("Please fill required fields");
      return;
    }

    if (!isWooCommerceEnabled()) {
      toast.success("Demo mode — order not sent to a server");
      navigate("/order-confirmation");
      return;
    }

    if (!hasWcItems) {
      toast.error(
        "Cart items are from the demo catalog. Add products from WooCommerce to checkout.",
      );
      return;
    }

    setBusy(true);
    try {
      const billing = {
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        phone: form.phone,
        address_1: form.address1,
        city: form.city,
        state: form.state,
        postcode: form.postcode,
        country: form.country,
      };
      const payload = {
        payment_method: "cod",
        payment_method_title: "Cash on Delivery",
        set_paid: false,
        customer_id: user?.wooCustomerId ? Number(user.wooCustomerId) : 0,
        billing,
        shipping: billing,
        line_items: wcLineItems,
      };
      const order = await createCheckoutOrder(payload);
      clearCart();
      const payUrl = order.payment_url || getOrderPayUrl(order);
      if (payUrl) {
        window.location.href = payUrl;
      } else {
        toast.success(`Order #${order.id} placed`);
        navigate("/account");
      }
    } catch (err) {
      toast.error(err.message || "Checkout failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <style>{`
        .co-page {
          min-height: 100vh; background: #fafaf9;
          padding-top: 88px; padding-bottom: 64px;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
        }
        .co-inner { max-width: 960px; margin: 0 auto; padding: 0 24px; }
        .co-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.6rem, 3vw, 2rem);
          font-weight: 400; color: #1c1917; margin: 0 0 8px;
        }
        .co-sub { font-size: 13px; color: #78716c; margin-bottom: 28px; }
        .co-grid {
          display: grid; gap: 32px;
        }
        @media (min-width: 900px) {
          .co-grid { grid-template-columns: 1fr 340px; align-items: start; }
        }
        .co-label {
          display: block; font-size: 10px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: #78716c; margin-bottom: 6px;
        }
        .co-input {
          width: 100%; padding: 11px 12px; border: 1.5px solid #e0ddd9; border-radius: 2px;
          font-size: 14px; box-sizing: border-box; margin-bottom: 14px;
        }
        .co-input:focus { outline: none; border-color: #1c1917; }
        .co-row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .co-submit {
          width: 100%; padding: 14px; background: #1c1917; color: #fff; border: none;
          border-radius: 2px; font-size: 11px; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; cursor: pointer; margin-top: 8px;
        }
        .co-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .co-side {
          background: #fff; border: 1px solid #f0eeea; border-radius: 2px; padding: 20px;
        }
        .co-line { display: flex; justify-content: space-between; font-size: 13px; color: #57534e; margin-bottom: 8px; }
        .co-total { font-size: 16px; font-weight: 700; color: #1c1917; padding-top: 12px; border-top: 1px solid #f0eeea; margin-top: 12px; }
        .co-hybrid {
          margin-top: 16px; font-size: 12px; color: #78716c; line-height: 1.5;
        }
        .co-hybrid a { color: #d97706; font-weight: 600; }
      `}</style>

      <div className="co-page">
        <div className="co-inner">
          <h1 className="co-title">Checkout</h1>
          <p className="co-sub">
            {isWooCommerceEnabled()
              ? "Complete your details. You will pay on the secure WooCommerce page when required."
              : "Demo checkout — connect WooCommerce to place real orders."}
          </p>

          {items.length === 0 ? (
            <p style={{ color: "#78716c" }}>
              Your bag is empty.{" "}
              <Link
                to="/collections/all"
                style={{ color: "#d97706", fontWeight: 600 }}
              >
                Continue shopping
              </Link>
            </p>
          ) : (
            <div className="co-grid">
              <form onSubmit={handleSubmit}>
                <div className="co-row2">
                  <div>
                    <label className="co-label" htmlFor="co-fn">
                      First name *
                    </label>
                    <input
                      id="co-fn"
                      className="co-input"
                      required
                      value={form.firstName}
                      onChange={(e) =>
                        setForm({ ...form, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="co-label" htmlFor="co-ln">
                      Last name *
                    </label>
                    <input
                      id="co-ln"
                      className="co-input"
                      required
                      value={form.lastName}
                      onChange={(e) =>
                        setForm({ ...form, lastName: e.target.value })
                      }
                    />
                  </div>
                </div>
                <label className="co-label" htmlFor="co-em">
                  Email *
                </label>
                <input
                  id="co-em"
                  className="co-input"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <label className="co-label" htmlFor="co-ph">
                  Phone
                </label>
                <input
                  id="co-ph"
                  className="co-input"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <label className="co-label" htmlFor="co-a1">
                  Address *
                </label>
                <input
                  id="co-a1"
                  className="co-input"
                  required
                  value={form.address1}
                  onChange={(e) =>
                    setForm({ ...form, address1: e.target.value })
                  }
                />
                <div className="co-row2">
                  <div>
                    <label className="co-label" htmlFor="co-city">
                      City *
                    </label>
                    <input
                      id="co-city"
                      className="co-input"
                      required
                      value={form.city}
                      onChange={(e) =>
                        setForm({ ...form, city: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="co-label" htmlFor="co-st">
                      State
                    </label>
                    <input
                      id="co-st"
                      className="co-input"
                      value={form.state}
                      onChange={(e) =>
                        setForm({ ...form, state: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="co-row2">
                  <div>
                    <label className="co-label" htmlFor="co-pc">
                      PIN code *
                    </label>
                    <input
                      id="co-pc"
                      className="co-input"
                      required
                      value={form.postcode}
                      onChange={(e) =>
                        setForm({ ...form, postcode: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="co-label" htmlFor="co-ct">
                      Country
                    </label>
                    <input
                      id="co-ct"
                      className="co-input"
                      value={form.country}
                      onChange={(e) =>
                        setForm({ ...form, country: e.target.value })
                      }
                    />
                  </div>
                </div>

                <button type="submit" className="co-submit" disabled={busy}>
                  {busy
                    ? "Placing order…"
                    : isWooCommerceEnabled() && hasWcItems
                      ? "Place order & pay"
                      : "Place order (demo)"}
                </button>

                {isWooCommerceEnabled() && hybridUrl && (
                  <p className="co-hybrid">
                    Prefer the full store checkout (Razorpay / PhonePe in
                    WooCommerce)?{" "}
                    <a href={hybridUrl} target="_blank" rel="noreferrer">
                      Open WordPress checkout
                    </a>{" "}
                    — add items there if you are not using API cart sync.
                  </p>
                )}
              </form>

              <aside className="co-side">
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#a8a29e",
                    marginBottom: 16,
                  }}
                >
                  Order summary
                </p>
                {items.map((i) => (
                  <div
                    key={`${i.productId}-${i.wcVariationId}-${i.model}`}
                    className="co-line"
                  >
                    <span style={{ paddingRight: 8 }}>
                      {i.name} × {i.quantity}
                    </span>
                    <span>{formatPrice(i.price * i.quantity)}</span>
                  </div>
                ))}
                <div className="co-line co-total">
                  <span>Total</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
                {isWooCommerceEnabled() && !hasWcItems && (
                  <p style={{ fontSize: 12, color: "#b45309", marginTop: 12 }}>
                    No WooCommerce line items in cart. Browse the live catalog
                    and add variable products from WordPress.
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
