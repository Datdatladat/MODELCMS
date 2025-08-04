import { api }  from '@/lib/api';

export const login = async (email: string, password: string, authType: string) => {
  const res = await api.post('/api/auth/login', { email, password, authType });
  return res.data;
};