// src/lib/api.ts
import axios from 'axios';
import { refreshToken } from '@/service/auth';

let isRefreshing = false;
let failedQueue: any[] = [];

const API_BASE_URL = 'http://localhost:8080';

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

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);     // Nếu có lỗi => reject toàn bộ
    else prom.resolve(token);          // Nếu có token mới => retry lại toàn bộ
  });
  failedQueue = [];
};


// Add response interceptor to handle token expiration
api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (!localStorage.getItem('refreshToken')) {
        // Không có refreshToken -> logout
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/';
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return api(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshToken(); // Gọi API refresh
        localStorage.setItem('accessToken', newToken.data.accessToken);
        localStorage.setItem('refreshToken', newToken.data.refreshToken);
        processQueue(null, newToken.data.accessToken);
        originalRequest.headers['Authorization'] = 'Bearer ' + newToken.data.accessToken;
        return api(originalRequest);
      } catch (err) {
        // Nếu gọi refreshToken mà cũng bị lỗi (ví dụ: 401) → logout
        console.error('Refresh token failed:', err);

        processQueue(err, null);

        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/';
        }

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
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
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }
  }
};
