// src/app/user/page.tsx
'use client';
import Link from 'next/link';

export default function UserPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Chào mừng trở lại!</h1>
        <p className="text-xl text-gray-600 mb-8">Chọn một mục từ sidebar để bắt đầu</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">Access Keys</h2>
            <p className="text-lg text-gray-700 mb-4">Quản lý các API keys của bạn</p>
            <Link 
              href="/user/access-keys" 
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors"
            >
              Truy cập ngay
            </Link>
          </div>
          
          <div className="bg-green-50 rounded-xl p-6 border border-green-100">
            <h2 className="text-2xl font-semibold text-green-800 mb-3">Download App</h2>
            <p className="text-lg text-gray-700 mb-4">Tải ứng dụng cho hệ điều hành của bạn</p>
            <Link 
              href="/user/download" 
              className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors"
            >
              Truy cập ngay
            </Link>
          </div>

          <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
            <h2 className="text-2xl font-semibold text-purple-800 mb-3">Hướng dẫn sử dụng</h2>
            <p className="text-lg text-gray-700 mb-4">Tìm hiểu cách sử dụng TinaCode hiệu quả</p>
            <Link 
              href="/user/guide" 
              className="inline-block bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors"
            >
              Truy cập ngay
            </Link>
          </div>
        </div>

        {/* Quick Stats or Additional Info */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Bắt đầu nhanh</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-blue-600 mb-2">01</div>
              <h3 className="font-semibold text-gray-800 mb-2">Tải ứng dụng</h3>
              <p className="text-gray-600 text-sm">Download TinaCode cho hệ điều hành của bạn</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-green-600 mb-2">02</div>
              <h3 className="font-semibold text-gray-800 mb-2">Tạo API Key</h3>
              <p className="text-gray-600 text-sm">Quản lý và tạo API keys để truy cập dịch vụ</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-purple-600 mb-2">03</div>
              <h3 className="font-semibold text-gray-800 mb-2">Đọc hướng dẫn</h3>
              <p className="text-gray-600 text-sm">Tìm hiểu cách sử dụng các tính năng nâng cao</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}