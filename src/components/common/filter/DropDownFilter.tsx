'use client';

import { JOB_CATEGORIES } from '../../../constants/jobCategories';
import { REGIONS } from '../../../constants/region';
import { FiChevronRight } from 'react-icons/fi';
import { RiResetLeftFill } from 'react-icons/ri';
import { EMPLOYMENT_TYPES } from '@/constants/employmentType';
import { CAREER } from '@/constants/career';
import { EDUCATION } from '@/constants/education';
import { useFilterStore } from '@/store/filterStore';

interface DropDownFilterProps {
  isRegionOpen: boolean;
  isJobOpen: boolean;
  isDetailOpen: boolean;
  selectedRegion: keyof typeof REGIONS | null;
  setSelectedRegion: (region: keyof typeof REGIONS) => void;
  selectedJob: keyof typeof JOB_CATEGORIES | null;
  setSelectedJob: (job: keyof typeof JOB_CATEGORIES) => void;
}

export default function DropDownFilter({
  isRegionOpen,
  isJobOpen,
  isDetailOpen,
  selectedRegion,
  setSelectedRegion,
  selectedJob,
  setSelectedJob,
}: DropDownFilterProps) {
  const {
    selectedDistricts,
    setSelectedDistricts,
    toggleDistrict,
    selectedSubcategories,
    toggleSubcategory,
    selectedMethod,
    toggleMethod,
    selectedCareer,
    toggleCareer,
    selectedEducation,
    toggleEducation,
    resetAll,
  } = useFilterStore();

  // 전체 선택/해제 함수
  const toggleAllDistricts = () => {
    if (!selectedRegion) return;
    const allDistricts = [selectedRegion, ...REGIONS[selectedRegion]];
    // 이미 모두 선택되었으면 해제, 아니면 전체 선택
    if (allDistricts.every((d) => selectedDistricts.includes(d))) {
      setSelectedDistricts([]);
    } else {
      setSelectedDistricts(allDistricts);
    }
  };

  return (
    <div>
      <div>
        {/* 지역 드롭다운 */}
        {isRegionOpen && (
          <div
            className='flex w-[1400px] rounded-t-2xl border bg-white'
            onClick={(e) => e.stopPropagation()}
          >
            {/* 시/도 리스트 */}
            <div className='h-[400px] w-1/3 overflow-y-scroll border-r'>
              {(Object.keys(REGIONS) as Array<keyof typeof REGIONS>).map((region) => (
                <div
                  key={region}
                  className={`flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100 ${
                    selectedRegion === region ? 'bg-gray-100 font-bold' : ''
                  }`}
                  onClick={() => setSelectedRegion(region)}
                >
                  {region}
                  <FiChevronRight />
                </div>
              ))}
            </div>
            {/* 구/군/시 리스트 */}
            <div className='w-2/3 px-4 py-2'>
              {selectedRegion ? (
                <div>
                  <div className='grid grid-cols-4 gap-2'>
                    {/* 전체 선택 체크박스 */}
                    <div key={selectedRegion}>
                      <label>
                        <input
                          type='checkbox'
                          checked={[selectedRegion, ...REGIONS[selectedRegion]].every((d) =>
                            selectedDistricts.includes(d),
                          )}
                          onChange={toggleAllDistricts}
                          className='cursor-pointer rounded border px-3 py-1 font-bold'
                        />
                        {selectedRegion} 전체
                      </label>
                    </div>
                    {/* 개별 구/군/시 체크박스 */}
                    {REGIONS[selectedRegion].map((district: string) => (
                      <div key={district}>
                        <label>
                          <input
                            type='checkbox'
                            checked={selectedDistricts.includes(district)}
                            className='cursor-pointer rounded border px-3 py-1'
                            onChange={() => toggleDistrict(district)}
                          />
                          {district}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className='text-gray-400'>지역을 선택하세요</div>
              )}
            </div>
          </div>
        )}

        {/* 직업 드롭다운 */}
        {isJobOpen && (
          <div
            className='flex w-[1400px] rounded-t-2xl border bg-white'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='w-1/3 border-r'>
              {(Object.keys(JOB_CATEGORIES) as Array<keyof typeof JOB_CATEGORIES>).map((job) => (
                <div
                  key={job}
                  className={`flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100 ${
                    selectedJob === job ? 'bg-gray-100 font-bold' : ''
                  }`}
                  onClick={() => setSelectedJob(job)}
                >
                  {job}
                  <FiChevronRight />
                </div>
              ))}
            </div>
            {/* 직업상세 */}
            <div className='w-2/3 px-4 py-2'>
              {selectedJob ? (
                <div>
                  <div className='mb-2 font-semibold'>{selectedJob} 전체</div>
                  <div className='grid grid-cols-4 gap-2'>
                    {JOB_CATEGORIES[selectedJob].map((subcategory: string) => (
                      <div key={subcategory} className='flex gap-1'>
                        <label>
                          <input
                            type='checkbox'
                            checked={selectedSubcategories.includes(subcategory)}
                            onChange={() => toggleSubcategory(subcategory)}
                            className='cursor-pointer rounded border px-3 py-1 hover:bg-blue-100'
                          />
                          {subcategory}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className='text-gray-400'>직업을 선택하세요</div>
              )}
            </div>
          </div>
        )}

        {/* 상세조건 드롭다운 */}
        {isDetailOpen && (
          <div
            className='w-[1400px] rounded-t-2xl border bg-white'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='px-4 py-2'>
              <div className='font-semibold'>고용형태</div>
              <div className='flex flex-wrap gap-2'>
                {EMPLOYMENT_TYPES.map((type) => (
                  <label key={type}>
                    <input
                      type='checkbox'
                      checked={selectedMethod.includes(type)}
                      onChange={() => toggleMethod(type)}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>
            <div className='px-4 py-2'>
              <div className='font-semibold'>경력여부</div>
              <div className='flex flex-wrap gap-2'>
                {CAREER.map((career) => (
                  <label key={career}>
                    <input
                      type='checkbox'
                      checked={selectedCareer.includes(career)}
                      onChange={() => toggleCareer(career)}
                    />
                    {career}
                  </label>
                ))}
              </div>
            </div>
            <div className='px-4 py-2'>
              <div className='font-semibold'>학력</div>
              <div className='flex flex-wrap gap-2'>
                {EDUCATION.map((education) => (
                  <label key={education}>
                    <input
                      type='checkbox'
                      checked={selectedEducation.includes(education)}
                      onChange={() => toggleEducation(education)}
                    />
                    {education}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* 선택 뜨는 곳 */}
      <div className='mt-4 flex flex-wrap gap-2 p-4'>
        {/* 지역 */}
        {selectedDistricts.map((district) => (
          <span
            key={district}
            className='inline-block rounded-full border bg-white px-3 py-1 text-sm font-medium text-blue-600'
          >
            {district}
            <button
              className='ml-1 text-blue-400 hover:text-blue-700'
              onClick={() => toggleDistrict(district)}
              type='button'
            >
              X
            </button>
          </span>
        ))}
        {/* 직업 */}
        {selectedSubcategories.map((subcategory) => (
          <span
            key={subcategory}
            className='inline-block rounded-full border bg-white px-3 py-1 text-sm font-medium text-green-600'
          >
            {subcategory}
            <button
              className='ml-1 text-blue-400 hover:text-blue-700'
              onClick={() => toggleSubcategory(subcategory)}
              type='button'
            >
              X
            </button>
          </span>
        ))}
        {/* 상세조건 */}
        {selectedMethod.map((method) => (
          <span
            key={method}
            className='inline-block rounded-full border bg-white px-3 py-1 text-sm font-medium text-gray-700'
          >
            {method}
            <button
              className='ml-1 text-blue-400 hover:text-blue-700'
              onClick={() => toggleMethod(method)}
              type='button'
            >
              X
            </button>
          </span>
        ))}
        {selectedCareer.map((career) => (
          <span
            key={career}
            className='inline-block rounded-full border bg-white px-3 py-1 text-sm font-medium text-gray-700'
          >
            {career}
            <button
              className='ml-1 text-blue-400 hover:text-blue-700'
              onClick={() => toggleCareer(career)}
              type='button'
            >
              X
            </button>
          </span>
        ))}
        {selectedEducation.map((education) => (
          <span
            key={education}
            className='inline-block rounded-full border bg-white px-3 py-1 text-sm font-medium text-gray-700'
          >
            {education}
            <button
              className='ml-1 text-blue-400 hover:text-blue-700'
              onClick={() => toggleEducation(education)}
              type='button'
            >
              X
            </button>
          </span>
        ))}
      </div>
      <div className='flex'>
        <button
          onClick={resetAll}
          className='ml-auto flex cursor-pointer rounded-md border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100'
        >
          <span>초기화</span>
          <div className='flex items-center'>
            <RiResetLeftFill />
          </div>
        </button>
      </div>
    </div>
  );
}
