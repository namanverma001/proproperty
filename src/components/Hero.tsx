import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Building2, IndianRupee, Home, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import heroImage from "@/assets/hero-building.jpg";

const Hero = () => {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState<string>("buy");
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [budget, setBudget] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("listingType", searchType === "buy" ? "buy" : "rent");
    if (propertyType) params.set("type", propertyType);
    if (searchQuery) params.set("city", searchQuery);
    navigate(`/properties?${params.toString()}`);
  };

  const tabs = [
    { id: "buy", label: "Buy", icon: Home },
    { id: "rent", label: "Rent", icon: Building2 },
    { id: "plot", label: "Plots/Land", icon: MapPin },
    { id: "commercial", label: "Commercial", icon: Building2 },
  ];

  return (
    <section className="relative min-h-[580px] md:min-h-[650px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury building"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-main w-full py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm px-4 py-2 rounded-full mb-5 animate-fade-in">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-primary-foreground text-sm font-medium">
              India's Most Trusted Property Portal
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Find Better Places to 
            <span className="text-accent"> Live, Work </span>
            and Wonder...
          </h1>

          <p className="text-base md:text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Explore 50,000+ verified properties across 100+ cities in India
          </p>

          {/* Search Box */}
          <div className="bg-card rounded-xl shadow-xl overflow-hidden max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: "0.3s" }}>
            {/* Tabs */}
            <div className="flex border-b border-border">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSearchType(tab.id)}
                  className={`flex-1 py-4 px-4 text-sm font-semibold transition-all relative ${
                    searchType === tab.id
                      ? "text-primary bg-muted"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {tab.label}
                  {searchType === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                  )}
                </button>
              ))}
            </div>

            {/* Search Fields */}
            <div className="p-4 md:p-5">
              <div className="flex flex-col md:flex-row gap-3">
                {/* Location */}
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search location, project, or landmark"
                    className="pl-10 pr-10 h-12 border-border focus:border-accent text-base"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Mic className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground cursor-pointer hover:text-accent transition-colors" />
                </div>

                {/* Property Type */}
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger className="h-12 w-full md:w-[180px]">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <SelectValue placeholder="All Residential" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Apartment">Flat/Apartment</SelectItem>
                    <SelectItem value="Villa">Villa</SelectItem>
                    <SelectItem value="House">House</SelectItem>
                    <SelectItem value="Plot">Plot</SelectItem>
                  </SelectContent>
                </Select>

                {/* Budget */}
                <Select value={budget} onValueChange={setBudget}>
                  <SelectTrigger className="h-12 w-full md:w-[160px]">
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-muted-foreground" />
                      <SelectValue placeholder="Budget" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {searchType === "rent" ? (
                      <>
                        <SelectItem value="10-25k">₹10K - ₹25K</SelectItem>
                        <SelectItem value="25-50k">₹25K - ₹50K</SelectItem>
                        <SelectItem value="50k-1l">₹50K - ₹1L</SelectItem>
                        <SelectItem value="1l+">₹1L+</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="30-50l">₹30L - ₹50L</SelectItem>
                        <SelectItem value="50-80l">₹50L - ₹80L</SelectItem>
                        <SelectItem value="80l-1cr">₹80L - ₹1Cr</SelectItem>
                        <SelectItem value="1-2cr">₹1Cr - ₹2Cr</SelectItem>
                        <SelectItem value="2cr+">₹2Cr+</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>

                {/* Search Button */}
                <Button 
                  onClick={handleSearch}
                  className="h-12 px-8 bg-accent hover:bg-green-brand-light text-accent-foreground font-semibold text-base gap-2"
                >
                  <Search className="w-5 h-5" />
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-10 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            {[
              { value: "50,000+", label: "Properties" },
              { value: "25,000+", label: "Happy Customers" },
              { value: "100+", label: "Cities" },
              { value: "24/7", label: "Support" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary-foreground">{stat.value}</div>
                <div className="text-primary-foreground/70 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
