import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";

// ─── Navbar height exported so Hero can offset itself ────────────────────────
export const NAVBAR_H = { desktop: 88, mobile: 72 };
// ─────────────────────────────────────────────────────────────────────────────

const MEGA_MENU = {
  "Phone Cases": {
    brands: [
      {
        key: "iphone",
        label: "iPhone",
        href: "/collections/iphone-cases",
        series: [
          {
            label: "iPhone 17 Series",
            options: [
              { label: "iPhone 17 Pro Max", href: "/collections/iphone-cases?model=iphone-17-pro-max" },
              { label: "iPhone 17 Pro", href: "/collections/iphone-cases?model=iphone-17-pro" },
              { label: "iPhone 17 Air", href: "/collections/iphone-cases?model=iphone-17-air" },
              { label: "iPhone 17", href: "/collections/iphone-cases?model=iphone-17" },
            ],
          },
          {
            label: "iPhone 16 Series",
            options: [
              { label: "iPhone 16 Pro Max", href: "/collections/iphone-cases?model=iphone-16-pro-max" },
              { label: "iPhone 16 Pro", href: "/collections/iphone-cases?model=iphone-16-pro" },
              { label: "iPhone 16 Plus", href: "/collections/iphone-cases?model=iphone-16-plus" },
              { label: "iPhone 16", href: "/collections/iphone-cases?model=iphone-16" },
              { label: "iPhone 16e", href: "/collections/iphone-cases?model=iphone-16e" },
            ],
          },
          {
            label: "iPhone 15 Series",
            options: [
              { label: "iPhone 15 Pro Max", href: "/collections/iphone-cases?model=iphone-15-pro-max" },
              { label: "iPhone 15 Pro", href: "/collections/iphone-cases?model=iphone-15-pro" },
              { label: "iPhone 15 Plus", href: "/collections/iphone-cases?model=iphone-15-plus" },
              { label: "iPhone 15", href: "/collections/iphone-cases?model=iphone-15" },
            ],
          },
          {
            label: "iPhone 14 Series",
            options: [
              { label: "iPhone 14 Pro Max", href: "/collections/iphone-cases?model=iphone-14-pro-max" },
              { label: "iPhone 14 Pro", href: "/collections/iphone-cases?model=iphone-14-pro" },
              { label: "iPhone 14 Plus", href: "/collections/iphone-cases?model=iphone-14-plus" },
              { label: "iPhone 14", href: "/collections/iphone-cases?model=iphone-14" },
            ],
          },
          {
            label: "iPhone 13 Series",
            options: [
              { label: "iPhone 13 Pro Max", href: "/collections/iphone-cases?model=iphone-13-pro-max" },
              { label: "iPhone 13 Pro", href: "/collections/iphone-cases?model=iphone-13-pro" },
              { label: "iPhone 13 Mini", href: "/collections/iphone-cases?model=iphone-13-mini" },
              { label: "iPhone 13", href: "/collections/iphone-cases?model=iphone-13" },
            ],
          },
          {
            label: "iPhone 12 Series",
            options: [
              { label: "iPhone 12 Pro Max", href: "/collections/iphone-cases?model=iphone-12-pro-max" },
              { label: "iPhone 12 Pro", href: "/collections/iphone-cases?model=iphone-12-pro" },
              { label: "iPhone 12 Mini", href: "/collections/iphone-cases?model=iphone-12-mini" },
              { label: "iPhone 12", href: "/collections/iphone-cases?model=iphone-12" },
            ],
          },
        ],
      },
      {
        key: "samsung",
        label: "Samsung",
        href: "/collections/samsung-cases",
        series: [
          {
            label: "Galaxy S25 Series",
            options: [
              { label: "S25 Ultra", href: "/collections/samsung-cases?model=s25-ultra" },
              { label: "S25+", href: "/collections/samsung-cases?model=s25-plus" },
              { label: "S25", href: "/collections/samsung-cases?model=s25" },
            ],
          },
          {
            label: "Galaxy S24 Series",
            options: [
              { label: "S24 Ultra", href: "/collections/samsung-cases?model=s24-ultra" },
              { label: "S24+", href: "/collections/samsung-cases?model=s24-plus" },
              { label: "S24", href: "/collections/samsung-cases?model=s24" },
            ],
          },
          {
            label: "Galaxy S23 Series",
            options: [
              { label: "S23 Ultra", href: "/collections/samsung-cases?model=s23-ultra" },
              { label: "S23+", href: "/collections/samsung-cases?model=s23-plus" },
              { label: "S23", href: "/collections/samsung-cases?model=s23" },
            ],
          },
          {
            label: "Galaxy A Series",
            options: [
              { label: "A55", href: "/collections/samsung-cases?model=a55" },
              { label: "A54", href: "/collections/samsung-cases?model=a54" },
              { label: "A53", href: "/collections/samsung-cases?model=a53" },
              { label: "A52", href: "/collections/samsung-cases?model=a52" },
            ],
          },
          {
            label: "Galaxy Z Series",
            options: [
              { label: "Z Fold 6", href: "/collections/samsung-cases?model=z-fold-6" },
              { label: "Z Fold 5", href: "/collections/samsung-cases?model=z-fold-5" },
              { label: "Z Flip 6", href: "/collections/samsung-cases?model=z-flip-6" },
              { label: "Z Flip 5", href: "/collections/samsung-cases?model=z-flip-5" },
            ],
          },
        ],
      },
      {
        key: "pixel",
        label: "Google Pixel",
        href: "/collections/pixel-cases",
        series: [
          {
            label: "Pixel 9 Series",
            options: [
              { label: "Pixel 9 Pro XL", href: "/collections/pixel-cases?model=pixel-9-pro-xl" },
              { label: "Pixel 9 Pro", href: "/collections/pixel-cases?model=pixel-9-pro" },
              { label: "Pixel 9", href: "/collections/pixel-cases?model=pixel-9" },
            ],
          },
          {
            label: "Pixel 8 Series",
            options: [
              { label: "Pixel 8 Pro", href: "/collections/pixel-cases?model=pixel-8-pro" },
              { label: "Pixel 8", href: "/collections/pixel-cases?model=pixel-8" },
            ],
          },
          {
            label: "Pixel 7 Series",
            options: [
              { label: "Pixel 7 Pro", href: "/collections/pixel-cases?model=pixel-7-pro" },
              { label: "Pixel 7a", href: "/collections/pixel-cases?model=pixel-7a" },
              { label: "Pixel 7", href: "/collections/pixel-cases?model=pixel-7" },
            ],
          },
        ],
      },
    ],
    promo: {
      eyebrow: "New Arrivals",
      headline: "Latest\nPhone Cases",
      sub: "Premium protection for every model. Slim profile, military-grade drop resistance.",
      cta: "Shop All Cases",
      href: "/collections/phone-cases",
      stat1: { num: "500+", label: "Designs" },
      stat2: { num: "Free", label: "Shipping ₹499+" },
    },
  },

  "AirPods Cases": {
    brands: [
      {
        key: "airpods-pro",
        label: "AirPods Pro",
        href: "/collections/airpods-cases",
        series: [
          {
            label: "AirPods Pro",
            options: [
              { label: "AirPods Pro 2nd Gen (USB-C)", href: "/collections/airpods-cases?model=airpods-pro-2-usbc" },
              { label: "AirPods Pro 2nd Gen", href: "/collections/airpods-cases?model=airpods-pro-2" },
              { label: "AirPods Pro 1st Gen", href: "/collections/airpods-cases?model=airpods-pro-1" },
            ],
          },
        ],
      },
      {
        key: "airpods-std",
        label: "AirPods",
        href: "/collections/airpods-cases",
        series: [
          {
            label: "AirPods (Standard)",
            options: [
              { label: "AirPods 4th Gen", href: "/collections/airpods-cases?model=airpods-4" },
              { label: "AirPods 3rd Gen", href: "/collections/airpods-cases?model=airpods-3" },
              { label: "AirPods 2nd Gen", href: "/collections/airpods-cases?model=airpods-2" },
            ],
          },
        ],
      },
      {
        key: "airpods-max",
        label: "AirPods Max",
        href: "/collections/airpods-cases",
        series: [
          {
            label: "AirPods Max",
            options: [
              { label: "AirPods Max (USB-C)", href: "/collections/airpods-cases?model=airpods-max-usbc" },
              { label: "AirPods Max (Lightning)", href: "/collections/airpods-cases?model=airpods-max-lightning" },
            ],
          },
        ],
      },
    ],
    promo: {
      eyebrow: "Just Landed",
      headline: "AirPods\nCases",
      sub: "Custom fit for every generation. Precision moulded, dust-sealed, drop-safe.",
      cta: "View Collection",
      href: "/collections/airpods-cases",
      stat1: { num: "50+", label: "Styles" },
      stat2: null,
    },
  },

  "Watch Bands": {
    brands: [
      {
        key: "large-bands",
        label: "44 – 49mm",
        href: "/collections/watch-bands",
        series: [
          {
            label: "Apple Watch Ultra 2",
            options: [
              { label: "49mm Straps", href: "/collections/watch-bands?size=49mm" },
              { label: "Trail Loop", href: "/collections/watch-bands?style=trail-loop" },
              { label: "Alpine Loop", href: "/collections/watch-bands?style=alpine-loop" },
              { label: "Ocean Band", href: "/collections/watch-bands?style=ocean-band" },
            ],
          },
          {
            label: "Apple Watch Series 9 / 10",
            options: [
              { label: "45mm Straps", href: "/collections/watch-bands?size=45mm" },
              { label: "44mm Straps", href: "/collections/watch-bands?size=44mm" },
              { label: "Sport Band", href: "/collections/watch-bands?style=sport-band-large" },
              { label: "Sport Loop", href: "/collections/watch-bands?style=sport-loop-large" },
            ],
          },
          {
            label: "Samsung Galaxy Watch",
            options: [
              { label: "46mm Straps", href: "/collections/watch-bands?brand=samsung&size=46mm" },
              { label: "Galaxy Watch 7", href: "/collections/watch-bands?brand=samsung&model=gw7" },
              { label: "Galaxy Watch Ultra", href: "/collections/watch-bands?brand=samsung&model=gwu" },
            ],
          },
        ],
      },
      {
        key: "small-bands",
        label: "40 – 42mm",
        href: "/collections/watch-bands",
        series: [
          {
            label: "Apple Watch SE / Series",
            options: [
              { label: "42mm Straps", href: "/collections/watch-bands?size=42mm" },
              { label: "41mm Straps", href: "/collections/watch-bands?size=41mm" },
              { label: "40mm Straps", href: "/collections/watch-bands?size=40mm" },
              { label: "38mm Straps", href: "/collections/watch-bands?size=38mm" },
            ],
          },
          {
            label: "Samsung Galaxy Watch",
            options: [
              { label: "40mm Straps", href: "/collections/watch-bands?brand=samsung&size=40mm" },
              { label: "Galaxy Watch 6", href: "/collections/watch-bands?brand=samsung&model=gw6" },
              { label: "Galaxy Watch Active", href: "/collections/watch-bands?brand=samsung&model=gwa" },
            ],
          },
        ],
      },
      {
        key: "material",
        label: "By Material",
        href: "/collections/watch-bands",
        series: [
          {
            label: "Silicone",
            options: [
              { label: "Sport Band", href: "/collections/watch-bands?material=silicone&style=sport" },
              { label: "Solo Loop", href: "/collections/watch-bands?material=silicone&style=solo" },
              { label: "Braided Solo Loop", href: "/collections/watch-bands?material=silicone&style=braided" },
            ],
          },
          {
            label: "Leather",
            options: [
              { label: "Leather Link", href: "/collections/watch-bands?material=leather&style=link" },
              { label: "Modern Buckle", href: "/collections/watch-bands?material=leather&style=modern" },
              { label: "Classic Buckle", href: "/collections/watch-bands?material=leather&style=classic" },
            ],
          },
          {
            label: "Metal",
            options: [
              { label: "Milanese Loop", href: "/collections/watch-bands?material=metal&style=milanese" },
              { label: "Link Bracelet", href: "/collections/watch-bands?material=metal&style=link" },
              { label: "Magnetic Link", href: "/collections/watch-bands?material=metal&style=magnetic" },
            ],
          },
        ],
      },
    ],
    promo: {
      eyebrow: "New Styles",
      headline: "Watch\nBands",
      sub: "Craft-grade straps for every wrist. Apple Watch, Samsung and more.",
      cta: "Explore All Bands",
      href: "/collections/watch-bands",
      stat1: { num: "100+", label: "Band Styles" },
      stat2: null,
    },
  },

  MagSafe: {
    brands: [
      {
        key: "wallets",
        label: "Wallets",
        href: "/collections/magsafe-wallets",
        series: [
          {
            label: "MagSafe Wallets",
            options: [
              { label: "iPhone 17 Series", href: "/collections/magsafe-wallets?series=17" },
              { label: "iPhone 16 Series", href: "/collections/magsafe-wallets?series=16" },
              { label: "iPhone 15 Series", href: "/collections/magsafe-wallets?series=15" },
              { label: "iPhone 14 Series", href: "/collections/magsafe-wallets?series=14" },
            ],
          },
          {
            label: "Card Holders",
            options: [
              { label: "Slide Card Holder", href: "/collections/magsafe-wallets?style=slide" },
              { label: "RFID-Blocking Holder", href: "/collections/magsafe-wallets?style=rfid" },
              { label: "Adhesive Pocket", href: "/collections/magsafe-wallets?style=adhesive" },
            ],
          },
        ],
      },
      {
        key: "stands",
        label: "Stands & Mounts",
        href: "/collections/magsafe-stands",
        series: [
          {
            label: "Desk Stands",
            options: [
              { label: "MagSafe Desk Stand", href: "/collections/magsafe-stands?type=desk" },
              { label: "Foldable Stand", href: "/collections/magsafe-stands?type=foldable" },
              { label: "Adjustable Stand", href: "/collections/magsafe-stands?type=adjustable" },
            ],
          },
          {
            label: "Car Mounts",
            options: [
              { label: "Vent Car Mount", href: "/collections/magsafe-stands?type=vent-mount" },
              { label: "Dashboard Mount", href: "/collections/magsafe-stands?type=dash-mount" },
              { label: "Windshield Mount", href: "/collections/magsafe-stands?type=windshield" },
            ],
          },
          {
            label: "Wall & Bedside",
            options: [
              { label: "Bedside Mount", href: "/collections/magsafe-stands?type=bedside" },
              { label: "Wall Mount", href: "/collections/magsafe-stands?type=wall" },
            ],
          },
        ],
      },
      {
        key: "grips",
        label: "Grips & Accessories",
        href: "/collections/magsafe-accessories",
        series: [
          {
            label: "Grips & Rings",
            options: [
              { label: "MagSafe Ring Grip", href: "/collections/magsafe-accessories?type=ring" },
              { label: "Pop Grip MagSafe", href: "/collections/magsafe-accessories?type=popgrip" },
              { label: "Finger Loop", href: "/collections/magsafe-accessories?type=loop" },
            ],
          },
          {
            label: "Power",
            options: [
              { label: "MagSafe Battery Pack", href: "/collections/magsafe-accessories?type=battery" },
              { label: "Wireless Charging Pad", href: "/collections/magsafe-accessories?type=pad" },
            ],
          },
        ],
      },
    ],
    promo: {
      eyebrow: "MagSafe Universe",
      headline: "Snap.\nMount.\nCharge.",
      sub: "The complete MagSafe ecosystem — wallets, stands, grips and more.",
      cta: "Shop MagSafe",
      href: "/collections/magsafe",
      stat1: { num: "3-in-1", label: "Wallet + Stand + Grip" },
      stat2: null,
    },
  },
};

