'use client';

import { useForm } from 'react-hook-form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { useState, useEffect, useCallback } from 'react';
import { verifyEmailCode } from '@/api/user';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

interface VerificationFormValues {
  verification_code: string;
}

export default function EmailVerificationPage() {
  const form = useForm<VerificationFormValues>({
    defaultValues: {
      verification_code: '',
    },
  });

  const [timeLeft, setTimeLeft] = useState(600);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = useCallback((seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? `0${s}` : s}`;
  }, []);

  const handleSubmit = useCallback(
    async (data: VerificationFormValues) => {
      try {
        const savedFormData = JSON.parse(localStorage.getItem('registerFormData') || '{}');

        if (!savedFormData.email) {
          setError('잘못된 접근입니다. 다시 회원가입을 진행해주세요.');
          return;
        }

        await verifyEmailCode({
          email: savedFormData.email,
          verification_code: data.verification_code.trim(),
        });

        localStorage.setItem('emailVerified', 'true');

        alert('회원가입이 완료되었습니다!');
        // localStorage.removeItem('registerFormData');
        router.push('/');
      } catch (err) {
        const error = err as AxiosError;

        if (error.response?.status === 400) {
          setError('이미 가입된 이메일이거나 인증 실패했습니다.');
        } else {
          console.error('에러:', error);
          setError('인증 실패 또는 회원가입 실패했습니다.');
        }
      }
    },
    [router],
  );

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 px-4'>
      <div className='w-full max-w-sm rounded-lg bg-white p-8 shadow-md'>
        <h2 className='mb-6 text-center text-2xl font-bold'>이메일 인증</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='verification_code'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='mb-4 justify-center'>
                    등록된 이메일로 전송 된 인증번호를 입력해 주세요
                  </FormLabel>
                  <FormControl>
                    <div className='flex justify-center space-y-6'>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          {Array.from({ length: 6 }).map((_, idx) => (
                            <InputOTPSlot key={idx} index={idx} className='text-2xl' />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && <p className='text-center text-sm text-red-500'>{error}</p>}

            <Button
              type='submit'
              className='bg-main-light hover:bg-main-dark w-full text-white'
              disabled={timeLeft <= 0}
            >
              인증하기
            </Button>

            <div className='text-center text-sm text-gray-500'>
              남은 시간: {formatTime(timeLeft)}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
