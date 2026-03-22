import { useState, useMemo, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import { PRODUCTS } from "../data/products";
import { isWooCommerceEnabled } from "../config/woocommerce.js";
import { loadProductsForCategory } from "../products/shopCatalog.js";

const CATEGORY_META = {
  all: {
    title: "All Products",
    sub: "Explore our full collection of premium tech accessories.",
    banner: "/banners/all.jpg",
  },
  "phone-cases": {
    title: "Phone Cases",
    sub: "Military-grade protection meets premium design.",
    banner: "/phonecase.png",
  },
  "iphone-cases": {
    title: "iPhone Cases",
    sub: "Crafted precisely for every iPhone model.",
    banner: "/phonecase.png",
  },
  "samsung-cases": {
    title: "Samsung Cases",
    sub: "Precision-fit cases for the Galaxy lineup.",
    banner: "/banners/samsung-cases.jpg",
  },
  "pixel-cases": {
    title: "Pixel Cases",
    sub: "Premium protection for Google Pixel devices.",
    banner: "/banners/pixel-cases.jpg",
  },
  "airpods-cases": {
    title: "AirPods Cases",
    sub: "Protect your audio in style.",
    banner: "/banners/airpods-cases.jpg",
  },
  "watch-bands": {
    title: "Watch Bands",
    sub: "Elevate your Apple Watch every single day.",
    banner: "/banners/watch-bands.jpg",
  },
  magsafe: {
    title: "MagSafe",
    sub: "Snap. Mount. Charge. The complete ecosystem.",
    banner: "/banners/magsafe.jpg",
  },
};

const DEVICE_OPTIONS = {
  "iphone-cases": [
    "iPhone 17 Pro Max",
    "iPhone 17 Pro",
    "iPhone 17 Air",
    "iPhone 17",
    "iPhone 16 Pro Max",
    "iPhone 16 Pro",
    "iPhone 16 Plus",
    "iPhone 16",
    "iPhone 15 Pro Max",
    "iPhone 15 Pro",
    "iPhone 15",
    "iPhone 14 Pro Max",
    "iPhone 14 Pro",
    "iPhone 14",
  ],
  "samsung-cases": [
    "S25 Ultra",
    "S25+",
    "S25",
    "S24 Ultra",
    "S24+",
    "S24",
    "S23 Ultra",
    "S23+",
    "S23",
    "A55",
    "A54",
    "A53",
  ],
  "pixel-cases": [
    "Pixel 9 Pro XL",
    "Pixel 9 Pro",
    "Pixel 9",
    "Pixel 8 Pro",
    "Pixel 8",
  ],
  "airpods-cases": [
    "AirPods Pro 2",
    "AirPods Pro 1",
    "AirPods 4",
    "AirPods 3",
    "AirPods 2",
    "AirPods Max",
  ],
  "watch-bands": ["49mm", "45mm", "44mm", "42mm", "41mm", "40mm", "38mm"],
};

const TYPE_OPTIONS = {
  "phone-cases": [
    "Clear Cases",
    "Protective Cases",
    "Slim Cases",
    "Leather Cases",
    "Wallet Cases",
  ],
  "iphone-cases": [
    "Clear Cases",
    "Protective Cases",
    "Slim Cases",
    "Leather Cases",
    "MagSafe",
  ],
  "samsung-cases": [
    "Clear Cases",
    "Protective Cases",
    "Slim Cases",
    "Leather Cases",
  ],
  "pixel-cases": ["Clear Cases", "Protective Cases", "Slim Cases"],
  "airpods-cases": ["Silicone", "Leather", "Clear", "Hard Shell"],
  "watch-bands": ["Silicone", "Leather", "Metal", "Braided", "Nylon"],
  magsafe: ["Wallets", "Stands", "Car Mounts", "Grips", "Battery Packs"],
};

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "featured", label: "Popularity" },
  { value: "discount", label: "Discount" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
];

