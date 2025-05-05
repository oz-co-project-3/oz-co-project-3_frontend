import { useAuthStore } from '@/store/useAuthStore';

export async function fetchOnClient<T>(
  url: string,
  options: RequestInit & { skipContentType?: boolean } = {},
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_EXTERNAL_BASE_URL;
  const accessToken = useAuthStore.getState().accessToken;

  const { skipContentType, headers: customHeaders, ...restOptions } = options;

  const headers = {
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    ...(!skipContentType && { 'Content-Type': 'application/json' }),
    ...(customHeaders || {}),
  };

  const res = await fetch(`${baseUrl}${url}`, {
    ...restOptions,
    headers,
    credentials: 'include',
  });

  const responseBody = await res.json().catch(() => ({}));

  if (!res.ok) {
    console.error('Fetch Error', responseBody);

    // 이 부분은 잠시 주석처리 
    // if (res.status === 401) {
    //   console.warn('인증 오류 401: 로그인 다시 필요');
    //   localStorage.removeItem('user');
    //   window.location.href = '/user/login';
    //   throw new Error(responseBody.message || '세션이 만료되었습니다. 다시 로그인해주세요.');
    // }

    throw new Error(responseBody.error || 'API 요청 실패');
  }

  return responseBody;
}
