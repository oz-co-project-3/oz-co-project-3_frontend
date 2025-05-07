import { z } from 'zod';

export const companyProfileSchema = z.object({
  company_name: z.string().min(1, '기업명을 입력해주세요.'),
  business_start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD 형식으로 입력해주세요'),
  business_number: z.string().min(10, '- 하이픈은 모두 제거 해주세요'),
  manager_name: z.string().min(1, '담당자 이름을 입력해주세요'),
  manager_phone_number: z.string().min(1, '담당자 전화번호를 입력해주세요'),
  manager_email: z.string().email().optional(),
});

export type CompanyProfileFormSchema = z.infer<typeof companyProfileSchema>;
