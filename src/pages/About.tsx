import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Users, 
  Award, 
  Building2, 
  TrendingUp, 
  Target, 
  Heart,
  CheckCircle2,
  ArrowRight,
  Shield,
  Clock
} from "lucide-react";
import logo from "@/assets/logo.png";

const About = () => {
  const stats = [
    { value: "50,000+", label: "Properties Listed" },
    { value: "25,000+", label: "Happy Customers" },
    { value: "100+", label: "Cities Covered" },
    { value: "24/7", label: "Customer Support" },
  ];

  const values = [
    {
      icon: Target,
      title: "Customer First",
      description: "Every decision we make starts with our customers' needs. We're committed to making your property journey smooth and successful.",
    },
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "We believe in complete honesty. Every property listing is verified, and we maintain transparent communication throughout.",
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "We continuously evolve our technology and services to provide you with the best real estate experience possible.",
    },
    {
      icon: Heart,
      title: "Community",
      description: "We're more than a platform – we're building communities by connecting people with their perfect homes.",
    },
  ];

  const team = [
    { name: "Prabhas Kumar", role: "Founder & CEO", initials: "PK" },
    { name: "XYZ", role: "Chief Operating Officer", initials: "XY" },
    { name: "XYZ", role: "Head of Technology", initials: "XY" },
    { name: "XYZ", role: "Head of Customer Success", initials: "XY" },
  ];

  const milestones = [
    { year: "2026", title: "Founded", description: "Pro Property was established with a vision to transform real estate in India" },
    { year: "2026", title: "1000+ Listings", description: "Reached our first milestone of 1000 verified property listings" },
    { year: "2026", title: "Pan-India Expansion", description: "Expanded operations to 50+ cities across India" },
    { year: "2026", title: "50,000+ Properties", description: "Grew to become one of India's leading property portals" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-primary py-16 md:py-24">
          <div className="container-main">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                  About Pro Property
                </span>
                <h1 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground mt-4 mb-6">
                  Building Futures Since 2026
                </h1>
                <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed">
                  Pro Property is India's most trusted real estate portal, helping millions of people find their dream homes. Founded by Prabhas Kumar with a vision to revolutionize how Indians buy, sell, and rent properties, we've quickly grown to become a leader in the industry.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/properties">
                    <Button size="lg" className="bg-accent hover:bg-green-brand-light">
                      Explore Properties
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <img src={logo} alt="Pro Property" className="w-64 h-64 object-contain bg-white rounded-2xl p-6 shadow-xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-accent">
          <div className="container-main">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-accent-foreground">{stat.value}</div>
                  <div className="text-accent-foreground/80 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="section-padding">
          <div className="container-main">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-4 mb-6">
                From Vision to India's Fastest Growing Property Portal
              </h2>
              <div className="text-muted-foreground space-y-4 text-lg leading-relaxed">
                <p>
                  Founded in 2026 by Prabhas Kumar, Pro Property started with a simple vision: to make property search easy, transparent, and accessible for every Indian. What began as a small team with big dreams has now grown into one of India's most trusted real estate platforms.
                </p>
                <p>
                  Our commitment to verification, transparency, and exceptional customer service has earned us the trust of homebuyers, sellers, and tenants across the nation. We leverage cutting-edge technology to provide a seamless property search experience.
                </p>
                <p>
                  Today, with 50,000+ verified listings across 100+ cities, we continue to innovate and lead the real estate revolution in India.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section-padding bg-muted">
          <div className="container-main">
            <div className="text-center mb-12">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                Our Journey
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-4">
                Key Milestones
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-4 mb-8 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold text-sm">
                      {milestone.year}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 h-full bg-accent/30 mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className="font-semibold text-lg text-foreground">{milestone.title}</h3>
                    <p className="text-muted-foreground mt-1">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="section-padding">
          <div className="container-main">
            <div className="text-center mb-12">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                What Drives Us
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-4">
                Our Core Values
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div key={value.title} className="bg-card rounded-xl p-6 text-center hover:shadow-card-hover transition-shadow border border-border">
                  <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="section-padding bg-muted">
          <div className="container-main">
            <div className="text-center mb-12">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                Meet The Team
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-4">
                Our Leadership
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <div key={index} className="bg-card rounded-xl p-6 text-center hover:shadow-card-hover transition-shadow border border-border">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground text-xl font-bold">
                    {member.initials}
                  </div>
                  <h3 className="font-semibold text-lg text-foreground">{member.name}</h3>
                  <p className="text-muted-foreground text-sm">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16">
          <div className="container-main text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-4">
              Ready to Find Your Dream Property?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Join millions of happy customers who found their perfect home with Pro Property.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/properties">
                <Button size="lg" className="bg-accent hover:bg-green-brand-light">
                  Browse Properties
                </Button>
              </Link>
              <Link to="/sell">
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  List Your Property
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
