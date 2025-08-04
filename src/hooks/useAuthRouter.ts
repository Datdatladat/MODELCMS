'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  canAccessRoute, 
  getRedirectPathForAuthenticatedUser, 
  navigateWithAuth, 
  handleLogout as routerLogout,
  isActiveRoute,
  getNavigationItems
} from '@/lib/router';
import { getCurrentUserRole, isAuthenticated } from '@/lib/auth';

export function useAuthRouter() {
  const router = useRouter();
  const pathname = usePathname();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateUserRole = () => {
      if (isAuthenticated()) {
        setUserRole(getCurrentUserRole());
      } else {
        setUserRole(null);
      }
      setIsLoading(false);
    };

    updateUserRole();
  }, [pathname]);

  const navigateTo = (path: string, replace = false) => {
    return navigateWithAuth(router, path, replace);
  };

  const logout = () => {
    routerLogout(router);
    setUserRole(null);
  };

  const checkAccess = (path: string) => {
    return canAccessRoute(path);
  };

  const isActive = (path: string, exact = false) => {
    return isActiveRoute(pathname, path, exact);
  };

  const getRedirectPath = () => {
    return getRedirectPathForAuthenticatedUser();
  };

  const getNavItems = () => {
    return getNavigationItems(userRole);
  };

  return {
    // State
    userRole,
    isLoading,
    pathname,
    isAuthenticated: isAuthenticated(),
    
    // Actions
    navigateTo,
    logout,
    checkAccess,
    isActive,
    getRedirectPath,
    getNavItems,
    
    // Router methods
    push: router.push,
    replace: router.replace,
    back: router.back,
    forward: router.forward,
    refresh: router.refresh
  };
}

export function useRouteGuard() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const result = canAccessRoute(pathname);
      
      if (result.canAccess) {
        setIsAuthorized(true);
      } else {
        if (result.redirectTo) {
          router.replace(result.redirectTo);
        }
        setIsAuthorized(false);
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [pathname, router]);

  return { isAuthorized, isLoading };
}
