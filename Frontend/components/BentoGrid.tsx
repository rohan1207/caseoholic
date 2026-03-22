"use client";

import Link from "next/link";
import Image from "next/image";

const cards = [
  { id: 1, title: "On sale", image: "/bento1.webp", href: "/products?on_sale=1" },
  { id: 2, title: "Wearables", image: "/bento2.webp", href: "/products?category=wearables" },
  { id: 3, title: "Essential phone cases", image: "/bento3.webp", href: "/products" },
  { id: 4, title: "Premium leather", image: "/bento4.webp", href: "/products" },
  { id: 5, title: "New arrivals", image: "/bento5.webp", href: "/products" },
] as const;

export default function BentoGrid() {
  return (
    <section className="py-12 md:py-16 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-900 text-center mb-6 md:mb-8">
          Explore
        </h2>
        {/* Mobile: 2 cols. Desktop: 3 cols bento — Row1: [1][2][3], Row2: [4 span 2][5], equal row heights */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 md:grid-rows-[1fr_1fr] md:min-h-[320px]">
          {/* Row 1: three equal cards */}
          {cards.slice(0, 3).map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className="group relative block rounded-xl overflow-hidden bg-slate-200 aspect-[4/3] md:aspect-auto md:min-h-0 md:h-full"
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 flex items-end p-3 md:p-4 bg-gradient-to-t from-black/50 to-transparent">
                <span className="text-xs md:text-sm font-semibold text-white drop-shadow-sm line-clamp-1">
                  {card.title}
                </span>
              </div>
            </Link>
          ))}
          {/* Row 2: card 4 spans 2 cols, card 5 one col */}
          <Link
            href={cards[3].href}
            className="group relative block rounded-xl overflow-hidden bg-slate-200 aspect-[4/3] md:aspect-auto md:min-h-0 md:h-full col-span-2 md:col-span-2"
          >
            <Image
              src={cards[3].image}
              alt={cards[3].title}
              fill
              className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
            <div className="absolute inset-0 flex items-end p-3 md:p-4 bg-gradient-to-t from-black/50 to-transparent">
              <span className="text-xs md:text-sm font-semibold text-white drop-shadow-sm line-clamp-1">
                {cards[3].title}
              </span>
            </div>
          </Link>
          <Link
            href={cards[4].href}
            className="group relative block rounded-xl overflow-hidden bg-slate-200 aspect-[4/3] md:aspect-auto md:min-h-0 md:h-full col-span-2 md:col-span-1"
          >
            <Image
              src={cards[4].image}
              alt={cards[4].title}
              fill
              className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 flex items-end p-3 md:p-4 bg-gradient-to-t from-black/50 to-transparent">
              <span className="text-xs md:text-sm font-semibold text-white drop-shadow-sm line-clamp-1">
                {cards[4].title}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
