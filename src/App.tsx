import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";

// Store Providers
import { PropertyStoreProvider } from "./store/propertyStore";
import { AdminStoreProvider, ProtectedAdminRoute, ADMIN_ROUTE } from "./store/adminStore";

// Public Pages
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Buy from "./pages/Buy";
import Rent from "./pages/Rent";
import Sell from "./pages/Sell";
import Lease from "./pages/Lease";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PendingSellRequests from "./pages/admin/PendingSellRequests";
import PendingLeaseRequests from "./pages/admin/PendingLeaseRequests";
import PendingBuyRequirements from "./pages/admin/PendingBuyRequirements";
import PendingRentRequirements from "./pages/admin/PendingRentRequirements";
import SubmissionHistory from "./pages/admin/SubmissionHistory";
import PropertyManagement from "./pages/admin/PropertyManagement";
import CreateProperty from "./pages/admin/CreateProperty";
import MasterLocations from "./pages/admin/MasterLocations";
import MasterPropertyTypes from "./pages/admin/MasterPropertyTypes";
import MasterAmenities from "./pages/admin/MasterAmenities";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PropertyStoreProvider>
        <AdminStoreProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <WhatsAppButton />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/buy" element={<Buy />} />
              <Route path="/rent" element={<Rent />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
              <Route path="/sell" element={<Sell />} />
              <Route path="/lease" element={<Lease />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* Admin Routes */}
              <Route path={`${ADMIN_ROUTE}/login`} element={<AdminLogin />} />
              <Route
                path={ADMIN_ROUTE}
                element={
                  <ProtectedAdminRoute>
                    <AdminLayout />
                  </ProtectedAdminRoute>
                }
              >
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="pending-sell" element={<PendingSellRequests />} />
                <Route path="pending-lease" element={<PendingLeaseRequests />} />
                <Route path="pending-buy-requirements" element={<PendingBuyRequirements />} />
                <Route path="pending-rent-requirements" element={<PendingRentRequirements />} />
                <Route path="history" element={<SubmissionHistory />} />

                {/* Property Management */}
                <Route path="properties" element={<PropertyManagement />} />
                <Route path="create" element={<CreateProperty />} />
                <Route path="master/locations" element={<MasterLocations />} />
                <Route path="master/property-types" element={<MasterPropertyTypes />} />
                <Route path="master/amenities" element={<MasterAmenities />} />
              </Route>

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AdminStoreProvider>
      </PropertyStoreProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

