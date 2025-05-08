'use client';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import DropDownFilter from './DropDownFilter';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';

type FilterState = {
  location: string[];
  position: string[];
  employ_method: string[];
  career: string[];
  education: string[];
};

export default function FilterList({
  initialParams,
}: {
  initialParams: Record<string, string | string[]>;
}) {
  const router = useRouter();

  // 1. 로컬 필터 상태 관리
  const [localFilters, setLocalFilters] = useState<FilterState>({
    location: Array.isArray(initialParams.location)
      ? initialParams.location
      : initialParams.location?.split(',') || [],
    position: Array.isArray(initialParams.position)
      ? initialParams.position
      : initialParams.position?.split(',') || [],
    employ_method: Array.isArray(initialParams.employ_method)
      ? initialParams.employ_method
      : initialParams.employ_method?.split(',') || [],
    career: Array.isArray(initialParams.career)
      ? initialParams.career
      : initialParams.career?.split(',') || [],
    education: Array.isArray(initialParams.education)
      ? initialParams.education
      : initialParams.education?.split(',') || [],
  });

  // 2. 검색 실행 핸들러
  const handleSearch = () => {
    const params = new URLSearchParams();
    Object.entries(localFilters).forEach(([key, value]) => {
      if (value.length > 0) params.set(key, value.join(','));
    });
    router.push(`?${params.toString()}`);
  };

  // 3. 드롭다운 상태 관리
  const [activeDropdown, setActiveDropdown] = useState<null | 'region' | 'job' | 'detail'>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div className='relative' ref={wrapperRef}>
      <div className='mb-4 flex gap-4'>
        {/* 필터 버튼들 */}
        <button
          className={`filter-btn ${activeDropdown === 'region' ? 'active' : ''}`}
          onClick={() => setActiveDropdown((prev) => (prev === 'region' ? null : 'region'))}
        >
          지역 선택
          <MdOutlineArrowDropDownCircle className='ml-2' />
        </button>

        <button
          className={`filter-btn ${activeDropdown === 'job' ? 'active' : ''}`}
          onClick={() => setActiveDropdown((prev) => (prev === 'job' ? null : 'job'))}
        >
          직무 선택
          <MdOutlineArrowDropDownCircle className='ml-2' />
        </button>

        <button
          className={`filter-btn ${activeDropdown === 'detail' ? 'active' : ''}`}
          onClick={() => setActiveDropdown((prev) => (prev === 'detail' ? null : 'detail'))}
        >
          상세 조건
          <MdOutlineArrowDropDownCircle className='ml-2' />
        </button>

        <button className='search-btn' onClick={handleSearch}>
          검색하기
        </button>
      </div>

      {/* 드롭다운 필터 */}
      {activeDropdown && (
        <DropDownFilter
          type={activeDropdown}
          filters={localFilters}
          onFilterChange={setLocalFilters}
          onClose={() => setActiveDropdown(null)}
        />
      )}
    </div>
  );
}
