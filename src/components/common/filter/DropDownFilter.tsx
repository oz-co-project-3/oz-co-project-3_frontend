'use client';

import { useState } from 'react';
import { REGIONS } from '@/constants/region';
import { JOB_CATEGORIES } from '@/constants/jobCategories';
import { EMPLOYMENT_TYPES } from '@/constants/employmentType';
import { CAREER } from '@/constants/career';
import { EDUCATION } from '@/constants/education';

interface DropDownFilterProps {
  type: 'region' | 'job' | 'detail';
  filters: {
    location: string[];
    position: string[];
    employ_method: string[];
    career: string[];
    education: string[];
  };
  onFilterChange: (next: DropDownFilterProps['filters']) => void;
  onClose: () => void;
}

export default function DropDownFilter({
  type,
  filters,
  onFilterChange,
  onClose,
}: DropDownFilterProps) {
  // 대분류 선택 상태
  const [selectedMainRegion, setSelectedMainRegion] = useState<string | null>(null);
  const [selectedMainJob, setSelectedMainJob] = useState<string | null>(null);

  // 지역 대분류-소분류
  if (type === 'region') {
    return (
      <div className='absolute top-full left-0 z-50 flex h-[400px] w-[1400px] rounded-b-2xl border border-t-0 bg-white shadow-lg'>
        {/* 대분류 (시/도) */}
        <div className='w-1/3 overflow-y-auto border-r p-4'>
          {Object.keys(REGIONS).map((region) => (
            <div
              key={region}
              className={`cursor-pointer rounded px-3 py-2 hover:bg-gray-100 ${
                selectedMainRegion === region ? 'bg-gray-100 font-bold' : ''
              }`}
              onClick={() => setSelectedMainRegion(region)}
            >
              {region}
            </div>
          ))}
        </div>
        {/* 소분류 (구/군) */}
        <div className='w-2/3 overflow-y-auto p-4'>
          {selectedMainRegion ? (
            <div>
              <div className='mb-2 font-semibold'>{selectedMainRegion}</div>
              <div className='grid grid-cols-3 gap-2'>
                {REGIONS[selectedMainRegion as keyof typeof REGIONS].map((district) => (
                  <label
                    key={district}
                    className='flex items-center gap-2 rounded px-2 py-1 hover:bg-gray-50'
                  >
                    <input
                      type='checkbox'
                      checked={filters.location.includes(district)}
                      onChange={() => {
                        const next = filters.location.includes(district)
                          ? filters.location.filter((d) => d !== district)
                          : [...filters.location, district];
                        onFilterChange({ ...filters, location: next });
                      }}
                    />
                    {district}
                  </label>
                ))}
              </div>
            </div>
          ) : (
            <div className='text-gray-400'>왼쪽에서 시/도를 선택하세요</div>
          )}
        </div>
        <button
          className='absolute right-4 bottom-4 rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200'
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    );
  }

  // 직종 대분류-소분류
  if (type === 'job') {
    return (
      <div className='absolute top-full left-0 z-50 flex h-[400px] w-[1400px] rounded-b-2xl border border-t-0 bg-white shadow-lg'>
        {/* 대분류 (직종) */}
        <div className='w-1/3 overflow-y-auto border-r p-4'>
          {Object.keys(JOB_CATEGORIES).map((job) => (
            <div
              key={job}
              className={`cursor-pointer rounded px-3 py-2 hover:bg-gray-100 ${
                selectedMainJob === job ? 'bg-gray-100 font-bold' : ''
              }`}
              onClick={() => setSelectedMainJob(job)}
            >
              {job}
            </div>
          ))}
        </div>
        {/* 소분류 (직무) */}
        <div className='w-2/3 overflow-y-auto p-4'>
          {selectedMainJob ? (
            <div>
              <div className='mb-2 font-semibold'>{selectedMainJob}</div>
              <div className='grid grid-cols-3 gap-2'>
                {JOB_CATEGORIES[selectedMainJob as keyof typeof JOB_CATEGORIES].map((sub) => (
                  <label
                    key={sub}
                    className='flex items-center gap-2 rounded px-2 py-1 hover:bg-gray-50'
                  >
                    <input
                      type='checkbox'
                      checked={filters.position.includes(sub)}
                      onChange={() => {
                        const next = filters.position.includes(sub)
                          ? filters.position.filter((d) => d !== sub)
                          : [...filters.position, sub];
                        onFilterChange({ ...filters, position: next });
                      }}
                    />
                    {sub}
                  </label>
                ))}
              </div>
            </div>
          ) : (
            <div className='text-gray-400'>왼쪽에서 직종을 선택하세요</div>
          )}
        </div>
        <button
          className='absolute right-4 bottom-4 rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200'
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    );
  }

  // 상세조건
  return (
    <div className='absolute top-full left-0 z-50 flex h-[400px] w-[1400px] flex-col rounded-b-2xl border border-t-0 bg-white p-4 shadow-lg'>
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <div className='mb-2 font-semibold'>고용형태</div>
          {EMPLOYMENT_TYPES.map((type) => (
            <label key={type} className='flex items-center gap-2'>
              <input
                type='checkbox'
                checked={filters.employ_method.includes(type)}
                onChange={() => {
                  const next = filters.employ_method.includes(type)
                    ? filters.employ_method.filter((d) => d !== type)
                    : [...filters.employ_method, type];
                  onFilterChange({ ...filters, employ_method: next });
                }}
              />
              {type}
            </label>
          ))}
        </div>
        <div>
          <div className='mb-2 font-semibold'>경력</div>
          {CAREER.map((career) => (
            <label key={career} className='flex items-center gap-2'>
              <input
                type='checkbox'
                checked={filters.career.includes(career)}
                onChange={() => {
                  const next = filters.career.includes(career)
                    ? filters.career.filter((d) => d !== career)
                    : [...filters.career, career];
                  onFilterChange({ ...filters, career: next });
                }}
              />
              {career}
            </label>
          ))}
        </div>
        <div>
          <div className='mb-2 font-semibold'>학력</div>
          {EDUCATION.map((edu) => (
            <label key={edu} className='flex items-center gap-2'>
              <input
                type='checkbox'
                checked={filters.education.includes(edu)}
                onChange={() => {
                  const next = filters.education.includes(edu)
                    ? filters.education.filter((d) => d !== edu)
                    : [...filters.education, edu];
                  onFilterChange({ ...filters, education: next });
                }}
              />
              {edu}
            </label>
          ))}
        </div>
      </div>
      <button
        className='absolute right-4 bottom-4 rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200'
        onClick={onClose}
      >
        닫기
      </button>
    </div>
  );
}
