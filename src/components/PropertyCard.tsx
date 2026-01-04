import { Link } from "react-router-dom";
import { Heart, MapPin, Bed, Bath, Square, Camera } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface PropertyCardProps {
  id?: string;
  image: string;
  title: string;
  location: string;
  price: string;
  priceUnit?: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  type: string;
  isNew?: boolean;
  isFeatured?: boolean;
  imageCount?: number;
}

const PropertyCard = ({
  id,
  image,
  title,
  location,
  price,
  priceUnit = "",
  bedrooms,
  bathrooms,
  area,
  type,
  isNew = false,
  isFeatured = false,
  imageCount = 5,
}: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  const CardContent = (
    <div className="card-property group cursor-pointer">
      {/* Image Section */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isFeatured && (
            <Badge className="bg-gold hover:bg-gold border-0 text-foreground font-semibold">
              Featured
            </Badge>
          )}
          {isNew && (
            <Badge className="bg-accent hover:bg-accent border-0 font-semibold">
              New
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        <button 
          onClick={handleFavorite}
          className="absolute top-3 right-3 w-9 h-9 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-card transition-colors group/heart"
        >
          <Heart className={`w-5 h-5 transition-colors ${isFavorite ? "fill-destructive text-destructive" : "text-muted-foreground group-hover/heart:text-destructive"}`} />
        </button>

        {/* Image Count */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-foreground/70 text-primary-foreground px-2 py-1 rounded text-sm backdrop-blur-sm">
          <Camera className="w-4 h-4" />
          <span>{imageCount}</span>
        </div>

        {/* Property Type */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm font-medium">
            {type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Price */}
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-2xl font-bold text-primary">{price}</span>
          {priceUnit && (
            <span className="text-muted-foreground text-sm">{priceUnit}</span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-muted-foreground mb-4">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm line-clamp-1">{location}</span>
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 pt-4 border-t border-border">
          {bedrooms > 0 && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Bed className="w-4 h-4" />
              <span className="text-sm">{bedrooms} Beds</span>
            </div>
          )}
          {bathrooms > 0 && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Bath className="w-4 h-4" />
              <span className="text-sm">{bathrooms} Baths</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Square className="w-4 h-4" />
            <span className="text-sm">{area}</span>
          </div>
        </div>

        {/* Contact Button */}
        <Button className="w-full mt-4 bg-primary hover:bg-navy-light text-primary-foreground">
          View Details
        </Button>
      </div>
    </div>
  );

  if (id) {
    return <Link to={`/property/${id}`}>{CardContent}</Link>;
  }

  return CardContent;
};

export default PropertyCard;
