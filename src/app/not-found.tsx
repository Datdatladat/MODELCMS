'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { hasStoredToken, getRedirectPathByRole } from '@/lib/simpleAuth';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Instead of showing 404, redirect based on authentication
    if (hasStoredToken()) {
      // User is logged in, redirect to their dashboard
      const redirectPath = getRedirectPathByRole();
      router.replace(redirectPath);
    } else {
      // User is not logged in, redirect to login
      router.replace('/');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Đang chuyển hướng...</p>
      </div>
    </div>
  );
}
