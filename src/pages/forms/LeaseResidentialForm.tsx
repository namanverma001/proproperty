import { useState } from "react";
import { usePropertyStore } from "@/store/propertyStore";
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
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";

interface LeaseResidentialFormProps {
    onSuccess?: () => void;
}

const LeaseResidentialForm = ({ onSuccess }: LeaseResidentialFormProps) => {
    const { addSubmission, locations, amenities } = usePropertyStore();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        rent: "",
        securityDeposit: "",
        maintenanceCharges: "",
        city: "",
        location: "",
        address: "",
        pincode: "",
        type: "Apartment" as const,
        bedrooms: "",
        bathrooms: "",
        area: "",
        furnishing: "",
        facing: "",
        floorNumber: "",
        totalFloors: "",
        parking: "",
        ageOfProperty: "",
        ownerName: "",
        ownerPhone: "",
        ownerEmail: "",
        selectedAmenities: [] as string[],
    });

    // Image state
    const [images, setImages] = useState<string[]>([]);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const toggleAmenity = (amenity: string) => {
        setFormData(prev => ({
            ...prev,
            selectedAmenities: prev.selectedAmenities.includes(amenity)
                ? prev.selectedAmenities.filter(a => a !== amenity)
                : [...prev.selectedAmenities, amenity]
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.rent || !formData.city || !formData.ownerName || !formData.ownerPhone) {
            toast.error("Please fill in all required fields");
            return;
        }

        const rentNum = parseInt(formData.rent);
        let priceUnit = "";
        if (rentNum >= 100000) {
            priceUnit = `₹${(rentNum / 100000).toFixed(1)} Lac/month`;
        } else {
            priceUnit = `₹${rentNum.toLocaleString()}/month`;
        }

        addSubmission({
            title: formData.title,
            description: formData.description,
            price: rentNum,
            priceUnit,
            city: formData.city,
            location: formData.location,
            address: formData.address,
            pincode: formData.pincode,
            type: formData.type as any,
            bedrooms: parseInt(formData.bedrooms) || 0,
            bathrooms: parseInt(formData.bathrooms) || 0,
            area: parseInt(formData.area) || 0,
            areaUnit: "sq.ft",
            listingType: "rent",
            listingCategory: "lease",
            propertyCategory: "residential",
            amenities: formData.selectedAmenities,
            images: images,
            constructionStatus: "Ready to Move",
            furnishing: formData.furnishing,
            facing: formData.facing,
            floorNumber: parseInt(formData.floorNumber) || undefined,
            totalFloors: parseInt(formData.totalFloors) || undefined,
            parking: parseInt(formData.parking) || 0,
            ageOfProperty: formData.ageOfProperty,
            ownerName: formData.ownerName,
            ownerPhone: formData.ownerPhone,
            ownerEmail: formData.ownerEmail,
            securityDeposit: parseInt(formData.securityDeposit) || undefined,
            maintenanceCharges: parseInt(formData.maintenanceCharges) || undefined,
            isFeatured: false,
            isNew: true,
            isVerified: false,
        });

        setIsSubmitted(true);
        toast.success("Property submitted successfully! Our team will review it shortly.");
        onSuccess?.();
    };

    if (isSubmitted) {
        return (
            <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Submission Received!</h3>
                <p className="text-gray-600 mb-6">
                    Thank you for listing your property for lease. Our team will review it and get back to you within 24-48 hours.
                </p>
                <Button onClick={() => setIsSubmitted(false)} variant="outline">
                    Submit Another Property
                </Button>
            </div>
        );
    }

    const selectedCity = locations.find(l => l.city === formData.city);

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Property Details */}
            <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Property Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <Label htmlFor="title">Property Title *</Label>
                        <Input
                            id="title"
                            placeholder="e.g., Fully Furnished 2BHK for Rent"
                            value={formData.title}
                            onChange={(e) => handleInputChange("title", e.target.value)}
                            className="mt-1"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Describe your property..."
                            value={formData.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            className="mt-1 min-h-[100px]"
                        />
                    </div>

                    <div>
                        <Label htmlFor="type">Property Type *</Label>
                        <Select value={formData.type} onValueChange={(v) => handleInputChange("type", v)}>
                            <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Apartment">Apartment</SelectItem>
                                <SelectItem value="Villa">Villa</SelectItem>
                                <SelectItem value="House">Independent House</SelectItem>
                                <SelectItem value="PG">PG / Hostel</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="rent">Monthly Rent (₹) *</Label>
                        <Input
                            id="rent"
                            type="number"
                            placeholder="e.g., 25000"
                            value={formData.rent}
                            onChange={(e) => handleInputChange("rent", e.target.value)}
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <Label htmlFor="securityDeposit">Security Deposit (₹)</Label>
                        <Input
                            id="securityDeposit"
                            type="number"
                            placeholder="e.g., 100000"
                            value={formData.securityDeposit}
                            onChange={(e) => handleInputChange("securityDeposit", e.target.value)}
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <Label htmlFor="maintenanceCharges">Maintenance (₹/month)</Label>
                        <Input
                            id="maintenanceCharges"
                            type="number"
                            placeholder="e.g., 3000"
                            value={formData.maintenanceCharges}
                            onChange={(e) => handleInputChange("maintenanceCharges", e.target.value)}
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <Label htmlFor="bedrooms">Bedrooms (BHK)</Label>
                        <Select value={formData.bedrooms} onValueChange={(v) => handleInputChange("bedrooms", v)}>
                            <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">1 BHK</SelectItem>
                                <SelectItem value="2">2 BHK</SelectItem>
                                <SelectItem value="3">3 BHK</SelectItem>
                                <SelectItem value="4">4 BHK</SelectItem>
                                <SelectItem value="5">5+ BHK</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="bathrooms">Bathrooms</Label>
                        <Select value={formData.bathrooms} onValueChange={(v) => handleInputChange("bathrooms", v)}>
                            <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="4">4+</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="area">Built-up Area (sq.ft)</Label>
                        <Input
                            id="area"
                            type="number"
                            placeholder="e.g., 1200"
                            value={formData.area}
                            onChange={(e) => handleInputChange("area", e.target.value)}
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <Label htmlFor="furnishing">Furnishing *</Label>
                        <Select value={formData.furnishing} onValueChange={(v) => handleInputChange("furnishing", v)}>
                            <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Fully Furnished">Fully Furnished</SelectItem>
                                <SelectItem value="Semi-Furnished">Semi-Furnished</SelectItem>
                                <SelectItem value="Unfurnished">Unfurnished</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="facing">Facing</Label>
                        <Select value={formData.facing} onValueChange={(v) => handleInputChange("facing", v)}>
                            <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="North">North</SelectItem>
                                <SelectItem value="South">South</SelectItem>
                                <SelectItem value="East">East</SelectItem>
                                <SelectItem value="West">West</SelectItem>
                                <SelectItem value="North-East">North-East</SelectItem>
                                <SelectItem value="North-West">North-West</SelectItem>
                                <SelectItem value="South-East">South-East</SelectItem>
                                <SelectItem value="South-West">South-West</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="floorNumber">Floor Number</Label>
                        <Input
                            id="floorNumber"
                            type="number"
                            placeholder="e.g., 5"
                            value={formData.floorNumber}
                            onChange={(e) => handleInputChange("floorNumber", e.target.value)}
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <Label htmlFor="totalFloors">Total Floors</Label>
                        <Input
                            id="totalFloors"
                            type="number"
                            placeholder="e.g., 12"
                            value={formData.totalFloors}
                            onChange={(e) => handleInputChange("totalFloors", e.target.value)}
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <Label htmlFor="parking">Parking</Label>
                        <Select value={formData.parking} onValueChange={(v) => handleInputChange("parking", v)}>
                            <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0">No Parking</SelectItem>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="2">2</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Location */}
            <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Location Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="city">City *</Label>
                        <Select value={formData.city} onValueChange={(v) => handleInputChange("city", v)}>
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

                    <div>
                        <Label htmlFor="location">Locality / Area</Label>
                        <Select
                            value={formData.location}
                            onValueChange={(v) => handleInputChange("location", v)}
                            disabled={!formData.city}
                        >
                            <SelectTrigger className="mt-1">
                                <SelectValue placeholder={formData.city ? "Select area" : "Select city first"} />
                            </SelectTrigger>
                            <SelectContent>
                                {selectedCity?.areas.map((area) => (
                                    <SelectItem key={area} value={area}>{area}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="md:col-span-2">
                        <Label htmlFor="address">Complete Address</Label>
                        <Textarea
                            id="address"
                            placeholder="Building name, street, landmark..."
                            value={formData.address}
                            onChange={(e) => handleInputChange("address", e.target.value)}
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input
                            id="pincode"
                            placeholder="e.g., 400001"
                            value={formData.pincode}
                            onChange={(e) => handleInputChange("pincode", e.target.value)}
                            className="mt-1"
                        />
                    </div>
                </div>
            </div>

            {/* Amenities */}
            <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Amenities</h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {amenities.filter(a => a.isActive).map((amenity) => (
                        <div key={amenity.id} className="flex items-center space-x-2">
                            <Checkbox
                                id={`lease-${amenity.id}`}
                                checked={formData.selectedAmenities.includes(amenity.name)}
                                onCheckedChange={() => toggleAmenity(amenity.name)}
                            />
                            <Label htmlFor={`lease-${amenity.id}`} className="text-sm cursor-pointer">
                                {amenity.name}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Property Images */}
            <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Property Images</h3>
                <ImageUpload images={images} onImagesChange={setImages} />
            </div>

            {/* Owner Details */}
            <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Owner / Contact Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="ownerName">Your Name *</Label>
                        <Input
                            id="ownerName"
                            placeholder="Enter your full name"
                            value={formData.ownerName}
                            onChange={(e) => handleInputChange("ownerName", e.target.value)}
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <Label htmlFor="ownerPhone">Phone Number *</Label>
                        <Input
                            id="ownerPhone"
                            placeholder="+91 XXXXX XXXXX"
                            value={formData.ownerPhone}
                            onChange={(e) => handleInputChange("ownerPhone", e.target.value)}
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <Label htmlFor="ownerEmail">Email Address</Label>
                        <Input
                            id="ownerEmail"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.ownerEmail}
                            onChange={(e) => handleInputChange("ownerEmail", e.target.value)}
                            className="mt-1"
                        />
                    </div>
                </div>
            </div>

            {/* Submit */}
            <div className="pt-6 border-t">
                <Button type="submit" size="lg" className="w-full md:w-auto">
                    Submit Property for Review
                </Button>
                <p className="text-sm text-gray-500 mt-3">
                    By submitting, you agree to our terms. Your property will be reviewed by our team before being published.
                </p>
            </div>
        </form>
    );
};

export default LeaseResidentialForm;
