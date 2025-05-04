export async function apiFetch<T>(
  url: string,
  options: RequestInit = {},
  isFormData = false, // TODO: 헤더에 Content-Type이 없어야 하는 경우가 있어서, 일단 임시로 추가함. (기태)
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_EXTERNAL_BASE_URL;

  const res = await fetch(`${baseUrl}${url}`, {
    ...options,
    headers: {
      ...(!isFormData && { 'Content-Type': 'application/json' }), // 트루면 (formData를 전송할 경우에) 헤더에 Content-Type이 없어짐.
      ...(options.headers || {}),
    },
    credentials: 'include',
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));

    // 401 에러 시 쿠키 인증 기반이라면 클라이언트가 할 수 있는 게 없으므로 로그아웃
    if (res.status === 401) {
      localStorage.removeItem('user');
      window.location.href = '/user/login';
      throw new Error(errorBody.message || '세션이 만료되었습니다. 다시 로그인해주세요.');
    }

    throw new Error(errorBody.message || 'API 요청 실패');
  }

  return res.json();
}