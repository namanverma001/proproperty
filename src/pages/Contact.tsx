import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Headphones } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for reaching out! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const offices = [
    {
      city: "Mumbai (Head Office)",
      address: "123 Business Hub, Bandra Kurla Complex, Mumbai 400051",
      phone: "+91 22 1234 5678",
      email: "mumbai@proproperty.in",
    },

  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak to our experts",
      value: "+91 98765 43210",
      action: "tel:+919876543210",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Chat with us instantly",
      value: "+91 98765 43210",
      action: "https://wa.me/919876543210",
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "We reply within 24 hours",
      value: "info@proproperty.in",
      action: "mailto:info@proproperty.in",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Toll-free helpline",
      value: "1800 123 4567",
      action: "tel:18001234567",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-primary pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="container-main text-center">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Have questions about buying, selling, or renting property? Our team of experts is here to help you every step of the way.
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-12 -mt-8">
          <div className="container-main">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {contactMethods.map((method) => (
                <a
                  key={method.title}
                  href={method.action}
                  className="bg-card rounded-xl p-6 text-center hover:shadow-card-hover transition-all border border-border hover:-translate-y-1"
                >
                  <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <method.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{method.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                  <p className="text-primary font-medium">{method.value}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="section-padding">
          <div className="container-main">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-2">Send Us a Message</h2>
                <p className="text-muted-foreground mb-6">Fill out the form below and we'll get back to you as soon as possible.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Your Name *</label>
                      <Input
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
                      <Input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Subject *</label>
                    <Input
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                    <Textarea
                      placeholder="Write your message here..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="bg-accent hover:bg-green-brand-light w-full md:w-auto">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Offices */}
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-2">Our Offices</h2>
                <p className="text-muted-foreground mb-6">Visit us at any of our offices across India.</p>

                <div className="space-y-4">
                  {offices.map((office) => (
                    <div key={office.city} className="p-5 bg-muted rounded-xl border border-border">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">{office.city}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{office.address}</p>
                          <div className="flex flex-wrap gap-4 text-sm">
                            <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="text-primary hover:text-accent transition-colors">
                              {office.phone}
                            </a>
                            <a href={`mailto:${office.email}`} className="text-primary hover:text-accent transition-colors">
                              {office.email}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Business Hours */}
                <div className="mt-6 p-5 bg-primary rounded-xl text-primary-foreground">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-5 h-5 text-accent" />
                    <h4 className="font-semibold">Business Hours</h4>
                  </div>
                  <div className="space-y-1 text-sm text-primary-foreground/80">
                    <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
                    <p>Sunday: 10:00 AM - 4:00 PM</p>
                    <p className="text-accent">24/7 Online Support Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Placeholder */}
        <section className="bg-muted py-8">
          <div className="container-main">
            <div className="bg-card rounded-xl overflow-hidden h-[400px] flex items-center justify-center border border-border">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground font-medium">Interactive Map</p>
                <p className="text-sm text-muted-foreground">Our office locations across India</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
