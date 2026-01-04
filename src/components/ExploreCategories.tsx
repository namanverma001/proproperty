import { Link } from "react-router-dom";
import { ArrowRight, Home, Building2, Key, TrendingUp, MapPin, Users } from "lucide-react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";

const categories = [
  {
    title: "Buying a Home",
    description: "Find your dream home from 50,000+ verified properties",
    icon: Home,
    image: property1,
    link: "/properties",
    count: "25,000+",
    label: "Properties for Sale",
  },
  {
    title: "Renting a Home",
    description: "Discover rental properties that fit your lifestyle",
    icon: Key,
    image: property2,
    link: "/properties?listingType=rent",
    count: "15,000+",
    label: "Rental Properties",
  },
  {
    title: "Sell Your Property",
    description: "Get the best price for your property",
    icon: TrendingUp,
    image: property3,
    link: "/sell",
    count: "Free",
    label: "Property Listing",
  },
  {
    title: "Commercial Spaces",
    description: "Office, retail & commercial properties",
    icon: Building2,
    image: property4,
    link: "/properties?type=Commercial",
    count: "5,000+",
    label: "Commercial Listings",
  },
];

const ExploreCategories = () => {
  return (
    <section className="section-padding bg-muted">
      <div className="container-main">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            All Property Needs - One Portal
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2">
            We've Got Properties for Everyone
          </h2>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
            Whether you're buying, renting, or selling – we have everything you need
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.title}
              to={category.link}
              className="group relative rounded-xl overflow-hidden h-[280px] cursor-pointer"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <div className="mb-3">
                  <span className="inline-flex items-center gap-1 text-accent text-sm font-bold">
                    {category.count}
                    <span className="text-primary-foreground/80 font-normal">{category.label}</span>
                  </span>
                </div>
                <h3 className="text-xl font-bold text-primary-foreground mb-1 group-hover:text-accent transition-colors">
                  {category.title}
                </h3>
                <p className="text-primary-foreground/80 text-sm mb-3">
                  {category.description}
                </p>
                <div className="flex items-center text-accent font-medium text-sm">
                  Explore
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreCategories;
