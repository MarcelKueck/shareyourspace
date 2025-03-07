import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getCookie, deleteCookie } from 'cookies-next';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Get token from cookies
    const token = getCookie('auth-token');

    // If token exists, add it to the request header
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add CSRF token if it exists
    const csrfToken = getCookie('csrf-token');

    if (csrfToken && config.headers) {
      config.headers[process.env.NEXT_PUBLIC_CSRF_TOKEN_HEADER || 'X-CSRF-Token'] = csrfToken;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const response = await axios.post('/api/v1/auth/refresh-token');

        // If token refresh is successful, retry the original request
        if (response.status === 200) {
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // If token refresh fails, redirect to login
        deleteCookie('auth-token');

        if (typeof window !== 'undefined') {
          // Store the current URL to redirect back after login
          sessionStorage.setItem('redirect-after-login', window.location.pathname);
          window.location.href = '/auth/login';
        }
      }
    }

    // Handle other errors
    if (error.response?.status === 403) {
      // Access forbidden - handle authorization error
      console.error('Access forbidden');
    }

    if (error.response?.status === 404) {
      // Resource not found
      console.error('Resource not found');
    }

    if (error.response?.status === 500) {
      // Server error
      console.error('Server error');
    }

    return Promise.reject(error);
  }
);

// Function for GET requests
export const get = async <T>(url: string, params = {}): Promise<T> => {
  const response = await apiClient.get<T>(url, { params });
  return response.data;
};

// Function for POST requests
export const post = async <T>(url: string, data = {}): Promise<T> => {
  const response = await apiClient.post<T>(url, data);
  return response.data;
};

// Function for PUT requests
export const put = async <T>(url: string, data = {}): Promise<T> => {
  const response = await apiClient.put<T>(url, data);
  return response.data;
};

// Function for DELETE requests
export const del = async <T>(url: string): Promise<T> => {
  const response = await apiClient.delete<T>(url);
  return response.data;
};

export default apiClient;
