'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Textarea } from '@/components/ui/textarea';
import { CompanyProfileFormSchema, companyProfileSchema } from '@/types/Schema/companySchema';

interface CompanyProfileFormProps {
  type: 'register' | 'edit';
  defaultValues?: Partial<CompanyProfileFormSchema>;
  onSubmit: (data: CompanyProfileFormSchema) => void;
  onPasswordChange?: () => void;
  onWithdraw?: () => void;
}

export default function CompanyProfileForm({
  type,
  defaultValues,
  onSubmit,
  onPasswordChange,
  onWithdraw,
}: CompanyProfileFormProps) {
  const form = useForm<CompanyProfileFormSchema>({
    resolver: zodResolver(companyProfileSchema),
    defaultValues: {
      email: '',
      company_name: '',
      company_start_date: '',
      business_number: '',
      company_description: '',
      manager_name: '',
      manager_phone_number: '',
      manager_email: '',
      ...defaultValues,
    },
  });

  const handleCheckEmail = () => {
    alert('아직 준비중임');
  };

  return (
    <div className='mx-auto max-w-md rounded-xl bg-gray-100 p-6'>
      <h2 className='mb-4 text-center text-xl font-semibold'>
        {type === 'register' ? '기업 회원가입' : '기업 회원 정보 수정'}
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
            name='company_start_date'
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
                  onClick={onPasswordChange}
                  className='bg-main-light hover:bg-main-dark w-1/2 text-white'
                >
                  비밀번호 변경
                </Button>
              </div>
              <div className='text-center'>
                <button
                  type='button'
                  onClick={onWithdraw}
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
