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
import { CompanyProfileFormSchema, companyProfileSchema } from '@/types/Schema/companySchema';
import { CompanyFormData } from '@/types/user';
import { verifyBusinessNumber } from '@/api/businessVerify';

interface CompanyProfileFormProps {
  type: 'register' | 'edit';
  defaultValues?: Partial<CompanyFormData>;
  onSubmit: (data: CompanyFormData) => void;
}

export default function CompanyProfileForm({
  type,
  defaultValues,
  onSubmit,
}: CompanyProfileFormProps) {
  const form = useForm<CompanyProfileFormSchema>({
    resolver: zodResolver(companyProfileSchema),
    defaultValues: {
      company_name: '',
      business_number: '',
      business_start_date: '',
      manager_name: '',
      manager_phone_number: '',
      ...defaultValues,
    },
  });

  return (
    <div className='mx-auto max-w-md rounded-xl bg-gray-100 p-6'>
      <h2 className='mb-4 text-center text-xl font-semibold'>
        {type === 'register' ? '기업 회원 인증' : '기업 회원 정보 수정'}
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <h3 className='pt-4 text-sm font-semibold'>기업 정보</h3>

          {/* 기업명 */}
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

          {/* 개업일 */}
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

          {/* 사업자번호 */}
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
                      onClick={async () => {
                        const businessNumber = form.getValues('business_number');
                        if (!businessNumber) {
                          alert('사업자등록번호를 입력해주세요.');
                          return;
                        }

                        try {
                          const result = await verifyBusinessNumber(businessNumber);
                          alert(
                            result.is_valid
                              ? '사업자등록번호 확인 완료!'
                              : '유효하지 않은 번호입니다.',
                          );
                        } catch (error) {
                          alert('오류 발생. 콘솔 확인');
                          console.error(error);
                        }
                      }}
                      className='bg-main-light hover:bg-main-dark h-10 px-3 text-white'
                    >
                      유효확인
                    </Button>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 담당자 */}
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

          {/* 전화번호 */}
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

          <Button type='submit' className='bg-main-light hover:bg-main-dark w-full text-white'>
            기업회원 저장하기
          </Button>
        </form>
      </Form>
    </div>
  );
}
