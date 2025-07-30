'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiCheck, FiCpu, FiZap, FiMessageCircle } from 'react-icons/fi';

const models = [
  {
    name: 'Tina-code-v1',
    params: '32B tham số',
    bestFor: 'Coding task nhẹ nhàng, chat',
    color: 'blue',
    description: 'Model cơ bản phù hợp cho các tác vụ code đơn giản và trò chuyện',
    icon: <FiMessageCircle className="text-xl" />
  },
  {
    name: 'DeepSeek-v3',
    params: '637B tham số',
    bestFor: 'Coding, agent, tự động code',
    color: 'green',
    description: 'Model mạnh mẽ được khuyến nghị cho coding và agent tasks',
    icon: <FiCpu className="text-xl" />,
    recommended: true
  },
  {
    name: 'Gemma3',
    params: '12B tham số', 
    bestFor: 'Tác vụ chat (chat mode)',
    color: 'purple',
    description: 'Model tối ưu cho việc trò chuyện và hỗ trợ người dùng',
    icon: <FiZap className="text-xl" />
  }
];

export default function Step3Page() {
  const [selectedModel, setSelectedModel] = useState('DeepSeek-v3');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm">
        {/* Header */}
        <div className="p-8 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link 
                href="/user/guide"
                className="flex items-center text-blue-600 hover:text-blue-700 mr-4"
              >
                <FiArrowLeft className="mr-2" />
                Quay lại
              </Link>
              <h1 className="text-3xl font-bold text-gray-800">Bước 3: Lựa chọn Model</h1>
            </div>
            <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              Bước cuối
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Tiến độ</span>
              <span className="text-sm text-gray-600">100%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full w-full"></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Chọn Model phù hợp cho công việc của bạn
            </h2>
            <p className="text-lg text-gray-600">
              TinaCode cung cấp 3 model AI khác nhau, mỗi model được tối ưu cho những tác vụ cụ thể. 
              Hãy chọn model phù hợp với nhu cầu sử dụng của bạn.
            </p>
          </div>

          {/* Model Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {models.map((model) => (
              <div 
                key={model.name}
                className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all hover:shadow-lg ${
                  selectedModel === model.name 
                    ? `border-${model.color}-500 bg-${model.color}-50` 
                    : 'border-gray-200 hover:border-gray-300'
                } ${model.recommended ? 'ring-2 ring-yellow-400' : ''}`}
                onClick={() => setSelectedModel(model.name)}
              >
                {model.recommended && (
                  <div className="absolute -top-3 left-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                    KHUYẾN NGHỊ
                  </div>
                )}
                
                <div className={`text-${model.color}-600 mb-4`}>
                  {model.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">{model.name}</h3>
                <p className={`text-${model.color}-600 font-semibold mb-2`}>{model.params}</p>
                <p className="text-gray-600 text-sm mb-3">{model.description}</p>
                
                <div className={`bg-${model.color}-100 rounded-lg p-3`}>
                  <p className={`text-${model.color}-800 text-sm font-medium`}>
                    <strong>Phù hợp cho:</strong> {model.bestFor}
                  </p>
                </div>
                
                {selectedModel === model.name && (
                  <div className={`absolute top-4 right-4 bg-${model.color}-500 text-white rounded-full p-1`}>
                    <FiCheck className="text-sm" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Model Comparison Table */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">So sánh chi tiết</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-800">Model</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-800">Tham số</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-800">Coding</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-800">Chat</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-800">Agent</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium">Tina-code-v1</td>
                    <td className="py-3 px-4">32B</td>
                    <td className="py-3 px-4"><span className="text-yellow-600">⭐⭐⭐</span></td>
                    <td className="py-3 px-4"><span className="text-green-600">⭐⭐⭐⭐</span></td>
                    <td className="py-3 px-4"><span className="text-yellow-600">⭐⭐</span></td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-green-50">
                    <td className="py-3 px-4 font-medium">DeepSeek-v3</td>
                    <td className="py-3 px-4">637B</td>
                    <td className="py-3 px-4"><span className="text-green-600">⭐⭐⭐⭐⭐</span></td>
                    <td className="py-3 px-4"><span className="text-green-600">⭐⭐⭐⭐</span></td>
                    <td className="py-3 px-4"><span className="text-green-600">⭐⭐⭐⭐⭐</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Gemma3</td>
                    <td className="py-3 px-4">12B</td>
                    <td className="py-3 px-4"><span className="text-yellow-600">⭐⭐</span></td>
                    <td className="py-3 px-4"><span className="text-green-600">⭐⭐⭐⭐⭐</span></td>
                    <td className="py-3 px-4"><span className="text-yellow-600">⭐⭐</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Usage Recommendations */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-4 flex items-center">
              <FiCpu className="mr-2" />
              Gợi ý sử dụng model
            </h3>
            <div className="space-y-3 text-blue-700">
              <div className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Lập trình viên mới:</strong> Bắt đầu với Tina-code-v1 để làm quen</span>
              </div>
              <div className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Dự án phức tạp:</strong> Sử dụng DeepSeek-v3 cho hiệu suất tốt nhất</span>
              </div>
              <div className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Hỗ trợ và tư vấn:</strong> Gemma3 excel trong việc trả lời câu hỏi</span>
              </div>
            </div>
          </div>

          {/* Completion Actions */}
          <div className="flex justify-between items-center">
            <Link
              href="/user/guide/step-2"
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              <FiArrowLeft className="mr-2" />
              Bước trước
            </Link>
            
            <Link
              href="/user/guide"
              className="flex items-center bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <FiCheck className="mr-2" />
              Hoàn thành hướng dẫn
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 rounded-b-2xl">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              🎉 <strong>Chúc mừng!</strong> Bạn đã hoàn thành hướng dẫn sử dụng TinaCode
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/user/access-keys"
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Quản lý API Keys →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}