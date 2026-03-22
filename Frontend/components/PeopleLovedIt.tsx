"use client";

import Image from "next/image";

const reviews = [
  {
    id: 1,
    name: "Priya S.",
    text: "The leather quality is outstanding. Feels premium and fits perfectly.",
    image: "/customer1.webp",
    rating: 5,
  },
  {
    id: 2,
    name: "Rahul M.",
    text: "Best case I have owned. Clean look and great protection.",
    image: "/customer2.webp",
    rating: 5,
  },
  {
    id: 3,
    name: "Ananya K.",
    text: "Worth every rupee. Caseoholic heritage shows in the craft.",
    image: "/customer3.webp",
    rating: 5,
  },
  {
    id: 4,
    name: "Vikram J.",
    text: "Elegant and durable. Exactly what I was looking for.",
    image: "/customer4.webp",
    rating: 5,
  },
];

export default function PeopleLovedIt() {
  return (
    <section className="py-12 md:py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-slate-900 text-center mb-3 md:mb-4">
          People loved it
        </h2>
        <p className="text-slate-600 text-center max-w-xl mx-auto mb-8 md:mb-12 text-sm md:text-base px-2">
          Real reviews from real customers.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-xl md:rounded-2xl border border-slate-100 bg-slate-50/50 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-square relative bg-slate-200">
                <Image
                  src={review.image}
                  alt={review.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>
              <div className="p-3 sm:p-4">
                <div className="flex gap-0.5 sm:gap-1 mb-1.5 sm:mb-2">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <span key={i} className="text-amber-500 text-xs sm:text-sm">★</span>
                  ))}
                </div>
                <p className="text-slate-700 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-3">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="text-slate-500 text-xs sm:text-sm font-medium">{review.name}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
