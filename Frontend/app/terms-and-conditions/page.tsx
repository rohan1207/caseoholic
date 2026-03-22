import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function TermsAndConditionsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-14 sm:pt-16 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-6 sm:mb-8">
            Terms and Conditions
          </h1>
          <div className="prose prose-slate max-w-none space-y-6 text-slate-600">
            <h2 className="text-lg font-semibold text-slate-900 mt-8">1. Acceptance of Terms</h2>
            <p>
              By accessing or using caseoholic.in website, you agree to be bound by these Terms and Conditions.
            </p>

            <h2 className="text-lg font-semibold text-slate-900 mt-8">2. User Conduct</h2>
            <p>
              You agree not to engage in any activity that disrupts or interferes with the functioning of the website or its services.
            </p>

            <h2 className="text-lg font-semibold text-slate-900 mt-8">3. Intellectual Property</h2>
            <p>
              All content and materials available on the website are protected by intellectual property laws.
            </p>

            <h2 className="text-lg font-semibold text-slate-900 mt-8">4. Limitation of Liability</h2>
            <p>
              Caseoholic shall not be liable for any indirect, incidental, special, consequential, or
              punitive damages arising out of your access to or use of the website.
            </p>

            <h2 className="text-lg font-semibold text-slate-900 mt-8">5. Indemnification</h2>
            <p>
              You agree to indemnify and hold Caseoholic harmless from any claims, losses, liabilities, damages, costs, and expenses arising out of or relating to your use of the website.
            </p>

            <h2 className="text-lg font-semibold text-slate-900 mt-8">6. Governing Law</h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of India.
            </p>

            <h2 className="text-lg font-semibold text-slate-900 mt-8">7. Contact Information</h2>
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
