import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, Mail, ChevronDown, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const buyLinks = [
    { name: "Apartments", href: "/properties?type=Apartment" },
    { name: "Villas", href: "/properties?type=Villa" },
    { name: "Independent Houses", href: "/properties?type=House" },
    { name: "Plots/Land", href: "/properties?type=Plot" },
    { name: "Commercial", href: "/properties?type=Commercial" },
  ];

  const rentLinks = [
    { name: "Apartments for Rent", href: "/properties?listingType=rent&type=Apartment" },
    { name: "Villas for Rent", href: "/properties?listingType=rent&type=Villa" },
    { name: "PG/Co-living", href: "/properties?listingType=rent&type=PG" },
    { name: "Commercial Rentals", href: "/properties?listingType=rent&type=Commercial" },
  ];

  return (
    <header className="w-full bg-card shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary">
        <div className="container-main">
          <div className="flex items-center justify-between py-2 text-sm text-primary-foreground">
            <div className="flex items-center gap-6">
              <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">+91 98765 43210</span>
              </a>
              <a href="mailto:info@propro​perty.in" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">info@proproperty.in</span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden md:inline text-primary-foreground/80">Building Futures Since 2026</span>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10 gap-1">
                  <Heart className="w-4 h-4" />
                  <span className="hidden sm:inline">Saved</span>
                </Button>
                <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10 gap-1">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Login</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-main">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Pro Property" className="h-14 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              to="/"
              className="px-4 py-2 text-foreground font-medium hover:text-primary transition-colors relative group"
            >
              Home
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>

            {/* Buy Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 text-foreground font-medium hover:text-primary transition-colors">
                Buy <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {buyLinks.map((link) => (
                  <DropdownMenuItem key={link.name} asChild>
                    <Link to={link.href} className="cursor-pointer">{link.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Rent Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 text-foreground font-medium hover:text-primary transition-colors">
                Rent <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {rentLinks.map((link) => (
                  <DropdownMenuItem key={link.name} asChild>
                    <Link to={link.href} className="cursor-pointer">{link.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              to="/properties?type=Plot"
              className="px-4 py-2 text-foreground font-medium hover:text-primary transition-colors relative group"
            >
              Plots/Land
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>

            <Link
              to="/properties?type=Commercial"
              className="px-4 py-2 text-foreground font-medium hover:text-primary transition-colors relative group"
            >
              Commercial
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>

            <Link
              to="/about"
              className="px-4 py-2 text-foreground font-medium hover:text-primary transition-colors relative group"
            >
              About
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>

            <Link
              to="/contact"
              className="px-4 py-2 text-foreground font-medium hover:text-primary transition-colors relative group"
            >
              Contact
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/sell">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold">
                Post Property <span className="ml-1 text-xs bg-accent text-accent-foreground px-1.5 py-0.5 rounded">FREE</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card animate-fade-in">
          <div className="container-main py-4">
            <nav className="flex flex-col gap-2">
              <Link to="/" className="px-4 py-3 text-foreground font-medium hover:bg-muted rounded-lg" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/properties" className="px-4 py-3 text-foreground font-medium hover:bg-muted rounded-lg" onClick={() => setIsMenuOpen(false)}>Buy</Link>
              <Link to="/properties?listingType=rent" className="px-4 py-3 text-foreground font-medium hover:bg-muted rounded-lg" onClick={() => setIsMenuOpen(false)}>Rent</Link>
              <Link to="/properties?type=Plot" className="px-4 py-3 text-foreground font-medium hover:bg-muted rounded-lg" onClick={() => setIsMenuOpen(false)}>Plots/Land</Link>
              <Link to="/properties?type=Commercial" className="px-4 py-3 text-foreground font-medium hover:bg-muted rounded-lg" onClick={() => setIsMenuOpen(false)}>Commercial</Link>
              <Link to="/about" className="px-4 py-3 text-foreground font-medium hover:bg-muted rounded-lg" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link to="/contact" className="px-4 py-3 text-foreground font-medium hover:bg-muted rounded-lg" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <div className="pt-4 border-t border-border">
                <Link to="/sell" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-accent text-accent-foreground">
                    Post Property FREE
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
