'use client';

import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import useSWR from 'swr';
import { apiFetch } from '@/lib/fetcher';

interface LikeButtonProps {
  id: number;
}

const LikeButton = ({ id }: LikeButtonProps) => {
  const { data, mutate } = useSWR<{ liked: boolean }>(`/api/user/profile/liked/${id}`);
  // api 안나와서 임시 api로 넣어둠
  const liked = data?.liked ?? false;

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      if (liked) {
        await apiFetch(`/api/user/profile/liked/${id}`, {
          method: 'POST',
        });
      } else {
        await apiFetch(`/api/user/profile/liked/${id}`, {
          method: 'DELETE',
        });
      }
      mutate();
    } catch (error) {
      console.error('찜하기 실패:', error);
    }
  };

  return (
    <button onClick={handleClick}>
      {liked ? (
        <AiFillStar className='h-[30px] w-[30px] text-yellow-300' />
      ) : (
        <AiOutlineStar className='h-[30px] w-[30px] text-gray-500' />
      )}
    </button>
  );
};

export default LikeButton;
