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
import { resendEmailCode } from '@/api/resendEmailCode';
import { useAuthStore } from '@/store/useAuthStore';

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
  const [resendCount, setResendCount] = useState(0);

  const login = useAuthStore((state) => state.login);

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

        login({
          id: savedFormData.user_id,
          email: savedFormData.email,
          name: savedFormData.name,
          user_type: savedFormData.user_type,
          signinMethod: ['email' as const],
        });

        alert('회원가입이 완료되었습니다!');
        router.push('/');
      } catch (err) {
        console.error('에러:', err);

        setError('인증 실패 또는 회원가입 실패했습니다.');
      }
    },
    [router, login],
  );

  const handleResendCode = useCallback(async () => {
    if (resendCount >= 5) {
      alert('인증번호 재전송은 최대 5회까지만 가능합니다.');
      return;
    }

    try {
      const savedFormData = JSON.parse(localStorage.getItem('registerFormData') || '{}');

      if (!savedFormData.email) {
        setError('잘못된 접근입니다. 다시 회원가입을 진행해주세요.');
        return;
      }

      await resendEmailCode(savedFormData.email);

      alert('인증번호가 다시 발송되었습니다.');

      setTimeLeft(600);

      setResendCount((prev) => prev + 1);
    } catch (err) {
      console.error('재전송 에러:', err);
      setError('인증번호 재전송에 실패했습니다.');
    }
  }, [resendCount]);

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

            <div className='flex gap-2'>
              <Button
                type='button'
                onClick={handleResendCode}
                className='text-main-light w-1/2 border bg-white hover:bg-gray-100'
                disabled={resendCount >= 5}
              >
                인증번호 재전송
              </Button>

              <Button
                type='submit'
                className='bg-main-light hover:bg-main-dark w-1/2 text-white'
                disabled={timeLeft <= 0}
              >
                인증하기
              </Button>
            </div>

            <div className='text-center text-sm text-gray-500'>
              남은 시간: {formatTime(timeLeft)}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
