"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShoppingBag } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-14 sm:pt-16 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 mb-2">
            Products
          </h1>
          <p className="text-slate-600 text-sm md:text-base mb-6 md:mb-10">
            Premium Caseoholic leather cases for iPhone 17 Pro Max.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}

function ProductCard({ product }: { product: (typeof products)[0] }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const images = product.images;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      image: product.images[0],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const productUrl = `/products/${product.slug}`;

  const handleCardClick = () => {
    if (typeof window !== "undefined") {
      console.log("[Caseoholic Products] Product card click →", { slug: product.slug, url: productUrl });
    }
  };

  return (
    <div
      className="group relative w-full rounded-xl md:rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:border-slate-200 transition-shadow duration-300"
      onMouseEnter={() => setImgIndex((prev) => (prev + 1) % images.length)}
      onMouseLeave={() => setImgIndex(0)}
    >
      <a
        href={productUrl}
        className="block"
        onClick={handleCardClick}
      >
        <div className="aspect-[3/4] relative bg-slate-50">
          <Image
            src={images[imgIndex] ?? images[0]}
            alt={product.title}
            fill
            className="object-cover transition-opacity duration-300"
            sizes="(max-width: 640px) 50vw, 25vw"
          />
        </div>
        <div className="p-2.5 sm:p-4">
          <h2 className="font-medium text-slate-900 text-xs sm:text-sm leading-snug line-clamp-2 mb-1 group-hover:text-slate-700">
            {product.title}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-medium">
            ${product.price.toLocaleString()}
          </p>
        </div>
      </a>
      <button
        type="button"
        onClick={handleAddToCart}
        className={`absolute top-2 right-2 sm:top-3 sm:right-3 z-10 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-md transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 ${
          added
            ? "bg-slate-900 text-white scale-110"
            : "bg-white/95 text-slate-700 hover:bg-slate-900 hover:text-white"
        }`}
        aria-label="Add to cart"
      >
        <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
      </button>
    </div>
  );
}
