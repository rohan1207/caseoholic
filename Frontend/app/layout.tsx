import type { Metadata } from "next";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { CartProvider } from "@/contexts/CartContext";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

export const metadata: Metadata = {
  title: "Caseoholic | Premium Phone Cases",
  description:
    "Premium, classy phone cases. Genuine leather and refined protection for your device.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-slate-800">
        <ThemeProvider>
          <CartProvider>
            <ScrollToTop />
            {children}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
