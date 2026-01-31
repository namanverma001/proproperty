import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  properties as sampleProperties,
  cities,
  budgetRanges,
  rentRanges,
} from "@/data/properties";
import { usePropertyStore } from "@/store/propertyStore";
import { Search, SlidersHorizontal, X, MapPin, Grid3X3, List, Home, Building2 } from "lucide-react";

// Interface for unified property display
interface DisplayProperty {
  id: string;
  images: string[];
  title: string;
  location: string;
  city: string;
  price: number;
  priceUnit: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  areaUnit: string;
  type: string;
  listingType: "buy" | "rent";
  propertyCategory: "residential" | "commercial";
  constructionStatus?: string;
  isFeatured: boolean;
  isNew: boolean;
}

// Construction status options
const constructionStatusOptions = [
  "Ready to Move",
  "Under Construction",
  "New Project"
];

// Area range options
const areaRanges = [
  { label: "Any Size", min: 0, max: Infinity },
  { label: "Under 500 sq.ft", min: 0, max: 500 },
  { label: "500-1000 sq.ft", min: 500, max: 1000 },
  { label: "1000-1500 sq.ft", min: 1000, max: 1500 },
  { label: "1500-2000 sq.ft", min: 1500, max: 2000 },
  { label: "2000-3000 sq.ft", min: 2000, max: 3000 },
  { label: "3000+ sq.ft", min: 3000, max: Infinity },
];

// Residential property types
const residentialTypes = ["Apartment", "Villa", "House", "PG", "Penthouse"];

// Commercial property types
const commercialTypes = ["Office", "Shop", "Showroom", "Warehouse", "Commercial"];

