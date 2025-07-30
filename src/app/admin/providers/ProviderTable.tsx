'use client';

import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { FiCopy, FiEye, FiEyeOff } from 'react-icons/fi';
import { useState } from 'react';
import { BiSolidEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';

interface Provider {
  id: string;
  name: string;
  apiKey: string;
  baseUrl: string;
}

interface ProviderTableProps {
  providers: Provider[];
  onEditClick: (provider: Provider) => void;
}

export default function ProviderTable({ providers, onEditClick }: ProviderTableProps) {
  const [showFullKeys, setShowFullKeys] = useState<Record<string, boolean>>({});

  const handleToggleShow = (id: string) => {
    setShowFullKeys((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopy = async (apiKey: string) => {
    try {
      await navigator.clipboard.writeText(apiKey);
      alert('Đã copy API Key!');
    } catch (err) {
      console.error('Copy thất bại', err);
      alert('Không thể copy API Key.');
    }
  };
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Danh sách Providers</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-base font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-base font-medium text-gray-500 uppercase tracking-wider">Api Key</th>
              <th className="px-6 py-4 text-left text-base font-medium text-gray-500 uppercase tracking-wider">Base Url</th>
              <th className="px-6 py-4 text-left text-base font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {providers.length > 0 ? (
              providers.map((provider) => (
                <tr key={provider.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-800">{provider.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-800 font-mono max-w-xs">
                    <div className="flex items-center space-x-2">
                      <span>
                        {provider.apiKey}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-800">{provider.baseUrl}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onEditClick(provider)}
                        className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                        title="Chỉnh sửa"
                      >
                        <BiSolidEdit className="w-6 h-6" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-lg text-gray-500">
                  Chưa có provider nào được thêm.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}