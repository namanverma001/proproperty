import { Link } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const CallToAction = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! Our expert will call you within 24 hours.");
    setFormData({ name: "", phone: "", email: "", location: "" });
  };

  return (
    <section className="section-padding bg-muted">
      <div className="container-main">
        <div className="bg-gradient-to-br from-primary via-primary to-navy-dark rounded-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
            {/* Left Content */}
            <div>
              <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4">
                Get Started Today
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
                Looking to Sell or Rent Your Property?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-6">
                List your property with us and reach millions of potential buyers and tenants. Get the best value for your property with our expert guidance.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/sell">
                  <Button size="lg" className="bg-accent hover:bg-green-brand-light text-accent-foreground font-semibold gap-2">
                    List Your Property
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <a href="tel:+919876543210">
                  <Button size="lg" variant="secondary" className="hover:bg-primary/90 hover:text-primary-foreground gap-2">
                    <Phone className="w-5 h-5" />
                    Call Us Now
                  </Button>
                </a>
              </div>
            </div>

            {/* Right Content - Contact Form */}
            <div className="bg-card rounded-xl p-6 md:p-8 shadow-xl">
              <h3 className="text-xl font-bold text-foreground mb-2">
                Get Free Property Consultation
              </h3>
              <p className="text-muted-foreground mb-6">
                Fill in your details and our expert will call you back.
              </p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <Input
                  placeholder="Your Name"
                  className="h-12"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  className="h-12"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="h-12"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <Input
                  placeholder="City / Location"
                  className="h-12"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
                <Button type="submit" className="w-full h-12 bg-primary hover:bg-navy-light text-primary-foreground font-semibold">
                  Request Callback
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-4">
                By submitting, you agree to our Terms & Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
