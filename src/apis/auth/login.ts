export interface LoginPayload {
  username: string;
  password: string;
  authType: string; // Thêm authType nếu cần thiết
}

export interface LoginResponse {
  token: string;
  role: string;
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error('Login failed');
  }

  return await res.json();
}
