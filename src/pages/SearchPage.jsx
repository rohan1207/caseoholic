import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { searchCatalog } from "../products/shopCatalog.js";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    searchCatalog(query)
      .then((r) => {
        if (!cancelled) setResults(Array.isArray(r) ? r : []);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <>
      <style>{`
        .sp-page {
          min-height: 100vh; background: #fafaf9;
          padding-top: 68px;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
        }
        .sp-hero {
          background: #fff; border-bottom: 1px solid #f0eeea;
          padding: 40px 24px 28px;
        }
        .sp-hero-inner { max-width: 1200px; margin: 0 auto; }
        .sp-eyebrow {
          font-size: 10px; font-weight: 700; letter-spacing: 0.28em;
          text-transform: uppercase; color: #a8a29e; margin-bottom: 8px; display: block;
        }
        .sp-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.4rem, 3.5vw, 2.2rem);
          font-weight: 400; color: #1c1917; margin: 0 0 4px;
          letter-spacing: -0.02em;
        }
        .sp-title em { font-style: italic; color: #d97706; }
        .sp-count { font-size: 13px; color: #78716c; }

        .sp-body { max-width: 1200px; margin: 0 auto; padding: 28px 24px 64px; }
        .sp-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        @media (min-width: 640px)  { .sp-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; } }
        @media (min-width: 1024px) { .sp-grid { grid-template-columns: repeat(4, 1fr); gap: 20px; } }

        .sp-no-results {
          text-align: center; padding: 80px 24px;
          display: flex; flex-direction: column; align-items: center; gap: 16px;
        }
        .sp-no-results svg { width: 56px; height: 56px; color: #d4d0ca; }
        .sp-no-results h2 {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.5rem; font-weight: 400; color: #1c1917;
          margin: 0;
        }
        .sp-no-results p { font-size: 14px; color: #a8a29e; max-width: 360px; line-height: 1.6; margin: 0; }
        .sp-no-results a {
          display: inline-flex; align-items: center; gap: 8px;
          background: #1c1917; color: #fff;
          padding: 13px 28px; border-radius: 2px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; text-decoration: none;
          transition: background 0.2s;
        }
        .sp-no-results a:hover { background: #292524; }
      `}</style>

      <div className="sp-page">
        <div className="sp-hero">
          <div className="sp-hero-inner">
            <span className="sp-eyebrow">Search Results</span>
            <h1 className="sp-title">
              {query ? (
                <>
                  Results for <em>&ldquo;{query}&rdquo;</em>
                </>
              ) : (
                "Search Products"
              )}
            </h1>
            {query && (
              <p className="sp-count">
                {loading
                  ? "Searching…"
                  : `${results.length} product${results.length !== 1 ? "s" : ""} found`}
              </p>
            )}
          </div>
        </div>

        <div className="sp-body">
          {!query ? (
            <p style={{ color: "#a8a29e", fontSize: 14 }}>
              Use the search bar above to find products.
            </p>
          ) : loading ? (
            <p style={{ color: "#a8a29e", fontSize: 14 }}>Searching…</p>
          ) : results.length > 0 ? (
            <div className="sp-grid">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="sp-no-results">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <h2>No results found</h2>
              <p>
                We couldn't find anything matching "{query}". Try a different
                search or browse our categories.
              </p>
              <a href="/collections/all">Browse All Products</a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
