'use client';

//post 요청만 보내서 fetch 사용

import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { apiFetch } from '@/lib/fetcher';
import { useState } from 'react';

interface LikeButtonProps {
  id?: string;
}

const LikeButton = ({ id }: LikeButtonProps) => {
  // api 안나와서 임시 api로 넣어둠
  const [liked, setLiked] = useState(false);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      await apiFetch(`/api/job_posting/${id}/bookmark/`, {
        method: 'POST',
      });
      setLiked((prev) => !prev);
    } catch (error) {
      console.error('찜하기 실패:', error);
    }
  };

  return (
    <button onClick={handleClick}>
      {liked ? (
        <AiFillStar className='h-[30px] w-[30px] cursor-pointer text-yellow-300' />
      ) : (
        <AiOutlineStar className='h-[30px] w-[30px] cursor-pointer text-gray-500' />
      )}
    </button>
  );
};

export default LikeButton;
