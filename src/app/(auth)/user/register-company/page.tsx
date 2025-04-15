'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  email: z.string().email('올바른 이메일 형식을 입력하세요.'),
  password: z.string().regex(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=~`[\]{}|\\:;"'<>,.?/]).{8,}$/,
    '8자 이상, 영문/숫자/특수문자 포함',
  ),
  password_check: z.string(),
  company_name: z.string().min(1, '기업명을 입력해주세요.'),
  company_start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD 형식으로 입력해주세요'),
  business_number: z.string(),
  company_description: z.string().min(10, '소개를 10자 이상 입력해주세요.'),
  manager_name: z.string().optional(),
  manager_phone_number: z.string().optional(),
  manager_email: z.string().email().optional(),
}).refine((data) => data.password === data.password_check, {
  message: '비밀번호가 일치하지 않습니다.',
  path: ['password_check'],
});

type FormSchema = z.infer<typeof formSchema>;

export default function CompanyRegisterForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      password_check: '',
      company_name: '',
      company_start_date: '',
      business_number: '',
      company_description: '',
      manager_name: '',
      manager_phone_number: '',
      manager_email: '',
    },
  });

  const onSubmit = (data: FormSchema) => {
    console.log(data);
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-xl">
      <h2 className="text-center text-xl font-semibold mb-4">기업 회원가입</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <h3 className="text-sm font-semibold">기본 정보</h3>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <div className="flex gap-2">
                  <FormControl><Input {...field} className= 'bg-white' /></FormControl>
                  <Button type="button" variant="outline" className='bg-main-light hover:bg-main-dark text-[#FAFAF5]'>중복확인</Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl><Input type="password" {...field} className= 'bg-white' /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password_check"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호 확인</FormLabel>
                <FormControl><Input type="password" {...field} className= 'bg-white' /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <h3 className="text-sm font-semibold pt-4">기업 정보</h3>

          <FormField
            control={form.control}
            name="company_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>기업명</FormLabel>
                <FormControl><Input {...field} className= 'bg-white' /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company_start_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>개업년월일</FormLabel>
                <FormControl><Input placeholder="YYYY-MM-DD" {...field} className= 'bg-white' /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="business_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>사업자등록번호</FormLabel>
                <div className="flex gap-2">
                  <FormControl><Input {...field} className= 'bg-white' /></FormControl>
                  <Button type="button" variant="outline" className='bg-main-light hover:bg-main-dark text-[#FAFAF5]'>중복확인</Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>기업 소개</FormLabel>
                <FormControl><Textarea rows={3} {...field} className= 'bg-white' /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="manager_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>담당자 성함</FormLabel>
                <FormControl><Input {...field} className= 'bg-white' /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="manager_phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>담당자 전화번호</FormLabel>
                <FormControl><Input {...field} className= 'bg-white' /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="manager_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>담당자 이메일</FormLabel>
                <FormControl><Input {...field} className= 'bg-white' /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-main-light text-[#FAFAF5] hover:bg-main-dark"
          >
            회원가입
          </Button>
        </form>
      </Form>
    </div>
  );
}
