'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiPlay, FiBook, FiSettings, FiCode, FiCpu } from 'react-icons/fi';

const guideSteps = [
  {
    id: 1,
    title: 'Chi tiết cài đặt',
    description: 'Hướng dẫn cài đặt và khởi động ứng dụng',
    icon: <FiSettings className="text-2xl" />,
    color: 'blue'
  },
  {
    id: 2,
    title: 'Làm quen với các mode',
    description: 'Tìm hiểu về các chế độ chat và lựa chọn model',
    icon: <FiCode className="text-2xl" />,
    color: 'green'
  },
  {
    id: 3,
    title: 'Lựa chọn Model',
    description: 'Hướng dẫn chọn model phù hợp cho từng tác vụ',
    icon: <FiCpu className="text-2xl" />,
    color: 'purple'
  }
];

export default function GuidePage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <div className="flex items-center mb-6">
          <FiBook className="text-3xl text-blue-600 mr-4" />
          <h1 className="text-3xl font-bold text-gray-800">Hướng dẫn sử dụng TinaCode</h1>
        </div>
        
        <p className="text-xl text-gray-600 mb-8">
          Hướng dẫn chi tiết từng bước để bắt đầu sử dụng TinaCode một cách hiệu quả
        </p>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {guideSteps.map((step) => (
            <div 
              key={step.id}
              className={`bg-${step.color}-50 rounded-xl p-6 border border-${step.color}-100 hover:shadow-md transition-all cursor-pointer`}
            >
              <div className={`text-${step.color}-600 mb-4`}>
                {step.icon}
              </div>
              <h3 className={`text-xl font-semibold text-${step.color}-800 mb-3`}>
                Bước {step.id}: {step.title}
              </h3>
              <p className="text-gray-700 mb-4">{step.description}</p>
              <Link 
                href={`/user/guide/step-${step.id}`}
                className={`inline-flex items-center text-${step.color}-600 hover:text-${step.color}-700 font-medium`}
              >
                Xem chi tiết <FiArrowRight className="ml-2" />
              </Link>
            </div>
          ))}
        </div>

        {/* Quick Start Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Bắt đầu nhanh</h2>
          <p className="text-lg opacity-90 mb-6">
            Muốn bắt đầu ngay? Theo dõi hướng dẫn từng bước để thiết lập TinaCode trong vài phút
          </p>
          <Link 
            href="/user/guide/step-1"
            className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            <FiPlay className="mr-2" />
            Bắt đầu hướng dẫn
          </Link>
        </div>

        {/* Features Overview */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Tính năng chính</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Hỗ trợ đa nền tảng</h3>
              <p className="text-gray-600">
                Tương thích với VS Code, Cursor, và Windsurf. Dễ dàng chuyển đổi từ các IDE quen thuộc.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Nhiều AI Model</h3>
              <p className="text-gray-600">
                Lựa chọn từ Tina-code-v1, DeepSeek-v3, và Gemma3 phù hợp với từng tác vụ cụ thể.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Agent Mode</h3>
              <p className="text-gray-600">
                Chế độ Agent thông minh giúp tự động code và hiểu codebase một cách hiệu quả.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Giao diện quen thuộc</h3>
              <p className="text-gray-600">
                Giao diện giống VS Code giúp bạn làm quen nhanh chóng và tăng năng suất.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}