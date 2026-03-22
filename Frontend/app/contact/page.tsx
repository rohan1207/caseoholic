import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-14 sm:pt-16 min-h-screen bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-4">Contact Us</h1>
          <p className="text-slate-600 mb-8">
            Have a question or need help? Reach out and we&apos;ll get back to you soon.
          </p>
          <div className="space-y-5 sm:space-y-6 text-slate-600 text-sm sm:text-base">
            <div>
              <p className="text-slate-500 text-xs sm:text-sm font-medium uppercase tracking-wider mb-1">Email</p>
              <a href="mailto:steloratech@gmail.com" className="text-slate-900 hover:text-slate-700 break-all">
                steloratech@gmail.com
              </a>
            </div>
            <div>
              <p className="text-slate-500 text-xs sm:text-sm font-medium uppercase tracking-wider mb-1">Phone</p>
              <a href="tel:+919465000669" className="text-slate-900 hover:text-slate-700">
                94650 00669
              </a>
            </div>
            <div>
              <p className="text-slate-500 text-xs sm:text-sm font-medium uppercase tracking-wider mb-1">Address</p>
              <p className="text-slate-900">
                New Dashmesh Nagar, Jalandhar, Basti Guzan, Punjab - 144002
              </p>
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
