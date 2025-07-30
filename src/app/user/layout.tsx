// src/app/user/layout.tsx (Updated with guide link)
'use client';

import { Inter } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { FiKey, FiDownload, FiHome, FiBook, FiLogOut } from 'react-icons/fi';

const inter = Inter({ subsets: ['latin'] });

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    // Logic logout
    router.push('/');
  };

  const isActive = (path: string) => pathname === path || pathname.startsWith(path);

  return (
    <html lang="en" className={inter.className}>
      <body className="flex h-screen bg-gray-50">
        {/* Sidebar cố định */}
        <div className="w-72 bg-white border-r border-gray-200 flex flex-col fixed h-full">
          <div className="p-6 border-b border-gray-200 flex items-center space-x-4">
            <img src="/images/logoTina.jpg" alt="Tina Logo" className="w-10 h-10 rounded-full transition-transform transform hover:scale-110 hover:rotate-12" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent transition-all duration-500 hover:scale-110 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 cursor-pointer animate-pulse">
              Tina Code
            </h1>
          </div>

          <nav className="flex-1 p-4 space-y-2 mt-4">
            <Link
              href="/user"
              className={`flex items-center px-5 py-4 rounded-xl text-lg transition-all duration-300 ${pathname === '/user'
                ? 'bg-blue-50 text-blue-600 font-semibold shadow-md'
                : 'text-gray-600 hover:bg-gray-100 hover:shadow-sm'
                }`}
            >
              <FiHome className="mr-3 text-xl transition-transform transform hover:scale-110" />
              Trang chủ
            </Link>
            <Link
              href="/user/access-keys"
              className={`flex items-center px-5 py-4 rounded-xl text-lg transition-all duration-300 ${isActive('/user/access-keys')
                ? 'bg-blue-50 text-blue-600 font-semibold shadow-md'
                : 'text-gray-600 hover:bg-gray-100 hover:shadow-sm'
                }`}
            >
              <FiKey className="mr-3 text-xl transition-transform transform hover:scale-110" />
              Tạo APiKey
            </Link>
            <Link
              href="/user/download"
              className={`flex items-center px-5 py-4 rounded-xl text-lg transition-all duration-300 ${isActive('/user/download')
                ? 'bg-blue-50 text-blue-600 font-semibold shadow-md'
                : 'text-gray-600 hover:bg-gray-100 hover:shadow-sm'
                }`}
            >
              <FiDownload className="mr-3 text-xl transition-transform transform hover:scale-110" />
              Tải xuống
            </Link>
            <Link
              href="/user/guide"
              className={`flex items-center px-5 py-4 rounded-xl text-lg transition-all duration-300 ${isActive('/user/guide')
                ? 'bg-blue-50 text-blue-600 font-semibold shadow-md'
                : 'text-gray-600 hover:bg-gray-100 hover:shadow-sm'
                }`}
            >
              <FiBook className="mr-3 text-xl transition-transform transform hover:scale-110" />
              Hướng dẫn sử dụng
            </Link>
          </nav>

          {/* Nút logout */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 text-gray-600 hover:text-red-600 px-4 py-3 rounded-lg transition-colors duration-300 hover:shadow-md"
            >
              <FiLogOut className="text-xl transition-transform transform hover:scale-110" />
              <span className="text-lg">Đăng xuất</span>
            </button>
          </div>
        </div>

        {/* Nội dung chính cách sidebar */}
        <div className="flex-1 ml-72 p-8">
          {children}
        </div>
      </body>
    </html>
  );
}