import { z } from 'zod';

export const companyProfileSchema = z.object({
  email: z.string().email('올바른 이메일 형식을 입력하세요.'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
  password_check: z.string().min(8, '비밀번호 확인도 8자 이상이어야 합니다.'),
  company_name: z.string().min(1, '기업명을 입력해주세요.'),
  business_start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD 형식으로 입력해주세요'),
  business_number: z.string(),
  company_description: z.string().min(10, '소개를 10자 이상 입력해주세요.'),
  manager_name: z.string().optional(),
  manager_phone_number: z.string().optional(),
  manager_email: z.string().email().optional(),
  gender: z.enum(['male', 'female', 'none']),
}).refine((data) => data.password === data.password_check, {
  message: '비밀번호가 일치하지 않습니다.',
  path: ['password_check'],
});
  
  export type CompanyProfileFormSchema = z.infer<typeof companyProfileSchema>;