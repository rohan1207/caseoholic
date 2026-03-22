"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart, type CartItem } from "@/contexts/CartContext";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { items, itemCount, totalPrice, updateQuantity, removeItem } = useCart();

  if (itemCount === 0) {
    return (
      <>
        <Navbar />
        <main className="pt-14 sm:pt-16 min-h-screen bg-slate-50">
          <div className="max-w-lg mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-28 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-200 flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-slate-500" strokeWidth={1.5} />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-900 mb-2">
              Your cart is empty
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mb-6 sm:mb-8">
              Add something you like from our collection.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors"
            >
              Shop products
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-14 sm:pt-16 min-h-screen bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-14">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-900 mb-6 sm:mb-8">
            Your cart
            <span className="text-slate-500 font-normal text-base sm:text-lg ml-2">
              ({itemCount} {itemCount === 1 ? "item" : "items"})
            </span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {/* Line items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <CartLineItem
                  key={item.productId}
                  item={item}
                  onUpdateQty={(qty) => updateQuantity(item.productId, qty)}
                  onRemove={() => removeItem(item.productId)}
                />
              ))}
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 sm:top-24 rounded-xl md:rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">
                  Order summary
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>${totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping</span>
                    <span className="text-slate-500">
                      Calculated at checkout
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                  <span className="font-semibold text-slate-900">Total</span>
                  <span className="text-xl font-semibold text-slate-900">
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>
                <button
                  type="button"
                  className="mt-6 w-full bg-slate-900 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-slate-800 transition-colors"
                >
                  Proceed to checkout
                </button>
                <Link
                  href="/products"
                  className="mt-3 block text-center text-sm text-slate-600 hover:text-slate-900 font-medium"
                >
                  Continue shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function CartLineItem({
  item,
  onUpdateQty,
  onRemove,
}: {
  item: CartItem;
  onUpdateQty: (qty: number) => void;
  onRemove: () => void;
}) {
  const lineTotal = item.price * item.quantity;

  return (
    <div className="flex gap-3 sm:gap-4 md:gap-6 p-3 sm:p-4 md:p-5 rounded-xl md:rounded-2xl bg-white border border-slate-100 shadow-sm">
      <Link
        href={`/products/${item.slug}`}
        className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex-shrink-0 rounded-lg md:rounded-xl overflow-hidden bg-slate-100"
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="112px"
        />
      </Link>
      <div className="flex-1 min-w-0">
        <Link
          href={`/products/${item.slug}`}
          className="font-medium text-slate-900 hover:text-slate-700 line-clamp-2 mb-0.5 sm:mb-1 text-xs sm:text-sm"
        >
          {item.title}
        </Link>
        <p className="text-slate-600 text-xs sm:text-sm mb-2 sm:mb-3">
          ${item.price.toLocaleString()}
        </p>
        <div className="flex items-center justify-between gap-2 sm:gap-4 flex-wrap">
          <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50/50">
            <button
              type="button"
              onClick={() => onUpdateQty(item.quantity - 1)}
              className="p-1.5 sm:p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-l-lg transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2} />
            </button>
            <span className="min-w-[1.75rem] sm:min-w-[2rem] text-center text-xs sm:text-sm font-medium text-slate-900">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => onUpdateQty(item.quantity + 1)}
              className="p-1.5 sm:p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-r-lg transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2} />
            </button>
          </div>
          <p className="text-slate-900 font-semibold text-xs sm:text-sm md:text-base">
            ${lineTotal.toLocaleString()}
          </p>
          <button
            type="button"
            onClick={onRemove}
            className="p-1.5 sm:p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Remove from cart"
          >
            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
