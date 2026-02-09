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
import logo from "@/assets/propropertylogo.jpeg";
import heroImage from "@/assets/hero-building.jpg";

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
        <section className="bg-primary pt-32 pb-16 md:pt-40 md:pb-24">
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
                    <Button size="lg" variant="secondary" className="hover:bg-accent hover:text-accent-foreground">
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
        <section className="section-padding overflow-hidden">
          <div className="container-main">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image Side */}
              <div className="relative order-2 lg:order-1">
                <div className="absolute inset-0 bg-accent/10 rounded-3xl transform rotate-3 scale-105" />
                <img
                  src={heroImage}
                  alt="Our Building"
                  className="relative rounded-3xl shadow-2xl w-full object-cover aspect-[4/3] transform -rotate-2 hover:rotate-0 transition-transform duration-500"
                />
                <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-xl shadow-xl border border-border hidden md:block animate-fade-in">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Growth Rate</p>
                      <p className="text-xl font-bold text-foreground">150% YoY</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Side */}
              <div className="order-1 lg:order-2">
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-4 mb-6 leading-tight">
                  From Vision to India's <span className="text-primary">Fastest Growing</span> Property Portal
                </h2>
                <div className="space-y-6 text-lg text-muted-foreground">
                  <p className="leading-relaxed">
                    Founded in 2026 by Prabhas Kumar, Pro Property started with a simple vision: to make property search <span className="text-foreground font-medium">easy, transparent, and accessible</span> for every Indian.
                  </p>
                  <p className="leading-relaxed">
                    What began as a small team with big dreams has now grown into one of India's most trusted real estate platforms, driven by our commitment to verification and exceptional service.
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-accent" />
                      </div>
                      <span className="font-medium text-foreground">100% Verified</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-accent" />
                      </div>
                      <span className="font-medium text-foreground">2M+ Users</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section-padding bg-muted relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

          <div className="container-main relative z-10">
            <div className="text-center mb-16">
              <span className="bg-accent/10 text-accent px-4 py-1.5 rounded-full font-semibold text-sm uppercase tracking-wider inline-block mb-4">
                Our Journey
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
                Key Milestones
              </h2>
            </div>

            <div className="max-w-4xl mx-auto relative">
              {/* Center Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary/10 via-primary/40 to-primary/10 hidden md:block" />

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} group`}>

                    {/* Content Card */}
                    <div className="flex-1 w-full">
                      <div className={`bg-card p-6 md:p-8 rounded-2xl shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                        <div className={`md:hidden inline-block px-3 py-1 bg-primary/10 text-primary font-bold rounded-lg mb-3`}>
                          {milestone.year}
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">{milestone.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>

                    {/* Timeline Node */}
                    <div className="relative flex items-center justify-center z-10">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-card rounded-full border-4 border-primary/20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-bold text-sm md:text-base">{milestone.year}</span>
                        </div>
                      </div>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="flex-1 hidden md:block" />
                  </div>
                ))}
              </div>
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
                <Button size="lg" variant="secondary" className="hover:bg-accent hover:text-accent-foreground">
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
