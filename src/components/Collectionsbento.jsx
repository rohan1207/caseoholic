import { useState } from "react";

const collections = [
  {
    id: "phone-cases",
    label: "Phone Cases",
    count: "42 products",
    bg: "#f0ede8",
    textColor: "#1a1a1a",
    accentColor: "#8a6a50",
    image: "/phonecase.png",
  },
  {
    id: "watch-bands",
    label: "Bands",
    count: "28 products",
    bg: "#1a1a1a",
    textColor: "#0e0e0e",
    accentColor: "#d4b896",
    image: "/watchband.png",
  },
  {
    id: "airpods-cases",
    label: "AirPods Cases",
    count: "19 products",
    bg: "#e8edf0",
    textColor: "#1a2530",
    accentColor: "#4a7fa5",
    image: "/airpodcases.png",
  },
  {
    id: "phone-wallets",
    label: "Phone Wallets",
    count: "24 products",
    bg: "#f0ece4",
    textColor: "#2a1f10",
    accentColor: "#9c7a40",
    image: "/phonewallet.jpeg",
  },
];

function BentoCard({ item, gridStyle }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        ...gridStyle,
        position: "relative",
        overflow: "hidden",
        backgroundColor: item.bg,
        cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: hovered ? "translateX(-12px) scale(1.06)" : "translateX(0) scale(1)",
          transition: "transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        <img
          src={item.image}
          alt={item.label}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            opacity: 1,
          }}
        />
      </div>

      {/* Text content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "26px 28px",
          zIndex: 10,
        }}
      >
        <h2
          style={{
            color: "#1a1816",
            fontSize: "1.2rem",
            fontWeight: 600,
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: "-0.01em",
            lineHeight: 1.15,
            textShadow: "0 1px 10px rgba(0,0,0,0.15)",
          }}
        >
          {item.label}
        </h2>
        <p
          style={{
            color: "#1a1816",
            fontSize: "0.65rem",
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontWeight: 600,
            marginTop: "5px",
            marginBottom: "10px",
          }}
        >
          {item.count}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            color: "#1a1816",
            fontSize: "0.67rem",
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          <span>Explore</span>
          <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
            <path
              d="M1 5h11M7 1l5 4-5 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function CollectionsBento() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 16px",
          background: "white",
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        <div style={{ width: "100%", maxWidth: "1420px" }}>

          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "32px",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#1a1816",
                  fontWeight: 600,
                  marginBottom: "6px",
                }}
              >
                Shop by
              </p>
              <h1
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "clamp(1.75rem, 3.5vw, 2.6rem)",
                  fontWeight: 700,
                  color: "#1a1816",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                Collections
              </h1>
            </div>
            <button
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.67rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#1a1816",
                fontWeight: 600,
                background: "transparent",
                border: "1px solid #d0ccc8",
                padding: "9px 20px",
                cursor: "pointer",
                transition: "all 0.22s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1a1816";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = "#1a1816";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#1a1816";
                e.currentTarget.style.borderColor = "#d0ccc8";
              }}
            >
              View All
            </button>
          </div>

          {/* Bento Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gridTemplateRows: "420px 420px",
              gap: 0,
            }}
          >
            <BentoCard item={collections[0]} gridStyle={{ gridColumn: "1", gridRow: "1" }} />
            <BentoCard item={collections[1]} gridStyle={{ gridColumn: "2", gridRow: "1" }} />
            <BentoCard item={collections[3]} gridStyle={{ gridColumn: "3", gridRow: "1 / 3" }} />
            <BentoCard item={collections[2]} gridStyle={{ gridColumn: "1 / 3", gridRow: "2" }} />
          </div>

        </div>
      </div>
    </>
  );
}