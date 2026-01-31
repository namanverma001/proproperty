import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { getPropertyById } from "@/data/properties";
import { usePropertyStore } from "@/store/propertyStore";
import {
  ArrowLeft,
  Heart,
  Share2,
  MapPin,
  Bed,
  Bath,
  Square,
  Calendar,
  Building2,
  Compass,
  Car,
  CheckCircle2,
  Phone,
  MessageSquare,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { toast } from "sonner";

const PropertyDetail = () => {
  const { id } = useParams();
  const { getPublishedProperties } = usePropertyStore();

  // First try to find in sample property data
  const sampleProperty = getPropertyById(id || "");

  // Then check store's published properties
  const storeProperty = getPublishedProperties().find(p => p.id === id);

  // Merge into a unified property object
  const property = sampleProperty || (storeProperty ? {
    ...storeProperty,
    images: storeProperty.images.length > 0 ? storeProperty.images : ['/placeholder.jpg'],
    address: storeProperty.address || `${storeProperty.location}, ${storeProperty.city}`,
    listingType: storeProperty.listingCategory === 'sell' ? 'buy' as const : 'rent' as const,
    postedDate: storeProperty.submittedDate,
    constructionStatus: storeProperty.constructionStatus || 'N/A',
    furnishing: storeProperty.furnishing || 'N/A',
    facing: storeProperty.facing || 'N/A',
    ageOfProperty: storeProperty.ageOfProperty || 'N/A',
  } : null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "I am interested in this property. Please contact me.",
  });

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container-main py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Property Not Found</h1>
          <p className="text-muted-foreground mb-6">The property you're looking for doesn't exist or hasn't been published yet.</p>
          <Link to="/properties">
            <Button>Browse Properties</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your inquiry has been sent! The owner will contact you shortly.");
    setContactForm({ ...contactForm, name: "", phone: "", email: "" });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pb-16">
        {/* Breadcrumb */}
        <div className="bg-muted py-4">
          <div className="container-main">
            <Link to="/properties" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Properties
            </Link>
          </div>
        </div>

        {/* Image Gallery */}
        <section className="bg-foreground/5">
          <div className="container-main py-6">
            <div className="relative rounded-xl overflow-hidden aspect-[16/9] md:aspect-[21/9]">
              <img
                src={property.images[currentImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
              />

              {property.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-card transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-card transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {property.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${index === currentImageIndex ? "bg-accent" : "bg-card/70"
                      }`}
                  />
                ))}
              </div>

              <div className="absolute top-4 left-4 flex gap-2">
                {property.isFeatured && (
                  <Badge className="bg-gold hover:bg-gold border-0 text-foreground">Featured</Badge>
                )}
                {property.isNew && (
                  <Badge className="bg-accent hover:bg-accent border-0">New</Badge>
                )}
                {property.isVerified && (
                  <Badge className="bg-primary hover:bg-primary border-0">Verified</Badge>
                )}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {property.images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {property.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${index === currentImageIndex ? "border-accent" : "border-transparent"
                      }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Property Details */}
        <section className="container-main py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                      {property.title}
                    </h1>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1" />
                      {property.address}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={handleFavorite}>
                      <Heart className={`w-5 h-5 ${isFavorite ? "fill-destructive text-destructive" : ""}`} />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleShare}>
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-3xl font-bold text-primary">{property.priceUnit}</span>
                  <Badge variant="secondary" className="text-base px-3 py-1">{property.type}</Badge>
                  <Badge variant="outline" className="text-base px-3 py-1">
                    {property.listingType === "buy" ? "For Sale" : "For Rent"}
                  </Badge>
                </div>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-muted rounded-xl">
                {property.bedrooms > 0 && (
                  <div className="text-center">
                    <Bed className="w-6 h-6 text-accent mx-auto mb-2" />
                    <p className="font-semibold text-foreground">{property.bedrooms} Bedrooms</p>
                  </div>
                )}
                {property.bathrooms > 0 && (
                  <div className="text-center">
                    <Bath className="w-6 h-6 text-accent mx-auto mb-2" />
                    <p className="font-semibold text-foreground">{property.bathrooms} Bathrooms</p>
                  </div>
                )}
                <div className="text-center">
                  <Square className="w-6 h-6 text-accent mx-auto mb-2" />
                  <p className="font-semibold text-foreground">{property.area} {property.areaUnit}</p>
                </div>
                {property.parking > 0 && (
                  <div className="text-center">
                    <Car className="w-6 h-6 text-accent mx-auto mb-2" />
                    <p className="font-semibold text-foreground">{property.parking} Parking</p>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{property.description}</p>
              </div>

              {/* Property Details Grid */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Property Details</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Building2 className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Property Type</p>
                      <p className="font-medium text-foreground">{property.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Calendar className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Construction Status</p>
                      <p className="font-medium text-foreground">{property.constructionStatus}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Compass className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Facing</p>
                      <p className="font-medium text-foreground">{property.facing}</p>
                    </div>
                  </div>
                  {property.floorNumber !== undefined && (
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Building2 className="w-5 h-5 text-accent" />
                      <div>
                        <p className="text-sm text-muted-foreground">Floor</p>
                        <p className="font-medium text-foreground">{property.floorNumber} of {property.totalFloors}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Furnishing</p>
                      <p className="font-medium text-foreground">{property.furnishing}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Calendar className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Age of Property</p>
                      <p className="font-medium text-foreground">{property.ageOfProperty}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Amenities</h2>
                <div className="flex flex-wrap gap-3">
                  {property.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-sm font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Contact Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card rounded-xl p-6 shadow-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">Contact Owner</h3>

                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg mb-6">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {property.ownerName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{property.ownerName}</p>
                    <p className="text-sm text-muted-foreground">Property Owner</p>
                  </div>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <Input
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                  />
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                  />
                  <Textarea
                    placeholder="Your Message"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    rows={3}
                  />
                  <Button type="submit" className="w-full bg-accent hover:bg-green-brand-light">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Inquiry
                  </Button>
                </form>

                <div className="mt-4 pt-4 border-t border-border">
                  <a href={`tel:${property.ownerPhone}`}>
                    <Button variant="outline" className="w-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Owner
                    </Button>
                  </a>
                </div>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Posted on {new Date(property.postedDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
