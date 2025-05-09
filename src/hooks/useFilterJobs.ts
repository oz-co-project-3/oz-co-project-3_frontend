'use client';

import { useEffect, useState } from 'react';
import { useFilterStore } from '@/store/filterStore';
import { JobPostingListResponse } from '@/types/Schema/jobPostingSchema';
import { useSearchParams } from 'next/navigation';
import { fetchOnClient } from '@/api/clientFetcher';

export function useFilterJobs(employmentType: '공공' | '일반', searchKeyword?: string) {
  const {
    selectedDistricts,
    selectedSubcategories,
    selectedMethod,
    selectedCareer,
    selectedEducation,
  } = useFilterStore();
  const [data, setData] = useState<JobPostingListResponse>();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 0; // 쿼리 파라미터에서 페이지 번호 가져오기, 없으면 0로 설정

  const [loading, setLoading] = useState(false);

  // 쿼리스트링 생성
  function makeQuery() {
    const params = new URLSearchParams();
    params.set('employment_type', employmentType);
    if (searchKeyword) params.set('search_keyword', searchKeyword);
    if (selectedDistricts.length) params.set('location', selectedDistricts.join(','));
    if (selectedSubcategories.length) params.set('position', selectedSubcategories.join(','));
    if (selectedMethod.length) params.set('employ_method', selectedMethod.join(','));
    if (selectedCareer.length) params.set('career', selectedCareer.join(','));
    if (selectedEducation.length) params.set('education', selectedEducation.join(','));
    if (!page) {
      params.set('offset', page.toString());
    } else {
      params.set('offset', (page - 1).toString());
    } // 페이지 번호 추가
    return params.toString();
  }

  useEffect(() => {
    setLoading(true);

    // fetchOnClient 사용
    fetchOnClient<JobPostingListResponse>(`/api/postings/?${makeQuery()}`)
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.error('공고 데이터 로드 실패:', error);
      })
      .finally(() => setLoading(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    searchKeyword,
    selectedDistricts,
    selectedSubcategories,
    selectedMethod,
    selectedCareer,
    selectedEducation,
    page,
  ]);

  return { data, loading };
}
