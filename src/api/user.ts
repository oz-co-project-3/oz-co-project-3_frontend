import {
  SeekerFormData,
  CompanyFormData,
  LoginFormData,
  DeleteUserRequest,
  LoginResponseData,
  UserProfileResponse,
  EmailCheckResponse,
} from '@/types/user';
import { fetchOnClient } from '@/api/clientFetcher';

// 이메일 인증 코드 검증
export const verifyEmailCode = async (data: { email: string; verification_code: string }) => {
  return await fetchOnClient('/api/user/verify-email', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// 구직자 회원가입
export const registerSeeker = async (formData: SeekerFormData) => {
  try {
    return await fetchOnClient('/api/user/register/', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  } catch (error) {
    console.error('구직자 회원가입 오류:', error);
    throw error;
  }
};

// 기업 회원 업그레이드
export const upgradeToBusiness = async (
  data: CompanyFormData,
): Promise<LoginResponseData | null> => {
  return await fetchOnClient<LoginResponseData>('/api/user/upgrade-to-business/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// 로그인
export const loginUser = async (
  formData: LoginFormData,
): Promise<LoginResponseData | null> => {
  try {
    return await fetchOnClient<LoginResponseData>('/api/user/login/', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  } catch (error) {
    console.error('로그인 오류:', error);
    throw error;
  }
};

// 이메일 중복확인
export const checkEmailDuplicate = async (email: string): Promise<boolean> => {
  const res = await fetchOnClient<EmailCheckResponse>('/api/user/check-email/', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
  return res?.is_available === true;
};

// 로그아웃
export const logoutUser = async (): Promise<void> => {
  try {
    await fetchOnClient('/api/user/logout/', {
      method: 'POST',
    });
  } catch (err) {
    console.error('logoutUser 에러:', err);
    throw err;
  }
};

// 회원 프로필 조회
export const fetchUserProfile = async (): Promise<UserProfileResponse | null> => {
  return await fetchOnClient<UserProfileResponse>('/api/user/profile/', {
    method: 'GET',
  });
};

// 회원 탈퇴
export const deleteUser = async (data: DeleteUserRequest) => {
  return await fetchOnClient('/api/user/withdrawal-user/', {
    method: 'DELETE',
    body: JSON.stringify(data),
  });
};

// 일반 회원 정보 수정
export async function updateSeekerProfile(data: Record<string, unknown>) {
  return await fetchOnClient('/api/user/profile/update/?target_type=normal', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

// 기업 회원 정보 수정
export async function updateBusinessProfile(data: Record<string, unknown>) {
  return await fetchOnClient('/api/user/profile/update/?target_type=business', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

// 네이버 로그인 URL 요청
export const getNaverLoginUrl = async (): Promise<string> => {
  const res = await fetchOnClient<{ auth_url: string }>(
    '/api/user/social-login/naver/',
    {
      method: 'GET',
    },
  );
  return res?.auth_url ?? '';
};

// 카카오 로그인 URL 요청
export const getKakaoLoginUrl = async (): Promise<string> => {
  const res = await fetchOnClient<{ auth_url: string }>(
    '/api/user/social-login/kakao/',
    {
      method: 'GET',
    },
  );
  return res?.auth_url ?? '';
};

