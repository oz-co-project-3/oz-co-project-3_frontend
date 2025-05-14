'use client';

import { fetchOnClient } from '@/api/clientFetcher';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import useSWRMutation from 'swr/mutation';
import { useState } from 'react';
import LikePlusModal from './LikePlusModal';
import { useAuthStore } from '@/store/useAuthStore';
import { useLoginModalStore } from '@/store/useLoginModalStore';

interface BookmarkButtonProps {
  id: string;
  is_bookmarked: boolean;
}

function BookmarkButton({ id, is_bookmarked: initialIsBookmarked }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuthStore();
  const { open: openLoginModal, setRedirectPath } = useLoginModalStore();

  const { trigger, isMutating } = useSWRMutation(
    `/api/job_posting/${id}/bookmark/`,
    (url: string) => fetchOnClient(url, { method: 'POST' }),
    {
      onSuccess: () => {
        console.log('북마크 상태 변경 성공');
      },
      onError: () => {
        console.log('북마크 상태 변경 실패, 상태 복구');
        setIsBookmarked((prev) => !prev);
        setIsModalOpen(false);
      },
    },
  );

  if (!id) return null;

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      setRedirectPath('/user/login');
      openLoginModal();
      return;
    }

    const wasBookmarked = isBookmarked;
    const newState = !wasBookmarked;
    setIsBookmarked(newState);

    // 이전 상태가 false → true로 바뀔 때만 모달 오픈
    if (!wasBookmarked && newState) {
      setIsModalOpen(true);
    }

    try {
      await trigger();
    } catch {
      setIsBookmarked(wasBookmarked);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <button onClick={handleClick} disabled={isMutating}>
        {isBookmarked ? (
          <AiFillStar className='h-[30px] w-[30px] cursor-pointer text-yellow-300' />
        ) : (
          <AiOutlineStar className='h-[30px] w-[30px] cursor-pointer text-gray-500' />
        )}
      </button>
      <LikePlusModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}

export default BookmarkButton;
