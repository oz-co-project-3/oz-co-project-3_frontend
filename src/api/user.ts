import { SeekerFormData, CompanyFormData, LoginFormData } from '@/types/user';
import axiosInstance from '@/lib/axios';

export const registerUser = async (formData: SeekerFormData | CompanyFormData) => {
    
    try{
        const res = await axiosInstance.post('/api/user/register/', formData);
        return res.data;
    } catch (error) {
        console.error('Axios POST 오류',error);
        throw error;
    }
}

export const loginUser = async (formData: LoginFormData) => {
    const res = await axiosInstance.post('/api/user/login/', formData);
    return res.data;
  };