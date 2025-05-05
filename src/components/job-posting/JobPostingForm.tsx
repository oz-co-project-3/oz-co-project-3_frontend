'use client';

import { useEffect, useState } from 'react';
import JobPostingEditor from '../common/text-editor/JobPostingEditor';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { JobPostingRequest, jobPostingSchemaRequest } from '@/types/Schema/jobPostingSchema';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Calendar } from '../ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { fetchOnClient } from '@/api/clientFetcher';
import useSWRMutation from 'swr/mutation';

// page.tsx 또는 에디터를 사용하는 상위 컴포넌트에서
// 클라이언트 전용으로 렌더링하고 싶을때
// import dynamic from 'next/dynamic';
// const JobPostingEditor = dynamic(() => import('@/components/common/textEditor/JobPostingEditor'), {
//   ssr: false,
// });

export default function JobPostingForm() {
  const [detailJSON, setDetailJSON] = useState<string>('');
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  // 컴포넌트 분리라던가. 좀 더 생각해보기 (data, isMutating, error 가져와서 마저 처리하기)
  const { trigger } = useSWRMutation(
    '/api/job_posting/',
    async (url: string, { arg }: { arg: JobPostingRequest }) => {
      return fetchOnClient(url, {
        method: 'POST',
        body: JSON.stringify(arg),
      });
    },
  );

  const form = useForm<JobPostingRequest>({
    resolver: zodResolver(jobPostingSchemaRequest),
    // mode: 'onSubmit', // 한 번 제출한 뒤에
    // reValidateMode: 'onBlur', // 이후에는 포커스를 잃을 때마다 검증
    mode: 'onTouched', // 한 번 터치된 필드에 대해
    reValidateMode: 'onChange', // 이후에는 값이 변경될 때마다 검증
    defaultValues: {
      company: '',
      title: '',
      location: '',
      employment_type: '일반',
      employ_method: '정규직',
      work_time: '',
      position: '',
      history: undefined,
      recruitment_count: 0,
      education: '',
      deadline: '', // YYYY-MM-DD
      salary: '협의 후 결정',
      summary: undefined,
      description: '',
      status: '모집중',
      career: '경력무관',
      image_url: undefined,
    },
  });

  // TODO: API 요청 성공 후 로직 필요함
  const onSubmit = (data: JobPostingRequest) => {
    console.table(data);

    // try, catch 로 바꾸기
    trigger(data)
      .then((response) => {
        console.log('성공:', response);
        // 성공 처리 로직 (예: 알림, 리디렉션 등)
      })
      .catch((error) => {
        console.error('에러:', error);
        // 에러 처리 로직
      });
  };

  useEffect(() => {
    form.setValue('description', detailJSON, {
      shouldValidate: false,
    });
  }, [detailJSON, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-8'>
        {/* 채용 공고 제목 */}
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel className='text-base font-semibold'>채용 공고 제목</FormLabel>
              <FormControl>
                <Input placeholder='채용 공고 제목을 입력하세요.' {...field} />
              </FormControl>
              <FormMessage className='absolute top-0 right-0 text-sm' />
            </FormItem>
          )}
        />

        {/* 회사명 */}
        <FormField
          control={form.control}
          name='company'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel className='text-base font-semibold'>회사명</FormLabel>
              <FormControl>
                <Input placeholder='주소를 입력하세요.' {...field} />
              </FormControl>
              <FormMessage className='absolute top-0 right-0 text-sm' />
            </FormItem>
          )}
        />

        {/* 썸네일 이미지 */}
        <FormField
          control={form.control}
          name='image_url'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel className='text-base font-semibold'>썸네일 이미지</FormLabel>
              <FormControl>
                <Input placeholder='주소를 입력하세요.' {...field} />
              </FormControl>
              <FormMessage className='absolute top-0 right-0 text-sm' />
            </FormItem>
          )}
        />

        <div className='flex justify-between gap-8 max-md:flex-col'>
          <div className='flex grow flex-col gap-8'>
            {/* 급여 */}
            <FormField
              control={form.control}
              name='salary'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel className='text-base font-semibold'>급여</FormLabel>
                  <FormControl>
                    <Input placeholder='월/연 급여를 입력하세요.' {...field} />
                  </FormControl>
                  <FormMessage className='absolute top-0 right-0 text-sm' />
                </FormItem>
              )}
            />

            {/* 모집 직무 */}
            <FormField
              control={form.control}
              name='position'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel className='text-base font-semibold'>모집 직무</FormLabel>
                  <FormControl>
                    <Input placeholder='모집 직무를 입력하세요.' {...field} />
                  </FormControl>
                  <FormMessage className='absolute top-0 right-0 text-sm' />
                </FormItem>
              )}
            />

            {/* 근무 형태 */}
            <FormField
              control={form.control}
              name='employ_method'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel className='text-base font-semibold'>근무 형태</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='근무 형태를 선택하세요.' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(jobPostingSchemaRequest.shape.employ_method.enum).map(
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

            {/* 자격 요건 */}
            <FormField
              control={form.control}
              name='career'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel className='text-base font-semibold'>자격 요건</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='자격 요건을 선택하세요.' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(jobPostingSchemaRequest.shape.career.enum).map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className='absolute top-0 right-0 text-sm' />
                </FormItem>
              )}
            />
          </div>

          <div className='flex grow flex-col gap-8'>
            {/* 근무 시간 */}
            <FormField
              control={form.control}
              name='work_time'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel className='text-base font-semibold'>근무 시간</FormLabel>
                  <FormControl>
                    <Input placeholder='근무 시간을 입력하세요.' {...field} />
                  </FormControl>
                  <FormMessage className='absolute top-0 right-0 text-sm' />
                </FormItem>
              )}
            />

            {/* 모집 인원 */}
            <FormField
              control={form.control}
              name='recruitment_count'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel className='text-base font-semibold'>모집 인원</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      placeholder='모집 인원을 입력하세요.'
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage className='absolute top-0 right-0 text-sm' />
                </FormItem>
              )}
            />

            {/* 채용 마감일 */}
            <FormField
              control={form.control}
              name='deadline'
              render={({ field }) => (
                <FormItem className='relative flex flex-col'>
                  <FormLabel className='text-base font-semibold'>채용 마감일</FormLabel>
                  <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP', { locale: ko })
                          ) : (
                            <span>날짜를 선택하세요.</span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className='w-[var(--radix-popover-trigger-width)] p-0' // 너무 안예쁘면 다시 w-auto
                      align='start'
                    >
                      <Calendar
                        mode='single'
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => {
                          field.onChange(date ? format(date, 'yyyy-MM-dd') : '');
                          setIsCalendarOpen(false);
                        }}
                        disabled={(date) => date < new Date() || date > new Date('2035-12-31')}
                        locale={ko}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className='absolute top-0 right-0 text-sm' />
                </FormItem>
              )}
            />

            {/* 학력 */}
            <FormField
              control={form.control}
              name='education'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel className='text-base font-semibold'>학력</FormLabel>
                  <FormControl>
                    <Input placeholder='학력 조건을 입력하세요.' {...field} />
                  </FormControl>
                  <FormMessage className='absolute top-0 right-0 text-sm' />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* 근무지 정보 */}
        <FormField
          control={form.control}
          name='location'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel className='text-base font-semibold'>근무지 정보</FormLabel>
              <FormControl>
                <Input placeholder='주소를 입력하세요.' {...field} />
              </FormControl>
              <FormMessage className='absolute top-0 right-0 text-sm' />
            </FormItem>
          )}
        />

        {/* 회사 약력 */}
        <FormField
          control={form.control}
          name='history'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel className='text-base font-semibold'>회사 약력</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder='회사 약력을 입력하세요.'
                  className='h-auto min-h-36 resize-none'
                />
              </FormControl>
              <FormMessage className='absolute top-0 right-0 text-sm' />
            </FormItem>
          )}
        />

        {/* 주요 업무 */}
        <FormField
          control={form.control}
          name='summary'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel className='text-base font-semibold'>주요 업무</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder='업무 내용을 입력하세요.'
                  className='h-auto min-h-36 resize-none'
                />
              </FormControl>
              <FormMessage className='absolute top-0 right-0 text-sm' />
            </FormItem>
          )}
        />

        {/* 상세 모집 내용 */}
        <div className='flex flex-col gap-2'>
          <span className='font-semibold'>상세 모집 내용</span>
          <JobPostingEditor setDetailJSON={setDetailJSON} />
          {/* 데이터 형식 미리보기 */}
          {/* <div className='mt-4'>
            <div className='text-sm font-bold'>JSON</div>
            <div>{detailJSON}</div>
          </div> */}
          {/* 유효성 검사 오류 표시 */}
          {/* <div className='text-sm text-red-500'>{JSON.stringify(form.formState.errors)}</div> */}
        </div>

        <div className='flex justify-between gap-2'>
          <Button
            className='bg-danger grow cursor-pointer hover:bg-amber-700'
            onClick={() => console.log('클릭')}
          >
            취소하기
          </Button>
          <Button
            type='submit'
            className='bg-main-light hover:bg-main-dark grow cursor-pointer'
            // disabled={!form.formState.isValid}
            onClick={() => form.trigger()}
          >
            저장하기
          </Button>
        </div>
      </form>
    </Form>
  );
}

// 썸네일 이미지 추가

// 폼필드 컴포넌트화
