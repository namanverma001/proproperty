import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";
import property7 from "@/assets/property-7.jpg";
import property8 from "@/assets/property-8.jpg";

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  priceUnit: string;
  location: string;
  city: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  areaUnit: string;
  type: "Apartment" | "Villa" | "House" | "Commercial" | "Plot" | "PG";
  listingType: "buy" | "rent";
  images: string[];
  amenities: string[];
  isFeatured: boolean;
  isNew: boolean;
  isVerified: boolean;
  postedDate: string;
  ownerName: string;
  ownerPhone: string;
  constructionStatus: string;
  furnishing: string;
  facing: string;
  floorNumber?: number;
  totalFloors?: number;
  parking: number;
  ageOfProperty: string;
}

export const properties: Property[] = [
  {
    id: "prop-001",
    title: "Luxury Penthouse with City View",
    description: "Experience unparalleled luxury in this stunning penthouse offering breathtaking panoramic city views. This meticulously designed residence features floor-to-ceiling windows, premium Italian marble flooring, and a state-of-the-art modular kitchen. The spacious living areas seamlessly blend with a private terrace, perfect for entertaining. Located in the heart of Bandra West, this property offers world-class amenities including a rooftop infinity pool, private gym, and 24/7 concierge services.",
    price: 25000000,
    priceUnit: "₹2.5 Cr",
    location: "Bandra West",
    city: "Mumbai",
    address: "Sea View Heights, 15th Floor, Turner Road, Bandra West, Mumbai 400050",
    bedrooms: 4,
    bathrooms: 4,
    area: 2800,
    areaUnit: "sq.ft",
    type: "Apartment",
    listingType: "buy",
    images: [property1, property5, property2],
    amenities: ["Swimming Pool", "Gym", "24/7 Security", "Power Backup", "Clubhouse", "Children's Play Area", "Covered Parking", "Intercom", "Lift", "Rainwater Harvesting"],
    isFeatured: true,
    isNew: false,
    isVerified: true,
    postedDate: "2025-12-28",
    ownerName: "Raj Malhotra",
    ownerPhone: "+91 98765 43210",
    constructionStatus: "Ready to Move",
    furnishing: "Fully Furnished",
    facing: "West",
    floorNumber: 15,
    totalFloors: 18,
    parking: 2,
    ageOfProperty: "2 Years",
  },
  {
    id: "prop-002",
    title: "Mediterranean Villa with Pool",
    description: "Exquisite Mediterranean-style villa set in a beautifully landscaped 5,500 sq.ft plot. This architectural masterpiece features hand-painted tiles, arched doorways, and custom woodwork throughout. The villa includes a stunning infinity pool, outdoor entertainment area, and a manicured garden. The gourmet kitchen, wine cellar, and home theater add to the luxurious lifestyle. Perfect for families seeking privacy and elegance in one of Bangalore's most prestigious neighborhoods.",
    price: 48000000,
    priceUnit: "₹4.8 Cr",
    location: "Whitefield",
    city: "Bangalore",
    address: "Palm Meadows Estate, Plot 42, ITPL Main Road, Whitefield, Bangalore 560066",
    bedrooms: 5,
    bathrooms: 5,
    area: 5500,
    areaUnit: "sq.ft",
    type: "Villa",
    listingType: "buy",
    images: [property2, property4, property6],
    amenities: ["Private Pool", "Garden", "Home Theater", "Wine Cellar", "Modular Kitchen", "Smart Home", "CCTV", "Solar Panels", "Servant Quarters", "Car Porch"],
    isFeatured: true,
    isNew: true,
    isVerified: true,
    postedDate: "2026-01-02",
    ownerName: "Priya Sharma",
    ownerPhone: "+91 98123 45678",
    constructionStatus: "Ready to Move",
    furnishing: "Semi-Furnished",
    facing: "East",
    parking: 4,
    ageOfProperty: "1 Year",
  },
  {
    id: "prop-003",
    title: "Premium Office Space - IT Park",
    description: "Prime Grade A office space in Cyber City's most prestigious IT park. This corner unit offers abundant natural light, efficient floor plate, and stunning views of the city skyline. Features include raised flooring, centralized AC, fire safety systems, and high-speed elevator access. Ideal for tech companies, startups, or corporate offices seeking a premium address with excellent connectivity to metro and major highways.",
    price: 8500000,
    priceUnit: "₹85 Lac",
    location: "Cyber City",
    city: "Gurgaon",
    address: "DLF Cyber Hub, Tower C, 8th Floor, Sector 24, Gurgaon 122002",
    bedrooms: 0,
    bathrooms: 2,
    area: 1200,
    areaUnit: "sq.ft",
    type: "Commercial",
    listingType: "buy",
    images: [property3, property7],
    amenities: ["Central AC", "Power Backup", "24/7 Security", "Cafeteria", "Conference Room", "High-Speed Lift", "Fire Safety", "Visitor Parking", "Metro Connectivity"],
    isFeatured: false,
    isNew: false,
    isVerified: true,
    postedDate: "2025-12-20",
    ownerName: "Vikram Enterprises",
    ownerPhone: "+91 98456 78901",
    constructionStatus: "Ready to Move",
    furnishing: "Bare Shell",
    facing: "North-East",
    floorNumber: 8,
    totalFloors: 15,
    parking: 2,
    ageOfProperty: "3 Years",
  },
  {
    id: "prop-004",
    title: "Charming Family Home",
    description: "A delightful 3-bedroom independent house in the vibrant neighborhood of Koramangala. This charming home features a traditional brick exterior with modern interiors, a cozy living room with fireplace, and a beautiful backyard perfect for family gatherings. The house has been lovingly maintained and includes updated electrical and plumbing systems. Walking distance to top schools, restaurants, and shopping centers.",
    price: 12000000,
    priceUnit: "₹1.2 Cr",
    location: "Koramangala",
    city: "Bangalore",
    address: "4th Block, 12th Main Road, Koramangala, Bangalore 560034",
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    areaUnit: "sq.ft",
    type: "House",
    listingType: "buy",
    images: [property4, property6, property1],
    amenities: ["Garden", "Covered Parking", "Power Backup", "Borewell", "Terrace", "Modular Kitchen"],
    isFeatured: false,
    isNew: true,
    isVerified: true,
    postedDate: "2026-01-01",
    ownerName: "Dr. Suresh Kumar",
    ownerPhone: "+91 99887 65432",
    constructionStatus: "Ready to Move",
    furnishing: "Semi-Furnished",
    facing: "South",
    parking: 2,
    ageOfProperty: "10 Years",
  },
  {
    id: "prop-005",
    title: "Modern High-Rise Apartment",
    description: "Contemporary 3BHK apartment in a premium high-rise tower with world-class amenities. Enjoy stunning skyline views from your private balcony. Features include modular kitchen with chimney, wooden flooring in bedrooms, and designer bathrooms. The society offers club facilities, swimming pool, and landscaped gardens. Excellent connectivity to business districts and entertainment hubs.",
    price: 18500000,
    priceUnit: "₹1.85 Cr",
    location: "Powai",
    city: "Mumbai",
    address: "Hiranandani Gardens, Everest Tower, 22nd Floor, Powai, Mumbai 400076",
    bedrooms: 3,
    bathrooms: 3,
    area: 1650,
    areaUnit: "sq.ft",
    type: "Apartment",
    listingType: "buy",
    images: [property5, property1, property3],
    amenities: ["Swimming Pool", "Gym", "Clubhouse", "Jogging Track", "Children's Play Area", "24/7 Security", "Power Backup", "Covered Parking", "Multipurpose Hall"],
    isFeatured: true,
    isNew: false,
    isVerified: true,
    postedDate: "2025-12-25",
    ownerName: "Anita Desai",
    ownerPhone: "+91 98765 12345",
    constructionStatus: "Ready to Move",
    furnishing: "Unfurnished",
    facing: "North",
    floorNumber: 22,
    totalFloors: 35,
    parking: 1,
    ageOfProperty: "5 Years",
  },
  {
    id: "prop-006",
    title: "Elegant Townhouse with Garden",
    description: "Beautifully designed 4-bedroom townhouse in an exclusive gated community. This property features a private garden, rooftop terrace, and basement parking. The interiors boast high ceilings, large windows, and premium finishes. The community offers 24/7 security, clubhouse, and children's play area. Ideal for families seeking space and privacy without compromising on urban conveniences.",
    price: 32000000,
    priceUnit: "₹3.2 Cr",
    location: "Sector 54",
    city: "Gurgaon",
    address: "Nirvana Country, Villa 128, Sector 54, Gurgaon 122011",
    bedrooms: 4,
    bathrooms: 4,
    area: 3200,
    areaUnit: "sq.ft",
    type: "Villa",
    listingType: "buy",
    images: [property6, property2, property4],
    amenities: ["Private Garden", "Terrace", "Basement Parking", "Clubhouse", "Swimming Pool", "Tennis Court", "24/7 Security", "Power Backup", "Servant Quarters"],
    isFeatured: true,
    isNew: false,
    isVerified: true,
    postedDate: "2025-12-15",
    ownerName: "Rajesh Gupta",
    ownerPhone: "+91 98234 56789",
    constructionStatus: "Ready to Move",
    furnishing: "Fully Furnished",
    facing: "East",
    parking: 3,
    ageOfProperty: "4 Years",
  },
  {
    id: "prop-007",
    title: "Premium Retail Space",
    description: "High-visibility retail space in a bustling commercial complex. This corner shop offers excellent footfall and is perfect for showrooms, boutiques, or cafes. Features include large glass frontage, high ceilings, centralized AC, and ample parking for customers. Located near metro station with easy access to main roads.",
    price: 15000000,
    priceUnit: "₹1.5 Cr",
    location: "Connaught Place",
    city: "Delhi",
    address: "Block M, Inner Circle, Connaught Place, New Delhi 110001",
    bedrooms: 0,
    bathrooms: 1,
    area: 800,
    areaUnit: "sq.ft",
    type: "Commercial",
    listingType: "buy",
    images: [property7, property3],
    amenities: ["Glass Frontage", "Central AC", "Power Backup", "Visitor Parking", "Security", "Loading Bay", "Metro Connectivity"],
    isFeatured: false,
    isNew: false,
    isVerified: true,
    postedDate: "2025-12-10",
    ownerName: "Capital Properties Ltd",
    ownerPhone: "+91 98111 22334",
    constructionStatus: "Ready to Move",
    furnishing: "Bare Shell",
    facing: "South",
    floorNumber: 0,
    totalFloors: 3,
    parking: 4,
    ageOfProperty: "15 Years",
  },
  {
    id: "prop-008",
    title: "Residential Plot - Prime Location",
    description: "Premium residential plot in a rapidly developing area with excellent appreciation potential. The plot is suitable for constructing an independent house or villa. All utilities including water, electricity, and sewage connections are available. The locality features wide roads, parks, and is close to reputed schools and hospitals. Perfect investment opportunity for those looking to build their dream home.",
    price: 9500000,
    priceUnit: "₹95 Lac",
    location: "Electronic City",
    city: "Bangalore",
    address: "Phase 2, Survey No. 156, Electronic City, Bangalore 560100",
    bedrooms: 0,
    bathrooms: 0,
    area: 2400,
    areaUnit: "sq.ft",
    type: "Plot",
    listingType: "buy",
    images: [property8],
    amenities: ["Corner Plot", "Wide Road", "Water Connection", "Electricity", "Sewage", "Near Schools", "Near Hospital", "Gated Community"],
    isFeatured: false,
    isNew: true,
    isVerified: true,
    postedDate: "2025-12-30",
    ownerName: "Srinivas Reddy",
    ownerPhone: "+91 99001 23456",
    constructionStatus: "NA",
    furnishing: "NA",
    facing: "North-West",
    parking: 0,
    ageOfProperty: "NA",
  },
  {
    id: "prop-009",
    title: "Spacious 2BHK for Rent - Furnished",
    description: "Well-maintained 2BHK apartment available for rent in a prime location. The apartment is fully furnished with quality furniture, AC in all rooms, washing machine, and a fully equipped kitchen. The society offers excellent amenities including gym, pool, and children's play area. Walking distance to metro station and shopping malls. Ideal for working professionals or small families.",
    price: 45000,
    priceUnit: "₹45,000/month",
    location: "HSR Layout",
    city: "Bangalore",
    address: "Sector 5, Brigade Lakefront, HSR Layout, Bangalore 560102",
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    areaUnit: "sq.ft",
    type: "Apartment",
    listingType: "rent",
    images: [property1, property5],
    amenities: ["Fully Furnished", "AC", "Washing Machine", "Modular Kitchen", "Gym", "Swimming Pool", "24/7 Security", "Covered Parking", "Power Backup"],
    isFeatured: true,
    isNew: true,
    isVerified: true,
    postedDate: "2026-01-03",
    ownerName: "Kavitha Nair",
    ownerPhone: "+91 98765 09876",
    constructionStatus: "Ready to Move",
    furnishing: "Fully Furnished",
    facing: "East",
    floorNumber: 12,
    totalFloors: 20,
    parking: 1,
    ageOfProperty: "3 Years",
  },
  {
    id: "prop-010",
    title: "3BHK Apartment in Gated Society",
    description: "Bright and airy 3BHK apartment in one of Pune's most sought-after gated communities. Features include a large living room, modern kitchen, and spacious bedrooms with attached bathrooms. The society is known for its excellent maintenance, lush greenery, and family-friendly environment. Close to IT hubs, schools, and hospitals.",
    price: 9800000,
    priceUnit: "₹98 Lac",
    location: "Wakad",
    city: "Pune",
    address: "Blue Ridge Township, Tower D, 9th Floor, Wakad, Pune 411057",
    bedrooms: 3,
    bathrooms: 2,
    area: 1450,
    areaUnit: "sq.ft",
    type: "Apartment",
    listingType: "buy",
    images: [property5, property1, property6],
    amenities: ["Swimming Pool", "Gym", "Clubhouse", "Garden", "Children's Play Area", "Jogging Track", "24/7 Security", "Covered Parking"],
    isFeatured: false,
    isNew: false,
    isVerified: true,
    postedDate: "2025-12-18",
    ownerName: "Sandeep Joshi",
    ownerPhone: "+91 98222 33444",
    constructionStatus: "Ready to Move",
    furnishing: "Semi-Furnished",
    facing: "South-East",
    floorNumber: 9,
    totalFloors: 14,
    parking: 1,
    ageOfProperty: "6 Years",
  },
  {
    id: "prop-011",
    title: "Luxury Villa for Rent",
    description: "Stunning 4-bedroom villa available for rent in an upscale gated community. The villa features a private swimming pool, landscaped garden, and modern interiors. All bedrooms have attached bathrooms and built-in wardrobes. The fully equipped kitchen includes all appliances. Perfect for expats or families seeking a premium lifestyle.",
    price: 150000,
    priceUnit: "₹1.5 Lac/month",
    location: "Jubilee Hills",
    city: "Hyderabad",
    address: "Road No. 45, Jubilee Hills, Hyderabad 500033",
    bedrooms: 4,
    bathrooms: 4,
    area: 4000,
    areaUnit: "sq.ft",
    type: "Villa",
    listingType: "rent",
    images: [property2, property6, property4],
    amenities: ["Private Pool", "Garden", "Fully Furnished", "AC", "Modular Kitchen", "24/7 Security", "Servant Quarters", "Car Parking"],
    isFeatured: true,
    isNew: false,
    isVerified: true,
    postedDate: "2025-12-22",
    ownerName: "Lakshmi Properties",
    ownerPhone: "+91 98765 55555",
    constructionStatus: "Ready to Move",
    furnishing: "Fully Furnished",
    facing: "North",
    parking: 3,
    ageOfProperty: "5 Years",
  },
  {
    id: "prop-012",
    title: "Office Space for Rent - Furnished",
    description: "Ready-to-move fully furnished office space available for rent. The office includes workstations, meeting room, pantry, and reception area. High-speed internet connectivity and 24/7 power backup included. Ideal for startups or small businesses looking for a hassle-free setup.",
    price: 75000,
    priceUnit: "₹75,000/month",
    location: "Indiranagar",
    city: "Bangalore",
    address: "100 Feet Road, Indiranagar, Bangalore 560038",
    bedrooms: 0,
    bathrooms: 2,
    area: 1500,
    areaUnit: "sq.ft",
    type: "Commercial",
    listingType: "rent",
    images: [property3, property7],
    amenities: ["Fully Furnished", "Workstations", "Meeting Room", "Pantry", "High-Speed Internet", "Power Backup", "24/7 Access", "Parking"],
    isFeatured: false,
    isNew: true,
    isVerified: true,
    postedDate: "2026-01-02",
    ownerName: "WorkSpace Solutions",
    ownerPhone: "+91 98765 66666",
    constructionStatus: "Ready to Move",
    furnishing: "Fully Furnished",
    facing: "West",
    floorNumber: 3,
    totalFloors: 5,
    parking: 4,
    ageOfProperty: "8 Years",
  },
];

