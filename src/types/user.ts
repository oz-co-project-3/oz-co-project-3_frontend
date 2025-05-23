export interface SeekerFormData {
  name: string;
  email: string;
  birth: string;
  password?: string;
  password_check?: string;
  phone_number: string;
  gender?: 'male' | 'female';
  interests?: string[];
  purposes?: string[];
  sources?: string[];
  user_type: 'normal' | 'business' | 'admin';
  status: 'seeking' | 'not_seeking' | 'employed';
  signinMethod?: 'email' | 'naver' | 'kakao';
  profile_url?: string;
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

export interface DeleteUserResponse {
  user_id: number;
  email: string;
  reason: string;
  deleted_at: string;
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

export interface UserBaseProfile {
  id: number;
  email: string;
  name: string;
  user_type: 'normal' | 'business' | 'admin';
  signinMethod: 'email' | 'naver' | 'kakao';
  status: 'active' | 'inactive';
  email_verified: boolean;
  gender: 'male' | 'female';
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

export interface UserProfileResponse {
  base: UserBaseProfile;
  seeker: SeekerProfile | null;
  corp: CorpProfile | null;
}
