import { Shield, Users, Award, Clock, HeadphonesIcon, TrendingUp, CheckCircle2, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Shield,
    title: "100% Verified Properties",
    description: "Every listing is personally verified to ensure authenticity and accuracy.",
  },
  {
    icon: Users,
    title: "Expert Property Advisors",
    description: "Our experienced advisors guide you through every step of the process.",
  },
  {
    icon: Award,
    title: "Best Price Guarantee",
    description: "Get the best market prices with our extensive network and expertise.",
  },
  {
    icon: Clock,
    title: "Quick & Easy Process",
    description: "Streamlined procedures ensure faster property transactions.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Customer Support",
    description: "Round-the-clock support for all your queries and concerns.",
  },
  {
    icon: TrendingUp,
    title: "Market Insights",
    description: "Stay updated with the latest real estate trends and property values.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Why Pro Property
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mt-4 mb-6">
              India's Most Trusted Real Estate Platform
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
              Since 2026, we've been helping Indians find their perfect homes with transparency, trust, and technology. Here's why millions choose us.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-primary-foreground/10 rounded-lg">
                <div className="text-2xl font-bold text-accent">50K+</div>
                <div className="text-sm text-primary-foreground/70">Properties</div>
              </div>
              <div className="text-center p-4 bg-primary-foreground/10 rounded-lg">
                <div className="text-2xl font-bold text-accent">100+</div>
                <div className="text-sm text-primary-foreground/70">Cities</div>
              </div>
              <div className="text-center p-4 bg-primary-foreground/10 rounded-lg">
                <div className="text-2xl font-bold text-accent">25K+</div>
                <div className="text-sm text-primary-foreground/70">Happy Users</div>
              </div>
            </div>

            <Link to="/properties">
              <Button size="lg" className="bg-accent hover:bg-green-brand-light text-accent-foreground font-semibold">
                <Home className="w-5 h-5 mr-2" />
                Start Your Property Search
              </Button>
            </Link>
          </div>

          {/* Right Content - Features Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-primary-foreground/5 backdrop-blur-sm rounded-xl p-5 border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-colors"
              >
                <div className="w-11 h-11 rounded-lg bg-accent flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-accent-foreground" />
                </div>
                <h3 className="font-semibold text-primary-foreground mb-1">
                  {feature.title}
                </h3>
                <p className="text-primary-foreground/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
