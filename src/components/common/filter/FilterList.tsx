'use client';

import useDropdown from '@/hooks/useDropdown';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import DropDownFilter from './DropDownFilter';
import { useFilterStore } from '@/store/filterStore';
import { useEffect } from 'react';

export default function FilterList() {
  const {
    isRegionOpen,
    setIsRegionOpen,
    isJobOpen,
    setIsJobOpen,
    isDetailOpen,
    setIsDetailOpen,
    selectedRegion: dropdownRegion,
    setSelectedRegion: setDropdownRegion,
    selectedJob,
    setSelectedJob,
  } = useDropdown();

  // filterStore에서 상태 가져오기
  const { selectedRegion: storeRegion, setSelectedRegion: setStoreRegion } = useFilterStore();

  // 두 상태 동기화
  useEffect(() => {
    if (dropdownRegion !== storeRegion) {
      setStoreRegion(dropdownRegion);
    }
  }, [dropdownRegion, storeRegion, setStoreRegion]);

  return (
    <>
      <div className='flex w-full flex-wrap items-center gap-4 rounded-xl bg-gray-50 p-4 shadow-md'>
        <div
          className='hover:border-main-light flex h-[70px] w-[350px] cursor-pointer items-center justify-center rounded-2xl border bg-white transition'
          onClick={() => {
            setIsRegionOpen(!isRegionOpen);
            setIsJobOpen(false);
            setIsDetailOpen(false);
          }}
        >
          <span>지역을 선택해주세요</span>
          <span className='text-xl text-[#0F8C3B]'>
            <MdOutlineArrowDropDownCircle
              className={`transition-transform duration-300 ${isRegionOpen ? 'rotate-180' : ''}`}
            />
          </span>
        </div>
        <div
          className='hover:border-main-light flex h-[70px] w-[350px] cursor-pointer items-center justify-center rounded-2xl border bg-white transition'
          onClick={() => {
            setIsJobOpen(!isJobOpen);
            setIsRegionOpen(false);
            setIsDetailOpen(false);
          }}
        >
          <span>원하는 직종을 선택해주세요</span>
          <span className='text-xl text-[#0F8C3B]'>
            <MdOutlineArrowDropDownCircle
              className={`transition-transform duration-300 ${isJobOpen ? 'rotate-180' : ''}`}
            />
          </span>
        </div>
        <div
          className='hover:border-main-light flex h-[70px] w-[350px] cursor-pointer items-center justify-center rounded-2xl border bg-white transition'
          onClick={() => {
            setIsDetailOpen(!isDetailOpen);
            setIsRegionOpen(false);
            setIsJobOpen(false);
          }}
        >
          <span>상세 조건을 선택해주세요</span>
          <span className='text-xl text-[#0F8C3B]'>
            <MdOutlineArrowDropDownCircle
              className={`transition-transform duration-300 ${isDetailOpen ? 'rotate-180' : ''}`}
            />
          </span>
        </div>
      </div>
      <DropDownFilter
        isRegionOpen={isRegionOpen}
        isJobOpen={isJobOpen}
        isDetailOpen={isDetailOpen}
        selectedRegion={dropdownRegion}
        setSelectedRegion={setDropdownRegion}
        selectedJob={selectedJob}
        setSelectedJob={setSelectedJob}
      />
    </>
  );
}
