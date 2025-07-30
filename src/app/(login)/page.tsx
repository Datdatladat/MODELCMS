'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthButton from '@/components/AuthButton';
import TextInput from '@/components/TextInput';
import { login } from '@/service/auth';
import AuthHeader from '@/components/AuthHeader';
import { getUserRole } from '@/lib/auth';
import Image from 'next/image';
import { FiUser, FiShield, FiChevronDown } from 'react-icons/fi';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authType, setAuthType] = useState<'TINA' | 'SYSTEM'>('TINA');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await login(username, password, authType);
      console.log('Login response:', res);

      // Lưu token nếu cần (localStorage, cookie,...)
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);

      const role = getUserRole(res.data.accessToken);

      // Chuyển hướng dựa vào role
      if (role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/user');
      }
    } catch (err) {
      alert('Đăng nhập thất bại. Vui lòng kiểm tra lại.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-100 via-orange-50 to-yellow-100 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md space-y-8 border border-red-100 backdrop-blur-lg bg-opacity-95">
        <div className="flex flex-col items-center space-y-4 mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-400 rounded-full blur-lg opacity-30 animate-pulse"></div>
            <Image src="/images/logoTina.jpg" alt="TinaCode Logo" width={80} height={80} className="relative rounded-full shadow-xl border-4 border-white" />
          </div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent tracking-tight">TinaCode</h1>
          <span className="text-lg text-gray-500 font-medium">Chào mừng bạn quay trở lại</span>
          
          {/* Account Type Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-100 to-orange-100 rounded-full hover:from-red-200 hover:to-orange-200 transition-all duration-200 cursor-pointer"
            >
              <Image src="/images/logoTina.jpg" alt="TinaCode" width={20} height={20} className="rounded-full" />
              <span className="text-sm font-semibold text-red-700">{authType === 'TINA' ? 'Tài khoản Hr-v2' : 'Tài khoản hệ thống'}</span>
              <FiChevronDown className={`w-4 h-4 text-red-700 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <>
                {/* Backdrop to close dropdown */}
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsDropdownOpen(false)}
                ></div>
                
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden">
                  <button
                    onClick={() => {
                      setAuthType('TINA');
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-red-50 transition-colors ${
                      authType === 'TINA' ? 'bg-red-50 border-l-4 border-red-500' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Image src="/images/logoTina.jpg" alt="TinaCode" width={18} height={18} className="rounded-full" />
                      <div>
                        <div className="text-sm font-semibold text-gray-800">Tài khoản Hr-v2</div>
                        <div className="text-xs text-gray-500">Company Tinasoft login</div>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => {
                      setAuthType('SYSTEM');
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                      authType === 'SYSTEM' ? 'bg-gray-50 border-l-4 border-gray-500' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <FiShield className="w-4 h-4 text-gray-600" />
                      <div>
                        <div className="text-sm font-semibold text-gray-800">Tài khoản hệ thống</div>
                        <div className="text-xs text-gray-500">Administrator system login</div>
                      </div>
                    </div>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold text-gray-700 text-sm">Tên đăng nhập</label>
            <div className="relative">
              <TextInput
                name="username"
                placeholder="Nhập tên đăng nhập của bạn"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700 text-sm">Mật khẩu</label>
            <div className="relative">
              <TextInput
                type="password"
                name="password"
                placeholder="Nhập mật khẩu của bạn"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="pt-4">
            <AuthButton 
              label={loading ? 'Đang xử lý...' : 'Đăng nhập'} 
              onClick={handleLogin} 
              disabled={loading} 
            />
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400">
              Được bảo vệ bởi <span className="font-semibold text-red-600">TinaCode Security</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
