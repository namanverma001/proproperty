import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBanner from "@/components/TrustBanner";
import ExploreCategories from "@/components/ExploreCategories";
import FeaturedProperties from "@/components/FeaturedProperties";
import PropertyTypes from "@/components/PropertyTypes";
import WhyChooseUs from "@/components/WhyChooseUs";
import PopularLocations from "@/components/PopularLocations";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <TrustBanner />
        <ExploreCategories />
        <FeaturedProperties />
        <PropertyTypes />
        <PopularLocations />
        <WhyChooseUs />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
