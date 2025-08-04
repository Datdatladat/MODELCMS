// src/app/admin/layout.tsx
'use client';

import Link from 'next/link';
import { FiLogOut, FiSettings, FiDatabase, FiHome } from 'react-icons/fi';
import { usePathname, useRouter } from 'next/navigation';
import SimpleRouteGuard from '@/components/SimpleRouteGuard';
import { logout } from '@/lib/simpleAuth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <SimpleRouteGuard>
      <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar cố định */}
      <div className="w-72 bg-white border-r border-gray-200 flex flex-col fixed h-full">
        <div className="p-6 border-b border-gray-200 flex items-center justify-center space-x-4">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdFZXYbzPbXLyerguBkQk9zmfkuEs93H8vsw&s" alt="Logo" className="h-10 mb-2 w-10" />
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <Link 
            href="/admin" 
            className={`flex items-center px-5 py-4 rounded-xl text-lg transition-all ${
              isActive('/admin') && pathname === '/admin'
                ? 'bg-blue-50 text-blue-600 font-semibold' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FiHome className="mr-3 text-xl" />
            Dashboard
          </Link>
          <Link 
            href="/admin/providers" 
            className={`flex items-center px-5 py-4 rounded-xl text-lg transition-all ${
              isActive('/admin/providers') 
                ? 'bg-blue-50 text-blue-600 font-semibold' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FiDatabase className="mr-3 text-xl" />
            Providers
          </Link>
          <Link 
            href="/admin/models" 
            className={`flex items-center px-5 py-4 rounded-xl text-lg transition-all ${
              isActive('/admin/models') 
                ? 'bg-blue-50 text-blue-600 font-semibold' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FiSettings className="mr-3 text-xl" />
            Models
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
      <main className="flex-1 ml-72 p-8 overflow-auto">
        {children}
      </main>
    </div>
    </SimpleRouteGuard>
  );
}