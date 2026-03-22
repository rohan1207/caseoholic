import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BestSeller from "@/components/BestSeller";
// import BentoGrid from "@/components/BentoGrid";
import PeopleLovedIt from "@/components/PeopleLovedIt";
import Strip from "@/components/Strip";
import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BestSeller />
        {/* <BentoGrid /> */}
        <PeopleLovedIt />
        <Strip />
        <AboutUs />
        <Footer />
      </main>
    </>
  );
}
