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
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">User Dashboard</h1>
          </div>

          <nav className="flex-1 p-4 space-y-2 mt-4">
            <Link
              href="/user"
              className={`flex items-center px-5 py-4 rounded-xl text-lg transition-all ${pathname === '/user'
                ? 'bg-blue-50 text-blue-600 font-semibold'
                : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              <FiHome className="mr-3 text-xl" />
              Trang chủ
            </Link>
            <Link
              href="/user/access-keys"
              className={`flex items-center px-5 py-4 rounded-xl text-lg transition-all ${isActive('/user/access-keys')
                ? 'bg-blue-50 text-blue-600 font-semibold'
                : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              <FiKey className="mr-3 text-xl" />
              Quản lý Access Keys
            </Link>
            <Link
              href="/user/download"
              className={`flex items-center px-5 py-4 rounded-xl text-lg transition-all ${isActive('/user/download')
                ? 'bg-blue-50 text-blue-600 font-semibold'
                : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              <FiDownload className="mr-3 text-xl" />
              Download App
            </Link>
            <Link
              href="/user/guide"
              className={`flex items-center px-5 py-4 rounded-xl text-lg transition-all ${isActive('/user/guide')
                ? 'bg-blue-50 text-blue-600 font-semibold'
                : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              <FiBook className="mr-3 text-xl" />
              Hướng dẫn sử dụng
            </Link>
          </nav>

          {/* Nút logout */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 text-gray-600 hover:text-red-600 px-4 py-3 rounded-lg transition-colors"
            >
              <FiLogOut className="text-xl" />
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