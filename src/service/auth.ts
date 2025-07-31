import { api }  from '@/lib/api';

export const login = async (email: string, password: string, authType: string) => {
  const res = await api.post('/api/auth/login', { email, password, authType });
  return res.data;
};

export const refreshToken = async () => {
  try {
    const token = localStorage.getItem('refreshToken');
    console.log('Refreshing token with:', token);
    const res = await api.post('/api/auth/refresh',{
      token: token
    });
    return res.data;
  } catch (error) {
    console.error('Error refreshing token:', error.response?.data || error);
    throw error;
  }
}