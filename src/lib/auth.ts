// lib/auth.ts

export function parseJwt(token: string): any {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Invalid JWT', e);
    return null;
  }
}

export function getUserRole(token: string): string | null {
  const payload = parseJwt(token);
  console.log('Decoded JWT payload:', payload);
  return payload?.scope || null; // hoặc payload?.role tùy BE
}

export function getUserId(token: string): string | null {
  const payload = parseJwt(token);
  console.log('Decoded JWT payload:', payload);
  return payload?.userId || null; // hoặc payload?.userId tùy BE
}

export function isTokenExpired(token: string): boolean {
  try {
    const payload = parseJwt(token);
    if (!payload || !payload.exp) return true;
    
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (e) {
    return true;
  }
}

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
}

export function getStoredRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('refreshToken');
}

export function isAuthenticated(): boolean {
  const token = getStoredToken();
  if (!token) return false;
  return !isTokenExpired(token);
}

export function clearAuthTokens(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

export function getCurrentUserRole(): string | null {
  const token = getStoredToken();
  if (!token || isTokenExpired(token)) return null;
  return getUserRole(token);
}
