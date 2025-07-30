// src/app/user/page.tsx
'use client';
import Link from 'next/link';
import { FiCode, FiCpu, FiZap, FiStar, FiArrowRight, FiDownload, FiKey, FiBook } from 'react-icons/fi';

export default function UserPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 rounded-3xl p-12 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-center mb-8">
            <img src="/images/logoTina.jpg" alt="TinaCode Logo" className="w-20 h-20 rounded-full mr-6 shadow-2xl animate-bounce" />
            <div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4">
                TinaCode
              </h1>
              <p className="text-2xl font-light text-blue-100">Trợ Lý Lập Trình AI Của Bạn</p>
            </div>
          </div>
          
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6 text-white">
              Cách Mạng Hóa Trải Nghiệm Lập Trình Của Bạn Với Trí Tuệ Nhân Tạo
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              TinaCode là trợ lý lập trình AI tiên tiến giúp các lập trình viên viết code tốt hơn và nhanh hơn. 
              Với các gợi ý thông minh, hoàn thiện code và hỗ trợ thời gian thực, 
              hành trình lập trình của bạn trở nên hiệu quả và thú vị hơn.
            </p>
            
            <div className="flex justify-center space-x-6">
              <Link 
                href="/user/download" 
                className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
              >
                <FiDownload className="mr-2" />
                Bắt Đầu Ngay
              </Link>
              <Link 
                href="/user/guide" 
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105 flex items-center"
              >
                <FiBook className="mr-2" />
                Tìm Hiểu Thêm
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-white opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-300 opacity-20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-10 w-8 h-8 bg-blue-300 opacity-30 rounded-full animate-ping"></div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
          <div className="flex items-center mb-6">
            <div className="bg-blue-500 p-4 rounded-xl mr-4">
              <FiCpu className="text-2xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-blue-800">Hỗ Trợ AI</h3>
          </div>
          <p className="text-gray-700 text-lg mb-6">
            Thuật toán học máy tiên tiến cung cấp gợi ý code thông minh và hỗ trợ debug tự động.
          </p>
          <Link 
            href="/user/access-keys" 
            className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors"
          >
            Quản Lý API Keys <FiArrowRight className="ml-2" />
          </Link>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
          <div className="flex items-center mb-6">
            <div className="bg-green-500 p-4 rounded-xl mr-4">
              <FiZap className="text-2xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-green-800">Siêu Nhanh</h3>
          </div>
          <p className="text-gray-700 text-lg mb-6">
            Nhận gợi ý và hoàn thiện code tức thì, thích ứng với phong cách lập trình và yêu cầu dự án của bạn.
          </p>
          <Link 
            href="/user/download" 
            className="inline-flex items-center text-green-600 font-semibold hover:text-green-800 transition-colors"
          >
            Tải Ứng Dụng <FiArrowRight className="ml-2" />
          </Link>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border border-purple-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
          <div className="flex items-center mb-6">
            <div className="bg-purple-500 p-4 rounded-xl mr-4">
              <FiCode className="text-2xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-purple-800">Đa Ngôn Ngữ</h3>
          </div>
          <p className="text-gray-700 text-lg mb-6">
            Hỗ trợ tất cả các ngôn ngữ lập trình chính với trợ giúp nhận biết ngữ cảnh và khuyến nghị thực hành tốt nhất.
          </p>
          <Link 
            href="/user/guide" 
            className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-800 transition-colors"
          >
            Xem Hướng Dẫn <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-3xl shadow-xl p-10">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Tại Sao Chọn TinaCode?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="group hover:scale-105 transition-transform duration-300">
            <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">99%</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Độ Chính Xác</h3>
            <p className="text-gray-600">Gợi ý code chính xác và phát hiện lỗi tốt nhất</p>
          </div>
          <div className="group hover:scale-105 transition-transform duration-300">
            <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">50+</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Ngôn Ngữ</h3>
            <p className="text-gray-600">Hỗ trợ tất cả ngôn ngữ lập trình chính</p>
          </div>
          <div className="group hover:scale-105 transition-transform duration-300">
            <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">10x</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Nhanh Hơn</h3>
            <p className="text-gray-600">Tăng tốc quy trình phát triển của bạn</p>
          </div>
          <div className="group hover:scale-105 transition-transform duration-300">
            <div className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">24/7</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Luôn Sẵn Sàng</h3>
            <p className="text-gray-600">Sẵn sàng hỗ trợ lập trình mọi lúc</p>
          </div>
        </div>
      </div>

      {/* Getting Started Section */}
      <div className="bg-gradient-to-r from-gray-50 to-white rounded-3xl p-10 border border-gray-200">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Bắt Đầu Hành Trình Trong 3 Bước Đơn Giản</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-3xl font-bold text-white">1</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Tải TinaCode</h3>
            <p className="text-gray-600 text-lg">Tải ứng dụng cho hệ điều hành của bạn và cài đặt trong vài phút.</p>
          </div>
          <div className="text-center group">
            <div className="bg-gradient-to-br from-green-500 to-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-3xl font-bold text-white">2</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Tạo API Key</h3>
            <p className="text-gray-600 text-lg">Tạo và quản lý API keys của bạn để truy cập tất cả tính năng TinaCode.</p>
          </div>
          <div className="text-center group">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-3xl font-bold text-white">3</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Bắt Đầu Lập Trình</h3>
            <p className="text-gray-600 text-lg">Bắt đầu trải nghiệm sức mạnh của lập trình hỗ trợ AI.</p>
          </div>
        </div>
      </div>
    </div>
  );
}