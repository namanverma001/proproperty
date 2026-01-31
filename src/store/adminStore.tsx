import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Admin credentials (in production, this should be server-side)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin2026#pro';
const ADMIN_ROUTE_PREFIX = '/ctrl-x7k9m2-admin';
const STORAGE_KEY = 'proproperty_admin_auth';

// Helper function to check auth status from sessionStorage synchronously
const getStoredAuth = (): boolean => {
    if (typeof window === 'undefined') return false;
    try {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        console.log('[AdminStore] Loaded auth from sessionStorage:', stored);
        return stored === 'true';
    } catch {
        return false;
    }
};

interface AdminState {
    isAuthenticated: boolean;
    login: (username: string, password: string) => boolean;
    logout: () => void;
    adminRoutePrefix: string;
}

const AdminContext = createContext<AdminState | undefined>(undefined);

export const AdminStoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Initialize from sessionStorage SYNCHRONOUSLY
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => getStoredAuth());

    const login = (username: string, password: string): boolean => {
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            try {
                sessionStorage.setItem(STORAGE_KEY, 'true');
                console.log('[AdminStore] Login successful, saved to sessionStorage');
            } catch (e) {
                console.error('[AdminStore] Failed to save auth to sessionStorage:', e);
            }
            return true;
        }
        console.log('[AdminStore] Login failed - wrong credentials');
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        try {
            sessionStorage.removeItem(STORAGE_KEY);
            console.log('[AdminStore] Logged out, removed from sessionStorage');
        } catch (e) {
            console.error('[AdminStore] Failed to remove auth from sessionStorage:', e);
        }
    };

    const value: AdminState = {
        isAuthenticated,
        login,
        logout,
        adminRoutePrefix: ADMIN_ROUTE_PREFIX,
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdminStore = () => {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error('useAdminStore must be used within an AdminStoreProvider');
    }
    return context;
};

// Protected Route Component
interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedAdminRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated, adminRoutePrefix } = useAdminStore();
    const location = useLocation();

    if (!isAuthenticated) {
        console.log('[AdminStore] Not authenticated, redirecting to login');
        return <Navigate to={`${adminRoutePrefix}/login`} state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

// Export the route prefix for use in App.tsx
export const ADMIN_ROUTE = ADMIN_ROUTE_PREFIX;
