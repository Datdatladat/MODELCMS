'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiArrowRight, FiDownload, FiPlay, FiCheck } from 'react-icons/fi';

export default function Step1Page() {
  const [currentSubStep, setCurrentSubStep] = useState(1);

  const subSteps = [
    {
      id: 1,
      title: 'Khởi động ứng dụng',
      content: 'Sau khi cài đặt thành công, khởi động ứng dụng theo hệ điều hành của bạn',
      details: [
        'Windows: Click void.exe',
        'Mac: Click TinaCode'
      ],
      imagePlaceholder: '/images/guide/step1-startup.png'
    },
    {
      id: 2,
      title: 'Màn hình chào mừng',
      content: 'Ứng dụng sẽ hiển thị màn hình khởi động',
      details: [
        'Click "Get Started" để tiếp tục',
        'Chờ ứng dụng tải các thành phần cần thiết'
      ],
      imagePlaceholder: '/images/guide/step1-welcome.png'
    },
    {
      id: 3,
      title: 'Cấu hình Provider',
      content: 'Thiết lập kết nối với các IDE hiện có',
      details: [
        'Tại màn hình thêm provider, click "Next"',
        'Chọn một trong các tùy chọn kết nối có sẵn'
      ],
      imagePlaceholder: '/images/guide/step1-provider.png'
    },
    {
      id: 4,
      title: 'Lựa chọn kết nối',
      content: 'Chọn cách thức kết nối phù hợp',
      details: [
        'Transfer from VS Code: Kết nối với VS Code hiện có',
        'Transfer from Cursor: Kết nối với Cursor',
        'Transfer from Windsurf: Kết nối với Windsurf', 
        'Enter the Void: Bắt đầu với giao diện mới'
      ],
      imagePlaceholder: '/images/guide/step1-options.png'
    },
    {
      id: 5,
      title: 'Giao diện làm việc',
      content: 'Sau khi hoàn tất, giao diện VS Code quen thuộc sẽ hiện lên',
      details: [
        'Kéo project vào workspace',
        'Bắt đầu coding với TinaCode'
      ],
      imagePlaceholder: '/images/guide/step1-interface.png'
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
              <h1 className="text-3xl font-bold text-gray-800">Bước 1: Chi tiết cài đặt</h1>
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
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
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
              
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-blue-800 mb-3">Chi tiết thực hiện:</h3>
                <ul className="space-y-2">
                  {currentStep.details.map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <FiCheck className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-blue-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

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
                    className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Tiếp theo
                    <FiArrowRight className="ml-2" />
                  </button>
                ) : (
                  <Link
                    href="/user/guide/step-2"
                    className="flex items-center bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
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
                  {/* Placeholder for actual image */}
                  <div className="text-center text-gray-500">
                    <FiPlay className="text-4xl mx-auto mb-2" />
                    <p>Hình ảnh minh họa</p>
                    <p className="text-sm">{currentStep.title}</p>
                  </div>
                </div>
              </div>
              
              {/* Step Navigator */}
              <div className="grid grid-cols-5 gap-2">
                {subSteps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentSubStep(step.id)}
                    className={`p-2 rounded text-sm transition-all ${
                      currentSubStep === step.id
                        ? 'bg-blue-500 text-white'
                        : currentSubStep > step.id
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {currentSubStep > step.id ? <FiCheck className="mx-auto" /> : step.id}
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
              💡 <strong>Mẹo:</strong> Nếu gặp lỗi trong quá trình cài đặt, hãy thử chạy ứng dụng với quyền Administrator
            </div>
            <Link 
              href="/user/download"
              className="flex items-center text-blue-600 hover:text-blue-700 text-sm"
            >
              <FiDownload className="mr-1" />
              Tải ứng dụng
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}