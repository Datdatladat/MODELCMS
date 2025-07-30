'use client';

import { useState } from 'react';
import { FiCopy, FiTrash2, FiRefreshCw, FiPlus, FiEye, FiEyeOff } from 'react-icons/fi';
import { useEffect } from 'react';
import { getAccessKeys } from '@/service/accessKey';

type AccessKey = {
  id: string;
  apiKey: string;
  createdAt: string;
  expiresAt: string;
  status: 'active' | 'expired' | 'revoked';
};

export default function AccessKeysPage() {
  const [keys, setKeys] = useState<AccessKey[]>([]);

  const [showApiKey, setShowApiKey] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    const fetchKeys = async () => {
      try {
        const response = await getAccessKeys();
        console.log('Access keys fetched:', response);
        console.log('Access keys fetched:', response.data);
        // setKeys(response.data);
      } catch (error) {
        console.error('Error fetching access keys:', error);
      }
    };

    fetchKeys();
  }, []);

  const toggleKeyVisibility = (id: string) => {
    setShowApiKey(prev => ({...prev, [id]: !prev[id]}));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
  };

  const revokeKey = (id: string) => {
    setKeys(keys.map(key => 
      key.id === id ? {...key, status: 'revoked'} : key
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý Access Keys</h1>
        <button 
          
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg transition-all duration-300 hover:shadow-md text-lg"
        >
          <FiPlus className="mr-2 text-xl" />
          Tạo Key mới
        </button>
      </div>

      <p className="text-gray-600 mb-8 text-lg">Tạo và quản lý các access key của bạn</p>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-8 py-4 text-left text-base font-medium text-gray-500 uppercase tracking-wider">API Key</th>
                <th className="px-8 py-4 text-left text-base font-medium text-gray-500 uppercase tracking-wider">Thời gian tạo</th>
                <th className="px-8 py-4 text-left text-base font-medium text-gray-500 uppercase tracking-wider">Thời gian hết hạn</th>
                <th className="px-8 py-4 text-left text-base font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                <th className="px-8 py-4 text-left text-base font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {keys.map((key) => (
                <tr 
                  key={key.id} 
                  className={`hover:bg-gray-50 transition-colors ${
                    key.status === 'expired' ? 'bg-gray-50' : ''
                  }`}
                >
                  <td className="px-8 py-5 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="font-mono text-lg">
                        {showApiKey[key.id] ? key.apiKey : `${key.apiKey.substring(0, 4)}...${key.apiKey.substring(key.apiKey.length - 4)}`}
                      </span>
                      <button 
                        onClick={() => toggleKeyVisibility(key.id)}
                        className="ml-3 text-gray-500 hover:text-gray-700 transition-colors text-xl"
                      >
                        {showApiKey[key.id] ? <FiEyeOff /> : <FiEye />}
                      </button>
                      <button 
                        onClick={() => copyToClipboard(key.apiKey)}
                        className="ml-3 text-gray-500 hover:text-blue-500 transition-colors text-xl"
                        title="Copy to clipboard"
                      >
                        <FiCopy />
                      </button>
                    </div>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap text-gray-500 text-lg">{key.createdAt}</td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className={`px-3 py-2 rounded-full text-sm font-medium ${
                      new Date(key.expiresAt) < new Date() 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {key.expiresAt}
                    </span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className={`px-3 py-2 rounded-full text-sm font-medium ${
                      key.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : key.status === 'expired' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-gray-100 text-gray-800'
                    }`}>
                      {key.status === 'active' ? 'Active' : key.status === 'expired' ? 'Expired' : 'Revoked'}
                    </span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <div className="flex space-x-3">
                      {key.status === 'active' && (
                        <button
                          onClick={() => revokeKey(key.id)}
                          className="text-red-500 hover:text-red-700 transition-colors p-2 rounded hover:bg-red-50 text-xl"
                          title="Revoke key"
                        >
                          <FiTrash2 />
                        </button>
                      )}
                      <button
                        className="text-blue-500 hover:text-blue-700 transition-colors p-2 rounded hover:bg-blue-50 text-xl"
                        title="Regenerate key"
                      >
                        <FiRefreshCw />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 transition-all hover:shadow-md">
          <h3 className="text-gray-500 text-lg font-medium">Total Keys</h3>
          <p className="text-3xl font-bold text-gray-800">{keys.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 transition-all hover:shadow-md">
          <h3 className="text-gray-500 text-lg font-medium">Active Keys</h3>
          <p className="text-3xl font-bold text-green-600">
            {keys.filter(k => k.status === 'active').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 transition-all hover:shadow-md">
          <h3 className="text-gray-500 text-lg font-medium">Expired/Revoked</h3>
          <p className="text-3xl font-bold text-red-600">
            {keys.filter(k => k.status !== 'active').length}
          </p>
        </div>
      </div>
    </div>
  );
}