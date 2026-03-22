import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function RefundPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-14 sm:pt-16 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-6 sm:mb-8">
            Refund And Return Policy
          </h1>
          <div className="prose prose-slate max-w-none space-y-6 text-slate-600">
            <h2 className="text-lg font-semibold text-slate-900 mt-8">Refund policy</h2>
            <p>
              If refund is approved by Caseoholic * ,refunds shall be processed and Credited within 5-7 working day.
            </p>

            <h2 className="text-lg font-semibold text-slate-900 mt-8">Return Policy</h2>
            <p>
              We offer 7 days of return Policy from the date of Delivery.
            </p>
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
