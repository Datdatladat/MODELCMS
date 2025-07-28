export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  role: string;
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const res = await fetch('http://192.168.1.5:8080/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Login failed');
  }

  return res.json();
}
