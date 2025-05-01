export async function apiFetch<T>(
  url: string,
  options: RequestInit = {},
  isFormData = false, // TODO: 헤더에 Content-Type이 없어야 하는 경우가 있어서, 일단 임시로 추가함. (기태)
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_EXTERNAL_BASE_URL;
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

  const res = await fetch(`${baseUrl}${url}`, {
    ...options,
    headers: {
      ...(!isFormData && { 'Content-Type': 'application/json' }), // 트루면 (formData를 전송할 경우에) 헤더에 Content-Type이 없어짐.
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
