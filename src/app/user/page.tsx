// src/app/user/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiCode, FiCpu, FiZap, FiStar, FiArrowRight, FiDownload, FiKey, FiBook, FiShield, FiGlobe, FiTrendingUp } from 'react-icons/fi';
import ScrollReveal from '@/components/ScrollReveal';

export default function UserPage() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <ScrollReveal>
        <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-orange-500/5 to-yellow-500/10 rounded-3xl"></div>
        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-red-100 p-12 lg:p-16">
          {/* Floating Elements */}
          <div className="absolute top-8 right-8 w-16 h-16 bg-gradient-to-br from-red-400 to-orange-400 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute bottom-8 left-8 w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute top-1/2 right-12 w-8 h-8 bg-gradient-to-br from-red-300 to-pink-300 rounded-full opacity-40 animate-ping"></div>
          
          <div className="text-center max-w-5xl mx-auto relative z-10">
            <div className="flex items-center justify-center mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity animate-pulse"></div>
                <Image 
                  src="/images/logoTina.jpg" 
                  alt="TinaCode Logo" 
                  width={80} 
                  height={80} 
                  className="relative rounded-full border-4 border-white shadow-2xl group-hover:scale-110 transition-transform duration-300" 
                />
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                TinaCode
              </span>
            </h1>
            
            <p className="text-2xl lg:text-3xl text-gray-600 font-light mb-4">
              Trợ Lý Lập Trình AI Thông Minh
            </p>
            
            <p className="text-lg text-gray-500 mb-12 max-w-3xl mx-auto leading-relaxed">
              Cách mạng hóa trải nghiệm lập trình của bạn với AI tiên tiến. 
              TinaCode giúp bạn viết code nhanh hơn, thông minh hơn và hiệu quả hơn.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/user/download" 
                className="group bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center"
              >
                <FiDownload className="mr-3 group-hover:scale-110 transition-transform" />
                Bắt Đầu Ngay
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/user/guide" 
                className="group border-2 border-red-200 hover:border-red-300 text-red-600 hover:bg-red-50 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                <FiBook className="mr-3 group-hover:scale-110 transition-transform" />
                Tìm Hiểu Thêm
              </Link>
            </div>
          </div>
        </div>
        </section>
      </ScrollReveal>

      {/* Features Section */}
      <ScrollReveal>
        <section>
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Tính Năng Nổi Bật
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Khám phá các tính năng mạnh mẽ giúp nâng cao hiệu suất lập trình của bạn
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="group bg-white rounded-3xl p-8 border border-blue-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FiCpu className="text-2xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">AI Thông Minh</h3>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Thuật toán học máy tiên tiến cung cấp gợi ý code thông minh, phát hiện lỗi tự động và tối ưu hóa hiệu suất.
            </p>
            <Link 
              href="/user/access-keys" 
              className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors group-hover:translate-x-2 transition-transform"
            >
              Quản Lý API Keys 
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
          
          <div className="group bg-white rounded-3xl p-8 border border-green-100 hover:border-green-200 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FiZap className="text-2xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Siêu Nhanh</h3>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Phản hồi tức thì với tốc độ xử lý vượt trội. Nhận gợi ý và hoàn thiện code trong tích tắc.
            </p>
            <Link 
              href="/user/download" 
              className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors group-hover:translate-x-2 transition-transform"
            >
              Tải Ứng Dụng 
              <FiArrowRight className="ml-2" />
            </Link>
          </div>

          <div className="group bg-white rounded-3xl p-8 border border-purple-100 hover:border-purple-200 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FiCode className="text-2xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Đa Ngôn Ngữ</h3>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Hỗ trợ 50+ ngôn ngữ lập trình với khả năng hiểu ngữ cảnh và đưa ra khuyến nghị tối ưu.
            </p>
            <Link 
              href="/user/guide" 
              className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700 transition-colors group-hover:translate-x-2 transition-transform"
            >
              Xem Hướng Dẫn 
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
        </section>
      </ScrollReveal>

      {/* Stats Section */}
      <ScrollReveal>
        <section className="bg-gradient-to-r from-gray-50 to-white rounded-3xl p-12 lg:p-16 border border-gray-100">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Tại Sao Chọn TinaCode?
          </h2>
          <p className="text-xl text-gray-600">Những con số ấn tượng về hiệu quả và chất lượng</p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform">
              99%
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Độ Chính Xác</h3>
            <p className="text-gray-600">Gợi ý code chính xác và phát hiện lỗi hiệu quả nhất</p>
          </div>
          
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform">
              50+
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Ngôn Ngữ</h3>
            <p className="text-gray-600">Hỗ trợ đầy đủ các ngôn ngữ lập trình phổ biến</p>
          </div>
          
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform">
              10x
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Nhanh Hơn</h3>
            <p className="text-gray-600">Tăng tốc quy trình phát triển đáng kể</p>
          </div>
          
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform">
              24/7
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Luôn Sẵn Sàng</h3>
            <p className="text-gray-600">Hỗ trợ lập trình không giới hạn thời gian</p>
          </div>
        </div>
        </section>
      </ScrollReveal>

      {/* Getting Started Section */}
      <ScrollReveal>
        <section className="bg-white rounded-3xl border border-gray-100 p-12 lg:p-16 shadow-xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Bắt Đầu Trong 3 Bước
          </h2>
          <p className="text-xl text-gray-600">Đơn giản, nhanh chóng và hiệu quả</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="text-center group">
            <div className="relative mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Tải TinaCode</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Tải và cài đặt ứng dụng cho hệ điều hành của bạn. Quá trình cài đặt chỉ mất vài phút.
            </p>
            <Link 
              href="/user/download"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              <FiDownload className="mr-2" />
              Tải Ngay
            </Link>
          </div>
          
          <div className="text-center group">
            <div className="relative mb-8">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-400 rounded-full animate-pulse"></div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Tạo API Key</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Tạo và quản lý API keys để truy cập đầy đủ tính năng AI mạnh mẽ của TinaCode.
            </p>
            <Link 
              href="/user/access-keys"
              className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold transition-colors"
            >
              <FiKey className="mr-2" />
              Tạo Key
            </Link>
          </div>
          
          <div className="text-center group">
            <div className="relative mb-8">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-ping"></div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Bắt Đầu Code</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Trải nghiệm sức mạnh của lập trình được hỗ trợ bởi trí tuệ nhân tạo tiên tiến.
            </p>
            <Link 
              href="/user/guide"
              className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold transition-colors"
            >
              <FiBook className="mr-2" />
              Hướng Dẫn
            </Link>
          </div>
        </div>
        </section>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal>
        <section className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-3xl p-12 lg:p-16 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Sẵn sàng thay đổi cách bạn lập trình?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Hãy tham gia cùng hàng nghìn lập trình viên đã chọn TinaCode để nâng cao hiệu suất và chất lượng code.
          </p>
          <Link 
            href="/user/download"
            className="inline-flex items-center bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            <FiDownload className="mr-3" />
            Bắt Đầu Miễn Phí Ngay
            <FiArrowRight className="ml-2" />
          </Link>
        </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
