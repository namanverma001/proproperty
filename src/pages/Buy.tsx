import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePropertyStore } from "@/store/propertyStore";
import { toast } from "sonner";
import { CheckCircle2, Home, Building2, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Buy = () => {
    const { addBuyerRequirement, locations, amenities } = usePropertyStore();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [propertyCategory, setPropertyCategory] = useState<"residential" | "commercial">("residential");

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        preferredCity: "",
        preferredAreas: [] as string[],
        propertyTypes: [] as string[],
        bedroomsMin: "",
        bedroomsMax: "",
        budgetMin: "",
        budgetMax: "",
        areaMin: "",
        areaMax: "",
        constructionStatus: "",
        preferredAmenities: [] as string[],
        additionalNotes: "",
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const togglePropertyType = (type: string) => {
        setFormData(prev => ({
            ...prev,
            propertyTypes: prev.propertyTypes.includes(type)
                ? prev.propertyTypes.filter(t => t !== type)
                : [...prev.propertyTypes, type]
        }));
    };

    const toggleAmenity = (amenity: string) => {
        setFormData(prev => ({
            ...prev,
            preferredAmenities: prev.preferredAmenities.includes(amenity)
                ? prev.preferredAmenities.filter(a => a !== amenity)
                : [...prev.preferredAmenities, amenity]
        }));
    };

    const toggleArea = (area: string) => {
        setFormData(prev => ({
            ...prev,
            preferredAreas: prev.preferredAreas.includes(area)
                ? prev.preferredAreas.filter(a => a !== area)
                : [...prev.preferredAreas, area]
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.phone || !formData.preferredCity) {
            toast.error("Please fill in all required fields");
            return;
        }

        if (formData.propertyTypes.length === 0) {
            toast.error("Please select at least one property type");
            return;
        }

        addBuyerRequirement({
            name: formData.name,
            phone: formData.phone,
            email: formData.email || undefined,
            requirementType: "buy",
            propertyCategory,
            preferredCity: formData.preferredCity,
            preferredAreas: formData.preferredAreas,
            propertyTypes: formData.propertyTypes,
            bedroomsMin: formData.bedroomsMin ? parseInt(formData.bedroomsMin) : undefined,
            bedroomsMax: formData.bedroomsMax ? parseInt(formData.bedroomsMax) : undefined,
            budgetMin: formData.budgetMin ? parseInt(formData.budgetMin) : undefined,
            budgetMax: formData.budgetMax ? parseInt(formData.budgetMax) : undefined,
            areaMin: formData.areaMin ? parseInt(formData.areaMin) : undefined,
            areaMax: formData.areaMax ? parseInt(formData.areaMax) : undefined,
            constructionStatus: formData.constructionStatus || undefined,
            preferredAmenities: formData.preferredAmenities,
            additionalNotes: formData.additionalNotes || undefined,
        });

        setIsSubmitted(true);
        toast.success("Your requirement has been submitted! Our team will contact you soon.");
    };

    const selectedCity = locations.find(l => l.city === formData.preferredCity);

    const residentialTypes = ["Apartment", "Villa", "House", "PG", "Penthouse", "Plot"];
    const commercialTypes = ["Office", "Shop", "Showroom", "Warehouse", "Commercial Land"];

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main className="section-padding">
                    <div className="container-main max-w-2xl text-center py-16">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-12 h-12 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-display font-bold text-foreground mb-4">
                            Requirement Submitted!
                        </h2>
                        <p className="text-muted-foreground mb-8 text-lg">
                            Thank you for sharing your requirements. Our property experts will contact you within 24 hours with matching properties.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Button onClick={() => setIsSubmitted(false)} variant="outline">
                                Submit Another Requirement
                            </Button>
                            <Button asChild>
                                <Link to="/properties?listingType=buy">Browse Properties</Link>
                            </Button>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main>
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-primary to-primary/80 py-12 md:py-16">
                    <div className="container-main">
                        <div className="max-w-3xl">
                            <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
                                Looking to Buy a Property?
                            </h1>
                            <p className="text-primary-foreground/90 text-lg">
                                Tell us what you're looking for and our property experts will help you find the perfect match.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Browse Link */}
                <section className="bg-accent/10 py-4">
                    <div className="container-main flex items-center gap-4">
                        <Search className="w-5 h-5 text-accent" />
                        <span className="text-foreground">Want to browse available properties first?</span>
                        <Button asChild variant="outline" size="sm">
                            <Link to="/properties?listingType=buy">View Properties for Sale</Link>
                        </Button>
                    </div>
                </section>

                {/* Form Section */}
                <section className="section-padding">
                    <div className="container-main max-w-4xl">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Property Category Tabs */}
                            <Tabs value={propertyCategory} onValueChange={(v) => setPropertyCategory(v as "residential" | "commercial")}>
                                <TabsList className="grid w-full max-w-md grid-cols-2">
                                    <TabsTrigger value="residential" className="gap-2">
                                        <Home className="w-4 h-4" />
                                        Residential
                                    </TabsTrigger>
                                    <TabsTrigger value="commercial" className="gap-2">
                                        <Building2 className="w-4 h-4" />
                                        Commercial
                                    </TabsTrigger>
                                </TabsList>

                                {/* Property Types */}
                                <TabsContent value="residential" className="mt-6">
                                    <div className="space-y-4">
                                        <Label>Property Type(s) *</Label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {residentialTypes.map((type) => (
                                                <div key={type} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`res-${type}`}
                                                        checked={formData.propertyTypes.includes(type)}
                                                        onCheckedChange={() => togglePropertyType(type)}
                                                    />
                                                    <Label htmlFor={`res-${type}`} className="cursor-pointer">{type}</Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="commercial" className="mt-6">
                                    <div className="space-y-4">
                                        <Label>Property Type(s) *</Label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {commercialTypes.map((type) => (
                                                <div key={type} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`com-${type}`}
                                                        checked={formData.propertyTypes.includes(type)}
                                                        onCheckedChange={() => togglePropertyType(type)}
                                                    />
                                                    <Label htmlFor={`com-${type}`} className="cursor-pointer">{type}</Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>

                            {/* Location Preferences */}
                            <div className="space-y-6 bg-card p-6 rounded-lg border">
                                <h3 className="text-lg font-semibold text-foreground">Location Preferences</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="city">Preferred City *</Label>
                                        <Select value={formData.preferredCity} onValueChange={(v) => handleInputChange("preferredCity", v)}>
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Select city" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {locations.filter(l => l.isActive).map((loc) => (
                                                    <SelectItem key={loc.id} value={loc.city}>{loc.city}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Area Selection */}
                                {selectedCity && (
                                    <div className="space-y-2">
                                        <Label>Preferred Areas (select multiple)</Label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {selectedCity.areas.map((area) => (
                                                <div key={area} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`area-${area}`}
                                                        checked={formData.preferredAreas.includes(area)}
                                                        onCheckedChange={() => toggleArea(area)}
                                                    />
                                                    <Label htmlFor={`area-${area}`} className="cursor-pointer text-sm">{area}</Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Budget & Size */}
                            <div className="space-y-6 bg-card p-6 rounded-lg border">
                                <h3 className="text-lg font-semibold text-foreground">Budget & Size</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label>Budget Range (₹)</Label>
                                        <div className="flex gap-2 mt-1">
                                            <Input
                                                type="number"
                                                placeholder="Min"
                                                value={formData.budgetMin}
                                                onChange={(e) => handleInputChange("budgetMin", e.target.value)}
                                            />
                                            <span className="flex items-center text-muted-foreground">to</span>
                                            <Input
                                                type="number"
                                                placeholder="Max"
                                                value={formData.budgetMax}
                                                onChange={(e) => handleInputChange("budgetMax", e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label>Area Range (sq.ft)</Label>
                                        <div className="flex gap-2 mt-1">
                                            <Input
                                                type="number"
                                                placeholder="Min"
                                                value={formData.areaMin}
                                                onChange={(e) => handleInputChange("areaMin", e.target.value)}
                                            />
                                            <span className="flex items-center text-muted-foreground">to</span>
                                            <Input
                                                type="number"
                                                placeholder="Max"
                                                value={formData.areaMax}
                                                onChange={(e) => handleInputChange("areaMax", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* BHK Range (Residential only) */}
                                {propertyCategory === "residential" && (
                                    <div>
                                        <Label>BHK Range</Label>
                                        <div className="flex gap-2 mt-1 max-w-sm">
                                            <Select value={formData.bedroomsMin} onValueChange={(v) => handleInputChange("bedroomsMin", v)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Min BHK" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {[1, 2, 3, 4, 5].map((num) => (
                                                        <SelectItem key={num} value={num.toString()}>{num} BHK</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <span className="flex items-center text-muted-foreground">to</span>
                                            <Select value={formData.bedroomsMax} onValueChange={(v) => handleInputChange("bedroomsMax", v)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Max BHK" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {[1, 2, 3, 4, 5].map((num) => (
                                                        <SelectItem key={num} value={num.toString()}>{num} BHK</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                )}

                                {/* Construction Status */}
                                <div>
                                    <Label>Construction Status Preference</Label>
                                    <Select value={formData.constructionStatus} onValueChange={(v) => handleInputChange("constructionStatus", v)}>
                                        <SelectTrigger className="mt-1 max-w-sm">
                                            <SelectValue placeholder="Any status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Ready to Move">Ready to Move</SelectItem>
                                            <SelectItem value="Under Construction">Under Construction</SelectItem>
                                            <SelectItem value="New Project">New Project</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Amenities */}
                            <div className="space-y-6 bg-card p-6 rounded-lg border">
                                <h3 className="text-lg font-semibold text-foreground">Preferred Amenities</h3>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {amenities.filter(a => a.isActive).map((amenity) => (
                                        <div key={amenity.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`buy-${amenity.id}`}
                                                checked={formData.preferredAmenities.includes(amenity.name)}
                                                onCheckedChange={() => toggleAmenity(amenity.name)}
                                            />
                                            <Label htmlFor={`buy-${amenity.id}`} className="cursor-pointer text-sm">{amenity.name}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Contact Details */}
                            <div className="space-y-6 bg-card p-6 rounded-lg border">
                                <h3 className="text-lg font-semibold text-foreground">Your Contact Details</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="name">Your Name *</Label>
                                        <Input
                                            id="name"
                                            placeholder="Enter your full name"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange("name", e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="phone">Phone Number *</Label>
                                        <Input
                                            id="phone"
                                            placeholder="+91 XXXXX XXXXX"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange("phone", e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="your@email.com"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange("email", e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="notes">Additional Notes</Label>
                                    <Textarea
                                        id="notes"
                                        placeholder="Any specific requirements or preferences..."
                                        value={formData.additionalNotes}
                                        onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="pt-4">
                                <Button type="submit" size="lg" className="w-full md:w-auto px-12">
                                    Submit Requirement
                                </Button>
                                <p className="text-sm text-muted-foreground mt-3">
                                    Our property experts will contact you within 24 hours with matching properties.
                                </p>
                            </div>
                        </form>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Buy;
