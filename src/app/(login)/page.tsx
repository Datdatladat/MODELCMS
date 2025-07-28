'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthButton from '@/components/AuthButton';
import TextInput from '@/components/TextInput';
import { login } from '@/apis/auth/login';
import AuthHeader from '@/components/AuthHeader';

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await login(form);

      // Lưu token nếu cần (localStorage, cookie,...)
      localStorage.setItem('token', res.token);

      // Chuyển hướng dựa vào role
      if (res.role === 'admin') {
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
              value={form.username}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-black">Mật khẩu</label>
            <TextInput
              type="password"
              name="password"
              placeholder="Nhập mật khẩu"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <AuthButton label={loading ? "Đang xử lý..." : "Đăng nhập"} onClick={handleLogin} disabled={loading} />
        </div>
      </div>
    </div>
  );
}
