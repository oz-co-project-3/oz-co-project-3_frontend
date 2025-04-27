'use client';

import { useState } from 'react';
import { JOB_CATEGORIES } from '../../constants/jobCategories';
import { REGIONS } from '../../constants/region';
import { FiChevronRight } from 'react-icons/fi';

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
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedDetails, setSelectedDetails] = useState<string[]>([]);

  // 토글 함수
  const toggleDistrict = (district: string) => {
    if (district.includes('전체')) {
      // '전체'가 포함된 항목을 클릭하면 전체만 선택
      setSelectedDistricts([district]);
    } else {
      setSelectedDistricts((prev) => {
        // 만약 '전체'가 이미 선택되어 있으면 해제하고 해당 구만 선택
        const hasAll = prev.some((d) => d.includes('전체'));
        if (hasAll) {
          return [district];
        }
        // 이미 선택된 구를 다시 클릭하면 해제
        if (prev.includes(district)) {
          return prev.filter((d) => d !== district);
        }
        // 그 외에는 구 추가
        return [...prev, district];
      });
    }
  };
  const toggleSubcategory = (subcategory: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory) ? prev.filter((s) => s !== subcategory) : [...prev, subcategory],
    );
  };
  const toggleDetail = (detail: string) => {
    setSelectedDetails((prev) =>
      prev.includes(detail) ? prev.filter((d) => d !== detail) : [...prev, detail],
    );
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
            <div className='w-1/3 border-r'>
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
            className='w-[1400px] rounded-t-2xl border bg-white px-4 py-2'
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className='font-semibold'>고용형태</div>
              <div className='flex flex-wrap gap-2'>
                <label>
                  <input
                    type='checkbox'
                    checked={selectedDetails.includes('정규직')}
                    onChange={() => toggleDetail('정규직')}
                  />
                  정규직
                </label>
                <label>
                  <input
                    type='checkbox'
                    checked={selectedDetails.includes('계약직')}
                    onChange={() => toggleDetail('계약직')}
                  />
                  계약직
                </label>
                <label>
                  <input
                    type='checkbox'
                    checked={selectedDetails.includes('프리랜서')}
                    onChange={() => toggleDetail('프리랜서')}
                  />
                  프리랜서
                </label>
              </div>
            </div>
            <div className='font-semibold'>경력여부</div>
            <div className='flex flex-wrap gap-2'>
              <label>
                <input
                  type='checkbox'
                  checked={selectedDetails.includes('신입')}
                  onChange={() => toggleDetail('신입')}
                />
                신입
              </label>
              <label>
                <input
                  type='checkbox'
                  checked={selectedDetails.includes('경력')}
                  onChange={() => toggleDetail('경력')}
                />
                경력
              </label>
              <label>
                <input
                  type='checkbox'
                  checked={selectedDetails.includes('경력무관')}
                  onChange={() => toggleDetail('경력무관')}
                />
                경력무관
              </label>
            </div>
            <div className='font-semibold'>학력</div>
            <div className='flex flex-wrap gap-2'>
              <label>
                <input
                  type='checkbox'
                  checked={selectedDetails.includes('학력무관')}
                  onChange={() => toggleDetail('학력무관')}
                />
                학력무관
              </label>
              <label>
                <input
                  type='checkbox'
                  checked={selectedDetails.includes('고등학교 졸업')}
                  onChange={() => toggleDetail('고등학교 졸업')}
                />
                고등학교 졸업
              </label>
              <label>
                <input
                  type='checkbox'
                  checked={selectedDetails.includes('대학교 졸업(2,3년제)')}
                  onChange={() => toggleDetail('대학교 졸업(2,3년제)')}
                />
                대학교 졸업(2,3년제)
              </label>
              <label>
                <input
                  type='checkbox'
                  checked={selectedDetails.includes('대학교 졸업(4년제)')}
                  onChange={() => toggleDetail('대학교 졸업(4년제)')}
                />
                대학교 졸업(4년제)
              </label>
              <label>
                <input
                  type='checkbox'
                  checked={selectedDetails.includes('대학원 석사 졸업')}
                  onChange={() => toggleDetail('대학원 석사 졸업')}
                />
                대학원 석사 졸업
              </label>
              <label>
                <input
                  type='checkbox'
                  checked={selectedDetails.includes('대학원 박사 졸업')}
                  onChange={() => toggleDetail('대학원 박사 졸업')}
                />
                대학원 박사 졸업
              </label>
            </div>
          </div>
        )}
      </div>
      <div className='mt-4 flex flex-wrap gap-2 border p-4'>
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
        {selectedDetails.map((detail) => (
          <span
            key={detail}
            className='inline-block rounded-full border bg-white px-3 py-1 text-sm font-medium text-gray-700'
          >
            {detail}
            <button
              className='ml-1 text-blue-400 hover:text-blue-700'
              onClick={() => toggleDetail(detail)}
              type='button'
            >
              X
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
