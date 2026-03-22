"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { productFAQs, productTrustPoints, shippingInfo } from "@/data/productDetail";
import { useCart } from "@/contexts/CartContext";
import { ChevronDown, Truck, Shield, RotateCcw } from "lucide-react";
import type { Product } from "@/data/products";

export default function ProductDetailClient({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const { addItem } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("[Caseoholic ProductDetail] Page loaded →", { slug: product.slug, title: product.title });
    }
  }, [product.slug, product.title]);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      image: product.images[0],
    });
  };

  const handleBuyNow = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      image: product.images[0],
    });
    router.push("/cart");
  };

  return (
    <>
      <Navbar />
      <main className="pt-14 sm:pt-16 min-h-screen bg-white">
        <div className="border-b border-slate-100 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
            <nav className="text-sm text-slate-500">
              <Link href="/" className="hover:text-slate-700 transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/products" className="hover:text-slate-700 transition-colors">
                Products
              </Link>
              <span className="mx-2">/</span>
              <span className="text-slate-900 font-medium truncate max-w-[180px] md:max-w-none inline-block align-bottom">
                {product.title}
              </span>
            </nav>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16">
            <ProductGallery images={product.images} title={product.title} />
            <div className="lg:pl-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight leading-tight mb-2 sm:mb-3">
                {product.title}
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-800 mb-4 sm:mb-6">
                ${product.price.toLocaleString()}
              </p>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8">
                Caseoholic Polo & Racquet Club ® genuine leather case. Threaded embroidery, precise fit, and 100 years of heritage in every detail.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-6 sm:mb-8">
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="flex-1 order-2 sm:order-1 bg-slate-900 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-slate-800 transition-colors"
                >
                  Buy now
                </button>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 order-1 sm:order-2 border border-slate-300 text-slate-700 py-3.5 px-6 rounded-xl font-medium hover:bg-slate-50 transition-colors"
                >
                  Add to cart
                </button>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 border-t border-b border-slate-100 py-5">
                {productTrustPoints.map((point) => (
                  <span key={point} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    {point}
                  </span>
                ))}
              </div>

              <div className="mt-10">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">
                  Description
                </h2>
                <div className="text-slate-600 text-sm md:text-base leading-relaxed space-y-4">
                  <p>{product.description.split("\n\n")[0]}</p>
                  <ul className="space-y-2 list-none">
                    {[
                      "Compatible Brand: Apple",
                      "Compatible Model: iPhone 17 Pro Max",
                      "Genuine Leather",
                      "Threaded Embroidery",
                      "Precise fitting of buttons",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-slate-400 mt-1.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-slate-600">
                    Embodying the lush polo fields and lively spirit that define Caseoholic, each Caseoholic Polo & Racquet phone case boasts superior quality and design — a testament to 100 years of rich heritage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-100 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-5">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-slate-500" />
                {shippingInfo}
              </span>
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-slate-500" />
                Secure payment
              </span>
              <span className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-slate-500" />
                Easy returns
              </span>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-20">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 mb-6 sm:mb-8">
            You may also like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {related.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.slug}`}
                className="group block rounded-xl overflow-hidden border border-slate-100 bg-white hover:shadow-lg hover:border-slate-200 transition-all duration-300"
              >
                <div className="aspect-[3/4] relative bg-slate-50">
                  <Image
                    src={p.images[0]}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:opacity-95 transition-opacity"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="p-2.5 sm:p-3 md:p-4">
                  <h3 className="font-medium text-slate-900 text-xs sm:text-sm line-clamp-2 mb-1">
                    {p.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-medium">
                    ${p.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-16">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-6">
            Customer reviews
          </h2>
          <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-8 md:p-12 text-center">
            <p className="text-slate-500 text-sm md:text-base max-w-md mx-auto">
              Be the first to review this product. Your experience helps others choose with confidence.
            </p>
            <button
              type="button"
              className="mt-4 text-slate-900 font-medium text-sm hover:underline"
            >
              Write a review
            </button>
          </div>
        </section>

        <section className="border-t border-slate-100 bg-slate-50/30">
          <div className="max-w-3xl mx-auto px-4 md:px-6 py-14 md:py-20">
            <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-8">
              Frequently asked questions
            </h2>
            <div className="space-y-2">
              {productFAQs.map((faq) => (
                <FAQItem
                  key={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

function ProductGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="lg:sticky lg:top-24 space-y-4">
      <div className="aspect-square relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
        <Image
          src={images[active] ?? images[0]}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            className={`relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-colors ${
              i === active
                ? "border-slate-900 ring-1 ring-slate-900"
                : "border-slate-200 hover:border-slate-400"
            }`}
          >
            <Image src={src} alt="" fill className="object-cover" sizes="80px" />
          </button>
        ))}
      </div>
    </div>
  );
}

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-xl bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 py-4 px-5 text-left"
      >
        <span className="font-medium text-slate-900 text-sm md:text-base">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 text-slate-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-4 px-5 pt-0 text-slate-600 text-sm md:text-base leading-relaxed border-t border-slate-100">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
