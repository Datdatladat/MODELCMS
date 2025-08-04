'use client';

import { BiSolidEdit } from 'react-icons/bi';
import { MdInfoOutline, MdToggleOn, MdToggleOff } from 'react-icons/md';
import { Model } from '@/types/models';
import { enableModel, disableModel } from '@/service/model';
import { useState } from 'react';
import ModelInfoModal from './ModelInfoModal';



interface ModelTableProps {
    models: Model[];
    onEditClick: (model: Model) => void;
    onToggleStatus: (id: string, newStatus: boolean) => void;
}

export default function ProviderTable({ models, onEditClick, onToggleStatus }: ModelTableProps) {
    const [selectedModel, setSelectedModel] = useState<Model | null>(null); // Add this state
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false); // Add this state
    const handleToggleStatus = async (model: Model) => {
        try {
            if (model.enabled) {
                await disableModel(model.id);
            } else {
                await enableModel(model.id);
            }

            // Gọi callback để cập nhật UI (ví dụ reload list)
            onToggleStatus(model.id, !model.enabled);
        } catch (error : any) {
            console.error('Lỗi khi thêm model:', error?.response?.data || error.message || error);
            alert("Không thể cập nhật trạng thái model");
        }
    };

    const handleInfoClick = (model: Model) => { // Add this handler
        setSelectedModel(model);
        setIsInfoModalOpen(true);
    };
    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Danh sách Model</h2>

            {selectedModel && (
                <ModelInfoModal 
                    isOpen={isInfoModalOpen} 
                    onClose={() => setIsInfoModalOpen(false)} 
                    model={selectedModel} 
                />
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-base font-medium text-gray-500 uppercase tracking-wider">Mã model</th>
                            <th className="px-6 py-4 text-left text-base font-medium text-gray-500 uppercase tracking-wider">Tên hiển thị</th>
                            <th className="px-6 py-4 text-left text-base font-medium text-gray-500 uppercase tracking-wider">Nhà cung cấp</th>
                            <th className="px-6 py-4 text-left text-base font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                            <th className="px-6 py-4 text-base font-medium text-gray-500 uppercase tracking-wider text-center">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {models.length > 0 ? (
                            models.map((model) => (
                                <tr key={model.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-800">{model.modelCode}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-800 max-w-xs">
                                        {model.displayName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-800">{model.provider.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-800">
                                        {model.enabled ? 'Hoạt động' : 'Không hoạt động'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => onEditClick(model)}
                                                className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                                                title="Chỉnh sửa"
                                            >
                                                <BiSolidEdit className="w-6 h-6" />
                                            </button>
                                            <button
                                                onClick={() => handleToggleStatus(model)}
                                                className={`p-2 rounded-lg transition-colors ${model.enabled
                                                        ? 'text-green-600 hover:text-green-800 hover:bg-green-50'
                                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                                    }`}
                                                title={model.enabled ? 'Vô hiệu hóa' : 'Kích hoạt'}
                                            >
                                                {model.enabled ? <MdToggleOn className="w-10 h-10" /> : <MdToggleOff className="w-10 h-10" />}
                                            </button>
                                            <button
                                                onClick={() => handleInfoClick(model)}
                                                className="text-yellow-600 hover:text-yellow-800 p-2 rounded-lg hover:bg-yellow-50 transition-colors"
                                                title="Chi tiết"
                                            >
                                                <MdInfoOutline className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-lg text-gray-500">
                                    Chưa có model nào được thêm.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}