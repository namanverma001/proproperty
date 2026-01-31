import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Property status types
export type PropertyStatus = 'pending' | 'approved' | 'rejected' | 'published' | 'deleted';
export type PropertySource = 'admin' | 'user-submission';
export type ListingCategory = 'sell' | 'lease';
export type PropertyCategory = 'residential' | 'commercial';

// Submission interface for user-submitted properties
export interface PropertySubmission {
  id: string;
  // Basic Info
  title: string;
  description: string;
  price: number;
  priceUnit: string;

  // Location
  location: string;
  city: string;
  address: string;
  pincode: string;

  // Property Details
  bedrooms: number;
  bathrooms: number;
  area: number;
  areaUnit: string;
  type: 'Apartment' | 'Villa' | 'House' | 'Commercial' | 'Plot' | 'PG' | 'Office' | 'Shop' | 'Warehouse' | 'Showroom';

  // Listing Info
  listingType: 'buy' | 'rent';
  listingCategory: ListingCategory;
  propertyCategory: PropertyCategory;

  // Additional Details
  amenities: string[];
  images: string[]; // Base64 encoded images
  constructionStatus: string;
  furnishing: string;
  facing: string;
  floorNumber?: number;
  totalFloors?: number;
  parking: number;
  ageOfProperty: string;

  // Owner Info
  ownerName: string;
  ownerPhone: string;
  ownerEmail?: string;

  // For rent/lease
  securityDeposit?: number;
  maintenanceCharges?: number;

  // Status & Metadata
  status: PropertyStatus;
  source: PropertySource;
  isFeatured: boolean;
  isNew: boolean;
  isVerified: boolean;
  submittedDate: string;
  approvedDate?: string;
  publishedDate?: string;
  adminNotes?: string;
}

// Master data interfaces
export interface Location {
  id: string;
  city: string;
  areas: string[];
  isActive: boolean;
}

export interface PropertyType {
  id: string;
  name: string;
  category: PropertyCategory;
  isActive: boolean;
}

export interface Amenity {
  id: string;
  name: string;
  icon?: string;
  isActive: boolean;
}

// Buyer/Renter requirement interface
export type RequirementType = 'buy' | 'rent';
export type RequirementStatus = 'pending' | 'contacted' | 'closed' | 'deleted';

export interface BuyerRequirement {
  id: string;
  // Contact Info
  name: string;
  phone: string;
  email?: string;

  // Requirement Type
  requirementType: RequirementType;
  propertyCategory: PropertyCategory;

  // Property Preferences
  preferredCity: string;
  preferredAreas: string[];
  propertyTypes: string[]; // e.g., ['Apartment', 'Villa']

  // For Residential
  bedroomsMin?: number;
  bedroomsMax?: number;

  // Budget
  budgetMin?: number;
  budgetMax?: number;

  // Area
  areaMin?: number;
  areaMax?: number;

  // Additional Preferences
  preferredAmenities: string[];
  constructionStatus?: string; // Ready to Move, Under Construction, etc.
  additionalNotes?: string;

  // Metadata
  status: RequirementStatus;
  submittedDate: string;
  contactedDate?: string;
  closedDate?: string;
  adminNotes?: string;
}

// Store state interface
interface PropertyStoreState {
  // Properties
  submissions: PropertySubmission[];

  // Buyer Requirements
  buyerRequirements: BuyerRequirement[];

  // Master Data
  locations: Location[];
  propertyTypes: PropertyType[];
  amenities: Amenity[];

  // Actions - Submissions
  addSubmission: (submission: Omit<PropertySubmission, 'id' | 'submittedDate' | 'status' | 'source'>) => void;
  updateSubmission: (id: string, updates: Partial<PropertySubmission>) => void;
  deleteSubmission: (id: string) => void;
  approveSubmission: (id: string, notes?: string) => void;
  rejectSubmission: (id: string, notes?: string) => void;
  publishSubmission: (id: string) => void;
  unpublishSubmission: (id: string) => void;

  // Actions - Buyer Requirements
  addBuyerRequirement: (requirement: Omit<BuyerRequirement, 'id' | 'submittedDate' | 'status'>) => void;
  updateBuyerRequirement: (id: string, updates: Partial<BuyerRequirement>) => void;
  deleteBuyerRequirement: (id: string) => void;
  markRequirementContacted: (id: string, notes?: string) => void;
  markRequirementClosed: (id: string, notes?: string) => void;
  getPendingRequirements: (type?: RequirementType) => BuyerRequirement[];


