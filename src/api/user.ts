import { SeekerFormData, CompanyFormData, LoginFormData } from '@/types/user';
import axiosInstance from '@/api/axios';

export const verifyEmailCode = (data: { email: string; verification_code: string }) => {
  return axiosInstance.post('/api/user/verify-email', data);
};

export const registerSeeker = async (formData: SeekerFormData) => {
  try {
    const res = await axiosInstance.post('/api/user/register/', formData);
    return res.data;
  } catch (error) {
    console.error('구직자 회원가입 오류', error);
    throw error;
  }
};

export const registerCompany = async (formData: CompanyFormData) => {
  try {
    const res = await axiosInstance.post('/api/user/register-company/', formData);
    return res.data;
  } catch (error) {
    console.error('기업 회원가입 오류', error);
    throw error;
  }
};

export const loginUser = async (formData: LoginFormData) => {
  const res = await axiosInstance.post('/api/user/login/', formData);
  return res.data;
};

export const checkEmailDuplicate = async (email: string) => {
    const res = await axiosInstance.post('/api/user/check-email/', { email });
    return res.data.is_available;
  };
