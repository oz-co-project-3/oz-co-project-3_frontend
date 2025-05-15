'use client';

import { loginUser } from '@/api/user';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/store/useAuthStore';
import { LoginResponseData } from '@/types/user';

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

      const { email, user_id, user_type, name } = res;

      const user = {
        id: user_id,
        email,
        user_type: user_type,
        name: name,
        signinMethod: 'email' as 'email' | 'naver' | 'kakao',
      };

      login(user, res.access_token);
      console.log('로그인 완료:', user);
      if (user.user_type.includes('admin')) {
        router.push('/admin/user'); // 관리자는 /admin/user로
      } else {
        router.push('/');
      }
    } catch {
      alert('아이디 혹은 비밀번호가 일치하지 않습니다. 계정을 확인해 주세요.');
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
    <div className='bg-background-ivory flex min-h-screen flex-col items-center justify-center p-6 max-sm:-translate-y-30'>
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