  // Actions - Admin Create
  createAdminProperty: (property: Omit<PropertySubmission, 'id' | 'submittedDate' | 'source'>) => void;

  // Getters
  getPublishedProperties: () => PropertySubmission[];
  getPendingSubmissions: (category?: ListingCategory) => PropertySubmission[];
  getPropertyById: (id: string) => PropertySubmission | undefined;
  getAllProperties: () => PropertySubmission[];
  getAllSubmissions: () => PropertySubmission[];
  getAllRequirements: () => BuyerRequirement[];

  // Master Data Actions
  addLocation: (location: Omit<Location, 'id'>) => void;
  updateLocation: (id: string, updates: Partial<Location>) => void;
  deleteLocation: (id: string) => void;

  addPropertyType: (type: Omit<PropertyType, 'id'>) => void;
  updatePropertyType: (id: string, updates: Partial<PropertyType>) => void;
  deletePropertyType: (id: string) => void;

  addAmenity: (amenity: Omit<Amenity, 'id'>) => void;
  updateAmenity: (id: string, updates: Partial<Amenity>) => void;
  deleteAmenity: (id: string) => void;

  // Stats
  getStats: () => {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
    published: number;
    pendingSell: number;
    pendingLease: number;
    pendingBuyRequirements: number;
    pendingRentRequirements: number;
  };
}

