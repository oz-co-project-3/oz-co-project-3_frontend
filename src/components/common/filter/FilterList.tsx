// components/FilterList.tsx
'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useFilterStore } from '@/store/filterStore';
import DropDownFilter from './DropDownFilter';

export default function FilterList({
  initialParams,
}: {
  initialParams: Record<string, string | string[] | undefined>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Zustand 상태 초기화
  useEffect(() => {
    const getArray = (value: string | string[]): string[] => {
      return Array.isArray(value) ? value : value?.split(',') || [];
    };

    useFilterStore.setState({
      selectedDistricts: getArray(initialParams.location ?? ''),
      selectedSubcategories: getArray(initialParams.position ?? ''),
      selectedMethod: getArray(initialParams.employ_method ?? ''),
      selectedCareer: getArray(initialParams.career ?? ''),
      selectedEducation: getArray(initialParams.education ?? ''),
    });
  }, [initialParams]);

  // 2. 필터 변경 핸들러 (URL 쿼리 동기화)
  const handleFilterChange = () => {
    const params = new URLSearchParams(searchParams);
    const state = useFilterStore.getState();

    const filterMappings = [
      { key: 'location', value: state.selectedDistricts },
      { key: 'position', value: state.selectedSubcategories },
      { key: 'employ_method', value: state.selectedMethod },
      { key: 'career', value: state.selectedCareer },
      { key: 'education', value: state.selectedEducation },
    ];

    filterMappings.forEach(({ key, value }) => {
      if (value.length > 0) {
        params.set(key, value.join(','));
      } else {
        params.delete(key);
      }
    });

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return <DropDownFilter onFilterChange={handleFilterChange} />;
}
