import { api } from '@/lib/api';

export const getProviders = async () => {
    const token = localStorage.getItem('accessToken');
    const res = await api.get('/api/provider', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
}

export const createProvider = async (providerData) => {
    const token = localStorage.getItem('accessToken');
    const res = await api.post('/api/provider', providerData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return res.data;
}

export const updateProvider = async (providerId, providerData) => {
    const token = localStorage.getItem('accessToken');
    console.log(providerData);
    const res = await api.patch(`/api/provider/${providerId}`, providerData, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return res.data;
}