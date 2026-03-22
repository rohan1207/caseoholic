import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { formatPrice, DEVICES } from "../data/products";
import { loadProductBySlug, loadRelatedProducts } from "../products/shopCatalog.js";
import ProductCard from "../components/ProductCard.jsx";
import toast from "react-hot-toast";

export default function ProductPage() {
  const { slug } = useParams();
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imgIdx, setImgIdx] = useState(0);
  const [colorIdx, setColorIdx] = useState(0);
  const [model, setModel] = useState("");
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("description");
  const [stickyVisible, setStickyVisible] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setProduct(null);
    loadProductBySlug(slug)
      .then((p) => {
        if (cancelled) return null;
        setProduct(p);
        return p ? loadRelatedProducts(p) : [];
      })
      .then((rel) => { if (!cancelled) setRelated(Array.isArray(rel) ? rel : []); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [slug]);

  useEffect(() => {
    setImgIdx(0); setColorIdx(0); setModel(""); setQty(1);
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!product?.variations?.length) return;
    setModel(String(product.variations[0].id));
  }, [product?.id, product?.variations]);

  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hasWcVariations = !!(product?.variations?.length > 0);
  const selectedVariation = useMemo(() => {
    if (!hasWcVariations || !model) return null;
    return product.variations.find((v) => String(v.id) === String(model)) || product.variations[0];
  }, [hasWcVariations, model, product]);

  const displayImages = useMemo(() => {
    if (!product?.images?.length) return [];
    if (hasWcVariations && selectedVariation?.image) {
      const rest = product.images.filter((u) => u !== selectedVariation.image);
      return [selectedVariation.image, ...rest];
    }
    return product.images;
  }, [product, hasWcVariations, selectedVariation]);

  if (loading) {
    return (
      <div style={{ paddingTop: 120, textAlign: "center", fontFamily: "'Outfit', sans-serif", color: "#1a1816" }}>
        <p style={{ fontSize: 15 }}>Loading product…</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ paddingTop: 120, textAlign: "center", fontFamily: "'Outfit', sans-serif", color: "#1a1816" }}>
        <p style={{ fontSize: 18, marginBottom: 16 }}>Product not found.</p>
        <Link to="/collections/all" style={{ color: "#1a1816", fontWeight: 600 }}>Browse All Products</Link>
      </div>
    );
  }

  const displayPrice = selectedVariation?.price ?? product?.price ?? 0;
  const displayCompare = selectedVariation?.regularPrice ?? product?.comparePrice;
  const wished = isWishlisted(product.id);
  const discPct = displayCompare ? Math.round((1 - displayPrice / displayCompare) * 100) : null;
  const deviceList = product.deviceBrand ? (DEVICES[product.deviceBrand] ?? []) : [];
  const selectedColor = product.colors?.[colorIdx];

  const handleAddToBag = () => {
    if (hasWcVariations && !model) {
      toast.error("Please select a model");
      document.getElementById("pp-wc-variation-select")?.focus();
      return;
    }
    if (!hasWcVariations && deviceList.length > 0 && !model) {
      toast.error("Please select your device model first");
      document.getElementById("pp-model-select")?.focus();
      return;
    }
    addItem({
      productId: product.id, slug: product.slug, name: product.name,
      price: displayPrice, image: displayImages?.[0] ?? product.images?.[0],
      color: selectedColor?.name ?? null,
      model: hasWcVariations ? selectedVariation?.label || model : model || null,
      quantity: qty,
      wcProductId: product.wcProductId ?? product.id,
      wcVariationId: hasWcVariations ? selectedVariation?.id : null,
      source: product.source || "local",
    });
    toast.success(`Added to your bag`);
  };

  const handleWishlist = () => {
    toggle(product.id);
    toast(wished ? "Removed from wishlist" : "Saved to wishlist", { icon: wished ? "💔" : "❤️" });
  };

  const collectionLabel = product.collection || "Shop";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

        .pp-page {
          background: #fafaf9;
          padding-top: 88px;
          font-family: 'Outfit', sans-serif;
          min-height: 100vh;
          color: #1a1816;
          -webkit-font-smoothing: antialiased;
        }

        /* ── Breadcrumb ── */
        .pp-breadcrumb {
          display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
          font-family: 'Outfit', sans-serif;
          font-size: 10.5px; font-weight: 400;
          color: #1a1816; padding: 14px 2.5rem;
          max-width: 1520px; margin: 0 auto;
        }
        .pp-breadcrumb a { color: #1a1816; text-decoration: none; opacity: 0.55; transition: opacity 0.15s; }
        .pp-breadcrumb a:hover { opacity: 1; }
        .pp-breadcrumb svg { width: 11px; height: 11px; opacity: 0.4; }

        /* ── Main layout ── */
        .pp-main {
          max-width: 1520px; margin: 0 auto;
          padding: 0 2.5rem 5rem;
          display: grid; grid-template-columns: 1fr; gap: 40px;
        }
        @media (min-width: 900px) {
          .pp-main { grid-template-columns: 1fr 1fr; align-items: start; gap: 60px; }
        }
        @media (max-width: 767px) {
          .pp-main { padding: 0 1.25rem 4rem; gap: 28px; }
          .pp-breadcrumb { padding: 12px 1.25rem; }
          .pp-page { padding-top: 72px; }
        }

        /* ── Gallery ── */
        .pp-main-img {
          aspect-ratio: 1; background: #f5f4f2;
          border-radius: 2px; overflow: hidden;
          position: relative; margin-bottom: 10px;
        }
        .pp-main-img img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.45s ease;
        }
        .pp-main-img:hover img { transform: scale(1.04); }

        .pp-thumbs { display: flex; gap: 8px; flex-wrap: wrap; }
        .pp-thumb {
          width: 66px; height: 66px; flex-shrink: 0;
          border-radius: 2px; overflow: hidden;
          border: 1.5px solid transparent; cursor: pointer;
          background: #f5f4f2; transition: border-color 0.15s;
        }
        .pp-thumb.active { border-color: #1a1816; }
        .pp-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }

        @media (max-width: 767px) {
          .pp-thumb { width: 56px; height: 56px; }
        }

        /* ── Product info ── */
        .pp-info { display: flex; flex-direction: column; }

        .pp-collection {
          font-family: 'Outfit', sans-serif;
          font-size: 9.5px; font-weight: 600; letter-spacing: 0.22em;
          text-transform: uppercase; color: #1a1816; opacity: 0.5;
          margin-bottom: 8px;
        }

        /* Product name — Outfit 700, clean & premium */
        .pp-name {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(1.6rem, 3.5vw, 2.2rem);
          font-weight: 700; color: #1a1816;
          margin: 0 0 6px; letter-spacing: -0.02em; line-height: 1.1;
        }

        .pp-tagline {
          font-family: 'Outfit', sans-serif;
          font-size: 13px; font-weight: 300; color: #1a1816;
          opacity: 0.6; margin-bottom: 16px;
        }

        /* Rating */
        .pp-rating { display: flex; align-items: center; gap: 8px; margin-bottom: 18px; }
        .pp-stars { display: flex; gap: 2px; }
        .pp-stars svg { width: 13px; height: 13px; }
        .pp-rc {
          font-family: 'Outfit', sans-serif;
          font-size: 11.5px; color: #1a1816; opacity: 0.55;
        }
        .pp-rc span { color: #1a1816; opacity: 1; font-weight: 500; }

        /* Price */
        .pp-price-row { display: flex; align-items: baseline; gap: 10px; margin-bottom: 22px; flex-wrap: wrap; }
        .pp-price {
          font-family: 'Outfit', sans-serif;
          font-size: 2rem; font-weight: 700; color: #1a1816; letter-spacing: -0.02em;
        }
        .pp-compare {
          font-family: 'Outfit', sans-serif;
          font-size: 14px; font-weight: 400;
          color: #1a1816; opacity: 0.4; text-decoration: line-through;
        }
        .pp-discount {
          font-family: 'Outfit', sans-serif;
          font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
          background: #f5f4f2; color: #1a1816;
          padding: 3px 8px; border-radius: 2px;
          border: 1px solid rgba(0,0,0,0.08);
        }

        hr.pp-rule { border: none; border-top: 1px solid rgba(0,0,0,0.07); margin: 0 0 20px; }

        /* Section label */
        .pp-section-label {
          font-family: 'Outfit', sans-serif;
          font-size: 9.5px; font-weight: 600; letter-spacing: 0.2em;
          text-transform: uppercase; color: #1a1816; opacity: 0.5;
          margin-bottom: 10px; display: flex; align-items: center; gap: 6px;
        }
        .pp-color-name {
          font-family: 'Outfit', sans-serif;
          font-size: 12px; color: #1a1816; font-weight: 400;
          opacity: 1; letter-spacing: 0; text-transform: none;
        }

        /* Swatches */
        .pp-colors { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
        .pp-swatch {
          width: 26px; height: 26px; border-radius: 50%;
          border: 1.5px solid transparent; cursor: pointer;
          transition: transform 0.15s; outline: 2px solid transparent; outline-offset: 2px;
        }
        .pp-swatch.active { outline-color: #1a1816; }
        .pp-swatch:hover { transform: scale(1.1); }

        /* Model select */
        .pp-model-wrap { position: relative; margin-bottom: 20px; }
        .pp-model-select {
          appearance: none; -webkit-appearance: none;
          width: 100%; padding: 12px 38px 12px 13px;
          border: 1px solid rgba(0,0,0,0.14); border-radius: 2px;
          background: #fff; color: #1a1816;
          font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 400;
          cursor: pointer; outline: none; transition: border-color 0.2s;
        }
        .pp-model-select:focus { border-color: #1a1816; }
        .pp-model-chevron {
          position: absolute; right: 12px; top: 50%;
          transform: translateY(-50%); pointer-events: none;
          color: #1a1816; opacity: 0.4; width: 15px; height: 15px;
        }

        /* Qty + CTA */
        .pp-qty-row { display: flex; gap: 10px; align-items: center; margin-bottom: 12px; }
        .pp-qty {
          display: flex; align-items: center;
          border: 1px solid rgba(0,0,0,0.14); border-radius: 2px;
          overflow: hidden; flex-shrink: 0;
        }
        .pp-qty-btn {
          width: 40px; height: 48px; display: flex; align-items: center; justify-content: center;
          background: none; border: none; cursor: pointer; color: #1a1816;
          font-size: 18px; font-weight: 300; transition: background 0.15s;
        }
        .pp-qty-btn:hover { background: #f5f4f2; }
        .pp-qty-num {
          width: 40px; text-align: center;
          font-family: 'Outfit', sans-serif;
          font-size: 14px; font-weight: 600; color: #1a1816;
        }

        .pp-add-btn {
          flex: 1; height: 48px;
          background: #1a1816; color: #fff; border: none; border-radius: 2px;
          font-family: 'Outfit', sans-serif; font-size: 10.5px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: background 0.22s, transform 0.22s;
        }
        .pp-add-btn:hover { background: #0f0f0f; transform: translateY(-1px); }
        .pp-add-btn svg { width: 16px; height: 16px; }

        .pp-wish-btn {
          width: 48px; height: 48px; border-radius: 2px;
          border: 1px solid rgba(0,0,0,0.14); background: #fff;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #1a1816; opacity: 0.4; flex-shrink: 0;
          transition: all 0.2s;
        }
        .pp-wish-btn.active { color: #ef4444; opacity: 1; border-color: #fecaca; background: #fff5f5; }
        .pp-wish-btn:hover:not(.active) { border-color: #1a1816; opacity: 1; }
        .pp-wish-btn svg { width: 17px; height: 17px; }

        /* Mobile: stack qty row */
        @media (max-width: 400px) {
          .pp-qty-row { flex-wrap: wrap; }
          .pp-add-btn { flex: 1 1 100%; order: 2; }
          .pp-qty { order: 1; }
          .pp-wish-btn { order: 1; }
        }

        /* Features */
        .pp-features { margin-bottom: 20px; }
        .pp-feature {
          display: flex; align-items: flex-start; gap: 9px;
          font-family: 'Outfit', sans-serif;
          font-size: 12.5px; font-weight: 400; color: #1a1816;
          opacity: 0.7; padding: 5px 0;
        }
        .pp-feature svg { width: 14px; height: 14px; flex-shrink: 0; color: #1a1816; opacity: 1; margin-top: 2px; }

        /* ── Tabs ── */
        .pp-tabs { padding-top: 40px; border-top: 1px solid rgba(0,0,0,0.07); }
        @media (min-width: 900px) { .pp-tabs { grid-column: 1 / -1; } }

        .pp-tab-nav {
          display: flex; border-bottom: 1px solid rgba(0,0,0,0.07);
          margin-bottom: 28px; overflow-x: auto; scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }
        .pp-tab-nav::-webkit-scrollbar { display: none; }

        .pp-tab-btn {
          padding: 10px 18px; background: none; border: none; cursor: pointer;
          font-family: 'Outfit', sans-serif; font-size: 10.5px; font-weight: 500;
          letter-spacing: 0.14em; text-transform: uppercase; color: #1a1816; opacity: 0.35;
          border-bottom: 2px solid transparent; margin-bottom: -1px; white-space: nowrap;
          transition: color 0.2s, border-color 0.2s, opacity 0.2s;
        }
        .pp-tab-btn.active { opacity: 1; border-bottom-color: #1a1816; }

        .pp-tab-content {
          font-family: 'Outfit', sans-serif;
          font-size: 13.5px; font-weight: 400; color: #1a1816;
          opacity: 0.7; line-height: 1.75; max-width: 680px;
        }
        .pp-tab-content strong { font-weight: 600; opacity: 1; color: #1a1816; }

        .pp-compat-list { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
        .pp-compat-pill {
          padding: 4px 10px; background: #f5f4f2; border-radius: 2px;
          font-family: 'Outfit', sans-serif;
          font-size: 11.5px; font-weight: 400; color: #1a1816;
          border: 1px solid rgba(0,0,0,0.08);
        }

        /* ── Related ── */
        .pp-related {
          padding: 3rem 2.5rem 5rem;
          background: #fff; border-top: 1px solid rgba(0,0,0,0.07);
        }
        @media (max-width: 767px) { .pp-related { padding: 2rem 1.25rem 4rem; } }
        .pp-related-inner { max-width: 1520px; margin: 0 auto; }

        .pp-related-eyebrow {
          font-family: 'Outfit', sans-serif;
          font-size: 9.5px; font-weight: 600; letter-spacing: 0.22em;
          text-transform: uppercase; color: #1a1816; opacity: 0.5;
          margin-bottom: 6px; display: block;
        }
        .pp-related-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(1.4rem, 3vw, 2rem); font-weight: 700;
          color: #1a1816; margin: 0 0 1.75rem; letter-spacing: -0.02em;
        }

        .pp-related-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;
        }
        @media (min-width: 640px) {
          .pp-related-grid { grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
        }

        /* ── Sticky mobile bar ── */
        .pp-sticky {
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 90;
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(12px);
          border-top: 1px solid rgba(0,0,0,0.08);
          padding: 10px 1.25rem;
          display: flex; gap: 10px; align-items: center;
          transform: translateY(100%); transition: transform 0.3s ease;
        }
        .pp-sticky.show { transform: translateY(0); }
        @media (min-width: 900px) { .pp-sticky { display: none; } }

        .pp-sticky-name {
          flex: 1; min-width: 0;
          font-family: 'Outfit', sans-serif;
          font-size: 13px; font-weight: 500; color: #1a1816;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .pp-sticky-price {
          font-family: 'Outfit', sans-serif;
          font-size: 14px; font-weight: 700; color: #1a1816; flex-shrink: 0;
        }
        .pp-sticky-add {
          padding: 10px 18px; background: #1a1816; color: #fff;
          border: none; border-radius: 2px; cursor: pointer;
          font-family: 'Outfit', sans-serif;
          font-size: 9.5px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; flex-shrink: 0; transition: background 0.2s;
        }
        .pp-sticky-add:hover { background: #0f0f0f; }
      `}</style>

      <div className="pp-page">

        {/* Breadcrumb */}
        <nav className="pp-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M9 18l6-6-6-6" />
          </svg>
          <Link to={`/collections/${product.subcategory ?? product.category}`}>
            {collectionLabel} Collection
          </Link>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M9 18l6-6-6-6" />
          </svg>
          <span style={{ opacity: 1 }}>{product.name}</span>
        </nav>

        <div className="pp-main">

          {/* ── Gallery ── */}
          <div className="pp-gallery">
            <div className="pp-main-img">
              <img src={displayImages[imgIdx] ?? displayImages[0]} alt={product.name} />
            </div>
            {displayImages.length > 1 && (
              <div className="pp-thumbs">
                {displayImages.map((img, i) => (
                  <button
                    key={i} type="button"
                    className={`pp-thumb${imgIdx === i ? " active" : ""}`}
                    onClick={() => setImgIdx(i)}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={img} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Info ── */}
          <div className="pp-info">
            <span className="pp-collection">{collectionLabel} Collection</span>
            <h1 className="pp-name">{product.name}</h1>
            <p className="pp-tagline">{product.tagline}</p>

            <div className="pp-rating" aria-label={`${product.rating} out of 5 stars`}>
              <div className="pp-stars">
                {[1, 2, 3, 4, 5].map((n) => (
                  <svg key={n} viewBox="0 0 24 24"
                    fill={n <= Math.round(product.rating) ? "#1a1816" : "none"}
                    stroke="#1a1816" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden
                  >
                    <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                  </svg>
                ))}
              </div>
              <span className="pp-rc">
                <span>{product.rating}</span> · {product.reviewCount?.toLocaleString()} reviews
              </span>
            </div>

            <div className="pp-price-row">
              <span className="pp-price">{formatPrice(displayPrice)}</span>
              {displayCompare && <span className="pp-compare">{formatPrice(displayCompare)}</span>}
              {discPct && <span className="pp-discount">{discPct}% OFF</span>}
            </div>

            <hr className="pp-rule" />

            {product.colors?.length > 0 && (
              <>
                <span className="pp-section-label">
                  Colour <span className="pp-color-name">{selectedColor?.name}</span>
                </span>
                <div className="pp-colors">
                  {product.colors.map((c, i) => (
                    <button
                      key={c.name} type="button" title={c.name}
                      className={`pp-swatch${colorIdx === i ? " active" : ""}`}
                      style={{ backgroundColor: c.hex }}
                      onClick={() => setColorIdx(i)}
                      aria-label={c.name} aria-pressed={colorIdx === i}
                    />
                  ))}
                </div>
              </>
            )}

            {hasWcVariations && (
              <>
                <span className="pp-section-label">Model</span>
                <div className="pp-model-wrap">
                  <select
                    id="pp-wc-variation-select"
                    className="pp-model-select"
                    value={model}
                    onChange={(e) => { setModel(e.target.value); setImgIdx(0); }}
                    aria-label="Select model"
                  >
                    {product.variations.map((v) => (
                      <option key={v.id} value={String(v.id)}>{v.label}</option>
                    ))}
                  </select>
                  <svg className="pp-model-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </>
            )}

            {deviceList.length > 0 && !hasWcVariations && (
              <>
                <span className="pp-section-label">Your Device</span>
                <div className="pp-model-wrap">
                  <select
                    id="pp-model-select"
                    className="pp-model-select"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    aria-label="Select your device model"
                  >
                    <option value="">Select your model…</option>
                    {deviceList.map((d) => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                  <svg className="pp-model-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </>
            )}

            <div className="pp-qty-row">
              <div className="pp-qty" aria-label="Quantity">
                <button type="button" className="pp-qty-btn" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">−</button>
                <span className="pp-qty-num">{qty}</span>
                <button type="button" className="pp-qty-btn" onClick={() => setQty((q) => q + 1)} aria-label="Increase">+</button>
              </div>
              <button type="button" className="pp-add-btn" onClick={handleAddToBag}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
                </svg>
                Add to Bag
              </button>
              <button
                type="button"
                className={`pp-wish-btn${wished ? " active" : ""}`}
                onClick={handleWishlist}
                aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                aria-pressed={wished}
              >
                <svg viewBox="0 0 24 24" fill={wished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </button>
            </div>

            {product.features?.length > 0 && (
              <div className="pp-features">
                {product.features.map((f) => (
                  <div key={f} className="pp-feature">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {f}
                  </div>
                ))}
              </div>
            )}

            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 11.5, fontWeight: 400, color: "#1a1816", opacity: 0.45,
              borderTop: "1px solid rgba(0,0,0,0.07)", paddingTop: 14, margin: 0,
            }}>
              Free shipping on orders over ₹499 · 30-day returns
            </p>
          </div>

          {/* ── Tabs ── */}
          <div className="pp-tabs" style={{ gridColumn: "1 / -1" }}>
            <div className="pp-tab-nav" role="tablist">
              {["description", "details", "compatibility"].map((t) => (
                <button
                  key={t} type="button" role="tab"
                  aria-selected={tab === t}
                  className={`pp-tab-btn${tab === t ? " active" : ""}`}
                  onClick={() => setTab(t)}
                >
                  {t === "compatibility" ? "Compatible With" : t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
            <div className="pp-tab-content" role="tabpanel">
              {tab === "description" && <p>{product.description}</p>}
              {tab === "details" && (
                <div>
                  <p><strong>Material:</strong> {product.material}</p>
                  <p style={{ marginTop: 8 }}><strong>Collection:</strong> {product.collection}</p>
                  {product.deviceBrand && (
                    <p style={{ marginTop: 8 }}>
                      <strong>Made for:</strong> {product.deviceBrand.charAt(0).toUpperCase() + product.deviceBrand.slice(1)}
                    </p>
                  )}
                </div>
              )}
              {tab === "compatibility" && (
                product.compatibleWith?.length > 0 ? (
                  <div className="pp-compat-list">
                    {product.compatibleWith.map((c) => (
                      <span key={c} className="pp-compat-pill">{c}</span>
                    ))}
                  </div>
                ) : (
                  <p>This product is universally compatible.</p>
                )
              )}
            </div>
          </div>
        </div>

        {/* ── Related ── */}
        {related.length > 0 && (
          <div className="pp-related">
            <div className="pp-related-inner">
              <span className="pp-related-eyebrow">You may also love</span>
              <h2 className="pp-related-title">Complete your collection</h2>
              <div className="pp-related-grid">
                {related.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Sticky mobile bar ── */}
      <div className={`pp-sticky${stickyVisible ? " show" : ""}`}>
        <span className="pp-sticky-name">{product.name}</span>
        <span className="pp-sticky-price">{formatPrice(displayPrice)}</span>
        <button type="button" className="pp-sticky-add" onClick={handleAddToBag}>
          Add to Bag
        </button>
      </div>
    </>
  );
}