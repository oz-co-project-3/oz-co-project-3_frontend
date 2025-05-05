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

  const data = await res.json().catch(() => ({}));

  // 에러 분기처리 아직 없음
  if (!res.ok) {
    // 이거 잠시 리프레시로 액세스 재발급 완료되기 전까지만 주석처리 할게요! (기태)
    // 401 에러 시 쿠키 인증 기반이라면 클라이언트가 할 수 있는 게 없으므로 로그아웃
    // if (res.status === 401) {
    //   localStorage.removeItem('user');
    //   window.location.href = '/user/login';
    //   throw new Error(errorBody.message || '세션이 만료되었습니다. 다시 로그인해주세요.');
    // }

    console.error('fetch error body:', data);
  }

  return data;
}

// res를 가져와서 .json()을 두번 돌리면 에러가 나더라구요. 딱 한번만 읽을수 있대요!
// 그래서 요렇게 수정했습니당 :) (기태)
