'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormMessage, FormControl, FormItem, FormLabel, FormField } from '../ui/form';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { resumeSchemaRequest, ResumeRequest } from '@/types/Schema/resumeSchema';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

export default function ResumeForm() {
  const form = useForm<ResumeRequest>({
    resolver: zodResolver(resumeSchemaRequest),
    mode: 'onTouched', // 한 번 터치된 필드에 대해
    reValidateMode: 'onChange', // 이후에는 값이 변경될 때마다 검증
    defaultValues: {
      title: '',
      visibility: false, // 제출 시 공개로 변경
      name: '',
      phone_number: '',
      email: '',
      img_url: '',
      interests: '',
      desired_area: '',
      education: undefined,
      school_name: '',
      graduation_status: '',
      introduce: '',
      status: '작성중', // 제출 시 구직중으로 변경
      document_url: '',
      work_experience: [],
    },
  });

  const onSubmit = (data: ResumeRequest) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        {/* 채용 공고 제목 */}
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel className='text-base font-semibold'>이력서 제목</FormLabel>
              <FormControl>
                <Input placeholder='이력서 제목을 입력하세요.' {...field} />
              </FormControl>
              <FormMessage className='absolute top-0 right-0 text-sm' />
            </FormItem>
          )}
        />

        <div className='flex justify-between gap-4 max-md:flex-col'>
          {/* 이 div는 필요 없을지도? */}
          <div className='flex flex-col gap-4'>
            {/* 이력서 이미지 */}
            <FormField
              control={form.control}
              name='img_url'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel className='text-base font-semibold'>이력서 이미지</FormLabel>
                  <FormControl>
                    <Input type='file' placeholder='이력서 이미지를 입력하세요.' {...field} />
                  </FormControl>
                  <FormMessage className='absolute top-0 right-0 text-sm' />
                </FormItem>
              )}
            />
          </div>

          <div className='flex grow flex-col gap-4'>
            {/* 이름 */}
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel className='text-base font-semibold'>이름</FormLabel>
                  <FormControl>
                    <Input placeholder='이름을 입력하세요.' {...field} />
                  </FormControl>
                  <FormMessage className='absolute top-0 right-0 text-sm' />
                </FormItem>
              )}
            />

            {/* 전화번호 */}
            <FormField
              control={form.control}
              name='phone_number'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel className='text-base font-semibold'>전화번호</FormLabel>
                  <FormControl>
                    {/* 그냥 숫자를 - 끼워넣어서 보여줄 수 있나 (형식만) */}
                    <Input
                      {...field}
                      placeholder='전화번호를 입력하세요.'
                      value={(() => {
                        const val = field.value;
                        if (!val) return '';
                        if (val.length <= 3) return val;
                        if (val.length <= 7) return `${val.slice(0, 3)}-${val.slice(3)}`;
                        return `${val.slice(0, 3)}-${val.slice(3, 7)}-${val.slice(7)}`;
                      })()}
                      onChange={(e) => {
                        // 숫자만 추출하여 저장
                        const onlyNums = e.target.value.replace(/[^\d]/g, '');
                        field.onChange(onlyNums.slice(0, 11));
                      }}
                    />
                  </FormControl>
                  <FormMessage className='absolute top-0 right-0 text-sm' />
                </FormItem>
              )}
            />

            {/* 이메일 */}
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel className='text-base font-semibold'>이메일</FormLabel>
                  <FormControl>
                    <Input placeholder='이메일을 입력하세요.' {...field} />
                  </FormControl>
                  <FormMessage className='absolute top-0 right-0 text-sm' />
                </FormItem>
              )}
            />

            {/* 희망 근무 지역 */}
            <FormField
              control={form.control}
              name='desired_area'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel className='text-base font-semibold'>관심 지역</FormLabel>
                  <FormControl>
                    <Input placeholder='관심 지역을 입력하세요.' {...field} />
                  </FormControl>
                  <FormMessage className='absolute top-0 right-0 text-sm' />
                </FormItem>
              )}
            />

            {/* 희망 직종 */}
            <FormField
              control={form.control}
              name='interests'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel className='text-base font-semibold'>희망 직종</FormLabel>
                  <FormControl>
                    <Input placeholder='희망 직종을 입력하세요.' {...field} />
                  </FormControl>
                  <FormMessage className='absolute top-0 right-0 text-sm' />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className='flex grow flex-col gap-4'>
          {/* 경력 */}

          {/* 최종 학력 */}
          <FormField
            control={form.control}
            name='education'
            render={({ field }) => (
              <FormItem className='relative'>
                <FormLabel className='text-base font-semibold'>최종 학력</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='최종 학력을 선택하세요.' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(resumeSchemaRequest.shape.education._def.innerType.enum).map(
                      (item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
                <FormMessage className='absolute top-0 right-0 text-sm' />
              </FormItem>
            )}
          />
        </div>

        {/* 포트폴리오 */}
        <FormField
          control={form.control}
          name='document_url'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel className='text-base font-semibold'>포트폴리오</FormLabel>
              <FormControl>
                <Input placeholder='포트폴리오 링크를 입력하세요.' {...field} />
              </FormControl>
              <FormMessage className='absolute top-0 right-0 text-sm' />
            </FormItem>
          )}
        />

        <div className='flex grow flex-col gap-4'>
          {/* 자기소개 */}
          <FormField
            control={form.control}
            name='introduce'
            render={({ field }) => (
              <FormItem className='relative'>
                <FormLabel className='text-base font-semibold'>자기소개</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder='자기소개를 입력하세요.'
                    className='h-auto min-h-60 resize-none'
                  />
                </FormControl>
                <FormMessage className='absolute top-0 right-0 text-sm' />
              </FormItem>
            )}
          />
        </div>

        <div className='flex justify-between gap-2'>
          <Button className='bg-danger grow cursor-pointer hover:bg-amber-700'>취소하기</Button>
          <Button type='submit' className='bg-main-light hover:bg-main-dark grow cursor-pointer'>
            저장하기
          </Button>
        </div>
      </form>
    </Form>
  );
}