export const cities = [
  "Mumbai",
  "Bangalore",
  "Delhi",
  "Gurgaon",
  "Hyderabad",
  "Pune",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Noida",
];

export const propertyTypes = [
  "Apartment",
  "Villa",
  "House",
  "Commercial",
  "Plot",
  "PG",
];

export const budgetRanges = [
  { label: "Under ₹50 Lac", min: 0, max: 5000000 },
  { label: "₹50 Lac - ₹1 Cr", min: 5000000, max: 10000000 },
  { label: "₹1 Cr - ₹2 Cr", min: 10000000, max: 20000000 },
  { label: "₹2 Cr - ₹5 Cr", min: 20000000, max: 50000000 },
  { label: "Above ₹5 Cr", min: 50000000, max: Infinity },
];

export const rentRanges = [
  { label: "Under ₹25,000", min: 0, max: 25000 },
  { label: "₹25,000 - ₹50,000", min: 25000, max: 50000 },
  { label: "₹50,000 - ₹1 Lac", min: 50000, max: 100000 },
  { label: "₹1 Lac - ₹2 Lac", min: 100000, max: 200000 },
  { label: "Above ₹2 Lac", min: 200000, max: Infinity },
];

export const bedroomOptions = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"];

export const getPropertyById = (id: string): Property | undefined => {
  return properties.find((p) => p.id === id);
};

export const filterProperties = (
  filters: {
    city?: string;
    type?: string;
    listingType?: "buy" | "rent";
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    searchQuery?: string;
  }
): Property[] => {
  return properties.filter((property) => {
    if (filters.city && property.city !== filters.city) return false;
    if (filters.type && property.type !== filters.type) return false;
    if (filters.listingType && property.listingType !== filters.listingType) return false;
    if (filters.minPrice && property.price < filters.minPrice) return false;
    if (filters.maxPrice && property.price > filters.maxPrice) return false;
    if (filters.bedrooms && property.bedrooms !== filters.bedrooms) return false;
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      return (
        property.title.toLowerCase().includes(query) ||
        property.location.toLowerCase().includes(query) ||
        property.city.toLowerCase().includes(query)
      );
    }
    return true;
  });
};