// Generate unique ID
const generateId = () => `prop-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Default master data
const defaultLocations: Location[] = [
  { id: 'loc-1', city: 'Mumbai', areas: ['Bandra West', 'Powai', 'Andheri', 'Juhu', 'Worli'], isActive: true },
  { id: 'loc-2', city: 'Bangalore', areas: ['Whitefield', 'Koramangala', 'HSR Layout', 'Indiranagar', 'Electronic City'], isActive: true },
  { id: 'loc-3', city: 'Delhi', areas: ['Connaught Place', 'Dwarka', 'Vasant Kunj', 'Greater Kailash', 'Rohini'], isActive: true },
  { id: 'loc-4', city: 'Gurgaon', areas: ['Cyber City', 'Sector 54', 'Golf Course Road', 'Sohna Road', 'MG Road'], isActive: true },
  { id: 'loc-5', city: 'Hyderabad', areas: ['Jubilee Hills', 'Banjara Hills', 'Gachibowli', 'Madhapur', 'Kondapur'], isActive: true },
  { id: 'loc-6', city: 'Pune', areas: ['Wakad', 'Hinjewadi', 'Baner', 'Kharadi', 'Koregaon Park'], isActive: true },
];

const defaultPropertyTypes: PropertyType[] = [
  { id: 'type-1', name: 'Apartment', category: 'residential', isActive: true },
  { id: 'type-2', name: 'Villa', category: 'residential', isActive: true },
  { id: 'type-3', name: 'House', category: 'residential', isActive: true },
  { id: 'type-4', name: 'PG', category: 'residential', isActive: true },
  { id: 'type-5', name: 'Office', category: 'commercial', isActive: true },
  { id: 'type-6', name: 'Shop', category: 'commercial', isActive: true },
  { id: 'type-7', name: 'Warehouse', category: 'commercial', isActive: true },
  { id: 'type-8', name: 'Showroom', category: 'commercial', isActive: true },
  { id: 'type-9', name: 'Plot', category: 'residential', isActive: true },
];

const defaultAmenities: Amenity[] = [
  { id: 'am-1', name: 'Swimming Pool', isActive: true },
  { id: 'am-2', name: 'Gym', isActive: true },
  { id: 'am-3', name: '24/7 Security', isActive: true },
  { id: 'am-4', name: 'Power Backup', isActive: true },
  { id: 'am-5', name: 'Covered Parking', isActive: true },
  { id: 'am-6', name: 'Lift', isActive: true },
  { id: 'am-7', name: 'Clubhouse', isActive: true },
  { id: 'am-8', name: 'Children\'s Play Area', isActive: true },
  { id: 'am-9', name: 'Garden', isActive: true },
  { id: 'am-10', name: 'Intercom', isActive: true },
  { id: 'am-11', name: 'CCTV', isActive: true },
  { id: 'am-12', name: 'Fire Safety', isActive: true },
  { id: 'am-13', name: 'Rainwater Harvesting', isActive: true },
  { id: 'am-14', name: 'Modular Kitchen', isActive: true },
  { id: 'am-15', name: 'AC', isActive: true },
];

// Create context
const PropertyStoreContext = createContext<PropertyStoreState | undefined>(undefined);

// Storage keys - Using localStorage for persistent storage
const STORAGE_KEYS = {
  submissions: 'proproperty_submissions',
  buyerRequirements: 'proproperty_buyer_requirements',
  locations: 'proproperty_locations',
  propertyTypes: 'proproperty_property_types',
  amenities: 'proproperty_amenities',
};

// Helper function to load from localStorage
const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      console.log(`[PropertyStore] Loaded ${key} from localStorage`);
      return JSON.parse(stored);
    }
    return defaultValue;
  } catch (e) {
    console.error(`[PropertyStore] Error loading ${key}:`, e);
    return defaultValue;
  }
};

// Helper function to save to localStorage
const saveToStorage = (key: string, value: any): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    console.log(`[PropertyStore] Saved ${key} to localStorage:`, Array.isArray(value) ? `${value.length} items` : 'data');
  } catch (e) {
    console.error(`[PropertyStore] Error saving ${key}:`, e);
  }
};

// Provider component
export const PropertyStoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from sessionStorage synchronously
  const [submissions, setSubmissions] = useState<PropertySubmission[]>(
    () => loadFromStorage(STORAGE_KEYS.submissions, [])
  );
  const [locations, setLocations] = useState<Location[]>(
    () => loadFromStorage(STORAGE_KEYS.locations, defaultLocations)
  );
  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>(
    () => loadFromStorage(STORAGE_KEYS.propertyTypes, defaultPropertyTypes)
  );
  const [amenities, setAmenities] = useState<Amenity[]>(
    () => loadFromStorage(STORAGE_KEYS.amenities, defaultAmenities)
  );
  const [buyerRequirements, setBuyerRequirements] = useState<BuyerRequirement[]>(
    () => loadFromStorage(STORAGE_KEYS.buyerRequirements, [])
  );

  // Save to sessionStorage whenever submissions change
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.submissions, submissions);
  }, [submissions]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.locations, locations);
  }, [locations]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.propertyTypes, propertyTypes);
  }, [propertyTypes]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.amenities, amenities);
  }, [amenities]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.buyerRequirements, buyerRequirements);
  }, [buyerRequirements]);

  // Submission actions
  const addSubmission = (submission: Omit<PropertySubmission, 'id' | 'submittedDate' | 'status' | 'source'>) => {
    const newSubmission: PropertySubmission = {
      ...submission,
      id: generateId(),
      submittedDate: new Date().toISOString(),
      status: 'pending',
      source: 'user-submission',
    };
    console.log('[PropertyStore] Adding new submission:', newSubmission.title);
    setSubmissions(prev => {
      const updated = [...prev, newSubmission];
      // Immediately save to sessionStorage
      saveToStorage(STORAGE_KEYS.submissions, updated);
      return updated;
    });
  };

  const updateSubmission = (id: string, updates: Partial<PropertySubmission>) => {
    setSubmissions(prev => {
      const updated = prev.map(sub => sub.id === id ? { ...sub, ...updates } : sub);
      saveToStorage(STORAGE_KEYS.submissions, updated);
      return updated;
    });
  };

  const deleteSubmission = (id: string) => {
    setSubmissions(prev => {
      const updated = prev.map(sub =>
        sub.id === id ? {
          ...sub,
          status: 'deleted' as PropertyStatus,
        } : sub
      );
      saveToStorage(STORAGE_KEYS.submissions, updated);
      return updated;
    });
  };

  const approveSubmission = (id: string, notes?: string) => {
    setSubmissions(prev => {
      const updated = prev.map(sub =>
        sub.id === id ? {
          ...sub,
          status: 'approved' as PropertyStatus,
          approvedDate: new Date().toISOString(),
          adminNotes: notes || sub.adminNotes
        } : sub
      );
      saveToStorage(STORAGE_KEYS.submissions, updated);
      return updated;
    });
  };

  const rejectSubmission = (id: string, notes?: string) => {
    setSubmissions(prev => {
      const updated = prev.map(sub =>
        sub.id === id ? {
          ...sub,
          status: 'rejected' as PropertyStatus,
          adminNotes: notes || sub.adminNotes
        } : sub
      );
      saveToStorage(STORAGE_KEYS.submissions, updated);
      return updated;
    });
  };

  const publishSubmission = (id: string) => {
    setSubmissions(prev => {
      const updated = prev.map(sub =>
        sub.id === id ? {
          ...sub,
          status: 'published' as PropertyStatus,
          publishedDate: new Date().toISOString(),
        } : sub
      );
      saveToStorage(STORAGE_KEYS.submissions, updated);
      return updated;
    });
  };

  const unpublishSubmission = (id: string) => {
    setSubmissions(prev => {
      const updated = prev.map(sub =>
        sub.id === id ? {
          ...sub,
          status: 'approved' as PropertyStatus,
          publishedDate: undefined,
        } : sub
      );
      saveToStorage(STORAGE_KEYS.submissions, updated);
      return updated;
    });
  };

  const createAdminProperty = (property: Omit<PropertySubmission, 'id' | 'submittedDate' | 'source'>) => {
    const newProperty: PropertySubmission = {
      ...property,
      id: generateId(),
      submittedDate: new Date().toISOString(),
      source: 'admin',
    };
    setSubmissions(prev => {
      const updated = [...prev, newProperty];
      saveToStorage(STORAGE_KEYS.submissions, updated);
      return updated;
    });
  };

  // Getters
  const getPublishedProperties = () => {
    return submissions.filter(sub => sub.status === 'published');
  };

  const getPendingSubmissions = (category?: ListingCategory) => {
    return submissions.filter(sub => {
      if (sub.status !== 'pending') return false;
      if (category && sub.listingCategory !== category) return false;
      return true;
    });
  };

  const getPropertyById = (id: string) => {
    return submissions.find(sub => sub.id === id);
  };

  const getAllProperties = () => {
    return submissions;
  };

  const getAllSubmissions = () => {
    return submissions;
  };

  // Master data actions
  const addLocation = (location: Omit<Location, 'id'>) => {
    setLocations(prev => {
      const updated = [...prev, { ...location, id: `loc-${Date.now()}` }];
      saveToStorage(STORAGE_KEYS.locations, updated);
      return updated;
    });
  };

  const updateLocation = (id: string, updates: Partial<Location>) => {
    setLocations(prev => {
      const updated = prev.map(loc => loc.id === id ? { ...loc, ...updates } : loc);
      saveToStorage(STORAGE_KEYS.locations, updated);
      return updated;
    });
  };

  const deleteLocation = (id: string) => {
    setLocations(prev => {
      const updated = prev.filter(loc => loc.id !== id);
      saveToStorage(STORAGE_KEYS.locations, updated);
      return updated;
    });
  };

  const addPropertyType = (type: Omit<PropertyType, 'id'>) => {
    setPropertyTypes(prev => {
      const updated = [...prev, { ...type, id: `type-${Date.now()}` }];
      saveToStorage(STORAGE_KEYS.propertyTypes, updated);
      return updated;
    });
  };

  const updatePropertyType = (id: string, updates: Partial<PropertyType>) => {
    setPropertyTypes(prev => {
      const updated = prev.map(t => t.id === id ? { ...t, ...updates } : t);
      saveToStorage(STORAGE_KEYS.propertyTypes, updated);
      return updated;
    });
  };

  const deletePropertyType = (id: string) => {
    setPropertyTypes(prev => {
      const updated = prev.filter(t => t.id !== id);
      saveToStorage(STORAGE_KEYS.propertyTypes, updated);
      return updated;
    });
  };

  const addAmenity = (amenity: Omit<Amenity, 'id'>) => {
    setAmenities(prev => {
      const updated = [...prev, { ...amenity, id: `am-${Date.now()}` }];
      saveToStorage(STORAGE_KEYS.amenities, updated);
      return updated;
    });
  };

  const updateAmenity = (id: string, updates: Partial<Amenity>) => {
    setAmenities(prev => {
      const updated = prev.map(a => a.id === id ? { ...a, ...updates } : a);
      saveToStorage(STORAGE_KEYS.amenities, updated);
      return updated;
    });
  };

  const deleteAmenity = (id: string) => {
    setAmenities(prev => {
      const updated = prev.filter(a => a.id !== id);
      saveToStorage(STORAGE_KEYS.amenities, updated);
      return updated;
    });
  };

  // Buyer Requirement actions
  const addBuyerRequirement = (requirement: Omit<BuyerRequirement, 'id' | 'submittedDate' | 'status'>) => {
    const newRequirement: BuyerRequirement = {
      ...requirement,
      id: `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      status: 'pending',
      submittedDate: new Date().toISOString(),
    };
    console.log('[PropertyStore] Adding new buyer requirement:', newRequirement);
    setBuyerRequirements(prev => {
      const updated = [...prev, newRequirement];
      saveToStorage(STORAGE_KEYS.buyerRequirements, updated);
      return updated;
    });
  };

  const updateBuyerRequirement = (id: string, updates: Partial<BuyerRequirement>) => {
    setBuyerRequirements(prev => {
      const updated = prev.map(r => r.id === id ? { ...r, ...updates } : r);
      saveToStorage(STORAGE_KEYS.buyerRequirements, updated);
      return updated;
    });
  };

  const deleteBuyerRequirement = (id: string) => {
    setBuyerRequirements(prev => {
      const updated = prev.map(req =>
        req.id === id ? { ...req, status: 'deleted' as RequirementStatus } : req
      );
      saveToStorage(STORAGE_KEYS.buyerRequirements, updated);
      return updated;
    });
  };

  const markRequirementContacted = (id: string, notes?: string) => {
    updateBuyerRequirement(id, {
      status: 'contacted',
      contactedDate: new Date().toISOString(),
      adminNotes: notes,
    });
  };

  const markRequirementClosed = (id: string, notes?: string) => {
    updateBuyerRequirement(id, {
      status: 'closed',
      closedDate: new Date().toISOString(),
      adminNotes: notes,
    });
  };

  const getPendingRequirements = (type?: RequirementType): BuyerRequirement[] => {
    return buyerRequirements.filter(r => {
      if (r.status !== 'pending') return false;
      if (type && r.requirementType !== type) return false;
      return true;
    });
  };

  const getAllRequirements = (): BuyerRequirement[] => {
    return [...buyerRequirements].sort((a, b) =>
      new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime()
    );
  };

  // Stats
  const getStats = () => {
    const total = submissions.length;
    const pending = submissions.filter(s => s.status === 'pending').length;
    const approved = submissions.filter(s => s.status === 'approved').length;
    const rejected = submissions.filter(s => s.status === 'rejected').length;
    const published = submissions.filter(s => s.status === 'published').length;
    const pendingSell = submissions.filter(s => s.status === 'pending' && s.listingCategory === 'sell').length;
    const pendingLease = submissions.filter(s => s.status === 'pending' && s.listingCategory === 'lease').length;
    const pendingBuyRequirements = buyerRequirements.filter(r => r.status === 'pending' && r.requirementType === 'buy').length;
    const pendingRentRequirements = buyerRequirements.filter(r => r.status === 'pending' && r.requirementType === 'rent').length;

    return { total, pending, approved, rejected, published, pendingSell, pendingLease, pendingBuyRequirements, pendingRentRequirements };
  };

  const value: PropertyStoreState = {
    submissions,
    buyerRequirements,
    locations,
    propertyTypes,
    amenities,
    addSubmission,
    updateSubmission,
    deleteSubmission,
    approveSubmission,
    rejectSubmission,
    publishSubmission,
    unpublishSubmission,
    addBuyerRequirement,
    updateBuyerRequirement,
    deleteBuyerRequirement,
    markRequirementContacted,
    markRequirementClosed,
    getPendingRequirements,
    getAllRequirements,
    createAdminProperty,
    getPublishedProperties,
    getPendingSubmissions,
    getPropertyById,
    getAllProperties,
    getAllSubmissions,

    addLocation,
    updateLocation,
    deleteLocation,
    addPropertyType,
    updatePropertyType,
    deletePropertyType,
    addAmenity,
    updateAmenity,
    deleteAmenity,
    getStats,
  };

  return (
    <PropertyStoreContext.Provider value={value}>
      {children}
    </PropertyStoreContext.Provider>
  );
};

// Hook to use the store
export const usePropertyStore = () => {
  const context = useContext(PropertyStoreContext);
  if (context === undefined) {
    throw new Error('usePropertyStore must be used within a PropertyStoreProvider');
  }
  return context;
};
