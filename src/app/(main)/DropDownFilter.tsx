import { JOB_CATEGORIES } from './jobCategories';
import { REGIONS } from './region';
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
  return (
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
                      <input
                        type='checkbox'
                        className='cursor-pointer rounded border px-3 py-1 hover:bg-blue-100'
                      />
                      <label>{district}</label>
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
                      <input
                        type='checkbox'
                        className='cursor-pointer rounded border px-3 py-1 hover:bg-blue-100'
                      />
                      <label>{subcategory}</label>
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
              <input type='checkbox' />
              <label>정규직</label>
              <input type='checkbox' />
              <label>계약직</label>
              <input type='checkbox' />
              <label>프리랜서</label>
            </div>
          </div>
          <div className='font-semibold'>경력여부</div>
          <div className='flex flex-wrap gap-2'>
            <input type='checkbox' />
            <label>신입</label>
            <input type='checkbox' />
            <label>경력</label>
            <input type='checkbox' />
            <label>경력무관</label>
          </div>
          <div className='font-semibold'>학력</div>
          <div className='flex flex-wrap gap-2'>
            <input type='checkbox' />
            <label>학력무관</label>
            <input type='checkbox' />
            <label>고등학교 졸업</label>
            <input type='checkbox' />
            <label>대학교 졸업(2,3년제)</label>
            <input type='checkbox' />
            <label>대학교 졸업(4년제)</label>
            <input type='checkbox' />
            <label>대학원 석사 졸업</label>
            <input type='checkbox' />
            <label>대학원 박사 졸업</label>
          </div>
        </div>
      )}
    </div>
  );
}
