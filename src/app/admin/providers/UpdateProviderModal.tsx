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
  const [providerUpdated, setProviderUpdated] = useState<Provider| null>(null);

  useEffect(() => {
    setFormData(provider); // mỗi khi provider thay đổi
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
        
        onSave(res.data); // Gọi hàm onSave với dữ liệu đã cập nhật
    } catch (error) {
        console.error('Lỗi khi cập nhật provider:', error);
        alert('Cập nhật provider thất bại');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-white/70 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Chỉnh sửa Provider</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Tên"
          />
          <input
            name="apiKey"
            value={formData.apiKey}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="API Key"
          />
          <input
            name="baseUrl"
            value={formData.baseUrl}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Base URL"
          />
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
