'use client';

import { useEffect, useState, useCallback } from 'react';
import { useFilterStore } from '@/store/filterStore';
import { JobPostingListResponse } from '@/types/Schema/jobPostingSchema';
import { useSearchParams } from 'next/navigation';
import { fetchOnClient } from '@/api/clientFetcher';
import { REGIONS } from '@/constants/region';

export function useFilterJobs(employmentType: '공공' | '일반', searchKeyword?: string) {
  const {
    selectedDistricts,
    selectedSubcategories,
    selectedMethod,
    selectedCareer,
    selectedEducation,
    selectedRegion,
  } = useFilterStore();
  const [data, setData] = useState<JobPostingListResponse>();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 0;

  const [loading, setLoading] = useState(false);

  // 쿼리스트링 생성
  const makeQuery = useCallback(() => {
    const params = new URLSearchParams();
    params.set('employment_type', employmentType);
    if (searchKeyword) params.set('search_keyword', searchKeyword);

    // 지역 필터링 로직 개선
    if (selectedRegion) {
      const subDistricts = selectedDistricts.filter(
        (district) =>
          // 소분류인지 확인 (대분류 목록에 없으면 소분류)
          !Object.keys(REGIONS).includes(district),
      );

      if (subDistricts.length > 0) {
        // 대분류에 속한 소분류들만 대분류+소분류 형태로 처리
        const formattedLocations = subDistricts.map((district) => `${selectedRegion} ${district}`);
        params.set('location', formattedLocations.join(','));
        console.log('대분류+소분류 조합:', formattedLocations);
      } else {
        // 소분류가 없으면 대분류만 사용
        params.set('location', selectedRegion);
        console.log('대분류만 선택:', selectedRegion);
      }
    } else if (selectedDistricts.length) {
      // 예외 처리: selectedRegion이 없지만 소분류가 있는 경우
      params.set('location', selectedDistricts.join(','));
    }

    if (selectedSubcategories.length) params.set('position', selectedSubcategories.join(','));
    if (selectedMethod.length) params.set('employ_method', selectedMethod.join(','));
    if (selectedCareer.length) params.set('career', selectedCareer.join(','));
    if (selectedEducation.length) params.set('education', selectedEducation.join(','));
    if (!page) {
      params.set('offset', page.toString());
    } else {
      params.set('offset', (page - 1).toString());
    }

    const queryString = params.toString();
    console.log('최종 쿼리 문자열:', queryString);
    return queryString;
  }, [
    employmentType,
    searchKeyword,
    selectedRegion,
    selectedDistricts,
    selectedSubcategories,
    selectedMethod,
    selectedCareer,
    selectedEducation,
    page,
  ]);

  useEffect(() => {
    setLoading(true);

    fetchOnClient<JobPostingListResponse>(`/api/postings/?${makeQuery()}`)
      .then((data) => {
        console.log('API 응답:', data);
        setData(data);
      })
      .catch((error) => {
        console.error('공고 데이터 로드 실패:', error);
      })
      .finally(() => setLoading(false));
  }, [makeQuery]);

  return { data, loading };
}
