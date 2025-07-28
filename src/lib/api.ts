// src/lib/api.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API

export const login = async (email: string, password: string) => {
  const res = await api.post('/auth/login', { email, password });
  return res.data;
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


