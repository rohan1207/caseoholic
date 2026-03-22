import { useState } from "react";

const ALL_PRODUCTS = [
  {
    id: 1,
    name: "Slim Case Pro",
    price: "$49",
    description: "iPhone 15 / 14 / 13 · Ultra-thin, drop-tested to 6ft",
    image:
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=700&q=80",
    tones: ["#1e293b", "#334155", "#475569", "#0f766e", "#f97316", "#e5d5c0"],
  },
  {
    id: 2,
    name: "Leather Folio",
    price: "$79",
    description: "Full-grain leather · Card slots · MagSafe compatible",
    image:
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=700&q=80",
    tones: ["#1e293b", "#1e3a5f", "#3d5a3e", "#b45309", "#e5d5c0"],
  },
  {
    id: 3,
    name: "Card Sleeve Case",
    price: "$59",
    description: "3 card slots · Raised camera lip · Slim profile",
    image:
      "https://images.unsplash.com/photo-1609692814858-f7cd2f0afa4f?w=700&q=80",
    tones: ["#1e293b", "#0f766e", "#f97316", "#fbbf24", "#e5e5e5"],
  },
  {
    id: 4,
    name: "Clear Shield",
    price: "$39",
    description: "Anti-yellow · Military-grade · Wireless charging ready",
    image:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=700&q=80",
    tones: ["#e2e8f0", "#94a3b8", "#f97316", "#1e293b"],
  },
  {
    id: 5,
    name: "Wallet Case",
    price: "$69",
    description: "Detachable wallet · 4 card slots · RFID blocking",
    image:
      "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=700&q=80",
    tones: ["#78350f", "#92400e", "#f1f5f9", "#0f766e"],
  },
];

const VISIBLE = 3;

export default function Bestsellers() {
  const [start, setStart] = useState(0);
  const canPrev = start > 0;
  const canNext = start + VISIBLE < ALL_PRODUCTS.length;

  return (
    <section
      style={{ backgroundColor: "#ebebeb", paddingTop: 48, paddingBottom: 64 }}
    >
      {/* Title */}
      <h2
        style={{
          textAlign: "center",
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontWeight: 400,
          fontSize: "1.45rem",
          color: "#1a1a1a",
          margin: "0 0 36px 0",
          letterSpacing: "0.01em",
        }}
      >
        You'll love these...
      </h2>

      {/* Carousel row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          maxWidth: 1280,
          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* Prev arrow */}
        <button
          onClick={() => canPrev && setStart((s) => s - 1)}
          aria-label="Previous"
          style={{
            width: 64,
            flexShrink: 0,
            background: "none",
            border: "none",
            cursor: canPrev ? "pointer" : "default",
            color: canPrev ? "#555" : "#bbb",
            fontSize: 28,
            fontWeight: 300,
            fontFamily: "Georgia, serif",
            lineHeight: 1,
            padding: "0 0 0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            outline: "none",
            userSelect: "none",
          }}
        >
          &#8249;
        </button>

        {/* Cards container */}
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 0,
            overflow: "hidden",
          }}
        >
          {ALL_PRODUCTS.slice(start, start + VISIBLE).map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>

        {/* Next arrow */}
        <button
          onClick={() => canNext && setStart((s) => s + 1)}
          aria-label="Next"
          style={{
            width: 64,
            flexShrink: 0,
            background: "none",
            border: "none",
            cursor: canNext ? "pointer" : "default",
            color: canNext ? "#555" : "#bbb",
            fontSize: 28,
            fontWeight: 300,
            fontFamily: "Georgia, serif",
            lineHeight: 1,
            padding: "0 16px 0 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            outline: "none",
            userSelect: "none",
          }}
        >
          &#8250;
        </button>
      </div>
    </section>
  );
}

function Card({ product }) {
  const [activeColor, setActiveColor] = useState(0);
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: "#ffffff",
        borderRadius: 0,
        overflow: "hidden",
        cursor: "pointer",
        margin: "0 1px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image area — white bg, lots of breathing room, product centered */}
      <div
        style={{
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 56px 36px",
          minHeight: 300,
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            maxWidth: "75%",
            maxHeight: 240,
            width: "auto",
            height: "auto",
            objectFit: "contain",
            display: "block",
            transition: "transform 0.35s ease",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />
      </div>

      {/* Info area */}
      <div
        style={{
          padding: "20px 24px 28px",
        }}
      >
        {/* Name */}
        <p
          style={{
            margin: "0 0 3px 0",
            fontFamily: "'Arial', Helvetica, sans-serif",
            fontSize: 15,
            fontWeight: 500,
            color: "#1a1a1a",
          }}
        >
          {product.name}
        </p>

        {/* Price */}
        <p
          style={{
            margin: "0 0 12px 0",
            fontFamily: "'Arial', Helvetica, sans-serif",
            fontSize: 15,
            fontWeight: 400,
            color: "#1a1a1a",
          }}
        >
          {product.price}
        </p>

        {/* Color swatches */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 12,
          }}
        >
          {product.tones.map((tone, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setActiveColor(i);
              }}
              aria-label={`Color ${i + 1}`}
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                backgroundColor: tone,
                border:
                  activeColor === i
                    ? "2px solid #1a1a1a"
                    : "1.5px solid rgba(0,0,0,0.18)",
                padding: 0,
                cursor: "pointer",
                outline: "none",
                flexShrink: 0,
                transition: "border 0.15s",
              }}
            />
          ))}
        </div>

        {/* Description */}
        <p
          style={{
            margin: 0,
            fontFamily: "'Arial', Helvetica, sans-serif",
            fontSize: 12.5,
            color: "#666",
            lineHeight: 1.55,
          }}
        >
          {product.description}
        </p>
      </div>
    </article>
  );
}
