export async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_EXTERNAL_BASE_URL;
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

  const res = await fetch(`${baseUrl}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {}),
    },
    credentials: 'include',
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.message || 'API 요청 실패');
  }

  return await res.json();
}
