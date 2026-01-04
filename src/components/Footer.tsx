import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Buy Property", href: "/properties" },
    { name: "Rent Property", href: "/properties?listingType=rent" },
    { name: "Sell Property", href: "/sell" },
    { name: "New Projects", href: "/properties" },
    { name: "Property Valuation", href: "/contact" },
    { name: "Home Loans", href: "/contact" },
  ];

  const propertyTypes = [
    { name: "Apartments", href: "/properties?type=Apartment" },
    { name: "Villas", href: "/properties?type=Villa" },
    { name: "Independent Houses", href: "/properties?type=House" },
    { name: "Commercial Spaces", href: "/properties?type=Commercial" },
    { name: "Plots & Land", href: "/properties?type=Plot" },
    { name: "PG & Co-living", href: "/properties?type=PG" },
  ];

  const cities = [
    { name: "Mumbai", href: "/properties?city=Mumbai" },
    { name: "Bangalore", href: "/properties?city=Bangalore" },
    { name: "Delhi NCR", href: "/properties?city=Delhi" },
    { name: "Hyderabad", href: "/properties?city=Hyderabad" },
    { name: "Pune", href: "/properties?city=Pune" },
    { name: "Chennai", href: "/properties?city=Chennai" },
  ];

  const company = [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/contact" },
    { name: "Terms of Service", href: "/contact" },
    { name: "Sitemap", href: "/" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container-main py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img src={logo} alt="Pro Property" className="h-16 w-auto bg-white rounded-lg p-1" />
            </Link>
            <p className="text-primary-foreground/80 mb-6 text-sm leading-relaxed">
              Building Futures since 2026. India's most trusted property portal for buying, selling, and renting properties.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href="tel:+919876543210" className="flex items-center gap-3 text-sm hover:text-accent transition-colors">
                <Phone className="w-4 h-4 text-accent" />
                +91 98765 43210
              </a>
              <a href="mailto:info@proproperty.in" className="flex items-center gap-3 text-sm hover:text-accent transition-colors">
                <Mail className="w-4 h-4 text-accent" />
                info@proproperty.in
              </a>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-accent mt-0.5" />
                <span className="text-primary-foreground/80">
                  123 Business Hub, Sector 5,<br />Mumbai, Maharashtra 400001
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Property Types</h4>
            <ul className="space-y-2.5">
              {propertyTypes.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Cities */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Top Cities</h4>
            <ul className="space-y-2.5">
              {cities.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2.5">
              {company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-primary-foreground/20">
        <div className="container-main py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/70">
              © {currentYear} Pro Property. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
