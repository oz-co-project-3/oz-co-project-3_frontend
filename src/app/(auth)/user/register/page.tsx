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

const schema = z
  .object({
    name: z.string().min(1, '이름을 입력해주세요'),
    email: z.string().email('올바른 이메일 형식'),
    birth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD 형식으로 입력해주세요'),
    password: z
      .string()
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=~`[\]{}|\\:;"'<>,.?/]).{8,}$/,
        '8자 이상, 영문/숫자/특수문자 포함',
      ),
    password_check: z.string(),
    phone: z.string().min(9, '전화번호는 - 제외 한 9자 이상 입력해주세요.'),
    gender: z.string().optional(),
    interests: z.array(z.string()).optional(),
    purposes: z.array(z.string()).optional(),
    sources: z.array(z.string()).optional(),
  })
  .refine((data) => data.password === data.password_check, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['password_check'],
  });

type FormData = z.infer<typeof schema>;

export default function SeekerProfileForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      birth: '',
      password: '',
      password_check: '',
      phone: '',
      gender: '',
      interests: [],
      purposes: [],
      sources: [],
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('회원가입 데이터:', data);
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

  const renderCheckboxGroup = (name: keyof FormData, options: string[]) => (
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
      <h2 className='mb-6 text-center text-2xl font-bold'>회원가입</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
          {/* 이름 */}
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>이름</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 이메일 + 중복확인 */}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <div className='flex gap-2 '>
                  <FormControl>
                    <Input type='email' {...field} />
                  </FormControl>
                  <Button type='button' variant='outline' className='bg-[#57AC5E] hover:bg-[#0c6d2f] text-white'>
                    중복확인
                  </Button>
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
                  <Input placeholder='예: 1960-01-01' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 비밀번호 */}
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input type='password' {...field} />
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
                  <Input type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 전화번호 */}
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>전화번호</FormLabel>
                <FormControl>
                  <Input {...field} />
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

          <Button type='submit' className='w-full bg-[#57AC5E] hover:bg-[#0c6d2f]'>
            회원가입
          </Button>
        </form>
      </Form>
    </div>
  );
}
