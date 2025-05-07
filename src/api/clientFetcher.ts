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

  const res = await fetch(`${baseUrl}${url}`, {
    ...restOptions,
    headers,
    credentials: 'include',
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    console.error('fetch error body:', data);
    throw new Error(data?.message || 'API 요청 실패');
  }

  console.log('[요청 데이터]', data);
  return data;
}