const Properties = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  // Determine initial values from URL
  const initialListingType = location.pathname === "/rent" ? "rent" : "buy";
  const initialCity = searchParams.get("city") || "";
  const initialType = searchParams.get("type") || "";

  const { getPublishedProperties } = usePropertyStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [selectedType, setSelectedType] = useState(initialType);
  const [listingType, setListingType] = useState<"buy" | "rent">(initialListingType);
  const [propertyCategory, setPropertyCategory] = useState<"residential" | "commercial">("residential");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedBedrooms, setSelectedBedrooms] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedConstructionStatus, setSelectedConstructionStatus] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Update listing type when URL changes
  useEffect(() => {
    if (location.pathname === "/rent") {
      setListingType("rent");
    } else if (location.pathname === "/buy") {
      setListingType("buy");
    }
  }, [location.pathname]);

  // Clear type filter when category changes
  useEffect(() => {
    setSelectedType("");
  }, [propertyCategory]);

  // Combine sample properties with published store properties
  const allProperties = useMemo((): DisplayProperty[] => {
    // Convert sample properties to display format (they're residential by default)
    const sampleFormatted: DisplayProperty[] = sampleProperties.map(p => ({
      id: p.id,
      images: p.images,
      title: p.title,
      location: p.location,
      city: p.city,
      price: p.price,
      priceUnit: p.priceUnit,
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      area: p.area,
      areaUnit: p.areaUnit,
      type: p.type,
      listingType: p.listingType,
      propertyCategory: commercialTypes.includes(p.type) ? "commercial" : "residential",
      constructionStatus: "Ready to Move",
      isFeatured: p.isFeatured,
      isNew: p.isNew,
    }));

    // Get published properties from store
    const publishedSubmissions = getPublishedProperties();
    const storeFormatted: DisplayProperty[] = publishedSubmissions.map(p => ({
      id: p.id,
      images: p.images.length > 0 ? p.images : ['/placeholder.jpg'],
      title: p.title,
      location: p.location,
      city: p.city,
      price: p.price,
      priceUnit: p.priceUnit,
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      area: p.area,
      areaUnit: p.areaUnit,
      type: p.type,
      listingType: p.listingCategory === 'sell' ? 'buy' as const : 'rent' as const,
      propertyCategory: p.propertyCategory || "residential",
      constructionStatus: p.constructionStatus || "Ready to Move",
      isFeatured: p.isFeatured || false,
      isNew: p.isNew || false,
    }));

    // Combine both - store properties first (newest), then sample data
    return [...storeFormatted, ...sampleFormatted];
  }, [getPublishedProperties]);

  // Get property types based on selected category
  const availableTypes = propertyCategory === "residential" ? residentialTypes : commercialTypes;

  // Filter properties based on user selection
  const filteredProperties = useMemo(() => {
    const budgetRange = listingType === "buy"
      ? budgetRanges.find(b => b.label === selectedBudget)
      : rentRanges.find(b => b.label === selectedBudget);

    const areaRange = areaRanges.find(a => a.label === selectedArea);

    return allProperties.filter(property => {
      // Filter by listing type
      if (property.listingType !== listingType) return false;

      // Filter by property category (residential/commercial)
      if (property.propertyCategory !== propertyCategory) return false;

      // Filter by city
      if (selectedCity && property.city !== selectedCity) return false;

      // Filter by property type
      if (selectedType && property.type !== selectedType) return false;

      // Filter by price range
      if (budgetRange) {
        if (budgetRange.min && property.price < budgetRange.min) return false;
        if (budgetRange.max && property.price > budgetRange.max) return false;
      }

      // Filter by bedrooms (only for residential)
      if (propertyCategory === "residential" && selectedBedrooms && property.bedrooms !== parseInt(selectedBedrooms)) return false;

      // Filter by area range
      if (areaRange && areaRange.label !== "Any Size") {
        if (property.area < areaRange.min || property.area > areaRange.max) return false;
      }

      // Filter by construction status
      if (selectedConstructionStatus && property.constructionStatus !== selectedConstructionStatus) return false;

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = property.title.toLowerCase().includes(query);
        const matchesLocation = property.location.toLowerCase().includes(query);
        const matchesCity = property.city.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLocation && !matchesCity) return false;
      }

      return true;
    });
  }, [allProperties, searchQuery, selectedCity, selectedType, listingType, propertyCategory, selectedBudget, selectedBedrooms, selectedArea, selectedConstructionStatus]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCity("");
    setSelectedType("");
    setSelectedBudget("");
    setSelectedBedrooms("");
    setSelectedArea("");
    setSelectedConstructionStatus("");
  };

  const activeFiltersCount = [selectedCity, selectedType, selectedBudget, selectedBedrooms, selectedArea, selectedConstructionStatus].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Search Header */}
        <section className="bg-primary py-8">
          <div className="container-main">
            <h1 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-6">
              {propertyCategory === "residential" ? "Residential" : "Commercial"} Properties {listingType === "buy" ? "for Sale" : "for Rent"}
            </h1>

            {/* Buy/Rent Toggle */}
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex bg-card/20 rounded-lg p-1">
                <Button
                  variant={listingType === "buy" ? "default" : "ghost"}
                  onClick={() => setListingType("buy")}
                  className={listingType === "buy"
                    ? "bg-accent hover:bg-green-brand-light text-accent-foreground"
                    : "text-primary-foreground hover:bg-card/20"
                  }
                >
                  Buy
                </Button>
                <Button
                  variant={listingType === "rent" ? "default" : "ghost"}
                  onClick={() => setListingType("rent")}
                  className={listingType === "rent"
                    ? "bg-accent hover:bg-green-brand-light text-accent-foreground"
                    : "text-primary-foreground hover:bg-card/20"
                  }
                >
                  Rent
                </Button>
              </div>

              {/* Residential/Commercial Toggle */}
              <div className="flex bg-card/20 rounded-lg p-1">
                <Button
                  variant={propertyCategory === "residential" ? "default" : "ghost"}
                  onClick={() => setPropertyCategory("residential")}
                  className={propertyCategory === "residential"
                    ? "bg-white text-primary hover:bg-white/90"
                    : "text-primary-foreground hover:bg-card/20"
                  }
                >
                  <Home className="w-4 h-4 mr-2" />
                  Residential
                </Button>
                <Button
                  variant={propertyCategory === "commercial" ? "default" : "ghost"}
                  onClick={() => setPropertyCategory("commercial")}
                  className={propertyCategory === "commercial"
                    ? "bg-white text-primary hover:bg-white/90"
                    : "text-primary-foreground hover:bg-card/20"
                  }
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  Commercial
                </Button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by location, property name, e.g. Western Mumbai..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 bg-card border-0"
                />
              </div>

              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="bg-card border-0 text-foreground hover:bg-card/80 gap-2 h-12"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 bg-accent text-accent-foreground rounded-full text-xs flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="mt-4 p-4 bg-card rounded-lg animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {/* City Filter */}
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Property Type Filter */}
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Property Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Budget Filter */}
                  <Select value={selectedBudget} onValueChange={setSelectedBudget}>
                    <SelectTrigger>
                      <SelectValue placeholder="Budget" />
                    </SelectTrigger>
                    <SelectContent>
                      {(listingType === "buy" ? budgetRanges : rentRanges).map((range) => (
                        <SelectItem key={range.label} value={range.label}>{range.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Bedrooms Filter (only for residential) */}
                  {propertyCategory === "residential" && (
                    <Select value={selectedBedrooms} onValueChange={setSelectedBedrooms}>
                      <SelectTrigger>
                        <SelectValue placeholder="BHK" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((num) => (
                          <SelectItem key={num} value={num.toString()}>{num} BHK</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  {/* Area Range Filter */}
                  <Select value={selectedArea} onValueChange={setSelectedArea}>
                    <SelectTrigger>
                      <SelectValue placeholder="Area Size" />
                    </SelectTrigger>
                    <SelectContent>
                      {areaRanges.map((range) => (
                        <SelectItem key={range.label} value={range.label}>{range.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Construction Status Filter */}
                  <Select value={selectedConstructionStatus} onValueChange={setSelectedConstructionStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {constructionStatusOptions.map((status) => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    onClick={clearFilters}
                    className="mt-4 text-destructive hover:text-destructive"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear All Filters
                  </Button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Results Section */}
        <section className="section-padding">
          <div className="container-main">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filteredProperties.length}</span> {propertyCategory} properties
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">View:</span>
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="w-9 h-9"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="w-9 h-9"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Properties Grid */}
            {filteredProperties.length > 0 ? (
              <div className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "flex flex-col gap-4"
              }>
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    id={property.id}
                    image={property.images[0]}
                    title={property.title}
                    location={`${property.location}, ${property.city}`}
                    price={property.priceUnit}
                    bedrooms={property.bedrooms}
                    bathrooms={property.bathrooms}
                    area={`${property.area} ${property.areaUnit}`}
                    type={property.type}
                    isNew={property.isNew}
                    isFeatured={property.isFeatured}
                    imageCount={property.images.length}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No Properties Found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search criteria
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Properties;
