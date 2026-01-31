import PropertyCard from "./PropertyCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { usePropertyStore } from "@/store/propertyStore";
import { properties as sampleProperties } from "@/data/properties";

// Unified display interface
interface DisplayProperty {
  id: string;
  images: string[];
  title: string;
  location: string;
  city: string;
  priceUnit: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  areaUnit: string;
  type: string;
  isFeatured: boolean;
  isNew: boolean;
}

const FeaturedProperties = () => {
  const { getPublishedProperties } = usePropertyStore();

  // Get published properties from the store
  const publishedSubmissions = getPublishedProperties();

  // Convert store submissions to display format
  const storeProperties: DisplayProperty[] = publishedSubmissions
    .filter(p => p.isFeatured)
    .map(p => ({
      id: p.id,
      images: p.images.length > 0 ? p.images : ['/placeholder.jpg'],
      title: p.title,
      location: p.location,
      city: p.city,
      priceUnit: p.priceUnit,
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      area: p.area,
      areaUnit: p.areaUnit,
      type: p.type,
      isFeatured: p.isFeatured || false,
      isNew: p.isNew || false,
    }));

  // Sample featured properties formatted consistently
  const sampleFeatured: DisplayProperty[] = sampleProperties
    .filter(p => p.isFeatured)
    .slice(0, 4)
    .map(p => ({
      id: p.id,
      images: p.images,
      title: p.title,
      location: p.location,
      city: p.city,
      priceUnit: p.priceUnit,
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      area: p.area,
      areaUnit: p.areaUnit,
      type: p.type,
      isFeatured: p.isFeatured,
      isNew: p.isNew,
    }));

  // Combine: store properties first (newest), then sample data, max 4
  const featuredProperties = [...storeProperties, ...sampleFeatured].slice(0, 4);

  return (
    <section className="section-padding bg-background">
      <div className="container-main">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Handpicked For You
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2">
              Featured Properties
            </h2>
            <p className="text-muted-foreground mt-2 max-w-lg">
              Discover our carefully selected properties that offer the best value and locations.
            </p>
          </div>
          <Link to="/properties">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-2 self-start md:self-auto">
              View All Properties
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.map((property) => (
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
              isFeatured={property.isFeatured}
              isNew={property.isNew}
              imageCount={property.images.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
