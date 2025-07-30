'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiArrowRight, FiCheck, FiMessageCircle, FiCpu } from 'react-icons/fi';

export default function Step2Page() {
  const [currentSubStep, setCurrentSubStep] = useState(1);

  const subSteps = [
    {
      id: 1,
      title: 'Tìm hiểu khu vực Chat',
      content: 'Làm quen với khu vực chat và các chế độ có sẵn',
      details: [
        'Locate khu vực chat trong giao diện',
        'Hiểu về vai trò của chat trong việc tự động code'
      ],
      imagePlaceholder: '/images/guide/step2-chat-area.png'
    },
    {
      id: 2,
      title: 'Chọn Chat Mode - Agent',
      content: 'Thiết lập chế độ Agent để tự động code và đọc hiểu codebase',
      details: [
        'Tại khu vực chat, tìm phần lựa chọn chatMode',
        'Chọn "Agent" để kích hoạt chế độ tự động',
        'Agent mode giúp hiểu và tương tác với codebase hiệu quả'
      ],
      imagePlaceholder: '/images/guide/step2-agent-mode.png'
    }
  ];

  const currentStep = subSteps[currentSubStep - 1];

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
              <h1 className="text-3xl font-bold text-gray-800">Bước 2: Làm quen với các mode</h1>
            </div>
            <div className="text-sm text-gray-500">
              {currentSubStep} / {subSteps.length}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Tiến độ</span>
              <span className="text-sm text-gray-600">{Math.round((currentSubStep / subSteps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentSubStep / subSteps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Content */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {currentStep.title}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {currentStep.content}
              </p>
              
              <div className="bg-green-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-green-800 mb-3">Chi tiết thực hiện:</h3>
                <ul className="space-y-2">
                  {currentStep.details.map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <FiCheck className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-green-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Agent Mode Benefits */}
              {currentSubStep === 2 && (
                <div className="bg-blue-50 rounded-lg p-6 mb-6 border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                    <FiMessageCircle className="mr-2" />
                    Lợi ích của Agent Mode
                  </h3>
                  <ul className="space-y-3 text-blue-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Tự động code:</strong> Agent có thể viết và sửa code tự động</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Đọc hiểu codebase:</strong> Phân tích và hiểu cấu trúc dự án</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Tương tác thông minh:</strong> Đưa ra gợi ý và giải pháp phù hợp</span>
                    </li>
                  </ul>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setCurrentSubStep(Math.max(1, currentSubStep - 1))}
                  disabled={currentSubStep === 1}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiArrowLeft className="mr-2" />
                  Trước
                </button>
                
                {currentSubStep < subSteps.length ? (
                  <button
                    onClick={() => setCurrentSubStep(Math.min(subSteps.length, currentSubStep + 1))}
                    className="flex items-center bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Tiếp theo
                    <FiArrowRight className="ml-2" />
                  </button>
                ) : (
                  <Link
                    href="/user/guide/step-3"
                    className="flex items-center bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Bước tiếp theo
                    <FiArrowRight className="ml-2" />
                  </Link>
                )}
              </div>
            </div>

            {/* Right Column - Image */}
            <div>
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <div className="aspect-video bg-gray-200 rounded flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <FiMessageCircle className="text-4xl mx-auto mb-2" />
                    <p>Hình ảnh minh họa</p>
                    <p className="text-sm">{currentStep.title}</p>
                  </div>
                </div>
              </div>
              
              {/* Step Navigator */}
              <div className="grid grid-cols-2 gap-2">
                {subSteps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentSubStep(step.id)}
                    className={`p-3 rounded text-sm transition-all ${
                      currentSubStep === step.id
                        ? 'bg-green-500 text-white'
                        : currentSubStep > step.id
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {currentSubStep > step.id ? <FiCheck className="mx-auto mb-1" /> : step.id}
                    <div className="text-xs">{step.title}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 rounded-b-2xl">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              💡 <strong>Mẹo:</strong> Agent mode hoạt động tốt nhất khi bạn cung cấp ngữ cảnh rõ ràng về tác vụ cần thực hiện
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/user/guide/step-1"
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                ← Bước trước
              </Link>
              <Link 
                href="/user/guide/step-3"
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Bước sau →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}