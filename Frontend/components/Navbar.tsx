"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, User, Search, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export default function Navbar() {
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navLinks = [
    { label: "Products", href: "/products" },
    { label: "Best Sellers", href: "/#best-seller" },
    { label: "About Us", href: "/#about" },
  ];
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          {/* Mobile: hamburger left */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="md:hidden p-2 -ml-2 text-slate-700 hover:text-slate-900"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" strokeWidth={1.5} />
          </button>
          {/* Spacer on mobile so logo can sit in center between hamburger and icons */}
          <div className="flex-1 md:hidden" aria-hidden />

          {/* Logo: center on phone, left on desktop */}
          <Link
            href="/"
            onClick={closeMenu}
            className="absolute left-1/2 -translate-x-1/2 md:static md:left-0 md:translate-x-0 text-lg sm:text-xl font-semibold tracking-tight text-slate-900 hover:text-slate-700 transition-colors"
          >
            Caseoholic
          </Link>

          {/* Desktop: center nav */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: cart + account (desktop: search too) */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              type="button"
              className="hidden md:block p-2 text-slate-500 hover:text-slate-900 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <Link
              href="/account"
              className="hidden sm:flex p-2 text-slate-500 hover:text-slate-900 transition-colors"
              aria-label="Account"
            >
              <User className="w-5 h-5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/cart"
              className="relative p-2 text-slate-500 hover:text-slate-900 transition-colors"
              aria-label={itemCount > 0 ? `Cart, ${itemCount} items` : "Cart"}
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-slate-900 text-white text-xs font-medium">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </header>

      {/* Full-screen mobile menu */}
      <div
        className={`fixed inset-0 z-[100] bg-white transition-opacity duration-200 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-14 px-4 border-b border-slate-100">
            <span className="text-lg font-semibold text-slate-900">Menu</span>
            <button
              type="button"
              onClick={closeMenu}
              className="p-2 text-slate-600 hover:text-slate-900"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>
          <nav className="flex-1 flex flex-col justify-center px-6 py-8 gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="text-xl font-medium text-slate-800 hover:text-slate-900 py-2"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-slate-100 pt-6 mt-4 flex flex-col gap-4">
              <Link
                href="/account"
                onClick={closeMenu}
                className="flex items-center gap-3 text-slate-700 font-medium"
              >
                <User className="w-5 h-5" /> Account
              </Link>
              <Link
                href="/cart"
                onClick={closeMenu}
                className="flex items-center gap-3 text-slate-700 font-medium"
              >
                <ShoppingBag className="w-5 h-5" />
                Cart {itemCount > 0 && `(${itemCount})`}
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
