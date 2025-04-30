'use client';

import { useEffect, useState } from 'react';
import JobPostingEditor from '../common/text-editor/JobPostingEditor';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobPostingSchema, JobPostingSchema } from '@/types/Schema/jobPostingSchema';
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

// page.tsx 또는 에디터를 사용하는 상위 컴포넌트에서
// import dynamic from 'next/dynamic';

// const JobPostingEditor = dynamic(() => import('@/components/common/textEditor/JobPostingEditor'), {
//   ssr: false,
// });

export default function JobPostingForm() {
  const [detailHTML, setDetailHTML] = useState<string>('');
  const [detailJSON, setDetailJSON] = useState<string>('');

  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  const form = useForm<JobPostingSchema>({
    resolver: zodResolver(jobPostingSchema),
    shouldFocusError: false,
    defaultValues: {
      title: '',
      salary: '협의 후 결정',
      location: '',
      employ_method: '정규직', //
      work_time: '', //
      position: '',
      recruitment_count: 1,
      education: '',
      deadline: '', // 날짜 형식?
      summary: '',
      history: undefined,
      // 필수 항목중에 필드에 입력 받지 않을 값을 디폴트로 넣어줘도 괜찮은듯
      company: '', // 프로필의 회사명 받아서 넣어주거나, 공고 조회시에만 회사명 개업일자 회사소개 넣어주기
      employment_type: '일반',
      status: '모집중',
      // description: '',
      description: detailHTML, // 빌드에러 방지용 (HTML, JSON 결정 후엔 윗줄로 바꿔서 하기)
    },
  });

  const onSubmit = (data: JobPostingSchema) => {
    console.table(data);
  };

  useEffect(() => {
    // JSON이나 HTML 중에 선택하기
    form.setValue('description', detailJSON, {
      shouldValidate: false,
    });
  }, [detailJSON, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
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

        <div className='flex justify-between gap-4 max-md:flex-col'>
          <div className='flex grow flex-col gap-4'>
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
                      {Object.values(jobPostingSchema.shape.employ_method.enum).map((item) => (
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

          <div className='flex grow flex-col gap-4'>
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
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => {
                          field.onChange(date ? date.toISOString() : '');
                          setIsCalendarOpen(false);
                        }}
                        disabled={(date) => date < new Date() || date > new Date('2035-12-31')}
                        locale={ko}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className='absolute top-0 right-0 text-sm' />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* 자격 요건 */}
        <FormField
          control={form.control}
          name='education'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel className='text-base font-semibold'>자격 요건</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder='학력, 자격, 경력 등 자격 요건을 입력하세요.'
                  className='h-auto min-h-36 resize-none'
                />
              </FormControl>
              <FormMessage className='absolute top-0 right-0 text-sm' />
            </FormItem>
          )}
        />

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

        {/* 업무 내용 */}
        <FormField
          control={form.control}
          name='summary'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel className='text-base font-semibold'>업무 내용</FormLabel>
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
          <JobPostingEditor setDetailHTML={setDetailHTML} setDetailJSON={setDetailJSON} />
          {/* 데이터 형식 미리보기 */}
          {/* <div className='mt-4'>
          <div className='text-sm font-bold'>HTML</div>
          <div>{detailHTML}</div>
          </div> */}
          {/* <div className='mt-4'>
            <div className='text-sm font-bold'>JSON</div>
            <div>{detailJSON}</div>
          </div> */}
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

// 폼으로 바꾸고, 에디터 위에도 텍스트 더 받아야함.
