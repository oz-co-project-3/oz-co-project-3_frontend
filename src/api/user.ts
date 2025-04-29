import { SeekerFormData, CompanyFormData, LoginFormData } from '@/types/user';
import { apiFetch } from '@/lib/fetcher';

// 이메일 인증 코드 검증
export const verifyEmailCode = async (data: { email: string; verification_code: string }) => {
  try {
    const res = await apiFetch('/api/user/verify-email', {
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
    const res = await apiFetch('/api/user/register/', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    return res;
  } catch (error) {
    console.error('구직자 회원가입 오류', error);
    throw error;
  }
};

// 기업 회원가입
export const registerCompany = async (formData: CompanyFormData) => {
  try {
    const res = await apiFetch('/api/user/register-company/', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    return res;
  } catch (error) {
    console.error('기업 회원가입 오류', error);
    throw error;
  }
};

// 로그인
export const loginUser = async (formData: LoginFormData) => {
  try {
    const res = await apiFetch('/api/user/login/', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    return res;
  } catch (error) {
    console.error('로그인 오류', error);
    throw error;
  }
};

//이메일 중복확인
export async function checkEmailDuplicate(email: string): Promise<boolean> {
  return apiFetch<boolean>(`/api/user/check-email/`, {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}
