// src/lib/api.ts
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

// Function to get access token from localStorage
const getAccessToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
  return null;
};

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to automatically include access token
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, remove from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        // Redirect to login page
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

// Utility functions for token management
export const authUtils = {
  // Set access token in localStorage
  setAccessToken: (token: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', token);
    }
  },

  // Get access token from localStorage
  getAccessToken: (): string | null => {
    return getAccessToken();
  },

  // Remove access token from localStorage
  removeAccessToken: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!getAccessToken();
  },

  // Logout user (remove token and redirect)
  logout: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
  }
};

export const fetchProvidersWithQuery = async ({
  page,
  pageSize,
  keyword,
}: {
  page: number;
  pageSize: number;
  keyword: string;
}) => {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    keyword,
  });

  const response = await api.post(`/provider?${params.toString()}`, null, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data;
};


