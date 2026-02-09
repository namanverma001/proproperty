# User Section Form Payloads

Here are the JSON payloads for every form in the user section of the website.

## 1. Contact Us Form
**Location:** `src/pages/Contact.tsx`
**Purpose:** General enquiries.

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+91 98765 43210",
  "subject": "Inquiry about services",
  "message": "I would like to know more about your property management services."
}
```

## 2. Buy Requirement Form
**Location:** `src/pages/Buy.tsx`
**Purpose:** Users looking to buy property.

```json
{
  "name": "Jane Smith",
  "phone": "+91 98765 43211",
  "email": "jane.smith@example.com",
  "requirementType": "buy",
  "propertyCategory": "residential",
  "preferredCity": "Mumbai",
  "preferredAreas": ["Bandra", "Andheri West"],
  "propertyTypes": ["Apartment", "Villa"],
  "bedroomsMin": 2,
  "bedroomsMax": 3,
  "budgetMin": 15000000,
  "budgetMax": 25000000,
  "areaMin": 800,
  "areaMax": 1500,
  "constructionStatus": "Ready to Move",
  "preferredAmenities": ["Gym", "Swimming Pool"],
  "additionalNotes": "Looking for sea facing property."
}
```

## 3. Rent Requirement Form
**Location:** `src/pages/Rent.tsx`
**Purpose:** Users looking to rent property.

```json
{
  "name": "Robert Brown",
  "phone": "+91 98765 43212",
  "email": "robert.brown@example.com",
  "requirementType": "rent",
  "propertyCategory": "residential",
  "preferredCity": "Pune",
  "preferredAreas": ["Koregaon Park", "Viman Nagar"],
  "propertyTypes": ["Apartment"],
  "bedroomsMin": 1,
  "bedroomsMax": 2,
  "budgetMin": 20000,
  "budgetMax": 35000,
  "areaMin": 500,
  "areaMax": 1000,
  "constructionStatus": "Fully Furnished",
  "preferredAmenities": ["Power Backup", "Security"],
  "additionalNotes": "Need pet friendly society."
}
```

## 4. Property Enquiry Form
**Location:** `src/pages/PropertyDetail.tsx`
**Purpose:** Inquiring about a specific property.

```json
{
  "name": "Alice Johnson",
  "phone": "+91 98765 43213",
  "email": "alice.johnson@example.com",
  "message": "I am interested in this property. Please contact me."
}
```

## 5. Sell Residential Form
**Location:** `src/pages/forms/SellResidentialForm.tsx`
**Purpose:** Listing residential property for sale.

```json
{
  "title": "Luxury 3BHK Apartment in South Mumbai",
  "description": "Spacious apartment with sea view, modern amenities, and ample parking.",
  "price": 45000000,
  "priceUnit": "₹4.50 Cr",
  "city": "Mumbai",
  "location": "Worli",
  "address": "Ocean Towers, Worli Sea Face",
  "pincode": "400018",
  "type": "Apartment",
  "bedrooms": 3,
  "bathrooms": 3,
  "area": 1800,
  "areaUnit": "sq.ft",
  "listingType": "buy",
  "listingCategory": "sell",
  "propertyCategory": "residential",
  "amenities": ["Gym", "Swimming Pool", "Clubhouse", "24/7 Security"],
  "images": ["data:image/jpeg;base64,..."],
  "constructionStatus": "Ready to Move",
  "furnishing": "Semi-Furnished",
  "facing": "West",
  "floorNumber": 15,
  "totalFloors": 40,
  "parking": 2,
  "ageOfProperty": "1-3 years",
  "ownerName": "Michael Scott",
  "ownerPhone": "+91 98765 43214",
  "ownerEmail": "michael.scott@example.com",
  "isFeatured": false,
  "isNew": true,
  "isVerified": false
}
```

## 6. Sell Commercial Form
**Location:** `src/pages/forms/SellCommercialForm.tsx`
**Purpose:** Listing commercial property for sale.

```json
{
  "title": "Premium Office Space in BKC",
  "description": "Grade A office space suitable for MNCs.",
  "price": 85000000,
  "priceUnit": "₹8.50 Cr",
  "city": "Mumbai",
  "location": "Bandra Kurla Complex",
  "address": "The Capital, BKC",
  "pincode": "400051",
  "type": "Office",
  "bedrooms": 0,
  "bathrooms": 2,
  "area": 2500,
  "areaUnit": "sq.ft",
  "listingType": "buy",
  "listingCategory": "sell",
  "propertyCategory": "commercial",
  "amenities": ["Central AC", "Power Backup", "Conference Room", "Cafeteria"],
  "images": ["data:image/jpeg;base64,..."],
  "constructionStatus": "Ready to Move",
  "furnishing": "Bare Shell",
  "facing": "North",
  "floorNumber": 5,
  "totalFloors": 12,
  "parking": 4,
  "ageOfProperty": "new",
  "ownerName": "Dwight Schrute",
  "ownerPhone": "+91 98765 43215",
  "ownerEmail": "dwight.schrute@example.com",
  "isFeatured": false,
  "isNew": true,
  "isVerified": false
}
```

## 7. Lease Residential Form
**Location:** `src/pages/forms/LeaseResidentialForm.tsx`
**Purpose:** Listing residential property for rent/lease.

```json
{
  "title": "Cozy 1BHK in Indiranagar",
  "description": "Fully furnished apartment near metro station.",
  "price": 25000,
  "priceUnit": "₹25,000/month",
  "city": "Bangalore",
  "location": "Indiranagar",
  "address": "12th Main, Indiranagar",
  "pincode": "560038",
  "type": "Apartment",
  "bedrooms": 1,
  "bathrooms": 1,
  "area": 600,
  "areaUnit": "sq.ft",
  "listingType": "rent",
  "listingCategory": "lease",
  "propertyCategory": "residential",
  "amenities": ["Power Backup", "Lift"],
  "images": ["data:image/jpeg;base64,..."],
  "constructionStatus": "Ready to Move",
  "furnishing": "Fully Furnished",
  "facing": "East",
  "floorNumber": 2,
  "totalFloors": 4,
  "parking": 1,
  "ageOfProperty": "5-10 years",
  "ownerName": "Jim Halpert",
  "ownerPhone": "+91 98765 43216",
  "ownerEmail": "jim.halpert@example.com",
  "securityDeposit": 100000,
  "maintenanceCharges": 2000,
  "isFeatured": false,
  "isNew": true,
  "isVerified": false
}
```

## 8. Lease Commercial Form
**Location:** `src/pages/forms/LeaseCommercialForm.tsx`
**Purpose:** Listing commercial property for rent/lease.

```json
{
  "title": "Retail Shop in Mall",
  "description": "High footfall utility shop available for lease.",
  "price": 50000,
  "priceUnit": "₹50,000/month",
  "city": "Delhi",
  "location": "Vasant Kunj",
  "address": "Ambience Mall, Vasant Kunj",
  "pincode": "110070",
  "type": "Shop",
  "bedrooms": 0,
  "bathrooms": 1,
  "area": 400,
  "areaUnit": "sq.ft",
  "listingType": "rent",
  "listingCategory": "lease",
  "propertyCategory": "commercial",
  "amenities": ["Central AC", "24/7 Security", "Fire Safety"],
  "images": ["data:image/jpeg;base64,..."],
  "constructionStatus": "Ready to Move",
  "furnishing": "Semi-Furnished",
  "facing": "NA",
  "floorNumber": 1,
  "totalFloors": 3,
  "parking": 0,
  "ageOfProperty": "3-5 years",
  "ownerName": "Pam Beesly",
  "ownerPhone": "+91 98765 43217",
  "ownerEmail": "pam.beesly@example.com",
  "securityDeposit": 300000,
  "maintenanceCharges": 5000,
  "isFeatured": false,
  "isNew": true,
  "isVerified": false
}
```
