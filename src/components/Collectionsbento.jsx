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
      {/* Image — shifts left and scales on hover */}
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

      {/* Text content — all at bottom */}
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
            color: item.textColor,
            fontSize: "1.25rem",
            fontWeight: 700,
            fontFamily: "'Barlow', sans-serif",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            textShadow: "0 1px 10px rgba(0,0,0,0.18)",
          }}
        >
          {item.label}
        </h2>
        <p
          style={{
            color: item.accentColor,
            fontSize: "0.66rem",
            fontFamily: "'Barlow', sans-serif",
            letterSpacing: "0.1em",
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
            color: item.accentColor,
            fontSize: "0.68rem",
            fontFamily: "'Barlow', sans-serif",
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
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800&display=swap');
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
          fontFamily: "'Barlow', sans-serif",
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
                  fontSize: "0.65rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#aaa",
                  fontWeight: 500,
                  marginBottom: "6px",
                }}
              >
                Shop by
              </p>
              <h1
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
                  fontWeight: 800,
                  color: "#0e0e0e",
                  letterSpacing: "-0.045em",
                  lineHeight: 1,
                }}
              >
                Collections
              </h1>
            </div>
            <button
              style={{
                fontSize: "0.68rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#555",
                fontWeight: 600,
                background: "transparent",
                border: "1px solid #d0ccc6",
                padding: "9px 20px",
                cursor: "pointer",
                transition: "all 0.22s ease",
                fontFamily: "'Barlow', sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#0e0e0e";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = "#0e0e0e";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#555";
                e.currentTarget.style.borderColor = "#d0ccc6";
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
              gridTemplateRows: "390px 390px",
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