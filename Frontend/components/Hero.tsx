"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/homepage1.webp",
    imagePhone: "/homepage1_phone.webp",
    label: "Tailored for iPhone 17",
    headline: "Simplicity Refined. Protection Redefined.",
    cta: "SHOP NOW",
  },
  {
    image: "/homepage2.webp",
    imagePhone: "/homepage2_phone.webp",
    label: "Genuine Leather",
    headline: "Craft Meets Character.",
    cta: "SHOP NOW",
  },
  {
    image: "/homepage3.webp",
    imagePhone: "/homepage3_phone.webp",
    label: "Caseoholic Heritage",
    headline: "100 Years of Premium Design.",
    cta: "SHOP NOW",
  },
];

const AUTOPLAY_MS = 6000;

export default function Hero() {
  const [active, setActive] = useState(0);

  const go = useCallback(
    (dir: "prev" | "next") => {
      setActive((prev) => {
        if (dir === "next") return prev === slides.length - 1 ? 0 : prev + 1;
        return prev === 0 ? slides.length - 1 : prev - 1;
      });
    },
    []
  );

  useEffect(() => {
    const t = setInterval(() => go("next"), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [go]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-slate-100">
      {slides.map((slide, i) => (
        <div
          key={slide.image}
          className="absolute inset-0 transition-opacity duration-700 ease-out"
          style={{ opacity: i === active ? 1 : 0, zIndex: i === active ? 1 : 0 }}
        >
          {/* Phone: use _phone images */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.imagePhone}
            alt=""
            className="absolute inset-0 w-full h-full object-cover md:hidden"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&q=80";
            }}
          />
          {/* Desktop: use original images */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover hidden md:block"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=1920&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-transparent" />
        </div>
      ))}

      <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-start justify-end p-5 sm:p-8 md:p-12 lg:p-16 max-w-2xl">
        <p className="text-xs sm:text-sm font-medium text-slate-600 mb-1.5 sm:mb-2">{slides[active].label}</p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4 sm:mb-6">
          {slides[active].headline}
        </h1>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg text-xs sm:text-sm font-medium tracking-wide hover:bg-slate-800 transition-colors"
        >
          {slides[active].cta}
        </Link>
      </div>

      <div className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 z-10 flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => go("prev")}
          className="p-1.5 sm:p-2 text-slate-600 hover:text-slate-900 transition-colors rounded-full hover:bg-white/20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
        </button>
        <div className="flex gap-1 sm:gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? "bg-slate-900 w-4 sm:w-6" : "w-2 bg-slate-400 hover:bg-slate-500"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go("next")}
          className="p-1.5 sm:p-2 text-slate-600 hover:text-slate-900 transition-colors rounded-full hover:bg-white/20"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
        </button>
      </div>
    </section>
  );
}
