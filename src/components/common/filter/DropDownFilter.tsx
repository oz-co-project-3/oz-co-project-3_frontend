'use client';

import { REGIONS } from '@/constants/region';
import { JOB_CATEGORIES } from '@/constants/jobCategories';
import { useFilterStore } from '@/store/filterStore';
import { FiChevronRight } from 'react-icons/fi';
import { RiResetLeftFill } from 'react-icons/ri';
import { EMPLOYMENT_TYPES } from '@/constants/employmentType';
import { CAREER } from '@/constants/career';
import { EDUCATION } from '@/constants/education';

export default function DropDownFilter({ onFilterChange }: { onFilterChange: () => void }) {
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

  // 전체 지역 선택/해제 예시 함수
  const toggleAllDistricts = (region: keyof typeof REGIONS) => {
    const allDistricts = [region, ...REGIONS[region]];
    if (allDistricts.every((d) => selectedDistricts.includes(d))) {
      setSelectedDistricts(selectedDistricts.filter((d) => !allDistricts.includes(d)));
    } else {
      setSelectedDistricts([
        ...selectedDistricts,
        ...allDistricts.filter((d) => !selectedDistricts.includes(d)),
      ]);
    }
    onFilterChange();
  };

  // 필터 토글 시 상태 변경 후 onFilterChange 호출
  const handleToggle = (action: () => void) => {
    action();
    onFilterChange();
  };

  // 초기화 버튼
  const handleReset = () => {
    resetAll();
    onFilterChange();
  };

  return (
    <div className='dropdown-filter'>
      <section>
        <h3>지역</h3>
        <div className='region-list'>
          {Object.keys(REGIONS).map((region) => (
            <div key={region}>
              <button
                type='button'
                onClick={() => toggleAllDistricts(region as keyof typeof REGIONS)}
                className='region-toggle'
              >
                {region}
                <FiChevronRight />
              </button>
              <div className='district-list'>
                {[region, ...REGIONS[region as keyof typeof REGIONS]].map((district) => (
                  <label key={district}>
                    <input
                      type='checkbox'
                      checked={selectedDistricts.includes(district)}
                      onChange={() => handleToggle(() => toggleDistrict(district))}
                    />
                    {district}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3>직무</h3>
        <div className='job-list'>
          {Object.keys(JOB_CATEGORIES).map((category) => (
            <div key={category}>
              <strong>{category}</strong>
              <div>
                {JOB_CATEGORIES[category as keyof typeof JOB_CATEGORIES].map((sub) => (
                  <label key={sub}>
                    <input
                      type='checkbox'
                      checked={selectedSubcategories.includes(sub)}
                      onChange={() => handleToggle(() => toggleSubcategory(sub))}
                    />
                    {sub}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3>고용형태</h3>
        <div className='method-list'>
          {EMPLOYMENT_TYPES.map((type) => (
            <label key={type}>
              <input
                type='checkbox'
                checked={selectedMethod.includes(type)}
                onChange={() => handleToggle(() => toggleMethod(type))}
              />
              {type}
            </label>
          ))}
        </div>
      </section>

      <section>
        <h3>경력</h3>
        <div className='career-list'>
          {CAREER.map((career) => (
            <label key={career}>
              <input
                type='checkbox'
                checked={selectedCareer.includes(career)}
                onChange={() => handleToggle(() => toggleCareer(career))}
              />
              {career}
            </label>
          ))}
        </div>
      </section>

      <section>
        <h3>학력</h3>
        <div className='education-list'>
          {EDUCATION.map((edu) => (
            <label key={edu}>
              <input
                type='checkbox'
                checked={selectedEducation.includes(edu)}
                onChange={() => handleToggle(() => toggleEducation(edu))}
              />
              {edu}
            </label>
          ))}
        </div>
      </section>

      <button type='button' className='reset-btn' onClick={handleReset}>
        <RiResetLeftFill /> 전체 초기화
      </button>
    </div>
  );
}
