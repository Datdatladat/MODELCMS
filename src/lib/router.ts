// lib/router.ts
import { isAuthenticated, getCurrentUserRole, clearAuthTokens } from './auth';

export interface RouteConfig {
  path: string;
  requiredRole?: 'ADMIN' | 'USER';
  requireAuth?: boolean;
  redirectTo?: string;
}

export interface NavigationResult {
  canAccess: boolean;
  redirectTo?: string;
  reason?: string;
}

// Define all routes with their access requirements
export const ROUTES: Record<string, RouteConfig> = {
  // Public routes
  LOGIN: {
    path: '/',
    requireAuth: false
  },
  
  // Admin routes
  ADMIN_DASHBOARD: {
    path: '/admin',
    requiredRole: 'ADMIN',
    requireAuth: true,
    redirectTo: '/'
  },
  ADMIN_MODELS: {
    path: '/admin/models',
    requiredRole: 'ADMIN',
    requireAuth: true,
    redirectTo: '/'
  },
  ADMIN_PROVIDERS: {
    path: '/admin/providers',
    requiredRole: 'ADMIN',
    requireAuth: true,
    redirectTo: '/'
  },
  
  // User routes
  USER_DASHBOARD: {
    path: '/user',
    requiredRole: 'USER',
    requireAuth: true,
    redirectTo: '/'
  },
  USER_ACCESS_KEYS: {
    path: '/user/access-keys',
    requiredRole: 'USER',
    requireAuth: true,
    redirectTo: '/'
  },
  USER_DOWNLOAD: {
    path: '/user/download',
    requiredRole: 'USER',
    requireAuth: true,
    redirectTo: '/'
  },
  USER_GUIDE: {
    path: '/user/guide',
    requiredRole: 'USER',
    requireAuth: true,
    redirectTo: '/'
  },
  USER_GUIDE_STEP_1: {
    path: '/user/guide/step-1',
    requiredRole: 'USER',
    requireAuth: true,
    redirectTo: '/'
  },
  USER_GUIDE_STEP_2: {
    path: '/user/guide/step-2',
    requiredRole: 'USER',
    requireAuth: true,
    redirectTo: '/'
  },
  USER_GUIDE_STEP_3: {
    path: '/user/guide/step-3',
    requiredRole: 'USER',
    requireAuth: true,
    redirectTo: '/'
  }
};

/**
 * Check if user can access a specific route
 */
export function canAccessRoute(pathname: string): NavigationResult {
  // Find matching route configuration
  const routeConfig = Object.values(ROUTES).find(route => {
    if (route.path === pathname) return true;
    // Handle dynamic routes or nested paths
    if (pathname.startsWith(route.path + '/')) return true;
    return false;
  });

  // If no route config found, assume it's a public route
  if (!routeConfig) {
    return { canAccess: true };
  }

  // Check authentication requirement
  if (routeConfig.requireAuth) {
    if (!isAuthenticated()) {
      clearAuthTokens();
      return {
        canAccess: false,
        redirectTo: routeConfig.redirectTo || ROUTES.LOGIN.path,
        reason: 'Not authenticated'
      };
    }
  }

  // Check role requirement
  if (routeConfig.requiredRole) {
    const userRole = getCurrentUserRole();
    
    if (!userRole) {
      clearAuthTokens();
      return {
        canAccess: false,
        redirectTo: routeConfig.redirectTo || ROUTES.LOGIN.path,
        reason: 'No user role found'
      };
    }

    if (userRole !== routeConfig.requiredRole) {
      // Redirect to appropriate dashboard based on user's actual role
      const redirectPath = userRole === 'ADMIN' ? ROUTES.ADMIN_DASHBOARD.path : ROUTES.USER_DASHBOARD.path;
      return {
        canAccess: false,
        redirectTo: redirectPath,
        reason: `Access denied. Required role: ${routeConfig.requiredRole}, User role: ${userRole}`
      };
    }
  }

  return { canAccess: true };
}

/**
 * Get the appropriate redirect path for authenticated users
 */
export function getRedirectPathForAuthenticatedUser(): string {
  if (!isAuthenticated()) {
    return ROUTES.LOGIN.path;
  }

  const userRole = getCurrentUserRole();
  
  switch (userRole) {
    case 'ADMIN':
      return ROUTES.ADMIN_DASHBOARD.path;
    case 'USER':
      return ROUTES.USER_DASHBOARD.path;
    default:
      clearAuthTokens();
      return ROUTES.LOGIN.path;
  }
}

/**
 * Check if current user should be redirected from login page
 */
export function shouldRedirectFromLogin(): { shouldRedirect: boolean; redirectTo?: string } {
  if (isAuthenticated()) {
    const redirectPath = getRedirectPathForAuthenticatedUser();
    return {
      shouldRedirect: true,
      redirectTo: redirectPath
    };
  }
  
  return { shouldRedirect: false };
}

/**
 * Get navigation items based on user role
 */
export function getNavigationItems(userRole: string | null): Array<{
  name: string;
  href: string;
  icon?: string;
}> {
  if (userRole === 'ADMIN') {
    return [
      { name: 'Dashboard', href: ROUTES.ADMIN_DASHBOARD.path },
      { name: 'Providers', href: ROUTES.ADMIN_PROVIDERS.path },
      { name: 'Models', href: ROUTES.ADMIN_MODELS.path },
    ];
  }
  
  if (userRole === 'USER') {
    return [
      { name: 'Trang Chủ', href: ROUTES.USER_DASHBOARD.path },
      { name: 'API Keys', href: ROUTES.USER_ACCESS_KEYS.path },
      { name: 'Tải Xuống', href: ROUTES.USER_DOWNLOAD.path },
      { name: 'Hướng Dẫn', href: ROUTES.USER_GUIDE.path },
    ];
  }
  
  return [];
}

/**
 * Utility to safely navigate programmatically
 */
export function navigateWithAuth(
  router: { push: (path: string) => void; replace: (path: string) => void },
  targetPath: string,
  replace = false
): boolean {
  const result = canAccessRoute(targetPath);
  
  if (result.canAccess) {
    if (replace) {
      router.replace(targetPath);
    } else {
      router.push(targetPath);
    }
    return true;
  } else {
    if (result.redirectTo) {
      if (replace) {
        router.replace(result.redirectTo);
      } else {
        router.push(result.redirectTo);
      }
    }
    return false;
  }
}

/**
 * Handle logout and redirect
 */
export function handleLogout(router: { push: (path: string) => void; replace: (path: string) => void }) {
  clearAuthTokens();
  router.replace(ROUTES.LOGIN.path);
}

/**
 * Check if a path matches the current route
 */
export function isActiveRoute(currentPath: string, targetPath: string, exact = false): boolean {
  if (exact) {
    return currentPath === targetPath;
  }
  return currentPath.startsWith(targetPath);
}
