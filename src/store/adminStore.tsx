import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authService, User } from "@/services/authService";

// Admin route prefix
const ADMIN_ROUTE_PREFIX = "/ctrl-x7k9m2-admin";
const STORAGE_KEY = "proproperty_admin_auth";

interface AdminState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => boolean;
  clearError: () => void;
  adminRoutePrefix: string;
}

const AdminContext = createContext<AdminState | undefined>(undefined);

export const AdminStoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Check localStorage for tokens and user
    const hasAuth = authService.isAuthenticated() && authService.isAdmin();
    console.log("[AdminStore] Initial auth check:", hasAuth);
    return hasAuth;
  });

  const [user, setUser] = useState<User | null>(() => {
    return authService.getCurrentUser();
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Verify authentication on mount
  useEffect(() => {
    const verifyAuth = async () => {
      if (isAuthenticated) {
        try {
          // Verify token is still valid by fetching profile
          const profile = await authService.getProfile();
          setUser(profile);
          console.log("[AdminStore] Auth verified successfully");
        } catch (err) {
          console.error("[AdminStore] Auth verification failed:", err);
          setIsAuthenticated(false);
          setUser(null);
          authService.clearAuth();
        }
      }
    };

    verifyAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    console.log("[AdminStore] Login attempt for:", email);

    try {
      const response = await authService.login({ email, password });

      // Check if user is admin
      if (response.user.role !== "admin") {
        const errorMsg = "Access denied. Admin privileges required.";
        setError(errorMsg);
        console.log("[AdminStore]", errorMsg);
        await authService.logout();
        setIsLoading(false);
        return false;
      }

      // Check if account is blocked
      if (response.user.isBlocked) {
        const errorMsg =
          "Your account has been blocked. Please contact support.";
        setError(errorMsg);
        console.log("[AdminStore]", errorMsg);
        await authService.logout();
        setIsLoading(false);
        return false;
      }

      setIsAuthenticated(true);
      setUser(response.user);
      setIsLoading(false);

      // Store auth flag for backward compatibility
      try {
        sessionStorage.setItem(STORAGE_KEY, "true");
      } catch (e) {
        console.error("[AdminStore] Failed to save to sessionStorage:", e);
      }

      console.log("[AdminStore] Login successful");
      return true;
    } catch (err: any) {
      const errorMsg =
        err.message || "Login failed. Please check your credentials.";
      setError(errorMsg);
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
      console.error("[AdminStore] Login error:", errorMsg);
      return false;
    }
  };

  const logout = async () => {
    setIsLoading(true);
    console.log("[AdminStore] Logging out...");

    try {
      await authService.logout();
    } catch (err) {
      console.error("[AdminStore] Logout error:", err);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
      setError(null);

      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.error("[AdminStore] Failed to remove from sessionStorage:", e);
      }

      console.log("[AdminStore] Logged out successfully");
    }
  };

  const checkAuth = (): boolean => {
    const hasAuth = authService.isAuthenticated() && authService.isAdmin();
    const currentUser = authService.getCurrentUser();

    if (hasAuth && currentUser) {
      setIsAuthenticated(true);
      setUser(currentUser);
      return true;
    }

    setIsAuthenticated(false);
    setUser(null);
    return false;
  };

  const clearError = () => {
    setError(null);
  };

  const value: AdminState = {
    isAuthenticated,
    user,
    isLoading,
    error,
    login,
    logout,
    checkAuth,
    clearError,
    adminRoutePrefix: ADMIN_ROUTE_PREFIX,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export const useAdminStore = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdminStore must be used within an AdminStoreProvider");
  }
  return context;
};

// Protected Route Component
interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedAdminRoute: React.FC<ProtectedRouteProps> = ({
  children,
}) => {
  const { isAuthenticated, checkAuth, adminRoutePrefix } = useAdminStore();
  const location = useLocation();

  // Re-check authentication
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!isAuthenticated) {
    console.log("[AdminStore] Not authenticated, redirecting to login");
    return (
      <Navigate
        to={`${adminRoutePrefix}/login`}
        state={{ from: location }}
        replace
      />
    );
  }

  return <>{children}</>;
};

// Export the route prefix for use in App.tsx
export const ADMIN_ROUTE = ADMIN_ROUTE_PREFIX;
