// lib/simpleAuth.ts

/**
 * Simple authentication utilities that don't parse tokens on every check
 */

export function hasStoredToken(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('accessToken');
}

export function clearStoredTokens(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
}

export function setTokens(accessToken: string, refreshToken: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

/**
 * Get user role only when needed (like during login)
 * Don't call this on every page load
 */
export function getUserRoleFromToken(token: string): string | null {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    );
    const payload = JSON.parse(jsonPayload);
    return payload?.scope || null;
  } catch (e) {
    console.error('Invalid JWT', e);
    return null;
  }
}

/**
 * Redirect based on stored user role (stored during login)
 */
export function getRedirectPathByRole(): string {
  if (typeof window === 'undefined') return '/';
  
  const userRole = localStorage.getItem('userRole');
  
  switch (userRole) {
    case 'ADMIN':
      return '/admin';
    case 'USER':
      return '/user';
    default:
      return '/';
  }
}

export function setUserRole(role: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('userRole', role);
}

export function getUserRole(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('userRole');
}

export function clearUserRole(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('userRole');
}

/**
 * Complete logout
 */
export function logout(): void {
  clearStoredTokens();
  clearUserRole();
}
