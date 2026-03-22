import Link from "next/link";

export default function AboutUs() {
  return (
    <section
      id="about"
      className="py-12 md:py-20 lg:py-24 bg-white border-t border-slate-100"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-slate-900 mb-3 md:mb-4">
          About Caseoholic
        </h2>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4 md:mb-6">
          We bring you premium phone cases that blend genuine materials with
          timeless design. From Santa Barbara Polo & Racquet Club ® leather
          to precise fit and lasting quality, every case is made to protect
          your device and reflect your style.
        </p>
        <p className="text-slate-500 text-sm leading-relaxed">
          Craft, heritage, and attention to detail — that&apos;s what we stand for.
        </p>
        <Link
          href="/products"
          className="inline-block mt-8 text-slate-900 font-medium text-sm hover:underline"
        >
          Explore our collection
        </Link>
      </div>
    </section>
  );
}
