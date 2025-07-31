'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { createProvider } from '@/service/provider';
import { FiPlus } from 'react-icons/fi';
import { FiX } from 'react-icons/fi';

interface AddProviderButtonProps {
  onAdd: (provider: {
    id: string;
    name: string;
    apiKey: string;
    baseUrl: string;
  }) => void;
}

export default function AddProviderButton({ onAdd }: AddProviderButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    apiKey: '',
    baseUrl: '',
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.apiKey || !formData.baseUrl) {
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    try {
      const res = await createProvider(formData);

      console.log('Tạo provider thành công:', res.data);

      onAdd({
        id: res.data.id, // Assuming the response contains the new provider's ID
        name: res.data.name,
        apiKey: res.data.apiKey,
        baseUrl: res.data.baseUrl,
      });

      setFormData({ name: '', apiKey: '', baseUrl: '' });
      closeModal();
    } catch (error) {
      console.error('Lỗi khi thêm provider:', error);
      alert('Tạo provider thất bại');
    }
  };

  return (
    <>
      <button
        className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg text-lg font-medium transition-colors"
        onClick={openModal}
      >
        <FiPlus className="mr-2" />
        Thêm Provider
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm bg-opacity-30 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Thêm Provider Mới</h2>
                <button
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={closeModal}
                  aria-label="Đóng"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-5">
                {['name', 'apiKey', 'baseUrl'].map((field) => (
                  <div key={field}>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      {field === 'name'
                        ? 'Tên Provider'
                        : field === 'apiKey'
                          ? 'API Key'
                          : 'Base URL'}
                    </label>
                    <input
                      id={field}
                      name={field}
                      type="text"
                      placeholder={
                        field === 'name'
                          ? 'Nhập tên provider'
                          : field === 'apiKey'
                            ? 'Nhập API key'
                            : 'Nhập base URL'
                      }
                      value={formData[field as keyof typeof formData]}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-lg"
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <button
                  onClick={closeModal}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-lg font-medium"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-lg font-medium"
                >
                  Thêm Provider
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