const NAV_LINKS = [
  { label: "Phone Cases", href: "/collections/phone-cases", hasMega: true },
  { label: "AirPods Cases", href: "/collections/airpods-cases", hasMega: true },
  { label: "Watch Bands", href: "/collections/watch-bands", hasMega: true },
  { label: "MagSafe", href: "/collections/magsafe", hasMega: true },
];

// ─── SVG Icons ───────────────────────────────────────────────────────────────
const IconSearch = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="22" y2="22" />
  </svg>
);
const IconHeart = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const IconBag = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);
const IconChevronD = () => (
  <svg width="9" height="9" viewBox="0 0 10 6" fill="currentColor">
    <path d="M0 0l5 6 5-6z" />
  </svg>
);
const IconChevronR = () => (
  <svg width="7" height="11" viewBox="0 0 7 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 1l5 4.5L1 10" />
  </svg>
);
const IconClose = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconMenu = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const IconArrow = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

// ─── MegaPanel ───────────────────────────────────────────────────────────────
function MegaPanel({ menuKey, isOpen, onClose }) {
  const data = MEGA_MENU[menuKey];
  const [activeBrand, setActiveBrand] = useState(data?.brands[0]?.key ?? "");

  useEffect(() => {
    if (isOpen) setActiveBrand(data?.brands[0]?.key ?? "");
  }, [isOpen, menuKey]);

  if (!data) return null;
  const activeBrandData = data.brands.find((b) => b.key === activeBrand) ?? data.brands[0];
  const { promo } = data;

  return (
    <div className={`mm-panel${isOpen ? " mm-open" : ""}`}>
      <div className="mm-inner">
        {/* Sidebar */}
        <aside className="mm-sidebar">
          <span className="mm-sidebar-eyebrow">Category</span>
          {data.brands.map((brand) => (
            <button
              key={brand.key}
              type="button"
              className={`mm-brand-tab${activeBrand === brand.key ? " mm-brand-active" : ""}`}
              onMouseEnter={() => setActiveBrand(brand.key)}
              onClick={() => setActiveBrand(brand.key)}
            >
              <span>{brand.label}</span>
              <IconChevronR />
            </button>
          ))}
          <Link to={activeBrandData.href} className="mm-brand-showall" onClick={onClose}>
            Shop {activeBrandData.label} →
          </Link>
        </aside>

        {/* Content */}
        <div className="mm-content">
          {activeBrandData.series.map((s) => (
            <div key={s.label} className="mm-series-col">
              <div className="mm-series-head">{s.label}</div>
              <div className="mm-series-items">
                {s.options.map((opt) => (
                  <Link key={opt.label} to={opt.href} className="mm-series-link" onClick={onClose}>
                    {opt.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Promo */}
        <aside className="mm-promo">
          <div>
            <div className="mm-promo-eyebrow">{promo.eyebrow}</div>
            <div className="mm-promo-headline">{promo.headline}</div>
            <div className="mm-promo-sub">{promo.sub}</div>
            <Link to={promo.href} className="mm-promo-cta" onClick={onClose}>
              {promo.cta} <IconArrow />
            </Link>
          </div>
          <div className="mm-promo-stats">
            <div className="mm-promo-divider" />
            <div className="mm-stat">
              <div className="mm-stat-num">{promo.stat1.num}</div>
              <div className="mm-stat-label">{promo.stat1.label}</div>
            </div>
            {promo.stat2 && (
              <div className="mm-stat">
                <div className="mm-stat-num">{promo.stat2.num}</div>
                <div className="mm-stat-label">{promo.stat2.label}</div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

// ─── Main Navbar ─────────────────────────────────────────────────────────────
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(null);
  const clickLocked = useRef(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const closeTimer = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems, setOpen: openCart } = useCart();
  const { count: wishCount } = useWishlist();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setMegaOpen(null);
    clickLocked.current = false;
  }, [location.pathname]);

  const handleNavHoverEnter = useCallback((label) => {
    clearTimeout(closeTimer.current);
    if (!clickLocked.current) setMegaOpen(label);
  }, []);

  const handleHeaderMouseLeave = useCallback(() => {
    if (clickLocked.current) return;
    closeTimer.current = setTimeout(() => setMegaOpen(null), 80);
  }, []);

  const handleHeaderMouseEnter = useCallback(() => {
    clearTimeout(closeTimer.current);
  }, []);

  const handleNavClick = useCallback((label) => {
    if (clickLocked.current && megaOpen === label) {
      clickLocked.current = false;
      setMegaOpen(null);
    } else if (clickLocked.current && megaOpen !== label) {
      setMegaOpen(label);
    } else {
      clickLocked.current = true;
      setMegaOpen(label);
    }
  }, [megaOpen]);

  const closeMega = useCallback(() => {
    clearTimeout(closeTimer.current);
    clickLocked.current = false;
    setMegaOpen(null);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  return (
    <>
      <style>{`
        /* ─────────────────────────────────────────────────────────
           FONT: Outfit — geometric, clean, premium
           Used by Myntra, Nykaa, and top Indian e-commerce brands.
           No serifs, no fancy decorative fonts. Numbers render cleanly.
        ───────────────────────────────────────────────────────── */
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

        /* ── Root ── */
        .nb-root {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          background: #fff;
          border-bottom: 1px solid rgba(0,0,0,0.08);
          font-family: 'Outfit', sans-serif;
          transition: box-shadow 0.3s ease;
        }
        .nb-root.nb-scrolled { box-shadow: 0 1px 24px rgba(0,0,0,0.07); }

        /* ── Inner bar ── */
        .nb-bar {
          max-width: 1380px; margin: 0 auto;
          display: flex; align-items: center;
          height: ${NAVBAR_H.desktop}px;
          padding: 0 2rem;
          position: relative;
        }
        @media (max-width: 1023px) {
          .nb-bar { height: ${NAVBAR_H.mobile}px; padding: 0 1rem; }
        }

        /* ── Logo ── */
        .nb-logo {
          display: flex; align-items: center;
          flex-shrink: 0; margin-right: auto;
          text-decoration: none;
        }
        .nb-logo img { height: 88px; width: auto; display: block; }
        @media (max-width: 767px) { .nb-logo img { height: 60px; } }

        /* ── Desktop nav — absolutely centered in bar ── */
        .nb-nav {
          display: none; align-items: center; gap: 0;
          position: absolute; left: 50%; transform: translateX(-50%);
          white-space: nowrap;
        }
        @media (min-width: 1024px) { .nb-nav { display: flex; } }
        .nb-nav-item { position: static; }

        /* Nav links — Outfit 500, 13px, modest tracking, uppercase */
        .nb-nav-link {
          display: inline-flex; align-items: center; gap: 5px;
          height: ${NAVBAR_H.desktop}px; padding: 0 1.1rem;
          font-family: 'Outfit', sans-serif;
          font-size: 13px; font-weight: 500; letter-spacing: 0.07em;
          text-transform: uppercase; text-decoration: none;
          color: #6b6967;
          border-bottom: 2px solid transparent;
          transition: color 0.2s, border-color 0.2s;
          white-space: nowrap; cursor: pointer;
        }
        .nb-nav-link:hover, .nb-nav-link.nb-active {
          color: #1a1816; border-bottom-color: #1a1816;
        }
        .nb-nav-link svg { transition: transform 0.25s; }
        .nb-nav-link.nb-active svg { transform: rotate(180deg); }

        /* ── Right icons ── */
        .nb-icons {
          display: flex; align-items: center; justify-content: flex-end;
          gap: 1px; margin-left: auto; flex-shrink: 0;
        }
        .nb-icon-btn {
          width: 38px; height: 38px;
          display: flex; align-items: center; justify-content: center;
          background: transparent; border: none;
          color: #6b6967; border-radius: 50%;
          cursor: pointer; position: relative;
          transition: color 0.2s, background 0.2s;
          text-decoration: none;
        }
        .nb-icon-btn:hover { color: #1a1816; background: rgba(0,0,0,0.04); }
        .nb-badge {
          position: absolute; top: 5px; right: 5px;
          min-width: 15px; height: 15px;
          background: #1a1816; color: #fff;
          border-radius: 50%; font-size: 8px; font-weight: 700;
          font-family: 'Outfit', sans-serif;
          display: flex; align-items: center; justify-content: center;
          line-height: 1; padding: 0 2px;
        }
        .nb-hamburger {
          width: 38px; height: 38px;
          display: flex; align-items: center; justify-content: center;
          background: transparent; border: none;
          color: #3d3a37; border-radius: 50%; cursor: pointer;
          transition: color 0.2s, background 0.2s;
        }
        .nb-hamburger:hover { color: #1a1816; background: rgba(0,0,0,0.04); }
        @media (min-width: 1024px) { .nb-hamburger { display: none; } }

        /* ── Search bar ── */
        .nb-search-wrap {
          overflow: hidden; max-height: 0;
          transition: max-height 0.3s cubic-bezier(0.4,0,0.2,1);
          border-top: 1px solid transparent;
        }
        .nb-search-wrap.nb-search-open {
          max-height: 72px; border-top-color: rgba(0,0,0,0.06);
        }
        .nb-search-inner {
          max-width: 560px; margin: 0 auto; padding: 14px 2rem; display: flex;
        }
        .nb-search-form {
          width: 100%; display: flex;
          border: 1px solid #d0ccc8; border-radius: 2px; overflow: hidden;
        }
        .nb-search-input {
          flex: 1; padding: 10px 16px; border: none; outline: none;
          font-size: 14px; font-weight: 400; color: #1a1816; background: #fff;
          font-family: 'Outfit', sans-serif;
        }
        .nb-search-input::placeholder { color: #aaa8a5; }
        .nb-search-btn {
          padding: 0 20px; background: #1a1816; color: #fff; border: none;
          cursor: pointer; font-size: 11px; font-weight: 600; letter-spacing: 0.12em;
          text-transform: uppercase; font-family: 'Outfit', sans-serif;
          transition: background 0.2s;
        }
        .nb-search-btn:hover { background: #0f0f0f; }

        /* ══════════════════════════════════════════════
           MEGA MENU
        ══════════════════════════════════════════════ */
        .mm-panel {
          position: absolute; left: 0; right: 0; top: 100%;
          background: #fff;
          border-top: 1px solid rgba(0,0,0,0.06);
          border-bottom: 1px solid rgba(0,0,0,0.06);
          height: 0; overflow: hidden;
          transition: height 0.32s cubic-bezier(0.4,0,0.2,1);
          z-index: 300;
        }
        .mm-panel.mm-open { height: 65vh; }

        .mm-inner {
          max-width: 1380px; margin: 0 auto;
          display: grid; grid-template-columns: 210px 1fr 200px;
          height: 100%; padding: 0 2rem;
        }

        /* Sidebar */
        .mm-sidebar {
          border-right: 1px solid rgba(0,0,0,0.06);
          padding: 1.75rem 0;
          display: flex; flex-direction: column; gap: 2px;
          overflow-y: auto;
        }
        .mm-sidebar::-webkit-scrollbar { width: 2px; }
        .mm-sidebar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.08); }

        /* Eyebrow label — tight tracking */
        .mm-sidebar-eyebrow {
          font-family: 'Outfit', sans-serif;
          font-size: 9px; font-weight: 600; letter-spacing: 0.2em;
          text-transform: uppercase; color: #aaa8a5;
          padding: 0 1.25rem; margin-bottom: 0.4rem; display: block;
        }

        /* Brand tab — Outfit 400, 14px */
        .mm-brand-tab {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.6rem 1.25rem;
          background: none; border: none; border-left: 2px solid transparent;
          font-family: 'Outfit', sans-serif;
          font-size: 14px; font-weight: 400; letter-spacing: 0.01em;
          color: #6b6967; cursor: pointer; text-align: left;
          transition: color 0.15s, background 0.15s, border-color 0.15s;
        }
        .mm-brand-tab:hover { color: #1a1816; background: rgba(0,0,0,0.02); }
        .mm-brand-tab.mm-brand-active {
          color: #1a1816; border-left-color: #1a1816;
          background: rgba(0,0,0,0.025); font-weight: 500;
        }
        .mm-brand-tab svg { opacity: 0.3; }
        .mm-brand-tab.mm-brand-active svg { opacity: 0.55; }

        .mm-brand-showall {
          margin-top: auto; padding: 0.8rem 1.25rem;
          font-family: 'Outfit', sans-serif;
          font-size: 11px; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; text-decoration: none;
          color: #1a1816; display: block;
          transition: letter-spacing 0.2s;
        }
        .mm-brand-showall:hover { letter-spacing: 0.15em; }

        /* Content */
        .mm-content {
          padding: 1.75rem 2rem;
          display: flex; flex-wrap: wrap; align-content: flex-start;
          gap: 1.5rem 2.5rem; overflow-y: auto;
        }
        .mm-content::-webkit-scrollbar { width: 2px; }
        .mm-content::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.08); }

        .mm-series-col { min-width: 140px; }

        /* Series heading — Outfit 600, 10.5px — structured, clear */
        .mm-series-head {
          font-family: 'Outfit', sans-serif;
          font-size: 10.5px; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: #1a1816;
          margin-bottom: 0.55rem; padding-bottom: 0.4rem;
          border-bottom: 1px solid rgba(0,0,0,0.07);
        }

        .mm-series-items { display: flex; flex-direction: column; gap: 1px; }

        /* Series links — Outfit 400, 14px (up from 12.5px) */
        .mm-series-link {
          font-family: 'Outfit', sans-serif;
          font-size: 14px; font-weight: 400; color: #7a7672;
          text-decoration: none; padding: 0.3rem 0;
          display: flex; align-items: center; gap: 5px;
          transition: color 0.15s, padding-left 0.15s;
        }
        .mm-series-link::before {
          content: ''; width: 3px; height: 3px; border-radius: 50%;
          background: #1a1816; opacity: 0; flex-shrink: 0;
          transition: opacity 0.15s;
        }
        .mm-series-link:hover { color: #1a1816; padding-left: 5px; }
        .mm-series-link:hover::before { opacity: 1; }

        /* Promo panel */
        .mm-promo {
          border-left: 1px solid rgba(0,0,0,0.06);
          padding: 1.75rem 1.75rem;
          display: flex; flex-direction: column; justify-content: space-between;
          overflow-y: auto;
        }
        .mm-promo-eyebrow {
          font-family: 'Outfit', sans-serif;
          font-size: 9px; font-weight: 600; letter-spacing: 0.2em;
          text-transform: uppercase; color: #aaa8a5; margin-bottom: 0.6rem;
        }
        /* Promo headline — Outfit 600, no serif — clean & premium */
        .mm-promo-headline {
          font-family: 'Outfit', sans-serif;
          font-size: 22px; font-weight: 600; line-height: 1.2;
          color: #1a1816; margin-bottom: 0.75rem;
          white-space: pre-line; letter-spacing: -0.01em;
        }
        .mm-promo-sub {
          font-family: 'Outfit', sans-serif;
          font-size: 13px; font-weight: 400; line-height: 1.6;
          color: #7a7672; margin-bottom: 1.25rem;
        }
        .mm-promo-cta {
          display: inline-flex; align-items: center; gap: 7px;
          font-family: 'Outfit', sans-serif;
          font-size: 10px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; text-decoration: none;
          color: #1a1816; transition: gap 0.2s;
        }
        .mm-promo-cta:hover { gap: 12px; }

        .mm-promo-divider {
          width: 100%; height: 1px;
          background: rgba(0,0,0,0.06); margin: 1rem 0;
        }
        .mm-stat { margin-bottom: 0.6rem; }
        /* Stats — Outfit 700, plain numeric — NO fancy serif */
        .mm-stat-num {
          font-family: 'Outfit', sans-serif;
          font-size: 20px; font-weight: 700; color: #1a1816;
          line-height: 1.1; letter-spacing: -0.01em;
        }
        .mm-stat-label {
          font-family: 'Outfit', sans-serif;
          font-size: 10px; font-weight: 400;
          color: #aaa8a5; letter-spacing: 0.04em;
        }

        /* Backdrop */
        .nb-backdrop {
          position: fixed; inset: 0; top: ${NAVBAR_H.desktop}px;
          background: rgba(0,0,0,0.22);
          opacity: 0; pointer-events: none;
          transition: opacity 0.3s; z-index: 199;
        }
        .nb-backdrop.nb-bd-visible { opacity: 1; pointer-events: auto; }

        /* ══════════════════════════════════════════════
           MOBILE DRAWER
        ══════════════════════════════════════════════ */
        .nb-drawer {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; flex-direction: column;
          background: #111110;
          transform: translateX(-100%);
          transition: transform 0.38s cubic-bezier(0.4,0,0.2,1);
          will-change: transform;
          font-family: 'Outfit', sans-serif;
        }
        .nb-drawer.nb-drawer-open { transform: translateX(0); }

        .nb-dr-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 1.25rem; height: ${NAVBAR_H.mobile}px; flex-shrink: 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .nb-dr-logo img { height: 34px; width: auto; filter: brightness(0) invert(1); }
        .nb-dr-close {
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(255,255,255,0.06); border: none;
          color: rgba(255,255,255,0.6); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, color 0.2s;
        }
        .nb-dr-close:hover { background: rgba(255,255,255,0.12); color: #fff; }

        .nb-dr-nav { flex: 1; overflow-y: auto; padding: 8px 0; }
        .nb-dr-item { border-bottom: 1px solid rgba(255,255,255,0.04); }

        /* Mobile main item — Outfit 500, 18px — confident and readable */
        .nb-dr-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1rem 1.5rem;
          font-family: 'Outfit', sans-serif;
          font-size: 18px; font-weight: 500; letter-spacing: 0.01em;
          color: rgba(255,255,255,0.75); text-decoration: none;
          background: none; border: none; width: 100%; text-align: left;
          cursor: pointer; transition: color 0.2s, padding-left 0.2s;
        }
        .nb-dr-link:hover { color: #fff; padding-left: 1.75rem; }
        .nb-dr-link.nb-dr-exp svg { transform: rotate(90deg); }
        .nb-dr-link svg { width: 14px; height: 14px; opacity: 0.3; transition: transform 0.25s, opacity 0.25s; }
        .nb-dr-link.nb-dr-exp svg { opacity: 0.6; }

        .nb-dr-sub {
          overflow: hidden; max-height: 0;
          transition: max-height 0.3s ease;
          background: rgba(255,255,255,0.02);
        }
        .nb-dr-sub.nb-dr-sub-open { max-height: 600px; }

        .nb-dr-sub-brand {
          padding: 0.7rem 1.5rem 0.3rem 2rem;
          font-family: 'Outfit', sans-serif;
          font-size: 10px; font-weight: 600; letter-spacing: 0.16em;
          text-transform: uppercase; color: rgba(255,255,255,0.35); display: block;
        }
        .nb-dr-sub-series {
          padding: 0.25rem 1.5rem 0.1rem 2.25rem;
          font-family: 'Outfit', sans-serif;
          font-size: 12px; font-weight: 500; letter-spacing: 0.04em;
          color: rgba(255,255,255,0.4); display: block;
        }
        /* Mobile sub-links — 14px for tap targets */
        .nb-dr-sub-link {
          display: block; padding: 0.32rem 1.5rem 0.32rem 2.75rem;
          font-family: 'Outfit', sans-serif;
          font-size: 14px; font-weight: 400;
          color: rgba(255,255,255,0.5); text-decoration: none;
          transition: color 0.15s, padding-left 0.15s;
        }
        .nb-dr-sub-link:hover { color: rgba(255,255,255,0.85); padding-left: 3.25rem; }
        .nb-dr-sub-all {
          display: block; padding: 0.75rem 1.5rem 0.75rem 2rem;
          font-family: 'Outfit', sans-serif;
          font-size: 10px; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: rgba(255,255,255,0.45);
          text-decoration: none; transition: color 0.2s;
        }
        .nb-dr-sub-all:hover { color: #fff; }

        .nb-dr-foot {
          padding: 1.25rem 1.5rem 2rem;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex; align-items: center; gap: 10px; flex-shrink: 0;
        }
        .nb-dr-icon {
          width: 42px; height: 42px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.5); background: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          text-decoration: none; position: relative;
          transition: border-color 0.2s, color 0.2s;
        }
        .nb-dr-icon:hover { border-color: rgba(255,255,255,0.3); color: #fff; }
        .nb-dr-badge {
          position: absolute; top: 1px; right: 1px;
          width: 15px; height: 15px; border-radius: 50%;
          background: #fff; color: #111110;
          font-family: 'Outfit', sans-serif;
          font-size: 8px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
        }

        /* Hide mega panel on mobile (use drawer instead) */
        @media (max-width: 1023px) {
          .mm-panel { display: none; }
          .nb-backdrop { display: none; }
        }
      `}</style>

      {/* Backdrop */}
      <div className={`nb-backdrop${megaOpen ? " nb-bd-visible" : ""}`} onClick={closeMega} />

      {/* Fixed header */}
      <header
        className={`nb-root${scrolled ? " nb-scrolled" : ""}`}
        onMouseEnter={handleHeaderMouseEnter}
        onMouseLeave={handleHeaderMouseLeave}
      >
        <div className="nb-bar">
          <Link to="/" className="nb-logo" aria-label="Caseoholic home">
            <img src="/logo2.png" alt="Caseoholic" />
          </Link>

          <nav className="nb-nav" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="nb-nav-item" onMouseEnter={() => handleNavHoverEnter(link.label)}>
                <span
                  role="button"
                  tabIndex={0}
                  className={`nb-nav-link${megaOpen === link.label ? " nb-active" : ""}`}
                  onClick={() => handleNavClick(link.label)}
                  onKeyDown={(e) => e.key === "Enter" && handleNavClick(link.label)}
                >
                  {link.label}
                  <IconChevronD />
                </span>
              </div>
            ))}
          </nav>

          <div className="nb-icons">
            <button type="button" className="nb-hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <IconMenu />
            </button>
            <button
              type="button" className="nb-icon-btn" aria-label="Search"
              onClick={() => { setSearchOpen((v) => !v); closeMega(); setTimeout(() => searchRef.current?.focus(), 80); }}
            >
              <IconSearch />
            </button>
            <Link to="/wishlist" className="nb-icon-btn" aria-label="Wishlist" style={{ position: "relative" }}>
              <IconHeart />
              {wishCount > 0 && <span className="nb-badge">{wishCount}</span>}
            </Link>
            <button
              type="button" className="nb-icon-btn" aria-label={`Cart, ${totalItems} items`}
              onClick={() => openCart(true)} style={{ position: "relative" }}
            >
              <IconBag />
              {totalItems > 0 && <span className="nb-badge">{totalItems}</span>}
            </button>
          </div>
        </div>

        {/* Search */}
        <div className={`nb-search-wrap${searchOpen ? " nb-search-open" : ""}`}>
          <div className="nb-search-inner">
            <form className="nb-search-form" onSubmit={handleSearch}>
              <input
                ref={searchRef} className="nb-search-input" type="search"
                placeholder="Search cases, bands, wallets…"
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="nb-search-btn">Search</button>
            </form>
          </div>
        </div>

        {/* Mega menus */}
        {NAV_LINKS.filter((l) => l.hasMega).map((link) => (
          <MegaPanel key={link.label} menuKey={link.label} isOpen={megaOpen === link.label} onClose={closeMega} />
        ))}
      </header>

      {/* Mobile drawer */}
      <div className={`nb-drawer${mobileOpen ? " nb-drawer-open" : ""}`} role="dialog" aria-modal="true" aria-label="Navigation menu">
        <div className="nb-dr-head">
          <div className="nb-dr-logo"><img src="/logo2.png" alt="Caseoholic" /></div>
          <button type="button" className="nb-dr-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <IconClose />
          </button>
        </div>

        <nav className="nb-dr-nav">
          {NAV_LINKS.map((link) => (
            <div key={link.label} className="nb-dr-item">
              {link.hasMega ? (
                <>
                  <button
                    type="button"
                    className={`nb-dr-link${mobileExpanded === link.label ? " nb-dr-exp" : ""}`}
                    onClick={() => setMobileExpanded((v) => v === link.label ? null : link.label)}
                  >
                    {link.label}
                    <IconChevronR />
                  </button>
                  <div className={`nb-dr-sub${mobileExpanded === link.label ? " nb-dr-sub-open" : ""}`}>
                    {MEGA_MENU[link.label].brands.map((brand) => (
                      <div key={brand.key}>
                        <Link to={brand.href} className="nb-dr-sub-brand" onClick={() => setMobileOpen(false)}>
                          {brand.label}
                        </Link>
                        {brand.series.map((s) => (
                          <div key={s.label}>
                            <span className="nb-dr-sub-series">{s.label}</span>
                            {s.options.map((opt) => (
                              <Link key={opt.label} to={opt.href} className="nb-dr-sub-link" onClick={() => setMobileOpen(false)}>
                                {opt.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    ))}
                    <Link to={link.href} className="nb-dr-sub-all" onClick={() => setMobileOpen(false)}>
                      View All {link.label} →
                    </Link>
                  </div>
                </>
              ) : (
                <Link to={link.href} className="nb-dr-link" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="nb-dr-foot">
          <button
            type="button" className="nb-dr-icon" aria-label="Search"
            onClick={() => { setMobileOpen(false); setTimeout(() => { setSearchOpen(true); searchRef.current?.focus(); }, 320); }}
          >
            <IconSearch />
          </button>
          <Link to="/wishlist" className="nb-dr-icon" aria-label="Wishlist" onClick={() => setMobileOpen(false)} style={{ position: "relative" }}>
            <IconHeart />
            {wishCount > 0 && <span className="nb-dr-badge">{wishCount}</span>}
          </Link>
          <button
            type="button" className="nb-dr-icon" aria-label={`Cart, ${totalItems} items`}
            onClick={() => { setMobileOpen(false); openCart(true); }} style={{ position: "relative" }}
          >
            <IconBag />
            {totalItems > 0 && <span className="nb-dr-badge">{totalItems}</span>}
          </button>
        </div>
      </div>
    </>
  );
}