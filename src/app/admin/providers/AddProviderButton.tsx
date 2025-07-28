'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

interface AddProviderButtonProps {
  onAdd: (provider: { code: string; name: string; status: 'active' | 'inactive' }) => void;
}

export default function AddProviderButton({ onAdd }: AddProviderButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
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
    if (!formData.code || !formData.name || !formData.apiKey || !formData.baseUrl) {
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    try {
      const data = new URLSearchParams();
      data.append('code', formData.code);
      data.append('name', formData.name);
      data.append('apiKey', formData.apiKey);
      data.append('baseUrl', formData.baseUrl);

      const res = await axios.post('http://localhost:8080/provider', data.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      console.log('Tạo provider thành công:', res.data);

      onAdd({
        code: formData.code,
        name: formData.name,
        status: 'active', 
      });

      setFormData({ code: '', name: '', apiKey: '', baseUrl: '' });
      closeModal();
    } catch (error) {
      console.error('Lỗi khi thêm provider:', error);
      alert('Tạo provider thất bại');
    }
  };

  return (
    <>
      <button
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        onClick={openModal}
      >
        + Thêm Provider
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg p-8 w-[500px] relative shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={closeModal}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-semibold mb-6 text-black">Thêm Provider Mới</h2>

            <div className="flex flex-col space-y-6">
              {['code', 'name', 'apiKey', 'baseUrl'].map((field) => (
                <div key={field}>
                  <label className="block text-black font-medium mb-2" htmlFor={field}>
                    {field === 'code'
                      ? 'Mã Provider'
                      : field === 'name'
                      ? 'Tên Provider'
                      : field === 'apiKey'
                      ? 'API Key'
                      : 'Base URL'}
                  </label>
                  <input
                    id={field}
                    name={field}
                    type="text"
                    placeholder={`Nhập ${field}`}
                    value={formData[field as keyof typeof formData]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-3 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              ))}

              <div className="flex justify-end gap-4 mt-8">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 border border-gray-400 rounded text-black hover:bg-gray-100 transition"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                >
                  Thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
