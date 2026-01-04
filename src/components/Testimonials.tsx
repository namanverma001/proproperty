import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Arun Sharma",
    role: "Home Buyer, Mumbai",
    content: "Found my dream apartment through Pro Property in just 2 weeks! The verified listings saved me so much time, and the team was incredibly helpful throughout the process.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "Property Owner, Bangalore",
    content: "Sold my villa within a month of listing. The response was overwhelming, and Pro Property's verification process ensured we only dealt with genuine buyers.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    role: "Tenant, Gurgaon",
    content: "Excellent platform for finding rental properties. The filters made it easy to find exactly what I was looking for, and the process was completely transparent.",
    rating: 5,
  },
  {
    name: "Ananya Reddy",
    role: "First-time Buyer, Hyderabad",
    content: "As a first-time buyer, I was nervous about the process. Pro Property's expert team guided me through everything from property selection to documentation.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-main">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Customer Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
            Join thousands of happy customers who found their perfect property with us
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 relative hover:shadow-card-hover transition-shadow border border-border"
            >
              <Quote className="w-8 h-8 text-accent/20 absolute top-4 right-4" />
              
              {/* Rating */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {testimonial.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-muted px-6 py-3 rounded-full">
            <div className="flex -space-x-2">
              {["A", "B", "C", "D"].map((letter, i) => (
                <div key={i} className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold border-2 border-background">
                  {letter}
                </div>
              ))}
            </div>
            <span className="text-sm text-foreground">
              <strong>25,000+</strong> happy customers trust Pro Property
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
