import PropertyCard from "./PropertyCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { properties } from "@/data/properties";

const FeaturedProperties = () => {
  const featuredProperties = properties.filter(p => p.isFeatured).slice(0, 4);

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
