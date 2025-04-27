'use client';

import useDropdown from '@/types/useDropdown';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import DropDownFilter from './DropDownFilter';
export default function FilterList() {
  const {
    isRegionOpen,
    setIsRegionOpen,
    isJobOpen,
    setIsJobOpen,
    isDetailOpen,
    setIsDetailOpen,
    selectedRegion,
    setSelectedRegion,
    selectedJob,
    setSelectedJob,
  } = useDropdown();

  return (
    <div>
      <div className='relative flex w-[1400px] justify-between gap-5 rounded-2xl bg-white'>
        <div
          className='flex h-[70px] w-[450px] items-center justify-center rounded-2xl border'
          onClick={() => {
            setIsRegionOpen(!isRegionOpen);
            setIsJobOpen(false);
            setIsDetailOpen(false);
          }}
        >
          <span>지역을 선택해주세요</span>
          <span className='text-xl text-[#0F8C3B]'>
            <MdOutlineArrowDropDownCircle />
          </span>
        </div>
        <div
          className='relative flex w-[450px] items-center justify-center rounded-2xl border'
          onClick={() => {
            setIsJobOpen(!isJobOpen);
            setIsRegionOpen(false);
            setIsDetailOpen(false);
          }}
        >
          <span>원하는 직종을 선택해주세요</span>
          <span className='text-xl text-[#0F8C3B]'>
            <MdOutlineArrowDropDownCircle />
          </span>
        </div>
        <div
          className='relative flex w-[450px] items-center justify-center rounded-2xl border'
          onClick={() => {
            setIsDetailOpen(!isDetailOpen);
            setIsRegionOpen(false);
            setIsJobOpen(false);
          }}
        >
          <span>상세 조건을 선택해주세요</span>
          <span className='text-xl text-[#0F8C3B]'>
            <MdOutlineArrowDropDownCircle />
          </span>
        </div>
        <div className='relative flex w-[450px] items-center justify-center rounded-2xl border bg-[#0F8C3B]'>
          <button>검색하기</button>
        </div>
      </div>
      <DropDownFilter
        isRegionOpen={isRegionOpen}
        isJobOpen={isJobOpen}
        isDetailOpen={isDetailOpen}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        selectedJob={selectedJob}
        setSelectedJob={setSelectedJob}
      />
    </div>
  );
}
