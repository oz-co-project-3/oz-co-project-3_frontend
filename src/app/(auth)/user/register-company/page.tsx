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
  email: z.string().email(),
  password: z.string().min(6),
  passwordConfirm: z.string().min(6),
  companyName: z.string(),
  establishmentDate: z.string(),
  businessNumber: z.string(),
  introduction: z.string().optional(),
  managerName: z.string(),
  managerPhone: z.string(),
  managerEmail: z.string().email(),
}).refine((data) => data.password === data.passwordConfirm, {
  message: '비밀번호가 일치하지 않습니다.',
  path: ['passwordConfirm'],
});

type FormSchema = z.infer<typeof formSchema>;

export default function CompanyRegisterForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      companyName: '',
      establishmentDate: '',
      businessNumber: '',
      introduction: '',
      managerName: '',
      managerPhone: '',
      managerEmail: '',
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
                  <FormControl><Input {...field} /></FormControl>
                  <Button type="button" variant="outline" className='bg-[#57AC5E] hover:bg-[#0c6d2f] text-[#FAFAF5]'>중복확인</Button>
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
                <FormControl><Input type="password" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호 확인</FormLabel>
                <FormControl><Input type="password" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <h3 className="text-sm font-semibold pt-4">기업 정보</h3>

          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>기업명</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="establishmentDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>개업년월일</FormLabel>
                <FormControl><Input placeholder="YYYY-MM-DD" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="businessNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>사업자등록번호</FormLabel>
                <div className="flex gap-2">
                  <FormControl><Input {...field} /></FormControl>
                  <Button type="button" variant="outline" className='bg-[#57AC5E] hover:bg-[#0c6d2f] text-[#FAFAF5]'>중복확인</Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="introduction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>기업 소개</FormLabel>
                <FormControl><Textarea rows={3} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="managerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>담당자 성함</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="managerPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>담당자 전화번호</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="managerEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>담당자 이메일</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-[#57AC5E] text-[#FAFAF5] hover:bg-[#0d7a32]"
          >
            회원가입
          </Button>
        </form>
      </Form>
    </div>
  );
}
