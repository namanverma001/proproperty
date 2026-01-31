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
    { name: "🏠 Submit Buy Requirement", href: "/buy", highlight: true },
    { name: "Browse Properties for Sale", href: "/properties?listingType=buy" },
    { name: "Apartments", href: "/properties?type=Apartment" },
    { name: "Villas", href: "/properties?type=Villa" },
    { name: "Independent Houses", href: "/properties?type=House" },
    { name: "Plots/Land", href: "/properties?type=Plot" },
    { name: "Commercial", href: "/properties?type=Commercial" },
  ];

  const rentLinks = [
    { name: "🔑 Submit Rent Requirement", href: "/rent", highlight: true },
    { name: "Browse Rentals", href: "/properties?listingType=rent" },
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
              <DropdownMenuContent align="start" className="w-64">
                {buyLinks.map((link, index) => (
                  <DropdownMenuItem key={link.name} asChild className={link.highlight ? "bg-primary/5 font-semibold text-primary" : ""}>
                    <Link to={link.href} className={`cursor-pointer ${index === 1 ? "border-b pb-2 mb-1" : ""}`}>
                      {link.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Rent Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 text-foreground font-medium hover:text-primary transition-colors">
                Rent <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                {rentLinks.map((link, index) => (
                  <DropdownMenuItem key={link.name} asChild className={link.highlight ? "bg-green-50 font-semibold text-green-700" : ""}>
                    <Link to={link.href} className={`cursor-pointer ${index === 1 ? "border-b pb-2 mb-1" : ""}`}>
                      {link.name}
                    </Link>
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
            {/* Looking to Buy/Rent Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold">
                  Looking to Buy
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/buy" className="cursor-pointer font-medium">Buy Property</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/rent" className="cursor-pointer font-medium">Rent Property</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Post Property Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold">
                  Post Property <span className="ml-1 text-xs bg-accent text-accent-foreground px-1.5 py-0.5 rounded">FREE</span>
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/sell" className="cursor-pointer">Sell Property</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/lease" className="cursor-pointer">Rent/Lease Property</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
              <Link to="/properties" className="px-4 py-3 text-foreground font-medium hover:bg-muted rounded-lg" onClick={() => setIsMenuOpen(false)}>Browse Properties</Link>
              <Link to="/properties?listingType=rent" className="px-4 py-3 text-foreground font-medium hover:bg-muted rounded-lg" onClick={() => setIsMenuOpen(false)}>Browse Rentals</Link>
              <Link to="/properties?type=Plot" className="px-4 py-3 text-foreground font-medium hover:bg-muted rounded-lg" onClick={() => setIsMenuOpen(false)}>Plots/Land</Link>
              <Link to="/properties?type=Commercial" className="px-4 py-3 text-foreground font-medium hover:bg-muted rounded-lg" onClick={() => setIsMenuOpen(false)}>Commercial</Link>
              <Link to="/about" className="px-4 py-3 text-foreground font-medium hover:bg-muted rounded-lg" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link to="/contact" className="px-4 py-3 text-foreground font-medium hover:bg-muted rounded-lg" onClick={() => setIsMenuOpen(false)}>Contact</Link>

              {/* CTA Buttons */}
              <div className="pt-4 border-t border-border space-y-3">
                {/* Looking to Buy/Rent */}
                <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Looking to Buy/Rent?</p>
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/buy" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                      Buy Property
                    </Button>
                  </Link>
                  <Link to="/rent" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                      Rent Property
                    </Button>
                  </Link>
                </div>

                {/* Post Property */}
                <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider pt-2">Want to Sell/Lease?</p>
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/sell" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-primary text-primary-foreground">
                      Sell Property
                    </Button>
                  </Link>
                  <Link to="/lease" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-accent text-accent-foreground">
                      Lease Property
                    </Button>
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
