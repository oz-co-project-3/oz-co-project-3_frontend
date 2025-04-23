'use client';

import { useForm } from 'react-hook-form';
import { checkEmailDuplicate } from '@/api/user';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'; // 이거 성별 드롭다운 지워달라해야함....
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CompanyProfileFormSchema, companyProfileSchema } from '@/types/Schema/companySchema';
import { CompanyFormData } from '@/types/user';

interface CompanyProfileFormProps {
  type: 'register' | 'edit';
  defaultValues?: Partial<CompanyFormData>;
  onSubmit: (data: CompanyFormData, _isEmailVerified: boolean) => void;
}

export default function CompanyProfileForm({
  type,
  defaultValues,
  onSubmit,
}: CompanyProfileFormProps) {
  const form = useForm<CompanyProfileFormSchema>({
    resolver: zodResolver(companyProfileSchema),
    defaultValues: {
      email: '',
      password: '',
      password_check: '',
      company_name: '',
      business_number: '',
      business_start_date: '',
      company_description: '',
      gender: 'none',
      manager_name: '',
      manager_phone_number: '',
      manager_email: '',
      ...defaultValues,
    },
  });

  const [isEmailVerified, setIsEmailVerified] = useState(false);

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
    <div className='mx-auto max-w-md rounded-xl bg-gray-100 p-6'>
      <h2 className='mb-4 text-center text-xl font-semibold'>
        {type === 'register' ? '기업 회원가입' : '기업 회원 정보 수정'}
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => onSubmit(data, isEmailVerified))}
          className='space-y-4'
        >
          {/* 기본 정보 */}
          <h3 className='text-sm font-semibold'>기본 정보</h3>

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <div className='flex gap-2'>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly={type === 'edit'}
                      className={type === 'edit' ? 'bg-gray-200 text-gray-500' : 'bg-white'}
                    />
                  </FormControl>

                  {/* 회원가입(register)일 때만 중복확인 버튼 보여줌 */}
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

          {/* 비밀번호, 비밀번호 확인 필드 */}
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

          {/* 이거 지워야함 */}
          <FormField
            control={form.control}
            name='gender'
            render={({ field }) => (
              <FormItem>
                <FormLabel>성별</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='성별선택' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='male'>남성</SelectItem>
                    <SelectItem value='female'>여성</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 기업 정보 */}
          <h3 className='pt-4 text-sm font-semibold'>기업 정보</h3>

          <FormField
            control={form.control}
            name='company_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>기업명</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    readOnly={type === 'edit'}
                    className={type === 'edit' ? 'bg-gray-200 text-gray-500' : 'bg-white'}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='business_start_date'
            render={({ field }) => (
              <FormItem>
                <FormLabel>개업년월일</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='YYYY-MM-DD'
                    readOnly={type === 'edit'}
                    className={type === 'edit' ? 'bg-gray-200 text-gray-500' : 'bg-white'}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='business_number'
            render={({ field }) => (
              <FormItem>
                <FormLabel>사업자등록번호</FormLabel>
                <div className='flex gap-2'>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly={type === 'edit'}
                      className={type === 'edit' ? 'bg-gray-200 text-gray-500' : 'bg-white'}
                    />
                  </FormControl>
                  {type === 'register' && (
                    <Button
                      type='button'
                      onClick={() => alert('사업자등록번호 확인')}
                      className='bg-main-light hover:bg-main-dark h-10 px-3 whitespace-nowrap text-white'
                    >
                      유효확인
                    </Button>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='company_description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>기업 소개</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={3}
                    readOnly={type === 'edit'}
                    className={type === 'edit' ? 'bg-gray-200 text-gray-500' : 'bg-white'}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 담당자 정보 */}
          <FormField
            control={form.control}
            name='manager_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>담당자 성함</FormLabel>
                <FormControl>
                  <Input {...field} className='bg-white' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='manager_phone_number'
            render={({ field }) => (
              <FormItem>
                <FormLabel>담당자 전화번호</FormLabel>
                <FormControl>
                  <Input {...field} className='bg-white' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='manager_email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>담당자 이메일</FormLabel>
                <FormControl>
                  <Input {...field} className='bg-white' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 버튼들 */}
          {type === 'register' ? (
            <Button type='submit' className='bg-main-light hover:bg-main-dark w-full text-white'>
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
                <button
                  type='button'
                  onClick={() => alert('탈퇴하기 클릭')}
                  className='text-sm text-gray-500 underline'
                >
                  탈퇴하기
                </button>
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
