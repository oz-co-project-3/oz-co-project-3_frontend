'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { SeekerFormData } from '@/types/user';
import Image from 'next/image';
import { useRef, useState } from 'react';

const schema = z
  .object({
    name: z.string().min(1, '이름을 입력해주세요'),
    email: z.string().email('올바른 이메일 형식을 입력하세요.'),
    birth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD 형식으로 입력해주세요'),
    password: z
      .string()
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=~`[\]{}|\\:;"'<>,.?/]).{8,}$/,
        '8자 이상, 영문/숫자/특수문자 포함',
      ),
    password_check: z.string(),
    phone: z.string().min(9, '전화번호는 - 제외 한 9자 이상 입력해주세요.'),
    gender: z.enum(['male', 'female', 'none']),
    interests: z.array(z.string()).optional(),
    purposes: z.array(z.string()).optional(),
    sources: z.array(z.string()).optional(),
  })
  .refine((data) => data.password === data.password_check, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['password_check'],
  });

type LocalSeekerFormData = z.infer<typeof schema>;

interface SeekerProfileFormProps {
  type: 'register' | 'edit';
  defaultValues?: Partial<LocalSeekerFormData>;
  onSubmit: (data: LocalSeekerFormData) => void;
} //이 부분 나중에

export default function SeekerProfileForm({
  type,
  defaultValues,
  onSubmit,
}: SeekerProfileFormProps) {
  const form = useForm<LocalSeekerFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      birth: '',
      password: '',
      password_check: '',
      phone: '',
      gender: 'none',
      interests: [],
      purposes: [],
      sources: [],
      ...defaultValues, // 회원가입 때 전달된 값
    },
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const interestOptions = [
    '사무',
    '서비스',
    '기술직',
    '교육/강사',
    '서울시 공공 일자리',
    '운전/배송',
    '기타',
  ];
  const purposeOptions = [
    '일자리 관련 정보',
    '교육 및 재취업 준비',
    '창업 및 부업 정보',
    '네트워킹 및 커뮤니티',
    '기타',
  ];
  const sourceOptions = [
    '네이버 검색',
    '구글 검색',
    '네이버 카페',
    '인스타그램/유튜브',
    '오프라인',
    '지인추천',
    '기타',
  ];

  const renderCheckboxGroup = (name: keyof SeekerFormData, options: string[]) => (
    <div className='grid grid-cols-2 gap-2'>
      {options.map((item) => (
        <Label key={item} className='cursor-pointer'>
          <div className='flex items-center gap-2'>
            <Checkbox
              id={`${name}-${item}`}
              checked={form.watch(name)?.includes(item)}
              onCheckedChange={(checked) => {
                const rawValue = form.getValues(name);
                const values = Array.isArray(rawValue) ? rawValue : [];
                form.setValue(name, checked ? [...values, item] : values.filter((i) => i !== item));
              }}
              className='data-[state=checked]:border-[#2F4858] data-[state=checked]:bg-[#2F4858]'
            />
            {item}
          </div>
        </Label>
      ))}
    </div>
  );

  return (
    <div className='mx-auto w-full max-w-xl rounded-xl bg-gray-100 p-8'>
      <h2 className='mb-6 text-center text-2xl font-bold'>
        {type === 'register' ? '회원가입' : '회원 정보 수정'}
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
          {/* 프로필 이미지  추가*/}
          {type === 'edit' && (
            <div className='mb-6 flex justify-center'>
              <div
                className='flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-[#2F4858] bg-white'
                onClick={() => fileInputRef.current?.click()}
              >
                {image ? (
                  <Image src={image} alt='Profile' className='object-cover' fill />
                ) : (
                  <span className='text-center text-sm text-[#2F4858]'>
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

          {/* 이메일 + 중복확인(회원가입일때만 보임)*/}
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
                      variant='outline'
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

          {/* 비밀번호 =회원가입일 경우만 보임*/}
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

              {/* 비밀번호 확인 */}
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
            name='phone'
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

          {/* 성별 선택 */}
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
            {renderCheckboxGroup('interests', interestOptions)}
          </div>

          {/* 가입 목적 */}
          <div>
            <p className='font-semibold'>어떤 정보를 얻고 싶어서 가입하셨나요? (중복 선택 가능)</p>
            {renderCheckboxGroup('purposes', purposeOptions)}
          </div>

          {/* 유입 경로 */}
          <div>
            <p className='font-semibold'>유입 경로 (중복 선택 가능)</p>
            {renderCheckboxGroup('sources', sourceOptions)}
          </div>

          <Button type='submit' className='bg-main-light hover:bg-main-dark w-full'>
            {type === 'register' ? '회원가입' : '회원정보 수정'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
