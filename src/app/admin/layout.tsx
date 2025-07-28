'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogOut, Settings, Database } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    // Logic logout nếu cần (xóa token, session, v.v)
    router.push('/');
  };

  // Active menu check
  const isActive = (path: string) => pathname === path;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="h-screen w-64 bg-white border-r flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-black p-4">Admin Panel</h2>
          <ul className="space-y-2 px-4">
            <li>
              <Link href="/admin">
                <div className={`flex items-center space-x-2 text-black py-2 px-2 rounded ${isActive('/admin') ? 'bg-gray-200 font-semibold' : ''}`}>
                  <Settings size={18} />
                  <span>Dashboard</span>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/admin/providers">
                <div className={`flex items-center space-x-2 text-black py-2 px-2 rounded ${isActive('/admin/providers') ? 'bg-gray-200 font-semibold' : ''}`}>
                  <Database size={18} />
                  <span>Providers</span>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/admin/models">
                <div className={`flex items-center space-x-2 text-black py-2 px-2 rounded ${isActive('/admin/models') ? 'bg-gray-200 font-semibold' : ''}`}>
                  <Settings size={18} />
                  <span>Models</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>

        {/* Nút logout */}
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 border text-black rounded-lg px-4 py-2 text-sm"
          >
            <LogOut size={16} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50 overflow-auto">{children}</main>
    </div>
  );
}
