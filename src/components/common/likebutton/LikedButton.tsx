'use client';

import { fetchOnClient } from '@/api/clientFetcher';
import { AiOutlineStar } from 'react-icons/ai';
import { AiFillStar } from 'react-icons/ai';
import useSWRMutation from 'swr/mutation';
import { useState, useRef } from 'react';
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

  const isFirstClick = useRef(true);

  // useSWRMutation 사용
  const { trigger, isMutating } = useSWRMutation(
    `/api/job_posting/${id}/bookmark/`,
    (url: string) => fetchOnClient(url, { method: 'POST' }),
    {
      onSuccess: () => {
        // 요청 성공 시 상태 유지
        console.log('북마크 상태 변경 성공');
      },
      onError: () => {
        // 요청 실패 시 상태 원복
        console.log('북마크 상태 변경 실패, 상태 복구');
        setIsBookmarked((prev) => !prev);
        setIsModalOpen(false);
      },
    },
  );

  if (!id) return null;

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (!user) {
      // 로그인 안 한 경우 → 로그인 모달 띄우기
      setRedirectPath('/user/login');
      openLoginModal();
      return;
    }

    // 북마크 상태가 true로 변경될 때만 모달 열기
    // if (newBookmarkState) {
    //   setIsModalOpen(true);
    // }

    // 북마크 상태 변경
    const wasBookmarked = isBookmarked;
    const newState = !wasBookmarked;

    setIsBookmarked(newState);

    // 북마크 추가일 때만 모달 열기
    if (!wasBookmarked && isFirstClick.current) {
      setIsModalOpen(true);
      isFirstClick.current = false;
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
          <>
            <AiFillStar className='h-[30px] w-[30px] cursor-pointer text-yellow-300' />
          </>
        ) : (
          <AiOutlineStar className='h-[30px] w-[30px] cursor-pointer text-gray-500' />
        )}
      </button>
      <LikePlusModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}

export default BookmarkButton;
