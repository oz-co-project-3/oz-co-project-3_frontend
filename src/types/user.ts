// export type UserRole = 'NORMAL' | 'COMPANY' | 'SUPER' | 'UNVERIFIED';
// export type SignInMethod = 'EMAIL' | 'KAKAO' | 'NAVER';

// export interface User {
//   id: number;
//   email: string;
//   name: string;
//   userRole: UserRole[];
//   signInMethod: SignInMethod[];
// }
// export interface LoginResponseData {
//   access_token: string;
//   refresh_token?: string;
//   user: User;
// }

export interface SeekerFormData {
  name: string;
  email: string;
  birth: string;
  password: string;
  password_check: string;
  phone_number: string;
  gender?: 'male' | 'female' | 'none';
  interests?: string | string[];
  purposes?: string | string[];
  sources?: string | string[];
  status: 'seeking' | 'not_seeking' | 'employed';
  signinMethod?: 'email' | 'naver' | 'kakao';
}
export interface CompanyFormData {
  email: string;
  password: string;
  password_check: string;
  company_name: string;
  business_number: string;
  business_start_date: string;
  company_description: string;
  gender: 'male' | 'female' | 'none';
  manager_name?: string;
  manager_phone_number?: string;
  manager_email?: string;
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
  user_type: ('seeker' | 'business' | 'admin')[];
  signinMethod: ('email' | 'naver' | 'kakao')[];
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
  user_type: ('seeker' | 'business' | 'admin')[];
  signinMethod: ('email' | 'naver' | 'kakao')[];
}

export interface EmailCheckResponse {
  is_available: boolean;
  message: string;
}

// 관리자용 조회 타입 (BaseUser) 
export interface BaseUser {
  id: number;
  email: string;
  user_type: 'seeker' | 'business'; 
  status: string;
  email_verified: boolean;
  is_superuser: boolean;
  created_at: string;
  deleted_at: string;
  gender: string;
}

// 관리자용 조회 타입 (SeekerInfo)
export interface SeekerInfo {
  id: number;
  name: string;
  phone_number: string;
  birth: string;
  interests: string;
  purposes: string;
  sources: string;
  applied_posting: string;
  applied_posting_count: number;
  is_social: boolean;
  status: string;
}

// 관리자용 조회 타입 (CorpInfo) 
export interface CorpInfo {
  id: number;
  company_name: string;
  business_start_date: string;
  business_number: string;
  company_description: string;
  manager_name: string;
  manager_phone_number: string;
  manager_email: string;
  gender: string;
}

// 관리자용 조회 타입 (AdminUser) 
export interface AdminUser {
  base: BaseUser;
  seeker: SeekerInfo | null;
  corp: CorpInfo | null;
}