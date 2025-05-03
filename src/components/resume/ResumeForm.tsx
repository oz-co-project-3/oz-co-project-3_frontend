'use client';

// import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormMessage, FormControl, FormItem, FormLabel, FormField } from '../ui/form';
import useSWRMutation from 'swr/mutation';
import { apiFetch } from '@/lib/fetcher';
import { Input } from '../ui/input';
import { useFieldArray, useForm } from 'react-hook-form';
import { resumeSchemaRequest, ResumeRequest } from '@/types/Schema/resumeSchema';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

export default function ResumeForm() {
  // 컴포넌트 분리라던가. 좀 더 생각해보기 (data, isMutating, error 가져와서 마저 처리하기)
  const { trigger } = useSWRMutation(
    '/api/resume/',
    async (url: string, { arg }: { arg: ResumeRequest }) => {
      return apiFetch(url, {
        method: 'POST',
        body: JSON.stringify(arg), // 왜 그냥이 아니고 stringify?
      });
    },
  );

  const form = useForm<ResumeRequest>({
    resolver: zodResolver(resumeSchemaRequest),
    mode: 'onSubmit', // 한 번 제출한 뒤에
    reValidateMode: 'onBlur', // 이후에는 포커스를 잃을 때마다 검증
    defaultValues: {
      title: '',
      visibility: false, // 제출 시 공개로 변경
      name: '',
      phone_number: '',
      email: '',
      img_url: undefined,
      interests: undefined,
      desired_area: '',
      education: undefined,
      school_name: undefined,
      graduation_status: undefined,
      introduce: '',
      status: '작성중', // 제출 시 구직중으로 변경
      document_url: undefined,
      work_experience: [
        { company: '', period: '', position: '' },
        { company: '', period: '', position: '' },
      ],
    },
  });

  const workExperience = useFieldArray({
    control: form.control,
    name: 'work_experience',
  });

  // TODO: API 요청 성공 후 로직 필요함
  const onSubmit = (data: ResumeRequest) => {
    data.visibility = true;
    data.status = '구직중';
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-8'>
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

        <div className='flex justify-between gap-8 max-md:flex-col'>
          {/* 이 div는 필요 없을지도? */}
          <div className='flex flex-col gap-8'>
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

          <div className='flex grow flex-col gap-8'>
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

                        // 숫자만 추출
                        const nums = val.replace(/[^\d]/g, '').slice(0, 11);

                        if (!val) return '';
                        if (nums.length <= 3) return nums;
                        if (nums.length <= 7) return `${nums.slice(0, 3)}-${nums.slice(3)}`;
                        return `${nums.slice(0, 3)}-${nums.slice(3, 7)}-${nums.slice(7)}`;
                      })()}
                      // onChange={(e) => {
                      //   // 숫자만 추출하여 저장
                      //   const onlyNums = e.target.value.replace(/[^\d]/g, '');
                      //   field.onChange(onlyNums.slice(0, 11));
                      // }}
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

        {/* 경력 */}
        <div className='flex flex-col gap-4 rounded-md border p-4 shadow-xs'>
          <div className='flex items-center justify-between py-2.5'>
            <span className='border-b-2 pb-2 text-base font-semibold'>경력</span>
            <Button
              type='button'
              className='bg-main-light hover:bg-main-dark cursor-pointer'
              onClick={() => workExperience.append({ company: '', period: '', position: '' })}
            >
              추가
            </Button>
          </div>

          {workExperience.fields.length > 0 &&
            workExperience.fields.map((field, index) => (
              <div key={field.id} className='flex items-end gap-4'>
                {/* 회사명 */}
                <FormField
                  control={form.control}
                  name={`work_experience.${index}.company`}
                  render={({ field }) => (
                    <FormItem className='relative grow'>
                      <FormLabel className='text-base'>회사명</FormLabel>
                      <FormControl>
                        <Input placeholder='회사 이름을 입력하세요.' {...field} />
                      </FormControl>
                      <FormMessage className='absolute top-0 right-0 text-sm' />
                    </FormItem>
                  )}
                />

                {/* 근무 기간 */}
                <FormField
                  control={form.control}
                  name={`work_experience.${index}.period`}
                  render={({ field }) => (
                    <FormItem className='relative grow'>
                      <FormLabel className='text-base'>근무 기간</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='근무 기간을 입력하세요.'
                          value={(() => {
                            const val = field.value;
                            if (!val) return '';

                            // 숫자만 추출
                            const nums = val.replace(/[^\d]/g, '').slice(0, 12);

                            // 형식에 맞게 표시
                            if (nums.length <= 4) return nums;
                            if (nums.length <= 6) return `${nums.slice(0, 4)}.${nums.slice(4)}`;
                            if (nums.length <= 10)
                              return `${nums.slice(0, 4)}.${nums.slice(4, 6)} - ${nums.slice(6)}`;
                            return `${nums.slice(0, 4)}.${nums.slice(4, 6)} - ${nums.slice(6, 10)}.${nums.slice(10)}`;
                          })()}
                        />
                      </FormControl>
                      <FormMessage className='absolute top-0 right-0 text-sm' />
                    </FormItem>
                  )}
                />

                {/* 직무 */}
                <FormField
                  control={form.control}
                  name={`work_experience.${index}.position`}
                  render={({ field }) => (
                    <FormItem className='relative grow'>
                      <FormLabel className='text-base'>직무</FormLabel>
                      <FormControl>
                        <Input placeholder='직무를 입력하세요.' {...field} />
                      </FormControl>
                      <FormMessage className='absolute top-0 right-0 text-sm' />
                    </FormItem>
                  )}
                />
                <Button
                  type='button'
                  className='bg-danger cursor-pointer hover:bg-amber-700'
                  onClick={() => workExperience.remove(index)}
                >
                  삭제
                </Button>
              </div>
            ))}
        </div>

        <div className='flex gap-4'>
          {/* 최종 학력 */}
          <FormField
            control={form.control}
            name='education'
            render={({ field }) => (
              <FormItem className='relative w-[33%]'>
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

          {/* 학교 이름 */}
          <FormField
            control={form.control}
            name='school_name'
            render={({ field }) => (
              <FormItem className='relative w-[33%]'>
                <FormLabel className='text-base font-semibold'>학교 이름</FormLabel>
                <FormControl>
                  <Input placeholder='학교 이름을 입력하세요.' {...field} />
                </FormControl>
                <FormMessage className='absolute top-0 right-0 text-sm' />
              </FormItem>
            )}
          />

          {/* 졸업 여부 */}
          <FormField
            control={form.control}
            name='graduation_status'
            render={({ field }) => (
              <FormItem className='relative w-[33%]'>
                <FormLabel className='text-base font-semibold'>졸업 여부</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='졸업 여부를 선택하세요.' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(
                      resumeSchemaRequest.shape.graduation_status._def.innerType.enum,
                    ).map((item) => (
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
