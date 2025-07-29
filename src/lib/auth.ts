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
