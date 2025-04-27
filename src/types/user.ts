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
  status: 'seeking' | 'not_seeking' | 'employed';
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
  user: {
    id: number;
    email: string;
    user_type: ('seeker' | 'business' | 'admin')[];
  };
}
