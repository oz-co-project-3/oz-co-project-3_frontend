export interface SeekerFormData {
  name: string;
  email: string;
  birth: string;
  password: string;
  password_check: string;
  phone_number: string;
  gender?: 'male' | 'female' | 'none';
  interests?: string[];
  purposes?: string[];
  sources?: string[];
  user_type: 'normal' | 'business' | 'admin';
  status: 'seeking' | 'not_seeking' | 'employed';
  signinMethod?: 'email' | 'naver' | 'kakao';
}
export interface CompanyFormData {
  business_number: string;
  company_name: string;
  manager_name: string;
  manager_phone_number: string;
  business_start_date: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginResponseData {
  access_token: string;
  refresh_token?: string;
  email: string;
  name: string;
  user_id: number;
  user_type: 'normal' | 'business' | 'admin';
  signinMethod: 'email' | 'naver' | 'kakao';
}

export interface DeleteUserRequest {
  password: string;
  is_active: boolean;
  reason: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  user_type: string;
  signinMethod: 'email' | 'naver' | 'kakao';
}

export interface EmailCheckResponse {
  is_available: boolean;
  message: string;
}
//여기 일단 때려넣겠습니다 나중에 한번에 정리해서 고쳐넣겠습니다..
export interface UserBaseProfile {
  id: number;
  email: string;
  user_type: 'normal' | 'business' | 'admin';
  signinMethod: 'email' | 'naver' | 'kakao';
  status: 'active' | 'inactive';
  email_verified: boolean;
  gender: 'male' | 'female' | 'none';
  leave_reason: string | null;
  created_at: string;
  deleted_at: string | null;
}

export interface SeekerProfile {
  id: number;
  name: string;
  phone_number: string;
  birth: string;
  interests: string;
  purposes: string;
  sources: string;
  status: 'seeking' | 'not_seeking' | 'employed';
  applied_posting: number;
  applied_posting_count: number;
  profile_url: string;
}

export interface CorpProfile {
  id: number;
  company_name: string;
  business_number: string;
  business_start_date: string;
  company_description: string;
  manager_name: string;
  manager_phone_number: string;
  manager_email: string;
  profile_url: string;
}

export type SeekerProfileUpdate = {
  name: string;
  phone_number: string;
  birth: string; 
  interests: string;
  purposes: string;
  sources: string;
  status: 'seeking' | 'not_seeking';
  profile_url: string;
};

export type CorpProfileUpdate = {
  company_name: string;
  business_number: string;
  business_start_date: string; 
  company_description: string;
  manager_name: string;
  manager_phone_number: string;
  manager_email: string;
  profile_url: string;
};

// src/types/user.ts
export interface UserProfileResponse {
  base: {
    id: string;
    email: string;
    user_type: string;
    signinMethod: string;
    gender?: 'male' | 'female' | 'none'; // 추가
  };
  seeker?: {
    name: string;
    birth?: string; // 추가
    phone_number?: string; // 추가
    status?: string; // 추가
    interests?: string; // 추가
    purposes?: string; // 추가
    sources?: string; // 추가
  };
  corp?: {
    manager_name: string;
    business_number?: string; // 추가
    company_name?: string; // 추가
    manager_phone_number?: string; // 추가
    business_start_date?: string; // 추가
    manager_email?: string; // 추가
  };
}