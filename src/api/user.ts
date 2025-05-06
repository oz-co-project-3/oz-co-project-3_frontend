import {
  SeekerFormData,
  CompanyFormData,
  LoginFormData,
  DeleteUserRequest,
  LoginResponseData,
  UserProfileResponse,
} from '@/types/user';
import { fetchOnClient } from '@/api/clientFetcher';
import { EmailCheckResponse } from '@/types/user';

// 이메일 인증 코드 검증
export const verifyEmailCode = async (data: { email: string; verification_code: string }) => {
  try {
    const res = await fetchOnClient('/api/user/verify-email', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res;
  } catch (error) {
    console.error('이메일 인증 오류', error);
    throw error;
  }
};

// 구직자 회원가입
export const registerSeeker = async (formData: SeekerFormData) => {
  try {
    const res = await fetchOnClient('/api/user/register/', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    return res;
  } catch (error) {
    console.error('구직자 회원가입 오류', error);
    throw error;
  }
};

// 기업 회원 업그레이드
export async function upgradeToBusiness(data: CompanyFormData): Promise<LoginResponseData> {
  return await fetchOnClient<LoginResponseData>('/api/user/upgrade-to-business/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// 로그인
export const loginUser = async (formData: LoginFormData): Promise<LoginResponseData> => {
  try {
    const res = await fetchOnClient<LoginResponseData>('/api/user/login/', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    //console.log('응답 전체:', res);
    //console.log('응답 data:', res.data); //도르마무 확인용

    return res;
  } catch (error) {
    console.error('로그인 오류', error);
    throw error;
  }
};

//이메일 중복확인
export async function checkEmailDuplicate(email: string): Promise<boolean> {
  const res = await fetchOnClient<EmailCheckResponse>(`/api/user/check-email/`, {
    method: 'POST',
    body: JSON.stringify({ email }),
  });

  return res.is_available === true;
}

//로그아웃
export const logoutUser = async (): Promise<void> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_BASE_URL}/api/user/logout/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      console.error('로그아웃 응답 상태:', res.status);
      console.error('로그아웃 응답 메시지:', errorBody);
      throw new Error(errorBody.message || '로그아웃 실패');
    }
  } catch (err) {
    console.error('logoutUser 전체 에러:', err);
    throw err;
  }
};

//회원 프로필 조회
export async function fetchUserProfile(): Promise<UserProfileResponse> {
  return await fetchOnClient<UserProfileResponse>('/api/user/profile/', {
    method: 'GET',
  });
}

//회원 탈퇴
export const deleteUser = async (data: DeleteUserRequest) => {
  return await fetchOnClient('/api/user/withdrawal-user/', {
    method: 'DELETE',
    body: JSON.stringify(data),
  });
};

//네이버 로그인 URL 요청
export async function getNaverLoginUrl(): Promise<string> {
  const res = await fetch('http://localhost:3000/api/user/social-login/naver/', {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('네이버 로그인 URL 요청 실패');
  }

  const data = await res.json();
  return data.auth_url;
}
