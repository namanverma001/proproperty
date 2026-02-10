import axios, { AxiosInstance, AxiosError } from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const API_VERSION = import.meta.env.VITE_API_VERSION || "v1";

interface ApiError {
  success: false;
  message: string;
  errors: any;
}

interface ApiResponse<T> {
  success: true;
  message: string;
  data: T;
  errors: null;
}

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: `${API_BASE_URL}/api/${API_VERSION}`,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    // Request interceptor - Add access token to requests
    this.client.interceptors.request.use(
      (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response interceptor - Handle token refresh
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<ApiError>) => {
        const originalRequest = error.config as any;

        // If 401 and not already retried, attempt token refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) {
              throw new Error("No refresh token available");
            }

            const response = await axios.post<
              ApiResponse<{ accessToken: string }>
            >(`${API_BASE_URL}/api/${API_VERSION}/auth/refresh-token`, {
              refreshToken,
            });

            const { accessToken } = response.data.data;
            localStorage.setItem("accessToken", accessToken);

            // Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return this.client(originalRequest);
          } catch (refreshError) {
            // Refresh failed - clear tokens and redirect to login
            this.clearTokens();
            window.location.href = "/admin/login";
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      },
    );
  }

  private clearTokens() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }

  // Generic request methods
  async get<T>(url: string, config = {}) {
    const response = await this.client.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config = {}) {
    const response = await this.client.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config = {}) {
    const response = await this.client.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config = {}) {
    const response = await this.client.delete<ApiResponse<T>>(url, config);
    return response.data;
  }

  async patch<T>(url: string, data?: any, config = {}) {
    const response = await this.client.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  }
}

export const apiClient = new ApiClient();
