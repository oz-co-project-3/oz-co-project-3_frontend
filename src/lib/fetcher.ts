export async function apiFetch<T>(
  url: string,
  options: RequestInit = {},
  isFormData = false, // TODO: 헤더에 Content-Type이 없어야 하는 경우가 있어서, 일단 임시로 추가함. (기태)
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_EXTERNAL_BASE_URL;
  let token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

  let res = await fetch(`${baseUrl}${url}`, {
    ...options,
    headers: {
      ...(!isFormData && { 'Content-Type': 'application/json' }), // 트루면 (formData를 전송할 경우에) 헤더에 Content-Type이 없어짐.
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {}),
    },
    credentials: 'include',
  });

  // 만약 access_token 만료로 실패시
  if (res.status === 401) {
    const errorBody = await res.json().catch(() => ({}));
    if (errorBody.code === 'expired_token') {
      // refresh_token으로 access_token 다시 요청
      const refreshRes = await fetch(`${baseUrl}/api/user/refresh/`, {
        method: 'POST',
        body: JSON.stringify({ refresh_token: localStorage.getItem('refresh_token') }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (refreshRes.ok) {
        const { access_token: newToken } = await refreshRes.json();
        localStorage.setItem('access_token', newToken);
        token = newToken;

        // 원래 요청 재시도
        res = await fetch(`${baseUrl}${url}`, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...(options.headers || {}),
          },
          credentials: 'include',
        });
      } else {
        // refresh도 실패 → 로그아웃 처리
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        window.location.href = '/user/login';
        throw new Error('세션이 만료되었습니다. 다시 로그인해주세요.');
      }
    } else {
      throw new Error(errorBody.message || 'API 요청 실패');
    }
  }

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.message || 'API 요청 실패');
  }

  return res.json();
}
