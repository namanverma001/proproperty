import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { Upload, Home, Building2, CheckCircle, ArrowRight } from "lucide-react";

const Sell = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: "",
    listingType: "sell",
    bedrooms: "",
    bathrooms: "",
    area: "",
    city: "",
    locality: "",
    address: "",
    price: "",
    title: "",
    description: "",
    amenities: [] as string[],
    ownerName: "",
    phone: "",
    email: "",
  });

  const amenitiesList = [
    "Swimming Pool", "Gym", "Power Backup", "24/7 Security", 
    "Covered Parking", "Garden", "Clubhouse", "Lift",
    "Children's Play Area", "Intercom", "Rainwater Harvesting", "CCTV"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your property has been submitted for review! Our team will contact you within 24 hours.");
    setStep(4);
  };

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-primary py-12 md:py-16">
          <div className="container-main text-center">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
              Sell or Rent Your Property
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              List your property with Pro Property and reach millions of potential buyers and tenants across India.
            </p>
          </div>
        </section>

        {/* Progress Steps */}
        <section className="bg-muted py-8">
          <div className="container-main">
            <div className="flex justify-center items-center gap-4 md:gap-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= s ? "bg-accent text-accent-foreground" : "bg-muted-foreground/20 text-muted-foreground"
                  }`}>
                    {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                  </div>
                  <span className={`hidden md:block ml-2 font-medium ${
                    step >= s ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {s === 1 && "Property Details"}
                    {s === 2 && "Location & Price"}
                    {s === 3 && "Contact Info"}
                  </span>
                  {s < 3 && <ArrowRight className="w-5 h-5 text-muted-foreground mx-4 hidden md:block" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="section-padding">
          <div className="container-main max-w-3xl">
            {step === 4 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-accent" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Property Submitted Successfully!</h2>
                <p className="text-muted-foreground mb-8">
                  Thank you for listing your property with Pro Property. Our team will review your submission and contact you within 24 hours.
                </p>
                <Button onClick={() => { setStep(1); setFormData({ ...formData, propertyType: "" }); }}>
                  List Another Property
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="bg-card rounded-xl p-6 md:p-8 shadow-card">
                  {/* Step 1: Property Details */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-foreground mb-6">Property Details</h2>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          type="button"
                          variant={formData.listingType === "sell" ? "default" : "outline"}
                          className="h-16"
                          onClick={() => setFormData({ ...formData, listingType: "sell" })}
                        >
                          <Home className="w-5 h-5 mr-2" />
                          Sell
                        </Button>
                        <Button
                          type="button"
                          variant={formData.listingType === "rent" ? "default" : "outline"}
                          className="h-16"
                          onClick={() => setFormData({ ...formData, listingType: "rent" })}
                        >
                          <Building2 className="w-5 h-5 mr-2" />
                          Rent
                        </Button>
                      </div>

                      <div>
                        <Label>Property Type *</Label>
                        <Select value={formData.propertyType} onValueChange={(v) => setFormData({ ...formData, propertyType: v })}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Apartment">Apartment</SelectItem>
                            <SelectItem value="Villa">Villa</SelectItem>
                            <SelectItem value="House">Independent House</SelectItem>
                            <SelectItem value="Commercial">Commercial</SelectItem>
                            <SelectItem value="Plot">Plot/Land</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <Label>Bedrooms</Label>
                          <Select value={formData.bedrooms} onValueChange={(v) => setFormData({ ...formData, bedrooms: v })}>
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5].map(n => (
                                <SelectItem key={n} value={n.toString()}>{n} BHK</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Bathrooms</Label>
                          <Select value={formData.bathrooms} onValueChange={(v) => setFormData({ ...formData, bathrooms: v })}>
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5].map(n => (
                                <SelectItem key={n} value={n.toString()}>{n}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Area (sq.ft) *</Label>
                          <Input 
                            className="mt-2" 
                            type="number" 
                            placeholder="e.g. 1500"
                            value={formData.area}
                            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Property Title *</Label>
                        <Input 
                          className="mt-2" 
                          placeholder="e.g. Spacious 3BHK Apartment in Prime Location"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          required
                        />
                      </div>

                      <div>
                        <Label>Description *</Label>
                        <Textarea 
                          className="mt-2" 
                          placeholder="Describe your property in detail..."
                          rows={4}
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          required
                        />
                      </div>

                      <div>
                        <Label className="mb-3 block">Amenities</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {amenitiesList.map((amenity) => (
                            <div key={amenity} className="flex items-center space-x-2">
                              <Checkbox 
                                id={amenity}
                                checked={formData.amenities.includes(amenity)}
                                onCheckedChange={() => toggleAmenity(amenity)}
                              />
                              <label htmlFor={amenity} className="text-sm text-foreground cursor-pointer">
                                {amenity}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end pt-4">
                        <Button type="button" onClick={() => setStep(2)} disabled={!formData.propertyType || !formData.area}>
                          Next: Location & Price
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Location & Price */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-foreground mb-6">Location & Price</h2>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>City *</Label>
                          <Select value={formData.city} onValueChange={(v) => setFormData({ ...formData, city: v })}>
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Select city" />
                            </SelectTrigger>
                            <SelectContent>
                              {["Mumbai", "Bangalore", "Delhi", "Gurgaon", "Hyderabad", "Pune", "Chennai"].map(city => (
                                <SelectItem key={city} value={city}>{city}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Locality *</Label>
                          <Input 
                            className="mt-2" 
                            placeholder="e.g. Bandra West"
                            value={formData.locality}
                            onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Complete Address *</Label>
                        <Textarea 
                          className="mt-2" 
                          placeholder="Enter complete address..."
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          required
                        />
                      </div>

                      <div>
                        <Label>Expected Price (₹) *</Label>
                        <Input 
                          className="mt-2" 
                          type="number" 
                          placeholder={formData.listingType === "rent" ? "e.g. 50000 (per month)" : "e.g. 10000000"}
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          required
                        />
                        <p className="text-sm text-muted-foreground mt-1">
                          {formData.listingType === "rent" ? "Enter monthly rent amount" : "Enter total price"}
                        </p>
                      </div>

                      <div>
                        <Label className="mb-3 block">Upload Photos</Label>
                        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent transition-colors cursor-pointer">
                          <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                          <p className="text-foreground font-medium">Click to upload photos</p>
                          <p className="text-sm text-muted-foreground mt-1">PNG, JPG up to 10MB each</p>
                        </div>
                      </div>

                      <div className="flex justify-between pt-4">
                        <Button type="button" variant="outline" onClick={() => setStep(1)}>
                          Back
                        </Button>
                        <Button type="button" onClick={() => setStep(3)} disabled={!formData.city || !formData.locality || !formData.price}>
                          Next: Contact Info
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Contact Info */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-foreground mb-6">Contact Information</h2>

                      <div>
                        <Label>Your Name *</Label>
                        <Input 
                          className="mt-2" 
                          placeholder="Enter your full name"
                          value={formData.ownerName}
                          onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                          required
                        />
                      </div>

                      <div>
                        <Label>Phone Number *</Label>
                        <Input 
                          className="mt-2" 
                          type="tel" 
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>

                      <div>
                        <Label>Email Address *</Label>
                        <Input 
                          className="mt-2" 
                          type="email" 
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>

                      <div className="flex items-start gap-2 p-4 bg-muted rounded-lg">
                        <Checkbox id="terms" required />
                        <label htmlFor="terms" className="text-sm text-muted-foreground">
                          I agree to the Terms of Service and Privacy Policy. I confirm that I am the owner or authorized to list this property.
                        </label>
                      </div>

                      <div className="flex justify-between pt-4">
                        <Button type="button" variant="outline" onClick={() => setStep(2)}>
                          Back
                        </Button>
                        <Button type="submit" className="bg-accent hover:bg-green-brand-light">
                          Submit Property
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Sell;
