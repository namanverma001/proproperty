import { Link } from "react-router-dom";
import { Building2, Home, Building, TreePine, Factory, Store } from "lucide-react";

const propertyTypes = [
  {
    icon: Building2,
    name: "Apartments",
    count: "12,500+",
    description: "Flats & Apartments",
    type: "Apartment",
  },
  {
    icon: Home,
    name: "Villas",
    count: "3,200+",
    description: "Independent Villas",
    type: "Villa",
  },
  {
    icon: Building,
    name: "Houses",
    count: "8,400+",
    description: "Independent Houses",
    type: "House",
  },
  {
    icon: TreePine,
    name: "Plots",
    count: "5,800+",
    description: "Residential Plots",
    type: "Plot",
  },
  {
    icon: Factory,
    name: "Commercial",
    count: "2,100+",
    description: "Office & Retail",
    type: "Commercial",
  },
  {
    icon: Store,
    name: "PG/Co-living",
    count: "4,600+",
    description: "Shared Living Spaces",
    type: "PG",
  },
];

const PropertyTypes = () => {
  return (
    <section className="section-padding bg-muted">
      <div className="container-main">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Browse By Category
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2">
            Explore Property Types
          </h2>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
            Find the perfect property type that suits your needs and lifestyle.
          </p>
        </div>

        {/* Property Types Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {propertyTypes.map((type) => (
            <Link
              key={type.name}
              to={`/properties?type=${type.type}`}
              className="group bg-card rounded-xl p-6 text-center cursor-pointer transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors">
                <type.icon className="w-8 h-8 text-accent group-hover:text-accent-foreground transition-colors" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{type.name}</h3>
              <p className="text-primary font-bold text-lg mb-1">{type.count}</p>
              <p className="text-muted-foreground text-sm">{type.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyTypes;
