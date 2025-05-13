'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { verifyEmailCode } from '@/api/user';
import { resendEmailCode } from '@/api/resendEmailCode';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';

interface VerificationFormValues {
  verification_code: string;
}

export default function EmailVerificationClient() {
  const form = useForm<VerificationFormValues>({
    defaultValues: {
      verification_code: '',
    },
  });

  const [timeLeft, setTimeLeft] = useState(600);
  const [error, setError] = useState('');
  const [resendCount, setResendCount] = useState(0);

  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const type = searchParams.get('type') || 'signup';

  useEffect(() => {
    if (!email) {
      setError('잘못된 접근입니다. 이메일 정보가 없습니다.');
    }
  }, [email]);

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
      if (!email) {
        setError('이메일 정보가 없습니다.');
        return;
      }

      try {
        await verifyEmailCode({
          email,
          verification_code: data.verification_code.trim(),
        });

        if (type === 'change-password') {
          router.push(`/user/change-password?email=${encodeURIComponent(email)}`);
        } else {
          alert('이메일 인증이 완료되었습니다. 로그인 후 이용해 주세요.');
          router.push('/user/login');
        }
      } catch (err) {
        console.error('인증 실패:', err);
        setError('인증에 실패했습니다. 인증코드를 다시 확인해주세요.');
      }
    },
    [email, type, router],
  );

  const handleResendCode = useCallback(async () => {
    if (!email) {
      setError('이메일 정보가 없습니다.');
      return;
    }

    if (resendCount >= 5) {
      alert('인증번호 재전송은 최대 5회까지만 가능합니다.');
      return;
    }

    try {
      await resendEmailCode(email);
      alert('인증번호가 다시 발송되었습니다.');
      setTimeLeft(600);
      setResendCount((prev) => prev + 1);
    } catch (err) {
      console.error('재전송 에러:', err);
      setError('인증번호 재전송에 실패했습니다.');
    }
  }, [email, resendCount]);

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
                    등록된 이메일로 전송된 인증번호를 입력해 주세요
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
