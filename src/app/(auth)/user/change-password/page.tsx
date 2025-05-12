'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { resetPassword } from '@/api/user';
import { useRouter } from 'next/navigation';
import { FormMessage } from '@/components/ui/form';
import { Form } from '@/components/ui/form';

const schema = z
  .object({
    email: z.string().email('올바른 이메일 형식을 입력하세요.'),
    new_password: z
      .string()
      .min(8, '비밀번호는 8자 이상이어야 합니다.')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=~`\[\]{}|\\:;"'<>,.?/])/,
        '영문, 숫자, 특수문자를 모두 포함해야 합니다.',
      ),
    new_password_check: z.string(),
  })
  .refine((data) => data.new_password === data.new_password_check, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['new_password_check'],
  });

type FormValues = z.infer<typeof schema>;

export default function ChangePasswordPage() {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await resetPassword(data.email, data.new_password, data.new_password_check);
      alert('비밀번호가 변경되었습니다.');
      router.push('/user/login');
    } catch {
      alert('비밀번호 변경에 실패했습니다.');
    }
  };

  return (
    <div className='mx-auto mt-10 w-full max-w-md rounded-lg bg-white p-6 shadow'>
      <h2 className='mb-4 text-xl font-bold'>비밀번호 변경</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <Input {...form.register('email')} placeholder='이메일' />
            <FormMessage>{form.formState.errors.email?.message}</FormMessage>
          </div>
          <div>
            <Input type='password' {...form.register('new_password')} placeholder='새 비밀번호' />
            <FormMessage>{form.formState.errors.new_password?.message}</FormMessage>
          </div>
          <div>
            <Input
              type='password'
              {...form.register('new_password_check')}
              placeholder='비밀번호 확인'
            />
            <FormMessage>{form.formState.errors.new_password_check?.message}</FormMessage>
          </div>
          <Button type='submit' className='bg-main-light w-full text-white'>
            비밀번호 변경
          </Button>
        </form>
      </Form>
    </div>
  );
}
