import { Model, ModelCreateRequest, ModelUpdateInfoRequest, ModelResponse } from '@/types/models';
import { api } from '@/lib/api';

export const getModels = async () => {
  const token = localStorage.getItem('accessToken');
  const res = await api.get('/api/model', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
export const createModel = async (request: ModelCreateRequest): Promise<{ data: Model }> => {
  const token = localStorage.getItem('accessToken');
  const response = await api.post('/api/model', request, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response) throw new Error('Failed to create model');
  return response.data;
};

export const updateModelInfo = async (id: string, request: ModelUpdateInfoRequest): Promise<{ data: Model }> => {
  const token = localStorage.getItem('accessToken');
  const response = await api.patch(`/api/model/${id}/updateInfo`, request, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response) throw new Error('Failed to update model info');
  return response.data;
};

export const enableModel = async (id: string): Promise<{ data: Model }> => {
  const token = localStorage.getItem('accessToken');
  const response = await api.patch(`/api/model/${id}/enable`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const disableModel = async (id: string): Promise<{ data: Model }> => {
  const token = localStorage.getItem('accessToken');
  const response = await api.patch(`/api/model/${id}/disable`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
