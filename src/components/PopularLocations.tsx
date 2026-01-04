import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";

const locations = [
  {
    city: "Mumbai",
    properties: "12,500+",
    localities: ["Bandra", "Andheri", "Powai", "Worli"],
    color: "from-primary to-navy-light",
  },
  {
    city: "Bangalore",
    properties: "10,200+",
    localities: ["Whitefield", "Koramangala", "Indiranagar", "HSR Layout"],
    color: "from-accent to-green-brand-light",
  },
  {
    city: "Delhi",
    properties: "15,800+",
    localities: ["Dwarka", "Rohini", "Vasant Kunj", "Saket"],
    color: "from-navy-light to-primary",
  },
  {
    city: "Hyderabad",
    properties: "7,400+",
    localities: ["Gachibowli", "Hitech City", "Kondapur", "Madhapur"],
    color: "from-gold to-amber-500",
  },
  {
    city: "Pune",
    properties: "8,600+",
    localities: ["Wakad", "Hinjewadi", "Kharadi", "Baner"],
    color: "from-primary to-navy-dark",
  },
  {
    city: "Chennai",
    properties: "6,300+",
    localities: ["OMR", "Adyar", "Velachery", "Anna Nagar"],
    color: "from-accent to-teal-600",
  },
];

const PopularLocations = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-main">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Top Destinations
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2">
            Popular Locations
          </h2>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
            Explore properties in India's most sought-after cities and localities.
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location) => (
            <Link
              key={location.city}
              to={`/properties?city=${location.city}`}
              className="group relative bg-card rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-card-hover overflow-hidden"
            >
              {/* Gradient Background */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${location.color} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500`} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-1">{location.city}</h3>
                <p className="text-primary font-semibold mb-4">{location.properties} Properties</p>

                <div className="flex flex-wrap gap-2">
                  {location.localities.map((locality) => (
                    <span
                      key={locality}
                      className="text-sm bg-muted text-muted-foreground px-3 py-1 rounded-full group-hover:bg-accent/10 transition-colors"
                    >
                      {locality}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularLocations;
