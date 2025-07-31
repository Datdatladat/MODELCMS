'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX, FiLogOut, FiKey, FiDownload, FiBook, FiHome } from 'react-icons/fi';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const navigation = [
    { name: 'Trang Chủ', href: '/user', icon: FiHome },
    { name: 'API Keys', href: '/user/access-keys', icon: FiKey },
    { name: 'Tải Xuống', href: '/user/download', icon: FiDownload },
    { name: 'Hướng Dẫn', href: '/user/guide', icon: FiBook },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/user" className="flex items-center group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <Image 
                  src="/images/logoTina.jpg" 
                  alt="TinaCode Logo" 
                  width={40} 
                  height={40} 
                  className="relative rounded-full border-2 border-white shadow-lg group-hover:scale-110 transition-transform duration-300" 
                />
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                TinaCode
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                        : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Logout */}
            <div className="hidden md:flex items-center">
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
              >
                <FiLogOut className="w-4 h-4 mr-2" />
                Đăng Xuất
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              {isMobileMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-2 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                        : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-3 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
              >
                <FiLogOut className="w-5 h-5 mr-3" />
                Đăng Xuất
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
