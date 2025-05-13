'use client';

import { useSearchNavigation } from '@/hooks/useSearchNavigation';

const keywords = ['경비', '사무보조', 'IT개발', '디자인', '서비스'];

export default function KeywordRecommand() {
  const { navigateWithSearch } = useSearchNavigation();

  const handleClick = (keyword: string) => {
    navigateWithSearch(keyword);
  };

  return (
    <div className='flex space-x-2'>
      {keywords.map((keyword) => (
        <button
          key={keyword}
          onClick={() => handleClick(keyword)}
          className='cursor-pointer border-none bg-transparent text-inherit hover:underline max-md:text-sm'
          type='button'
        >
          {keyword}
        </button>
      ))}
    </div>
  );
}
