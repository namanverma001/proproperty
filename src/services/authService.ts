import { apiClient } from "./api";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: "user" | "admin";
  isBlocked: boolean;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        "/auth/login",
        credentials,
      );

      // Store tokens and user data
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Register new user
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        "/auth/register",
        data,
      );

      // Store tokens and user data
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        await apiClient.post("/auth/logout", { refreshToken });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear tokens regardless of API call success
      this.clearAuth();
    }
  }

  /**
   * Get current user profile
   */
  async getProfile(): Promise<User> {
    try {
      const response = await apiClient.get<User>("/auth/profile");
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<{ accessToken: string }> {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await apiClient.post<{ accessToken: string }>(
        "/auth/refresh-token",
        { refreshToken },
      );

      localStorage.setItem("accessToken", response.data.accessToken);
      return response.data;
    } catch (error: any) {
      this.clearAuth();
      throw this.handleError(error);
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const accessToken = localStorage.getItem("accessToken");
    const user = localStorage.getItem("user");
    return !!(accessToken && user);
  }

  /**
   * Check if user is admin
   */
  isAdmin(): boolean {
    const userStr = localStorage.getItem("user");
    if (!userStr) return false;

    try {
      const user: User = JSON.parse(userStr);
      return user.role === "admin";
    } catch {
      return false;
    }
  }

  /**
   * Get current user from localStorage
   */
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  /**
   * Clear authentication data
   */
  clearAuth(): void {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }

  /**
   * Handle API errors
   */
  private handleError(error: any): Error {
    if (error.response?.data?.message) {
      return new Error(error.response.data.message);
    }

    if (error.message) {
      return new Error(error.message);
    }

    return new Error("An unexpected error occurred. Please try again.");
  }
}

export const authService = new AuthService();
