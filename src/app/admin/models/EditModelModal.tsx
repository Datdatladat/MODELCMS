'use client';

import { Model, ModelUpdateInfoRequest } from "@/types/models";
import { Provider } from "@/types/providers";
import { useState, useEffect } from "react";
import { getProviders } from "@/service/provider";
import { updateModelInfo } from "@/service/model";

interface EditModelModalProps {
  model: Model;
  onClose: () => void;
  onSave: (updatedModel: Model) => void;
}

export default function EditModelModal({
  model,
  onClose,
  onSave,
}: EditModelModalProps) {
  const [formData, setFormData] = useState(model);
  const [modelUpdated, setModelUpdated] = useState<ModelUpdateInfoRequest | null>(null);
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
    console.log(formData);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    const updatedFormData = name === "provider"
      ? { ...formData, [name]: providerOptions.find(p => p.id === value) }
      : { ...formData, [name]: value };

    const updatedModel = {
      ...modelUpdated,
      [name === "provider" ? "providerId" : name]: value,
    };

    setFormData(updatedFormData);
    setModelUpdated(updatedModel);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formData.modelCode || !formData.displayName || !formData.provider.id) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
      }
      const res = await updateModelInfo(formData.id, modelUpdated);
      console.log(res);
      onSave(res.data);
    } catch (error) {
      console.error("Lỗi khi cập nhật model:", error.message);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm bg-opacity-50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Chỉnh sửa Model</h2>
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
            <label className="mb-1 block text-sm font-medium text-gray-700">Mã Model</label>
            <input
              name="modelCode"
              value={formData.modelCode}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="Nhập mã model"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Tên hiển thị</label>
            <input
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="Nhập tên hiển thị"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Provider</label>
            <select
              name="provider"
              value={formData.provider.id}
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