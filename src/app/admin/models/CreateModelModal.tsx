'use client';

import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { FiX } from 'react-icons/fi';
import { Model, ModelCreateRequest } from '@/types/models';
import { Provider } from '@/types/providers';
import { useEffect } from 'react';
import { getProviders } from '@/service/provider';
import { createModel } from '@/service/model';

interface AddProviderButtonProps {
  onAdd: (model: Model) => void;
}


export default function CreateModelModal({ onAdd }: AddProviderButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(
    {
      modelCode: '',
      displayName: '',
      provider: null
    }
  );
  const [newModel, setNewModel] = useState<ModelCreateRequest>(null);
  const [providerOptions, setProviderOptions] = useState<Provider[]>([]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await getProviders();
        setProviderOptions(response.data.content);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách providers:", error);
      }
    };

    fetchProviders();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    const updatedFormData = name === "provider"
      ? { ...formData, [name]: providerOptions.find(p => p.id === value) }
      : { ...formData, [name]: value };

    const model = {
      ...newModel,
      [name === "provider" ? "provider_id" : name]: value,
    };
    setFormData(updatedFormData);
    setNewModel(model);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModel.modelCode || !newModel.displayName || !newModel.provider_id) {
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    try {
      console.log(newModel);
      const res = await createModel(newModel);

      onAdd(res.data);

      setFormData(null);
      closeModal();
    } catch (error: any) {
      console.error('Lỗi khi thêm model:', error?.response?.data || error.message || error);
      alert('Tạo model thất bại');
    }
  };

  return (
    <>
      <button
        className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg text-lg font-medium transition-colors"
        onClick={openModal}
      >
        <FiPlus className="mr-2" />
        Thêm Model
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
                <h2 className="text-2xl font-bold text-gray-800">Thêm Model Mới</h2>
                <button
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={closeModal}
                  aria-label="Đóng"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Mã Model</label>
                  <input
                    name="modelCode"
                    value={formData?.modelCode || ''}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="Nhập mã model"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Tên hiển thị</label>
                  <input
                    name="displayName"
                    value={formData?.displayName || ''}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="Nhập tên hiển thị"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Provider</label>
                  <select
                    name="provider"
                    value={formData.provider?.id || ''}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="">Chọn Provider</option>
                    {providerOptions.map((provider) => (
                      <option key={provider.id} value={provider.id}>
                        {provider.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={
                      closeModal
                    }
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

              {/* <div className="flex justify-end gap-4 mt-8">
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
                  Thêm Model
                </button>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
