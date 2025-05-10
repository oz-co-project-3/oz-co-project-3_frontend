import { useAuthStore } from '@/store/useAuthStore';

export async function fetchOnClient<T>(
  url: string,
  options: RequestInit & { skipContentType?: boolean } = {},
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_EXTERNAL_BASE_URL;
  const accessToken = useAuthStore.getState().accessToken;

  const { skipContentType, headers: customHeaders, ...restOptions } = options;

  const headers: HeadersInit = {
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    ...(!skipContentType && { 'Content-Type': 'application/json' }),
    ...customHeaders,
  };

  const response = await fetch(`${baseUrl}${url}`, {
    ...restOptions,
    headers,
    credentials: 'include',
  });

  const contentType = response.headers.get('Content-Type');

  const isJson = contentType?.includes('application/json');
  const rawData = isJson
    ? await response.json().catch(() => ({}))
    : await response.text().catch(() => '');

  if (!response.ok) {
    // 예외적으로 유저 정보 요청은 401일 때 guest 처리
    if (response.status === 401 && url === '/api/user/profile/') {
      return {
        id: 0,
        email: '',
        name: '비회원',
        user_type: 'guest',
        signinMethod: 'none',
      } as T;
    }

    const errorMessage =
      typeof rawData === 'string'
        ? rawData
        : typeof rawData === 'object' && 'message' in rawData
        ? String(rawData.message)
        : 'API 요청 실패';

    console.error('fetch error body:', rawData);
    throw new Error(errorMessage);
  }

  console.log('[요청 성공]', rawData);
  return rawData as T;
}
