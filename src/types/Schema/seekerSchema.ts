import { z } from 'zod';

export const seekerProfileSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  email: z.string().email('올바른 이메일 형식을 입력하세요.'),
  birth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD 형식으로 입력해주세요'),
  phone_number: z.string().min(9, '전화번호는 - 제외 한 9자 이상 입력해주세요.'),
  gender: z.enum(['male', 'female', 'none']),
  interests: z.array(z.string()).optional(),
  purposes: z.array(z.string()).optional(),
  sources: z.array(z.string()).optional(),
  status: z.enum(['seeking', 'not_seeking', 'employed']),
});

export const seekerRegisterSchema = seekerProfileSchema
  .extend({
    password: z
      .string()
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=~`[\]{}|\\:;"'<>,.?/]).{8,}$/,
        '8자 이상, 영문/숫자/특수문자 포함',
      ),
    password_check: z.string(),
  })
  .refine((data) => data.password === data.password_check, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['password_check'],
  });

export type SeekerProfileFormValues = z.infer<typeof seekerProfileSchema>;
export type SeekerRegisterFormValues = z.infer<typeof seekerRegisterSchema>;