export default function CategoryPage() {
  const { category = "all" } = useParams();
  const [searchParams] = useSearchParams();
  const deviceFilter = searchParams.get("device") || "";

  const [sort, setSort] = useState("newest");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(10000);
  const [showSale, setShowSale] = useState(false);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const meta = CATEGORY_META[category] ?? {
    title: "Collection",
    sub: "",
    banner: "",
  };
  const deviceOpts = DEVICE_OPTIONS[category] ?? [];
  const typeOpts = TYPE_OPTIONS[category] ?? TYPE_OPTIONS["phone-cases"];

  const breadcrumbs = useMemo(() => {
    const c = [{ label: "Home", to: "/" }];
    if (category !== "all") {
      if (["iphone-cases", "samsung-cases", "pixel-cases"].includes(category))
        c.push({ label: "Phone Cases", to: "/collections/phone-cases" });
      c.push({ label: meta.title, to: null });
    } else {
      c.push({ label: "All Products", to: null });
    }
    return c;
  }, [category, meta.title]);

  const toggleDevice = (d) =>
    setSelectedDevices((v) =>
      v.includes(d) ? v.filter((x) => x !== d) : [...v, d],
    );
  const toggleType = (t) =>
    setSelectedTypes((v) =>
      v.includes(t) ? v.filter((x) => x !== t) : [...v, t],
    );
  const hasFilters =
    priceMin > 0 ||
    priceMax < 10000 ||
    showSale ||
    selectedDevices.length > 0 ||
    selectedTypes.length > 0;

  const clearFilters = () => {
    setPriceMin(0);
    setPriceMax(10000);
    setShowSale(false);
    setSelectedDevices([]);
    setSelectedTypes([]);
  };

  const [wcCatalog, setWcCatalog] = useState(null);

  useEffect(() => {
    if (!isWooCommerceEnabled()) {
      setWcCatalog(null);
      return;
    }
    let cancelled = false;
    setWcCatalog(null);
    loadProductsForCategory(category)
      .then((rows) => {
        if (!cancelled) setWcCatalog(Array.isArray(rows) ? rows : null);
      })
      .catch(() => {
        if (!cancelled) setWcCatalog(null);
      });
    return () => {
      cancelled = true;
    };
  }, [category]);

  const filtered = useMemo(() => {
    let list =
      wcCatalog && wcCatalog.length > 0
        ? [...wcCatalog]
        : category === "all"
          ? [...PRODUCTS]
          : PRODUCTS.filter(
              (p) => p.category === category || p.subcategory === category,
            );

    const fromWc = wcCatalog && wcCatalog.length > 0;
    if (deviceFilter && !fromWc)
      list = list.filter((p) =>
        p.compatibleWith?.some((c) =>
          c.toLowerCase().includes(deviceFilter.toLowerCase()),
        ),
      );
    if (selectedDevices.length > 0 && !fromWc)
      list = list.filter((p) =>
        selectedDevices.some((d) =>
          p.compatibleWith?.some((c) => c.includes(d)),
        ),
      );
    if (selectedTypes.length > 0 && !fromWc)
      list = list.filter((p) =>
        selectedTypes.some((t) => p.type?.includes(t) || p.tags?.includes(t)),
      );
    if (showSale) list = list.filter((p) => !!p.comparePrice);
    list = list.filter((p) => p.price >= priceMin && p.price <= priceMax);

    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "discount": {
        const pct = (p) => (p.comparePrice ? 1 - p.price / p.comparePrice : 0);
        return [...list].sort((a, b) => pct(b) - pct(a));
      }
      case "newest":
        return [...list].sort(
          (a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0),
        );
      default:
        return [...list].sort(
          (a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0),
        );
    }
  }, [
    category,
    sort,
    priceMin,
    priceMax,
    showSale,
    deviceFilter,
    selectedDevices,
    selectedTypes,
    wcCatalog,
  ]);

  // card columns: collapsed sidebar = 4 cols, expanded = 3 cols
  const gridCols = sidebarCollapsed ? 4 : 3;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .cp-page {
          min-height: 100vh; background: #fff;
          font-family: 'DM Sans', sans-serif;
          padding-top: 88px;
          -webkit-font-smoothing: antialiased;
          color: #1c1917;
        }

        /* ── Banner ── */
        .cp-banner {
          position: relative; height: 340px;
          overflow: hidden; background: #1c1917;
        }
        @media (max-width: 767px) { .cp-banner { height: 220px; } }
        .cp-banner-img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center; display: block;
        }
        .cp-banner-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to right, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.18) 50%, rgba(0,0,0,0) 100%);
          display: flex; align-items: flex-end;
          padding: 0 3.5rem 3rem;
        }
        @media (max-width: 767px) { .cp-banner-overlay { padding: 0 1.5rem 2rem; } }
        .cp-banner-content { max-width: 520px; }
        .cp-breadcrumb {
          display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
          font-size: 10px; color: rgba(255,255,255,0.5);
          margin-bottom: 10px; letter-spacing: 0.04em;
        }
        .cp-breadcrumb a {
          color: rgba(255,255,255,0.5); text-decoration: none;
          transition: color 0.15s;
        }
        .cp-breadcrumb a:hover { color: rgba(255,255,255,0.85); }
        .cp-breadcrumb-sep { opacity: 0.35; }
        .cp-banner-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 500;
          color: #fff; margin: 0 0 8px; line-height: 1.05;
          letter-spacing: -0.02em;
        }
        .cp-banner-sub {
          font-size: 13px; font-weight: 300;
          color: rgba(255,255,255,0.65); margin: 0; line-height: 1.6;
        }

        /* ── Body: sidebar + main ── */
        .cp-body {
          display: flex; align-items: flex-start;
          max-width: 1520px; margin: 0 auto;
          min-height: calc(100vh - 88px - 340px);
        }

        /* ── Sidebar ── */
        .cp-sidebar-wrap {
          flex-shrink: 0;
          width: 240px;
          border-right: 1px solid rgba(0,0,0,0.07);
          transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
          position: sticky;
          top: 88px;
          align-self: flex-start;
          height: calc(100vh - 88px);
          overflow: hidden;
          display: flex; flex-direction: column;
        }
        .cp-sidebar-wrap.collapsed { width: 52px; }
        @media (max-width: 1023px) { .cp-sidebar-wrap { display: none; } }

        /* Collapse toggle button — sits at top of sidebar */
        .cp-sidebar-toggle {
          display: flex; align-items: center; justify-content: center;
          width: 100%; height: 52px; flex-shrink: 0;
          background: none; border: none; border-bottom: 1px solid rgba(0,0,0,0.07);
          cursor: pointer; color: #7a7772;
          transition: color 0.15s, background 0.15s;
          gap: 8px;
        }
        .cp-sidebar-toggle:hover { color: #1c1917; background: rgba(0,0,0,0.02); }
        .cp-sidebar-toggle svg { width: 16px; height: 16px; flex-shrink: 0; }
        .cp-sidebar-toggle-label {
          font-size: 9px; font-weight: 500; letter-spacing: 0.2em;
          text-transform: uppercase; white-space: nowrap;
          transition: opacity 0.2s;
        }
        .cp-sidebar-wrap.collapsed .cp-sidebar-toggle-label { opacity: 0; pointer-events: none; }

        /* Sidebar scroll area */
        .cp-sidebar-scroll {
          flex: 1; overflow-y: auto; overflow-x: hidden;
          padding: 1.5rem 1.25rem 3rem;
          transition: opacity 0.2s;
        }
        .cp-sidebar-scroll::-webkit-scrollbar { width: 2px; }
        .cp-sidebar-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.08); }
        .cp-sidebar-wrap.collapsed .cp-sidebar-scroll {
          opacity: 0; pointer-events: none;
        }

        /* Filter block */
        .cp-filter-block {
          border-bottom: 1px solid rgba(0,0,0,0.06);
          padding-bottom: 1.25rem; margin-bottom: 1.25rem;
        }
        .cp-filter-block:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }

        .cp-fb-header {
          display: flex; align-items: center; justify-content: space-between;
          cursor: pointer; user-select: none;
          padding: 0 0 0.75rem; gap: 8px;
        }
        .cp-fb-header:not(.has-content) { padding-bottom: 0; }
        .cp-fb-title {
          font-size: 9.5px; font-weight: 500; letter-spacing: 0.2em;
          text-transform: uppercase; color: #1c1917;
        }
        .cp-fb-chevron {
          width: 12px; height: 12px; color: #b0aca7; flex-shrink: 0;
          transition: transform 0.2s;
        }
        .cp-fb-header.open .cp-fb-chevron { transform: rotate(180deg); }

        /* Checkbox items */
        .cp-check-list { display: flex; flex-direction: column; gap: 1px; }
        .cp-check-item {
          display: flex; align-items: center; gap: 9px;
          padding: 4.5px 0; cursor: pointer; min-width: 0;
        }
        .cp-check-box {
          width: 14px; height: 14px; min-width: 14px; flex-shrink: 0;
          border: 1px solid rgba(0,0,0,0.18); border-radius: 2px;
          background: #fff; display: flex; align-items: center; justify-content: center;
          transition: border-color 0.15s, background 0.15s;
        }
        .cp-check-item.ck .cp-check-box { background: #1c1917; border-color: #1c1917; }
        .cp-check-box svg { width: 8px; height: 8px; }
        .cp-check-label {
          font-size: 12px; font-weight: 300; color: #57534e;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          transition: color 0.15s;
        }
        .cp-check-item.ck .cp-check-label,
        .cp-check-item:hover .cp-check-label { color: #1c1917; }
        .cp-check-item:hover .cp-check-box { border-color: #1c1917; }

        /* Price inputs — key fix: width 100%, no overflow */
        .cp-price-row {
          display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
          width: 100%;
        }
        .cp-price-field { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
        .cp-price-label {
          font-size: 9px; color: #b0aca7; letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .cp-price-input {
          width: 100%; min-width: 0;
          padding: 7px 8px;
          border: 1px solid rgba(0,0,0,0.12); border-radius: 2px;
          font-size: 12px; color: #1c1917; font-family: 'DM Sans', sans-serif;
          outline: none; background: #fff;
          transition: border-color 0.15s;
          appearance: none; -moz-appearance: textfield;
        }
        .cp-price-input::-webkit-inner-spin-button,
        .cp-price-input::-webkit-outer-spin-button { -webkit-appearance: none; }
        .cp-price-input:focus { border-color: #1c1917; }

        /* Sale toggle */
        .cp-toggle-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
        .cp-toggle-label { font-size: 12px; font-weight: 300; color: #57534e; }
        .cp-toggle { position: relative; width: 36px; height: 20px; flex-shrink: 0; cursor: pointer; }
        .cp-toggle input { opacity: 0; width: 0; height: 0; position: absolute; }
        .cp-toggle-track {
          position: absolute; inset: 0; background: #e7e5e4;
          border-radius: 20px; cursor: pointer; transition: background 0.22s;
        }
        .cp-toggle-track::before {
          content: ''; position: absolute; width: 14px; height: 14px;
          left: 3px; top: 3px; background: #fff; border-radius: 50%;
          transition: transform 0.22s;
        }
        .cp-toggle input:checked + .cp-toggle-track { background: #1c1917; }
        .cp-toggle input:checked + .cp-toggle-track::before { transform: translateX(16px); }

        /* Sort radio */
        .cp-sort-list { display: flex; flex-direction: column; gap: 2px; }
        .cp-sort-item {
          display: flex; align-items: center; gap: 9px;
          padding: 4.5px 0; cursor: pointer;
        }
        .cp-sort-radio {
          width: 14px; height: 14px; min-width: 14px; flex-shrink: 0;
          border: 1px solid rgba(0,0,0,0.18); border-radius: 50%;
          background: #fff; display: flex; align-items: center; justify-content: center;
          transition: border-color 0.15s;
        }
        .cp-sort-item.sel .cp-sort-radio { border-color: #1c1917; }
        .cp-sort-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #1c1917; opacity: 0; transition: opacity 0.15s;
        }
        .cp-sort-item.sel .cp-sort-dot { opacity: 1; }
        .cp-sort-label {
          font-size: 12px; font-weight: 300; color: #57534e;
          transition: color 0.15s; white-space: nowrap;
        }
        .cp-sort-item.sel .cp-sort-label,
        .cp-sort-item:hover .cp-sort-label { color: #1c1917; }

        /* Clear button */
        .cp-clear-btn {
          margin-top: 1.25rem;
          font-size: 9.5px; font-weight: 500; letter-spacing: 0.14em;
          text-transform: uppercase; color: #7a7772;
          background: none; border: none; padding: 0; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          text-decoration: underline; text-underline-offset: 3px;
          transition: color 0.15s;
        }
        .cp-clear-btn:hover { color: #1c1917; }

        /* ── Main content ── */
        .cp-main {
          flex: 1; min-width: 0;
          padding: 2rem 2.5rem 4rem;
        }
        @media (max-width: 1023px) { .cp-main { padding: 1.5rem 1.25rem 3rem; } }

        /* Toolbar */
        .cp-toolbar {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 1.75rem; gap: 12px;
        }
        .cp-count { font-size: 11.5px; color: #b0aca7; letter-spacing: 0.04em; }

        .cp-mobile-filter-btn {
          display: none;
          align-items: center; gap: 7px; padding: 8px 14px;
          border: 1px solid rgba(0,0,0,0.12); border-radius: 2px;
          background: #fff; color: #1c1917;
          font-family: 'DM Sans', sans-serif; font-size: 10.5px;
          font-weight: 500; letter-spacing: 0.1em;
          text-transform: uppercase; cursor: pointer;
          transition: border-color 0.2s;
        }
        .cp-mobile-filter-btn:hover { border-color: #1c1917; }
        .cp-mobile-filter-btn svg { width: 14px; height: 14px; }
        @media (max-width: 1023px) { .cp-mobile-filter-btn { display: inline-flex; } }

        .cp-filter-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #1c1917; flex-shrink: 0;
        }

        /* Device badge */
        .cp-device-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: #f5f4f2; color: #57534e;
          padding: 5px 12px; border-radius: 2px;
          font-size: 11px; font-weight: 400; margin-bottom: 1.5rem;
          border: 1px solid rgba(0,0,0,0.07);
        }
        .cp-device-badge button {
          background: none; border: none; cursor: pointer;
          color: #7a7772; font-size: 16px; line-height: 1; padding: 0;
          transition: color 0.15s;
        }
        .cp-device-badge button:hover { color: #1c1917; }

        /* Product grid — dynamic cols via CSS var */
        .cp-grid {
          display: grid;
          grid-template-columns: repeat(var(--cp-cols, 3), minmax(0, 1fr));
          gap: 1.5rem;
        }
        @media (max-width: 1023px) {
          .cp-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
        }
        @media (max-width: 479px) {
          .cp-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.75rem; }
        }

        /* Empty state */
        .cp-empty {
          grid-column: 1 / -1; text-align: center; padding: 5rem 2rem;
        }
        .cp-empty-icon { color: #e7e5e4; margin: 0 auto 1.5rem; display: block; }
        .cp-empty-text { font-size: 13.5px; color: #7a7772; margin-bottom: 1.5rem; font-weight: 300; }
        .cp-empty-link {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 10px; font-weight: 500; letter-spacing: 0.18em;
          text-transform: uppercase; color: #1c1917; text-decoration: none;
          border-bottom: 1px solid #1c1917; padding-bottom: 2px;
          transition: opacity 0.2s;
        }
        .cp-empty-link:hover { opacity: 0.55; }

        /* ── Mobile drawer ── */
        .cp-drawer-backdrop {
          position: fixed; inset: 0; z-index: 400;
          background: rgba(0,0,0,0.28);
          opacity: 0; pointer-events: none; transition: opacity 0.28s;
        }
        .cp-drawer-backdrop.open { opacity: 1; pointer-events: auto; }
        .cp-drawer {
          position: fixed; top: 0; right: 0; bottom: 0; z-index: 401;
          width: 300px; max-width: 90vw; background: #fff;
          transform: translateX(100%);
          transition: transform 0.32s cubic-bezier(0.4,0,0.2,1);
          display: flex; flex-direction: column;
        }
        .cp-drawer.open { transform: translateX(0); }
        .cp-drawer-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.25rem 1.5rem; border-bottom: 1px solid rgba(0,0,0,0.07);
          flex-shrink: 0;
        }
        .cp-drawer-title {
          font-size: 9px; font-weight: 500; letter-spacing: 0.26em;
          text-transform: uppercase; color: #b0aca7;
        }
        .cp-drawer-close {
          width: 32px; height: 32px; border-radius: 50%;
          border: 1px solid rgba(0,0,0,0.1); background: #fff;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #7a7772;
          transition: border-color 0.15s, color 0.15s;
        }
        .cp-drawer-close:hover { border-color: #1c1917; color: #1c1917; }
        .cp-drawer-close svg { width: 13px; height: 13px; }
        .cp-drawer-scroll {
          flex: 1; overflow-y: auto; padding: 1.25rem 1.5rem 2rem;
        }
        .cp-drawer-scroll::-webkit-scrollbar { width: 2px; }
        .cp-drawer-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.08); }
      `}</style>

      <div className="cp-page">
        {/* ── Banner ── */}
        <div className="cp-banner">
          {meta.banner ? (
            <img src={meta.banner} alt={meta.title} className="cp-banner-img" />
          ) : (
            <div
              style={{ width: "100%", height: "100%", background: "#1c1917" }}
            />
          )}
          <div className="cp-banner-overlay">
            <div className="cp-banner-content">
              <nav className="cp-breadcrumb" aria-label="Breadcrumb">
                {breadcrumbs.map((crumb, i) => (
                  <span
                    key={crumb.label}
                    style={{ display: "flex", alignItems: "center", gap: 5 }}
                  >
                    {i > 0 && <span className="cp-breadcrumb-sep">/</span>}
                    {crumb.to ? (
                      <Link to={crumb.to}>{crumb.label}</Link>
                    ) : (
                      <span style={{ color: "rgba(255,255,255,0.75)" }}>
                        {crumb.label}
                      </span>
                    )}
                  </span>
                ))}
              </nav>
              <h1 className="cp-banner-title">{meta.title}</h1>
              <p className="cp-banner-sub">{meta.sub}</p>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="cp-body">
          {/* Desktop sidebar */}
          <aside
            className={`cp-sidebar-wrap${sidebarCollapsed ? " collapsed" : ""}`}
            aria-label="Filters"
          >
            {/* Collapse toggle */}
            <button
              type="button"
              className="cp-sidebar-toggle"
              onClick={() => setSidebarCollapsed((v) => !v)}
              aria-label={
                sidebarCollapsed ? "Expand filters" : "Collapse filters"
              }
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {sidebarCollapsed ? (
                  <path d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                ) : (
                  <path d="M11 5l-7 7 7 7M19 5l-7 7 7 7" />
                )}
              </svg>
              <span className="cp-sidebar-toggle-label">
                {sidebarCollapsed ? "Filters" : "Hide Filters"}
              </span>
            </button>

            <div className="cp-sidebar-scroll">
              <SidebarFilters
                deviceOpts={deviceOpts}
                typeOpts={typeOpts}
                selectedDevices={selectedDevices}
                toggleDevice={toggleDevice}
                selectedTypes={selectedTypes}
                toggleType={toggleType}
                priceMin={priceMin}
                setPriceMin={setPriceMin}
                priceMax={priceMax}
                setPriceMax={setPriceMax}
                showSale={showSale}
                setShowSale={setShowSale}
                sort={sort}
                setSort={setSort}
              />
              {hasFilters && (
                <button
                  className="cp-clear-btn"
                  type="button"
                  onClick={clearFilters}
                >
                  Clear all filters
                </button>
              )}
            </div>
          </aside>

          {/* Main */}
          <main className="cp-main">
            <div className="cp-toolbar">
              <span className="cp-count">
                {filtered.length} product{filtered.length !== 1 ? "s" : ""}
              </span>
              <button
                type="button"
                className="cp-mobile-filter-btn"
                onClick={() => setMobileFilterOpen(true)}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="8" y1="12" x2="20" y2="12" />
                  <line x1="12" y1="18" x2="20" y2="18" />
                </svg>
                Filter &amp; Sort
                {hasFilters && <span className="cp-filter-dot" />}
              </button>
            </div>

            {deviceFilter && (
              <div className="cp-device-badge">
                Showing: {deviceFilter}
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  aria-label="Clear filter"
                >
                  ×
                </button>
              </div>
            )}

            {/* Grid — CSS var drives column count */}
            <div className="cp-grid" style={{ "--cp-cols": gridCols }}>
              {filtered.length > 0 ? (
                filtered.map((p) => <ProductCard key={p.id} product={p} />)
              ) : (
                <div className="cp-empty">
                  <svg
                    className="cp-empty-icon"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  <p className="cp-empty-text">
                    No products match your filters.
                  </p>
                  <Link to="/collections/all" className="cp-empty-link">
                    Browse all products
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile drawer backdrop */}
      <div
        className={`cp-drawer-backdrop${mobileFilterOpen ? " open" : ""}`}
        onClick={() => setMobileFilterOpen(false)}
      />

      {/* Mobile drawer */}
      <div
        className={`cp-drawer${mobileFilterOpen ? " open" : ""}`}
        aria-label="Filters"
      >
        <div className="cp-drawer-head">
          <span className="cp-drawer-title">Filter &amp; Sort</span>
          <button
            type="button"
            className="cp-drawer-close"
            onClick={() => setMobileFilterOpen(false)}
            aria-label="Close"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="cp-drawer-scroll">
          <SidebarFilters
            deviceOpts={deviceOpts}
            typeOpts={typeOpts}
            selectedDevices={selectedDevices}
            toggleDevice={toggleDevice}
            selectedTypes={selectedTypes}
            toggleType={toggleType}
            priceMin={priceMin}
            setPriceMin={setPriceMin}
            priceMax={priceMax}
            setPriceMax={setPriceMax}
            showSale={showSale}
            setShowSale={setShowSale}
            sort={sort}
            setSort={setSort}
          />
          {hasFilters && (
            <button
              className="cp-clear-btn"
              type="button"
              onClick={() => {
                clearFilters();
                setMobileFilterOpen(false);
              }}
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>
    </>
  );
}

// ── Collapsible filter block ──────────────────────────────────────────────────
function FilterBlock({ title, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="cp-filter-block">
      <div
        className={`cp-fb-header has-content${open ? " open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="cp-fb-title">{title}</span>
        <svg
          className="cp-fb-chevron"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
      {open && <div style={{ paddingTop: 4 }}>{children}</div>}
    </div>
  );
}

// ── Shared filter content ─────────────────────────────────────────────────────
function SidebarFilters({
  deviceOpts,
  typeOpts,
  selectedDevices,
  toggleDevice,
  selectedTypes,
  toggleType,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  showSale,
  setShowSale,
  sort,
  setSort,
}) {
  const Tick = () => (
    <svg
      viewBox="0 0 10 8"
      fill="none"
      stroke="#fff"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 4l3 3 5-6" />
    </svg>
  );
  return (
    <>
      <FilterBlock title="Sort By">
        <div className="cp-sort-list">
          {SORT_OPTIONS.map((o) => (
            <div
              key={o.value}
              className={`cp-sort-item${sort === o.value ? " sel" : ""}`}
              onClick={() => setSort(o.value)}
              role="radio"
              aria-checked={sort === o.value}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSort(o.value)}
            >
              <div className="cp-sort-radio">
                <div className="cp-sort-dot" />
              </div>
              <span className="cp-sort-label">{o.label}</span>
            </div>
          ))}
        </div>
      </FilterBlock>

      {deviceOpts.length > 0 && (
        <FilterBlock title="Device">
          <div className="cp-check-list">
            {deviceOpts.map((d) => (
              <div
                key={d}
                className={`cp-check-item${selectedDevices.includes(d) ? " ck" : ""}`}
                onClick={() => toggleDevice(d)}
                role="checkbox"
                aria-checked={selectedDevices.includes(d)}
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && toggleDevice(d)}
              >
                <div className="cp-check-box">
                  {selectedDevices.includes(d) && <Tick />}
                </div>
                <span className="cp-check-label">{d}</span>
              </div>
            ))}
          </div>
        </FilterBlock>
      )}

      <FilterBlock title="Type">
        <div className="cp-check-list">
          {typeOpts.map((t) => (
            <div
              key={t}
              className={`cp-check-item${selectedTypes.includes(t) ? " ck" : ""}`}
              onClick={() => toggleType(t)}
              role="checkbox"
              aria-checked={selectedTypes.includes(t)}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && toggleType(t)}
            >
              <div className="cp-check-box">
                {selectedTypes.includes(t) && <Tick />}
              </div>
              <span className="cp-check-label">{t}</span>
            </div>
          ))}
        </div>
      </FilterBlock>

      <FilterBlock title="Price">
        <div className="cp-price-row">
          <div className="cp-price-field">
            <span className="cp-price-label">Min ($)</span>
            <input
              type="number"
              className="cp-price-input"
              value={priceMin}
              min={0}
              onChange={(e) => setPriceMin(Number(e.target.value))}
              placeholder="0"
            />
          </div>
          <div className="cp-price-field">
            <span className="cp-price-label">Max ($)</span>
            <input
              type="number"
              className="cp-price-input"
              value={priceMax}
              min={0}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              placeholder="10000"
            />
          </div>
        </div>
      </FilterBlock>

      <FilterBlock title="Availability" defaultOpen={false}>
        <div className="cp-toggle-row">
          <span className="cp-toggle-label">On sale only</span>
          <label className="cp-toggle">
            <input
              type="checkbox"
              checked={showSale}
              onChange={(e) => setShowSale(e.target.checked)}
            />
            <span className="cp-toggle-track" />
          </label>
        </div>
      </FilterBlock>
    </>
  );
}
