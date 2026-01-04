import { Link } from "react-router-dom";
import { Verified, ArrowRight, TrendingUp, Shield, Clock } from "lucide-react";

const features = [
  {
    icon: Verified,
    title: "100% Verified Properties",
    description: "Every listing is personally verified by our team",
  },
  {
    icon: TrendingUp,
    title: "Best Market Prices",
    description: "Get transparent pricing with no hidden charges",
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    description: "Safe and secure property transactions guaranteed",
  },
  {
    icon: Clock,
    title: "Quick Response",
    description: "Connect with owners within 24 hours",
  },
];

const TrustBanner = () => {
  return (
    <section className="py-8 bg-accent">
      <div className="container-main">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-start gap-3">
              <div className="w-10 h-10 bg-accent-foreground/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-accent-foreground text-sm">{feature.title}</h3>
                <p className="text-accent-foreground/70 text-xs mt-0.5">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBanner;
