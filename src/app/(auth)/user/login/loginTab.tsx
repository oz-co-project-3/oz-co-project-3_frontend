'use client';

import { loginUser } from '@/api/user';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

type UserType = 'seeker' | 'business';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginTab() {
  const [tab, setTab] = useState<UserType>('seeker');

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {}, //errors
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    console.log('보내는 데이터', data);
    try {
      const res = await loginUser({
        ...data,
        user_type: tab,
      });

      console.log('로그인 성공 👌', res);
      router.push('/');

      localStorage.setItem('access_token', res.access_token);
      alert(`로그인 시도: ${tab}`);
    } catch (err) {
      console.error('❌ 로그인 실패 ❌:', err);
      alert('이메일 또는 비밀번호가 잘못되었습니다.');
    }
  };

  return (
    <div className='bg--backgroundivory w-full'>
      <Tabs defaultValue='seeker' onValueChange={(val) => setTab(val as UserType)}>
        <TabsList className='mx-auto mb-4 grid w-full max-w-sm grid-cols-2'>
          <TabsTrigger
            value='seeker'
            className='data-[state=active]:bg-main-light border-main-light rounded-t-md border text-sm data-[state=active]:text-white'
          >
            개인회원
          </TabsTrigger>
          <TabsTrigger
            value='business'
            className='data-[state=active]:bg-main-light border-main-light rounded-t-md border text-sm data-[state=active]:text-white'
          >
            기업회원
          </TabsTrigger>
        </TabsList>

        <div className='rounded-xl bg-gray-100 p-8'>
          <h2 className='mb-6 text-center text-xl font-bold'>로그인</h2>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div>
              <label className='mb-1 block text-sm font-semibold'>이메일</label>
              <Input className='bg-white' type='email' {...register('email')} />
            </div>
            <div>
              <label className='mb-1 block text-sm font-semibold'>비밀번호</label>
              <Input className='bg-white' type='password' {...register('password')} />
            </div>

            <Button type='submit' className='bg-main-light hover:bg-main-dark w-full'>
              로그인
            </Button>

            <div className='mt-3 flex flex-col items-center gap-1 text-sm font-semibold text-black'>
              <Link href='/user/find-account'>이메일/비밀번호 찾기</Link>
              <Link href={tab === 'seeker' ? '/user/register' : '/user/register-company'}>
                회원가입
              </Link>
            </div>
          </form>

          {/* ✅ 개인회원일 때만 소셜 로그인 보여주기 */}
          {tab === 'seeker' && (
            <>
              <hr className='my-5' />
              <div className='flex flex-col items-center gap-3'>
                <Image src='/kakao.png' alt='카카오 로그인' width={300} height={45} />
                <Image src='/naver.png' alt='네이버 로그인' width={300} height={45} />
              </div>
            </>
          )}
        </div>
      </Tabs>
    </div>
  );
}
