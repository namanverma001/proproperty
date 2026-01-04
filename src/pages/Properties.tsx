import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  properties, 
  cities, 
  propertyTypes, 
  budgetRanges,
  rentRanges,
  filterProperties 
} from "@/data/properties";
import { Search, SlidersHorizontal, X, MapPin, Grid3X3, List } from "lucide-react";

const Properties = () => {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get("type") || "";
  const initialCity = searchParams.get("city") || "";
  const initialListingType = (searchParams.get("listingType") as "buy" | "rent") || "buy";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [selectedType, setSelectedType] = useState(initialType);
  const [listingType, setListingType] = useState<"buy" | "rent">(initialListingType);
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedBedrooms, setSelectedBedrooms] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProperties = useMemo(() => {
    const budgetRange = listingType === "buy" 
      ? budgetRanges.find(b => b.label === selectedBudget)
      : rentRanges.find(b => b.label === selectedBudget);

    return filterProperties({
      city: selectedCity || undefined,
      type: selectedType || undefined,
      listingType,
      minPrice: budgetRange?.min,
      maxPrice: budgetRange?.max,
      bedrooms: selectedBedrooms ? parseInt(selectedBedrooms) : undefined,
      searchQuery: searchQuery || undefined,
    });
  }, [searchQuery, selectedCity, selectedType, listingType, selectedBudget, selectedBedrooms]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCity("");
    setSelectedType("");
    setSelectedBudget("");
    setSelectedBedrooms("");
  };

  const activeFiltersCount = [selectedCity, selectedType, selectedBudget, selectedBedrooms].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Search Header */}
        <section className="bg-primary py-8">
          <div className="container-main">
            <h1 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-6">
              {listingType === "buy" ? "Properties for Sale" : "Properties for Rent"}
            </h1>
            
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by location, property name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 bg-card border-0"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={listingType === "buy" ? "default" : "outline"}
                  onClick={() => setListingType("buy")}
                  className={listingType === "buy" 
                    ? "bg-accent hover:bg-green-brand-light" 
                    : "bg-card border-0 text-foreground hover:bg-card/80"
                  }
                >
                  Buy
                </Button>
                <Button
                  variant={listingType === "rent" ? "default" : "outline"}
                  onClick={() => setListingType("rent")}
                  className={listingType === "rent" 
                    ? "bg-accent hover:bg-green-brand-light" 
                    : "bg-card border-0 text-foreground hover:bg-card/80"
                  }
                >
                  Rent
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="bg-card border-0 text-foreground hover:bg-card/80 gap-2"
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
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="mt-4 p-4 bg-card rounded-lg animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Property Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

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

                  <Select value={selectedBedrooms} onValueChange={setSelectedBedrooms}>
                    <SelectTrigger>
                      <SelectValue placeholder="Bedrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()}>{num} BHK</SelectItem>
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
                  Showing <span className="font-semibold text-foreground">{filteredProperties.length}</span> properties
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
