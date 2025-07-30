'use client';

import { useState } from 'react';
import { FiCopy, FiTrash2, FiPlus, FiEye, FiEyeOff, FiX } from 'react-icons/fi';
import { useEffect } from 'react';
import { getAccessKeys } from '@/service/accessKey';
import { api } from '@/lib/api';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

type AccessKey = {
  id: string;
  apiKey: string;
  createdAt: string;
  expiresAt: string;
  status: 'ACTIVE' | 'NO_ACTIVE' | 'EXPIRED' | 'REVOKED';
};

const statusMapping: Record<string, { label: string; style: string }> = {
  ACTIVE: { label: 'Active', style: 'bg-green-100 text-green-800' },
  NO_ACTIVE: { label: 'Not Active', style: 'bg-yellow-100 text-yellow-800' },
  EXPIRED: { label: 'Expired', style: 'bg-red-100 text-red-800' },
  REVOKED: { label: 'Revoked', style: 'bg-gray-100 text-gray-800' },
};

export default function AccessKeysPage() {
  const [keys, setKeys] = useState<AccessKey[]>([]);
  const [showApiKey, setShowApiKey] = useState<{[key: string]: boolean}>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKey, setNewKey] = useState<AccessKey | null>(null);
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: string | null }>({ open: false, id: null });
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const fetchKeys = async () => {
      try {
        const response = await getAccessKeys();
        setKeys(
          response.data.map((key: any) => ({
            id: key.id, // Using apiKey as a unique identifier
            apiKey: key.apiKey,
            createdAt: new Date(key.createdTime).toLocaleString('vi-VN'),
            expiresAt: new Date(key.expiredTime).toLocaleString('vi-VN'),
            status: key.status, // Use status as returned from server
          }))
        );
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

  const revokeKey = async (id: string) => {
    setDeleteConfirm({ open: true, id });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm.id) return;
    try {
      await api.delete(`/api/access-keys/${deleteConfirm.id}`);
      setKeys(keys.filter(key => key.id !== deleteConfirm.id));
      setNotification('Xóa key thành công!');
    } catch (error) {
      setNotification('Xóa key thất bại!');
      console.error('Error revoking access key:', error);
    } finally {
      setDeleteConfirm({ open: false, id: null });
      setTimeout(() => setNotification(null), 2500);
    }
  };

  const createKey = async () => {
    try {
      const response = await api.post('/api/access-keys');
      const keyData = response.data.data;
      const formattedKey: AccessKey = {
        id: keyData.id,
        apiKey: keyData.apiKey,
        createdAt: new Date(keyData.createdTime).toLocaleString('vi-VN'),
        expiresAt: new Date(keyData.expiredTime).toLocaleString('vi-VN'),
        status: keyData.status.toLowerCase(),
      };
      setNewKey(formattedKey);
      setIsModalOpen(true);
      setKeys(prevKeys => [formattedKey, ...prevKeys]);
    } catch (error) {
      console.error('Error creating access key:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-3">
                Quản lý Api Key
              </h1>
              <p className="text-gray-600 text-lg">
                Tạo và quản lý các API keys để truy cập vào TinaCode services
              </p>
            </div>
            <button 
              onClick={() => setIsLimitModalOpen(true)}
              className="group flex items-center bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-6 py-4 rounded-2xl transition-all duration-300 hover:shadow-xl hover:scale-105 text-lg font-semibold"
            >
              <FiPlus className="mr-3 text-xl group-hover:rotate-90 transition-transform duration-300" />
              Tạo Key mới
            </button>
          </div>
        </div>

        {/* Keys Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Tổng số Keys</p>
                <p className="text-2xl font-bold text-gray-800">{keys.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FiPlus className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Keys Hoạt động</p>
                <p className="text-2xl font-bold text-green-600">{keys.filter(k => k.status === 'ACTIVE').length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <FiEye className="text-green-600 text-xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Keys Hết hạn</p>
                <p className="text-2xl font-bold text-red-600">{keys.filter(k => k.status === 'EXPIRED').length}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <FiEyeOff className="text-red-600 text-xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Còn lại</p>
                <p className="text-2xl font-bold text-orange-600">{3 - keys.length}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <FiTrash2 className="text-orange-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Keys Table */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 px-8 py-6">
            <h2 className="text-xl font-semibold text-white">Danh sách API Keys</h2>
            <p className="text-red-100 mt-1">Quản lý và theo dõi tất cả các API keys của bạn</p>
          </div>
          <div className="overflow-x-auto">
            {keys.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-8">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FiPlus className="text-gray-400 text-3xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Chưa có API Keys</h3>
                <p className="text-gray-500 text-center mb-6">Bạn chưa tạo API key nào. Hãy tạo key đầu tiên để bắt đầu sử dụng TinaCode services.</p>
                <button 
                  onClick={() => setIsLimitModalOpen(true)}
                  className="flex items-center bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-lg"
                >
                  <FiPlus className="mr-2" />
                  Tạo Key đầu tiên
                </button>
              </div>
            ) : (
              <table className="min-w-full">
                <thead className="bg-gray-50/80">
                  <tr>
                    <th className="px-8 py-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">API Key</th>
                    <th className="px-8 py-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Thời gian tạo</th>
                    <th className="px-8 py-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Hết hạn</th>
                    <th className="px-8 py-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Trạng thái</th>
                    <th className="px-8 py-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {keys.map((key, index) => (
                    <tr
                      key={key.id}
                      className={`hover:bg-gray-50/50 transition-all duration-200 ${
                        key.status === 'EXPIRED' ? 'bg-red-50/30' : ''
                      }`}
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold">
                              {index + 1}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-3">
                              <span className="font-mono text-sm bg-gray-100 px-3 py-2 rounded-lg">
                                {showApiKey[key.id]
                                  ? key.apiKey
                                  : `${key.apiKey.substring(0, 8)}...${key.apiKey.substring(
                                      key.apiKey.length - 8
                                    )}`}
                              </span>
                              <button
                                onClick={() => toggleKeyVisibility(key.id)}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                                title={showApiKey[key.id] ? "Ẩn key" : "Hiện key"}
                              >
                                {showApiKey[key.id] ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                              </button>
                              <button
                                onClick={() => copyToClipboard(key.apiKey)}
                                className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-200"
                                title="Sao chép"
                              >
                                <FiCopy className="text-lg" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-sm text-gray-600 font-medium">
                          {key.createdAt}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${
                          new Date(key.expiresAt) < new Date()
                            ? 'bg-red-100 text-red-800 border border-red-200'
                            : 'bg-green-100 text-green-800 border border-green-200'
                        }`}>
                          {key.expiresAt}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${
                          statusMapping[key.status]?.style || 'bg-gray-100 text-gray-800 border-gray-200'
                        }`}>
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            key.status === 'ACTIVE' ? 'bg-green-500' :
                            key.status === 'EXPIRED' ? 'bg-red-500' :
                            key.status === 'REVOKED' ? 'bg-gray-500' :
                            'bg-yellow-500'
                          }`}></div>
                          {statusMapping[key.status]?.label || 'Unknown'}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <button
                          onClick={() => revokeKey(key.id)}
                          className="group flex items-center justify-center w-10 h-10 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
                          title="Xóa key"
                        >
                          <FiTrash2 className="text-lg group-hover:scale-110 transition-transform duration-200" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Modern Limit Modal */}
        {isLimitModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md transform transition-all">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-t-3xl p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">Tạo API Key mới</h2>
                  <button 
                    onClick={() => setIsLimitModalOpen(false)} 
                    className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-xl transition-all duration-200"
                  >
                    <FiX className="text-2xl" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-4">
                    <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                        <span className="text-white text-sm">ℹ</span>
                      </div>
                      Thông tin quan trọng
                    </h3>
                    <ul className="text-blue-700 text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Mỗi người dùng chỉ được tạo tối đa <strong>3 API Key</strong>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Key sẽ được kích hoạt sau khi đăng nhập vào <strong>TinaCode</strong>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Hãy lưu trữ key một cách an toàn
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                    <div className="flex items-center text-amber-800">
                      <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center mr-2">
                        <span className="text-white text-sm">!</span>
                      </div>
                      <span className="font-medium">Bạn đã sử dụng {keys.length}/3 API keys</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setIsLimitModalOpen(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition-all duration-200"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    onClick={() => {
                      setIsLimitModalOpen(false);
                      if (keys.length < 3) {
                        createKey();
                      }
                    }}
                    className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                      keys.length >= 3 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white hover:shadow-lg'
                    }`}
                    disabled={keys.length >= 3}
                  >
                    {keys.length >= 3 ? 'Đã đạt giới hạn' : 'Tạo Key'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modern Confirm Delete Dialog */}
        <Transition appear show={deleteConfirm.open} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={() => setDeleteConfirm({ open: false, id: null })}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all">
                    <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
                      <Dialog.Title as="h3" className="text-xl font-bold text-white flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-3">
                          <FiTrash2 className="text-white text-xl" />
                        </div>
                        Xác nhận xóa API Key
                      </Dialog.Title>
                    </div>
                    
                    <div className="p-6">
                      <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
                        <p className="text-red-800 text-center">
                          Bạn có chắc chắn muốn xóa API key này không? 
                          <br />
                          <strong>Hành động này không thể hoàn tác.</strong>
                        </p>
                      </div>
                      
                      <div className="flex space-x-3">
                        <button
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition-all duration-200"
                          onClick={() => setDeleteConfirm({ open: false, id: null })}
                        >
                          Hủy bỏ
                        </button>
                        <button
                          className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg"
                          onClick={handleDeleteConfirm}
                        >
                          Xóa Key
                        </button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

        {/* Modern Notification */}
        {notification && (
          <div className="fixed top-6 right-6 z-50 transform transition-all duration-300 animate-bounce">
            <div className="bg-white border border-green-200 rounded-2xl shadow-2xl p-4 flex items-center space-x-3 min-w-72">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <p className="text-green-800 font-medium">{notification}</p>
                <p className="text-green-600 text-sm">Thao tác đã được thực hiện thành công</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}