import { useState } from "react";
import { usePropertyStore, PropertyStatus } from "@/store/propertyStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { PlusCircle, Save, Eye, CheckCircle2 } from "lucide-react";

const CreateProperty = () => {
    const { createAdminProperty, locations, amenities } = usePropertyStore();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        city: "",
        location: "",
        address: "",
        pincode: "",
        type: "Apartment",
        listingCategory: "sell" as const,
        propertyCategory: "residential" as const,
        bedrooms: "",
        bathrooms: "",
        area: "",
        constructionStatus: "",
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
        isFeatured: false,
        publishImmediately: true,
    });

    const handleInputChange = (field: string, value: any) => {
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

        if (!formData.title || !formData.price || !formData.city || !formData.ownerName || !formData.ownerPhone) {
            toast.error("Please fill in all required fields");
            return;
        }

        const priceNum = parseInt(formData.price);
        let priceUnit = "";

        if (formData.listingCategory === 'lease') {
            if (priceNum >= 100000) {
                priceUnit = `₹${(priceNum / 100000).toFixed(1)} Lac/month`;
            } else {
                priceUnit = `₹${priceNum.toLocaleString()}/month`;
            }
        } else {
            if (priceNum >= 10000000) {
                priceUnit = `₹${(priceNum / 10000000).toFixed(2)} Cr`;
            } else if (priceNum >= 100000) {
                priceUnit = `₹${(priceNum / 100000).toFixed(2)} Lac`;
            } else {
                priceUnit = `₹${priceNum.toLocaleString()}`;
            }
        }

        const status: PropertyStatus = formData.publishImmediately ? 'published' : 'approved';

        createAdminProperty({
            title: formData.title,
            description: formData.description,
            price: priceNum,
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
            listingType: formData.listingCategory === 'sell' ? 'buy' : 'rent',
            listingCategory: formData.listingCategory,
            propertyCategory: formData.propertyCategory,
            amenities: formData.selectedAmenities,
            images: [],
            constructionStatus: formData.constructionStatus,
            furnishing: formData.furnishing,
            facing: formData.facing,
            floorNumber: parseInt(formData.floorNumber) || undefined,
            totalFloors: parseInt(formData.totalFloors) || undefined,
            parking: parseInt(formData.parking) || 0,
            ageOfProperty: formData.ageOfProperty,
            ownerName: formData.ownerName,
            ownerPhone: formData.ownerPhone,
            ownerEmail: formData.ownerEmail,
            isFeatured: formData.isFeatured,
            isNew: true,
            isVerified: true,
            status,
        });

        setIsSubmitted(true);
        toast.success(formData.publishImmediately ? "Property created and published!" : "Property created as draft!");
    };

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            price: "",
            city: "",
            location: "",
            address: "",
            pincode: "",
            type: "Apartment",
            listingCategory: "sell",
            propertyCategory: "residential",
            bedrooms: "",
            bathrooms: "",
            area: "",
            constructionStatus: "",
            furnishing: "",
            facing: "",
            floorNumber: "",
            totalFloors: "",
            parking: "",
            ageOfProperty: "",
            ownerName: "",
            ownerPhone: "",
            ownerEmail: "",
            selectedAmenities: [],
            isFeatured: false,
            publishImmediately: true,
        });
        setIsSubmitted(false);
    };

    if (isSubmitted) {
        return (
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardContent className="py-16 text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-10 h-10 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Created!</h2>
                        <p className="text-gray-600 mb-6">
                            The property has been successfully {formData.publishImmediately ? 'published' : 'saved as draft'}.
                        </p>
                        <Button onClick={resetForm}>
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Create Another Property
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const selectedCity = locations.find(l => l.city === formData.city);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <PlusCircle className="w-8 h-8 text-primary" />
                    Create Property
                </h1>
                <p className="text-gray-500 mt-1">Create a new property listing directly (Admin-created)</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="title">Property Title *</Label>
                                    <Input
                                        id="title"
                                        placeholder="e.g., Luxury 3BHK Apartment with Sea View"
                                        value={formData.title}
                                        onChange={(e) => handleInputChange("title", e.target.value)}
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Detailed description of the property..."
                                        value={formData.description}
                                        onChange={(e) => handleInputChange("description", e.target.value)}
                                        className="mt-1 min-h-[120px]"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Listing Type *</Label>
                                        <Select value={formData.listingCategory} onValueChange={(v: any) => handleInputChange("listingCategory", v)}>
                                            <SelectTrigger className="mt-1">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="sell">For Sale</SelectItem>
                                                <SelectItem value="lease">For Rent/Lease</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label>Category *</Label>
                                        <Select value={formData.propertyCategory} onValueChange={(v: any) => handleInputChange("propertyCategory", v)}>
                                            <SelectTrigger className="mt-1">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="residential">Residential</SelectItem>
                                                <SelectItem value="commercial">Commercial</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="type">Property Type *</Label>
                                        <Select value={formData.type} onValueChange={(v) => handleInputChange("type", v)}>
                                            <SelectTrigger className="mt-1">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Apartment">Apartment</SelectItem>
                                                <SelectItem value="Villa">Villa</SelectItem>
                                                <SelectItem value="House">House</SelectItem>
                                                <SelectItem value="PG">PG</SelectItem>
                                                <SelectItem value="Office">Office</SelectItem>
                                                <SelectItem value="Shop">Shop</SelectItem>
                                                <SelectItem value="Warehouse">Warehouse</SelectItem>
                                                <SelectItem value="Plot">Plot</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="price">
                                            {formData.listingCategory === 'sell' ? 'Price (₹)' : 'Monthly Rent (₹)'} *
                                        </Label>
                                        <Input
                                            id="price"
                                            type="number"
                                            placeholder={formData.listingCategory === 'sell' ? "e.g., 5000000" : "e.g., 25000"}
                                            value={formData.price}
                                            onChange={(e) => handleInputChange("price", e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Property Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Property Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div>
                                        <Label>Bedrooms</Label>
                                        <Select value={formData.bedrooms} onValueChange={(v) => handleInputChange("bedrooms", v)}>
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="0">0</SelectItem>
                                                <SelectItem value="1">1</SelectItem>
                                                <SelectItem value="2">2</SelectItem>
                                                <SelectItem value="3">3</SelectItem>
                                                <SelectItem value="4">4</SelectItem>
                                                <SelectItem value="5">5+</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label>Bathrooms</Label>
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
                                        <Label htmlFor="area">Area (sq.ft)</Label>
                                        <Input
                                            id="area"
                                            type="number"
                                            placeholder="e.g., 1500"
                                            value={formData.area}
                                            onChange={(e) => handleInputChange("area", e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label>Furnishing</Label>
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
                                        <Label>Construction Status</Label>
                                        <Select value={formData.constructionStatus} onValueChange={(v) => handleInputChange("constructionStatus", v)}>
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Ready to Move">Ready to Move</SelectItem>
                                                <SelectItem value="Under Construction">Under Construction</SelectItem>
                                                <SelectItem value="New Project">New Project</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label>Parking</Label>
                                        <Select value={formData.parking} onValueChange={(v) => handleInputChange("parking", v)}>
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="0">None</SelectItem>
                                                <SelectItem value="1">1</SelectItem>
                                                <SelectItem value="2">2</SelectItem>
                                                <SelectItem value="3">3+</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Location */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Location</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>City *</Label>
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
                                        <Label>Locality</Label>
                                        <Select
                                            value={formData.location}
                                            onValueChange={(v) => handleInputChange("location", v)}
                                            disabled={!formData.city}
                                        >
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Select area" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {selectedCity?.areas.map((area) => (
                                                    <SelectItem key={area} value={area}>{area}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="address">Full Address</Label>
                                    <Textarea
                                        id="address"
                                        placeholder="Building name, street, landmark..."
                                        value={formData.address}
                                        onChange={(e) => handleInputChange("address", e.target.value)}
                                        className="mt-1"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Owner Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Owner / Contact Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="ownerName">Name *</Label>
                                        <Input
                                            id="ownerName"
                                            placeholder="Owner name"
                                            value={formData.ownerName}
                                            onChange={(e) => handleInputChange("ownerName", e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="ownerPhone">Phone *</Label>
                                        <Input
                                            id="ownerPhone"
                                            placeholder="+91 XXXXX XXXXX"
                                            value={formData.ownerPhone}
                                            onChange={(e) => handleInputChange("ownerPhone", e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="ownerEmail">Email</Label>
                                    <Input
                                        id="ownerEmail"
                                        type="email"
                                        placeholder="owner@email.com"
                                        value={formData.ownerEmail}
                                        onChange={(e) => handleInputChange("ownerEmail", e.target.value)}
                                        className="mt-1"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Amenities */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Amenities</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {amenities.filter(a => a.isActive).map((amenity) => (
                                        <div key={amenity.id} className="flex items-center gap-2">
                                            <Checkbox
                                                id={`admin-${amenity.id}`}
                                                checked={formData.selectedAmenities.includes(amenity.name)}
                                                onCheckedChange={() => toggleAmenity(amenity.name)}
                                            />
                                            <Label htmlFor={`admin-${amenity.id}`} className="text-sm cursor-pointer">
                                                {amenity.name}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Publish Options */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Publish Options</CardTitle>
                                <CardDescription>Control how this property is published</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="publish">Publish Immediately</Label>
                                    <Switch
                                        id="publish"
                                        checked={formData.publishImmediately}
                                        onCheckedChange={(v) => handleInputChange("publishImmediately", v)}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="featured">Mark as Featured</Label>
                                    <Switch
                                        id="featured"
                                        checked={formData.isFeatured}
                                        onCheckedChange={(v) => handleInputChange("isFeatured", v)}
                                    />
                                </div>

                                <div className="pt-4 space-y-2">
                                    <Button type="submit" className="w-full">
                                        {formData.publishImmediately ? (
                                            <>
                                                <Eye className="w-4 h-4 mr-2" />
                                                Create & Publish
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4 mr-2" />
                                                Save as Draft
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tips */}
                        <Card className="bg-blue-50 border-blue-200">
                            <CardContent className="pt-6">
                                <h4 className="font-semibold text-blue-900 mb-2">Tips</h4>
                                <ul className="text-sm text-blue-800 space-y-1">
                                    <li>• Add detailed descriptions for better visibility</li>
                                    <li>• Include all relevant amenities</li>
                                    <li>• Use accurate pricing for faster leads</li>
                                    <li>• Featured properties get more views</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateProperty;
