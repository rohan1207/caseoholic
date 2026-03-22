import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-14 sm:pt-16 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-6 sm:mb-8">
            Privacy Policy
          </h1>
          <div className="prose prose-slate max-w-none space-y-6 text-slate-600">
            <h2 className="text-lg font-semibold text-slate-900 mt-8">1. Information We Collect</h2>
            <p>
              We collect personal information such as your name, email address, and payment details when
              you place an order or sign up for our newsletter.
            </p>

            <h2 className="text-lg font-semibold text-slate-900 mt-8">2. How We Use Your Information</h2>
            <p>
              We use your information to process your orders, communicate with you, and improve our
              services.
            </p>

            <h2 className="text-lg font-semibold text-slate-900 mt-8">3. Cookies</h2>
            <p>
              We use cookies to personalize content, analyze our traffic, and improve your browsing experience.
            </p>

            <h2 className="text-lg font-semibold text-slate-900 mt-8">4. Data Security</h2>
            <p>
              We take precautions to protect your information .
            </p>

            <h2 className="text-lg font-semibold text-slate-900 mt-8">5. Changes to This Privacy Policy</h2>
            <p>
              We reserve the right to update or change our Privacy Policy at any time.
            </p>

            <h2 className="text-lg font-semibold text-slate-900 mt-8">6. Contact Information</h2>
            <p>
              Email id - steloratech@gmail.com<br />
              Phone no - 94650 00669<br />
              Address - New Dashmesh Nagar, Jalandhar , Basti Guzan , Punjab - 144002
            </p>

            <h2 className="text-lg font-semibold text-slate-900 mt-8">8. Ownership</h2>
            <p>
              VIKRAM BHAGAT
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
