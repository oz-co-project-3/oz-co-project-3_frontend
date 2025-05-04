'use client';

import { loginUser, getNaverLoginUrl } from '@/api/user';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/store/useAuthStore';

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
      const res = await loginUser(data);
      if (!res) {
        throw new Error('로그인 응답이 없습니다.');
      }

      const { email, user_id, user_type, name, access_token } = res;

      const user = {
        id: user_id,
        email,
        user_type,
        name: name,
        signinMethod: 'email' as const,
      };

      login(user, access_token);
      localStorage.setItem('user', JSON.stringify(user));

      console.log('로그인 완료:', user);
      router.push('/');
    } catch (err) {
      console.error('로그인 실패:', err);
      alert('이메일 또는 비밀번호가 잘못되었습니다.');
    }
  };

  const handleNaverLogin = async () => {
    try {
      const redirect_url = await getNaverLoginUrl();
      window.location.href = redirect_url;
    } catch (err) {
      console.error('네이버 로그인 요청 실패:', err);
      alert('네이버 로그인 요청에 실패했습니다.');
    }
  };

  return (
    <div className='bg-background-ivory flex min-h-screen flex-col items-center justify-center p-6'>
      <div className='w-full max-w-md rounded-xl bg-white p-8 shadow-md'>
        <h2 className='mb-6 text-center text-2xl font-bold'>로그인</h2>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
          <div>
            <label className='mb-1 block text-sm font-semibold'>이메일</label>
            <Input
              className='bg-white'
              type='email'
              {...register('email', { required: '이메일을 입력해주세요.' })}
            />
            {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
          </div>

          <div>
            <label className='mb-1 block text-sm font-semibold'>비밀번호</label>
            <Input
              className='bg-white'
              type='password'
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
            <Image src='/kakao.png' alt='카카오 로그인' width={300} height={45} />
            <button onClick={handleNaverLogin}>
              <Image src='/naver.png' alt='네이버 로그인' width={300} height={45} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
