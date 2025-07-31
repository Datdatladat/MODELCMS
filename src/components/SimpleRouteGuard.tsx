'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { hasStoredToken, getRedirectPathByRole } from '@/lib/simpleAuth';

interface SimpleRouteGuardProps {
  children: React.ReactNode;
}

export default function SimpleRouteGuard({ children }: SimpleRouteGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const checkBasicAuth = () => {
      // For login page
      if (pathname === '/') {
        if (hasStoredToken()) {
          // User has token, redirect to their dashboard
          const redirectPath = getRedirectPathByRole();
          if (redirectPath !== '/') {
            router.replace(redirectPath);
            return;
          }
        }
        setShouldRender(true);
        return;
      }

      // For protected routes
      if (pathname.startsWith('/admin') || pathname.startsWith('/user')) {
        if (!hasStoredToken()) {
          // No token, redirect to login
          router.replace('/');
          return;
        }
        
        // Basic role check based on URL and stored role
        const userRole = localStorage.getItem('userRole');
        if (pathname.startsWith('/admin') && userRole !== 'ADMIN') {
          router.replace('/user');
          return;
        }
        if (pathname.startsWith('/user') && userRole !== 'USER') {
          router.replace('/admin');
          return;
        }
      }

      setShouldRender(true);
    };

    checkBasicAuth();
  }, [pathname, router]);

  // Render content without loading spinner for better UX
  return shouldRender ? <>{children}</> : null;
}
