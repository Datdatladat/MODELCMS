'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthButton from '@/components/AuthButton';
import TextInput from '@/components/TextInput';
import { login } from '@/service/auth';
import AuthHeader from '@/components/AuthHeader';
import { getUserRole } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authType, setAuthType] = useState('SYSTEM');

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6">
        <AuthHeader />

        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-black">Tên đăng nhập</label>
            <TextInput
              name="username"
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-black">Mật khẩu</label>
            <TextInput
              type="password"
              name="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-black">Auth Type</label>
            <select name="authType" id="1" className="w-full p-2 border border-gray-300 rounded-md" value={authType} onChange={(e) => setAuthType(e.target.value)}>
              <option value="SYSTEM">SYSTEM</option>
              <option value="TINA">TINA</option>
            </select>
          </div>

          <AuthButton label={loading ? "Đang xử lý..." : "Đăng nhập"} onClick={handleLogin} disabled={loading} />
        </div>
      </div>
    </div>
  );
}
