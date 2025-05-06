'use client';

import Script from 'next/script';
import { FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { FormControl } from '../ui/form';
import { Input } from '../ui/input';
import { UseFormReturn } from 'react-hook-form';
import { JobPostingRequest } from '@/types/Schema/jobPostingSchema';
import { Button } from '../ui/button';
import { useCallback, useEffect, useRef, useState } from 'react';
import AddressModal from './AddressModal';

// 여기서만 쓸 타입 설정
declare global {
  interface Window {
    daum: {
      Postcode: {
        new (options: { oncomplete: (data: IAddr) => void }): {
          embed(element: HTMLDivElement | null): void;
        };
      };
      maps: {
        services: {
          Status: { OK: string };
          Geocoder: new () => {
            addressSearch(
              address: string,
              callback: (results: IAddr[], status: string) => void,
            ): void;
          };
        };
      };
    };
  }
}

interface IAddr {
  address: string;
  zonecode: string;
}

export default function AddressFormField({ form }: { form: UseFormReturn<JobPostingRequest> }) {
  const addressModalRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const execDaumPostcode = useCallback(() => {
    setIsModalOpen(true);
    new window.daum.Postcode({
      oncomplete: function (data: IAddr) {
        const address = data.address; // 최종 주소 변수

        // 주소 정보를 해당 필드에 넣는다.
        form.setValue('location', address, {
          shouldValidate: true, // 유효성 검사 실행
          // shouldTouch: true, // touched 필드로 표시
          // shouldDirty: true, // dirty 필드로 표시
        });
        setIsModalOpen(false);
      },
    }).embed(addressModalRef.current);
  }, [form]);

  useEffect(() => {
    if (isModalOpen) {
      execDaumPostcode();
    }
  }, [isModalOpen, execDaumPostcode]);

  return (
    <>
      <Script
        src='//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
        // strategy='afterInteractive'
        async
      />
      <FormField
        control={form.control}
        name='location'
        render={({ field }) => (
          <FormItem className='relative'>
            <FormLabel className='text-base font-semibold'>근무지 정보</FormLabel>
            <div className='flex items-center gap-2'>
              <FormControl>
                <Input placeholder='오른쪽 버튼으로 주소를 검색하세요.' {...field} readOnly />
              </FormControl>
              <Button
                variant='outline'
                type='button'
                onClick={() => {
                  setIsModalOpen(true);
                }}
                className='cursor-pointer'
              >
                주소 검색
              </Button>
              <AddressModal
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                content={<div className='relative w-[500px]' ref={addressModalRef} />}
              />
            </div>
            <FormMessage className='absolute top-0 right-0 text-sm' />
          </FormItem>
        )}
      />
    </>
  );
}
