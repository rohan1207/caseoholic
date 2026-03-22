import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function AccountPage() {
  return (
    <>
      <Navbar />
      <main className="pt-14 sm:pt-16 min-h-screen bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-6 sm:mb-8">Account</h1>
          <p className="text-slate-600 mb-8">Sign in or create an account to manage orders and preferences.</p>
          <Link href="/" className="text-slate-600 hover:text-slate-900 font-medium">← Back to home</Link>
        </div>
        <Footer />
      </main>
    </>
  );
}
