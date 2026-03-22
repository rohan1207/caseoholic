"use client";

import Link from "next/link";

const footerLinks = {
  shop: [
    { label: "All Products", href: "/products" },
    { label: "Best Sellers", href: "/#best-seller" },
    { label: "New Arrivals", href: "/products" },
  ],
  support: [
    { label: "Contact Us", href: "/contact" },
    { label: "Shipping & Returns", href: "/shipping" },
    { label: "FAQs", href: "/faq" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Refund Policy", href: "/refund-policy" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-6">
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="text-lg sm:text-xl font-semibold text-white">
              Caseoholic
            </Link>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-slate-400 max-w-xs">
              Premium phone cases. Genuine leather, refined protection, and a century of heritage.
            </p>
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4">
              Shop
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4">
              Support
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4">
              Legal
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <h3 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4">
              Contact
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-400">
              <li>
                <span className="text-slate-500 block mb-0.5">Email</span>
                <a
                  href="mailto:steloratech@gmail.com"
                  className="hover:text-white transition-colors break-all"
                >
                  steloratech@gmail.com
                </a>
              </li>
              <li>
                <span className="text-slate-500 block mb-0.5">Phone</span>
                <a
                  href="tel:+919465000669"
                  className="hover:text-white transition-colors"
                >
                  94650 00669
                </a>
              </li>
              <li>
                <span className="text-slate-500 block mb-0.5">Address</span>
                <span className="block">
                  New Dashmesh Nagar, Jalandhar, Basti Guzan, Punjab - 144002
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs sm:text-sm text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} Caseoholic. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
