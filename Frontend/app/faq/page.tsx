import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main className="pt-14 sm:pt-16 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-6 sm:mb-8">FAQs</h1>
          <div className="space-y-6 text-slate-600">
            <div>
              <h2 className="font-medium text-slate-900">How do I place an order?</h2>
              <p>Browse products, add to cart, and complete checkout with your payment and shipping details.</p>
            </div>
            <div>
              <h2 className="font-medium text-slate-900">What payment methods do you accept?</h2>
              <p>We accept major cards, UPI, net banking, and other methods via our secure payment partner.</p>
            </div>
            <div>
              <h2 className="font-medium text-slate-900">How can I return an item?</h2>
              <p>See our Refund Policy for eligibility and steps. Contact us to initiate a return.</p>
            </div>
          </div>
          <p className="mt-12">
            <Link href="/" className="text-slate-600 hover:text-slate-900 font-medium">
              ← Back to home
            </Link>
          </p>
        </div>
        <Footer />
      </main>
    </>
  );
}
