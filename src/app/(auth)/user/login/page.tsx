'use client';

import { loginUser } from '@/api/user';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/store/useAuthStore';
import { resendEmailCode } from '@/api/resendEmailCode';
import { LoginResponseData, User } from '@/types/user';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res: LoginResponseData | null = await loginUser(data);

      if (!res) {
        throw new Error('로그인 응답이 없습니다.');
      }

      const user: User = {
        id: res.user_id,
        email: res.email,
        user_type: res.user_type,
        name: res.name,
        signinMethod: 'email',
      };

      login(user, res.access_token);
      console.log('로그인 완료:', user);
      router.push('/');
    } catch (error: unknown) {
      const err = error as {
        status: number;
        message?: {
          code?: string;
          error?: string;
        };
      };

      const code = err?.message?.code;
      const msg = err?.message?.error || '알 수 없는 오류입니다.';

      switch (code) {
        case 'unverified_or_inactive_account':
          try {
            await resendEmailCode(data.email);
            localStorage.setItem('registerFormData', JSON.stringify({ email: data.email }));
            alert('이메일 인증이 필요합니다. 인증코드를 재전송했습니다.');
            router.push('/user/email-verification');
          } catch {
            alert('인증코드 재전송에 실패했습니다.');
          }
          break;

        case 'invalid_credentials':
          alert('이메일 또는 비밀번호가 일치하지 않습니다.');
          break;

        case 'user_not_found':
          alert('존재하지 않는 계정입니다.');
          break;

        case 'invalid_password':
          alert('비밀번호 조건이 맞지 않습니다. (8자 이상 + 특수문자 포함)');
          break;

        default:
          alert(msg);
          break;
      }

      console.error('로그인 실패:', err);
    }
  };

  const handleNaverLogin = () => {
    const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI;
    const STATE = 'naver_login_test_2025';

    const url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI!,
    )}&state=${STATE}`;

    window.location.href = url;
  };

  const handleKakaoLogin = () => {
    const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

    const STATE = crypto.randomUUID();
    localStorage.setItem('kakao_login_state', STATE);

    const url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI!,
    )}&state=${STATE}`;

    window.location.href = url;
  };

  return (
    <div className='bg-background-ivory flex min-h-screen flex-col items-center justify-center p-6'>
      <div className='w-full max-w-md rounded-xl bg-white p-8 shadow-md'>
        <h2 className='mb-6 text-center text-2xl font-bold'>로그인</h2>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
          <div>
            <label className='mb-1 block text-sm font-semibold'>이메일</label>
            <Input
              type='email'
              className='bg-white'
              {...register('email', { required: '이메일을 입력해주세요.' })}
            />
            {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
          </div>

          <div>
            <label className='mb-1 block text-sm font-semibold'>비밀번호</label>
            <Input
              type='password'
              className='bg-white'
              {...register('password', { required: '비밀번호를 입력해주세요.' })}
            />
            {errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}
          </div>

          <Button type='submit' className='bg-main-light hover:bg-main-dark w-full'>
            로그인
          </Button>

          <div className='mt-4 flex flex-col items-center text-sm font-semibold text-black'>
            <Link href='/user/find-account'>이메일/비밀번호 찾기</Link>
            <Link href='/user/register'>회원가입</Link>
          </div>
        </form>

        <div className='mt-6'>
          <hr className='my-5' />
          <div className='flex flex-col items-center gap-3'>
            <button onClick={handleKakaoLogin}>
              <Image src='/kakao.png' alt='카카오 로그인' width={300} height={45} />
            </button>
            <button onClick={handleNaverLogin}>
              <Image src='/naver.png' alt='네이버 로그인' width={300} height={45} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
