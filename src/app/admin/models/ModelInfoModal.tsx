'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { MdClose, MdVisibility, MdVisibilityOff, MdContentCopy } from 'react-icons/md';
import { Model } from '@/types/models';

interface ModelInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  model: Model;
}

export default function ModelInfoModal({ isOpen, onClose, model }: ModelInfoModalProps) {
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyApiKey = async () => {
    try {
      await navigator.clipboard.writeText(model.provider.apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy API Key:', err);
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition
          show={isOpen}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" />
        </Transition>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
            {/* Panel */}
            <Transition
              show={isOpen}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 sm:p-8 shadow-2xl transition-all">
                <div className="flex items-center justify-between">
                  <Dialog.Title
                    as="h3"
                    className="text-3xl font-bold text-gray-900 tracking-tight"
                  >
                    Thông tin Model
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200"
                    aria-label="Đóng"
                  >
                    <MdClose className="w-6 h-6" />
                  </button>
                </div>

                <div className="mt-8 space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h4 className="text-base font-medium text-gray-500">Mã Model</h4>
                      <p className="text-xl font-semibold text-gray-900">{model.modelCode}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-base font-medium text-gray-500">Tên hiển thị</h4>
                      <p className="text-xl font-semibold text-gray-900">{model.displayName}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-base font-medium text-gray-500">Trạng thái</h4>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                          model.enabled
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {model.enabled ? 'Hoạt động' : 'Không hoạt động'}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-base font-medium text-gray-500">Nhà cung cấp</h4>
                      <p className="text-xl font-semibold text-gray-900">{model.provider.name}</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Chi tiết nhà cung cấp</h4>
                    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-base font-medium text-gray-500">API Key</h4>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setShowApiKey(!showApiKey)}
                              className="p-1 text-gray-500 hover:text-gray-700 transition-all duration-200"
                              aria-label={showApiKey ? 'Ẩn API Key' : 'Hiện API Key'}
                            >
                              {showApiKey ? (
                                <MdVisibilityOff className="w-5 h-5" />
                              ) : (
                                <MdVisibility className="w-5 h-5" />
                              )}
                            </button>
                            <button
                              onClick={handleCopyApiKey}
                              className="p-1 text-gray-500 hover:text-gray-700 transition-all duration-200"
                              aria-label="Sao chép API Key"
                            >
                              <MdContentCopy className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        <div className="relative">
                          <p
                            className="text-lg font-mono bg-gray-100 px-3 py-1.5 rounded-lg text-gray-900 break-all"
                          >
                            {showApiKey ? model.provider.apiKey : '••••••••••••••••••••'}
                          </p>
                          {copied && (
                            <span className="absolute top-0 right-0 mt-2 mr-2 text-sm text-emerald-600">
                              Đã sao chép!
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-base font-medium text-gray-500">Base URL</h4>
                        <p className="text-lg text-gray-900 break-all">{model.provider.baseUrl}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-3 bg-indigo-600 text-base text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
                  >
                    Đóng
                  </button>
                </div>
              </Dialog.Panel>
            </Transition>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}