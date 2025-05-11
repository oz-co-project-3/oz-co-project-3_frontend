'use client';

import { useForm } from 'react-hook-form';
import { seekerProfileSchema, SeekerProfileFormValues } from '@/types/Schema/seekerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkEmailDuplicate } from '@/api/user';
import { CheckboxGroup } from '@/components/common/userForms/checkboxGroupForm';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { interestOptions, purposeOptions, sourceOptions } from '@/constants/userOptions';
import WithdrawModal from '@/components/common/modals/WithdrawModal';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { SeekerFormData } from '@/types/user';

interface SeekerProfileFormProps {
  type: 'register' | 'edit';
  defaultValues?: Partial<SeekerFormData>;
  onSubmit: (data: { [key: string]: unknown }, isEmailVerified?: boolean) => void;
}

export default function SeekerProfileForm({
  type,
  defaultValues,
  onSubmit,
}: SeekerProfileFormProps) {
  const form = useForm<SeekerProfileFormValues>({
    resolver: zodResolver(seekerProfileSchema),
    defaultValues: {
      name: '',
      email: '',
      birth: '',
      password: '',
      password_check: '',
      phone_number: '',
      gender: 'none',
      interests: [] as string[],
      purposes: [] as string[],
      sources: [] as string[],
      status: 'seeking',
      ...defaultValues,
    },
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCheckEmail = async () => {
    const email = form.getValues('email');

    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }

    try {
      const isAvailable = await checkEmailDuplicate(email);

      if (isAvailable) {
        alert('사용 가능한 이메일입니다.');
        setIsEmailVerified(true);
      } else {
        alert('이미 사용 중인 이메일입니다.');
        setIsEmailVerified(false);
      }
    } catch (error) {
      console.error('이메일 확인 오류:', error);
      alert('이메일 중복확인 중 오류가 발생했습니다.');
      setIsEmailVerified(false);
    }
  };

  return (
    <div className='mx-auto w-full max-w-xl rounded-xl bg-gray-100 p-8'>
      <h2 className='mb-6 text-center text-2xl font-bold'>
        {type === 'register' ? '회원가입' : '회원 정보 수정'}
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            type === 'register' ? onSubmit(data, isEmailVerified) : onSubmit(data),
          )}
          className='space-y-5'
        >
          {/* 프로필 이미지 (수정일 때만) */}
          {type === 'edit' && (
            <div className='mb-6 flex justify-center'>
              <div
                className='flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-gray-300 bg-white'
                onClick={() => fileInputRef.current?.click()}
              >
                {image ? (
                  <Image src={image} alt='Profile' className='object-cover' fill />
                ) : (
                  <span className='text-center text-sm text-gray-500'>
                    변경하시려면
                    <br />
                    클릭하세요
                  </span>
                )}
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className='hidden'
                />
              </div>
            </div>
          )}

          {/* 이름 */}
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>이름</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    readOnly={type === 'edit'}
                    className={
                      type === 'edit' ? 'cursor-not-allowed bg-gray-300 text-gray-700' : 'bg-white'
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 이메일 */}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <div className='flex gap-2'>
                  <FormControl>
                    <Input
                      type='email'
                      {...field}
                      readOnly={type === 'edit'}
                      className={
                        type === 'edit'
                          ? 'cursor-not-allowed bg-gray-300 text-gray-700'
                          : 'bg-white'
                      }
                    />
                  </FormControl>
                  {type === 'register' && (
                    <Button
                      type='button'
                      onClick={handleCheckEmail}
                      className='bg-main-light hover:bg-main-dark text-white'
                    >
                      중복확인
                    </Button>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 생년월일 */}
          <FormField
            control={form.control}
            name='birth'
            render={({ field }) => (
              <FormItem>
                <FormLabel>생년월일</FormLabel>
                <FormControl>
                  <Input
                    placeholder='예: 1960-01-01'
                    {...field}
                    readOnly={type === 'edit'}
                    className={
                      type === 'edit' ? 'cursor-not-allowed bg-gray-300 text-gray-700' : 'bg-white'
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 비밀번호 (회원가입일 때만) */}
          {type === 'register' && (
            <>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input type='password' {...field} className='bg-white' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password_check'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호 확인</FormLabel>
                    <FormControl>
                      <Input type='password' {...field} className='bg-white' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {/* 전화번호 */}
          <FormField
            control={form.control}
            name='phone_number'
            render={({ field }) => (
              <FormItem>
                <FormLabel>전화번호</FormLabel>
                <FormControl>
                  <Input {...field} className='bg-white' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 성별 */}
          <FormField
            control={form.control}
            name='gender'
            render={({ field }) => (
              <FormItem>
                <FormLabel>성별</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='성별선택' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='male'>남성</SelectItem>
                    <SelectItem value='female'>여성</SelectItem>
                    <SelectItem value='none'>선택 안 함</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 관심 분야 */}
          <div>
            <p className='font-semibold'>관심 분야 (중복 선택 가능)</p>
            <CheckboxGroup form={form} name='interests' options={interestOptions} />
          </div>

          {/* 가입 목적 */}
          <div>
            <p className='font-semibold'>어떤 정보를 얻고 싶어서 가입하셨나요? (중복 선택 가능)</p>
            <CheckboxGroup form={form} name='purposes' options={purposeOptions} />
          </div>

          {/* 유입 경로 */}
          <div>
            <p className='font-semibold'>유입 경로 (중복 선택 가능)</p>
            <CheckboxGroup form={form} name='sources' options={sourceOptions} />
          </div>

          {/* 타입에 따라 바뀌는 버튼들 */}
          {type === 'register' ? (
            <Button type='submit' className='bg-main-light hover:bg-main-dark w-full'>
              회원가입
            </Button>
          ) : (
            <div className='space-y-4'>
              <div className='flex gap-2'>
                <Button type='submit' className='bg-main-light hover:bg-main-dark w-1/2 text-white'>
                  회원 정보 수정
                </Button>
                <Button
                  type='button'
                  onClick={() => alert('비밀번호 변경 클릭')}
                  className='bg-main-light hover:bg-main-dark w-1/2 text-white'
                >
                  비밀번호 변경
                </Button>
              </div>
              <div className='text-center'>
                <>
                  <button
                    type='button'
                    onClick={() => setShowWithdraw(true)}
                    className='text-sm text-gray-500 underline'
                  >
                    탈퇴하기
                  </button>

                  <WithdrawModal open={showWithdraw} onOpenChange={setShowWithdraw} />
                </>
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
