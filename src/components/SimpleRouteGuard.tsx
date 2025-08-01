'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { hasStoredToken, getRedirectPathByRole, getUserRole } from '@/lib/simpleAuth';

interface SimpleRouteGuardProps {
  children: React.ReactNode;
}

export default function SimpleRouteGuard({ children }: SimpleRouteGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [shouldRender, setShouldRender] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Ensure this only runs on client side
    if (typeof window === 'undefined') return;

    const checkAuth = () => {
      try {
        // For login page
        if (pathname === '/') {
          if (hasStoredToken()) {
            const redirectPath = getRedirectPathByRole();
            if (redirectPath !== '/') {
              router.replace(redirectPath);
              return;
            }
          }
          setShouldRender(true);
          setIsInitialized(true);
          return;
        }

        // For protected routes
        if (pathname.startsWith('/admin') || pathname.startsWith('/user')) {
          if (!hasStoredToken()) {
            router.replace('/');
            return;
          }
          
          const userRole = getUserRole();
          
          // If no role is stored, let the page render and let API handle auth
          // This prevents infinite redirects in production
          if (!userRole) {
            setShouldRender(true);
            setIsInitialized(true);
            return;
          }
          
          // Role-based routing
          if (pathname.startsWith('/admin') && userRole !== 'ADMIN') {
            router.replace(userRole === 'USER' ? '/user' : '/');
            return;
          }
          
          if (pathname.startsWith('/user') && userRole !== 'USER') {
            router.replace(userRole === 'ADMIN' ? '/admin' : '/');
            return;
          }
        }

        setShouldRender(true);
        setIsInitialized(true);
      } catch (error) {
        console.error('Auth check error:', error);
        // On error, allow render and let API handle auth
        setShouldRender(true);
        setIsInitialized(true);
      }
    };

    // Use a small timeout to ensure localStorage is fully available
    const timeoutId = setTimeout(checkAuth, 50);
    
    return () => clearTimeout(timeoutId);
  }, [pathname, router]);

  // Don't render until we've made the auth decision
  if (!isInitialized) {
    return null;
  }

  return shouldRender ? <>{children}</> : null;
}
