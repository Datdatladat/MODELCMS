'use client';

import { useState, useEffect } from 'react';
import { updateProvider } from '@/service/provider';

interface Provider {
  id: string;
  name: string;
  apiKey: string;
  baseUrl: string;
}

interface EditProviderModalProps {
  provider: Provider;
  onClose: () => void;
  onSave: (updatedProvider: Provider) => void;
}

export default function EditProviderModal({
  provider,
  onClose,
  onSave
}: EditProviderModalProps) {
  const [formData, setFormData] = useState(provider);
  const [providerUpdated, setProviderUpdated] = useState<Provider | null>(null);

  useEffect(() => {
    setFormData(provider);
  }, [provider]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setProviderUpdated((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formData.name || !formData.apiKey || !formData.baseUrl) {
        alert('Vui lòng nhập đầy đủ thông tin');
        return;
      }
      console.log(providerUpdated);
      const res = await updateProvider(formData.id, providerUpdated); 
      onSave(res.data);
    } catch (error) {
      console.error('Lỗi khi cập nhật provider:', error);
      alert('Cập nhật provider thất bại');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-white/70 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Chỉnh sửa Provider</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Tên Provider</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="Nhập tên provider"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">API Key</label>
            <input
              name="apiKey"
              value={formData.apiKey}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="Nhập API key"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Base URL</label>
            <input
              name="baseUrl"
              value={formData.baseUrl}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="Nhập base URL"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}