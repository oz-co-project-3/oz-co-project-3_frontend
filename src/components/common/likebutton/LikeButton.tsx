'use client';

import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useEffect, useRef, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { fetchOnClient } from '@/api/clientFetcher';
import LikePlusModal from './LikePlusModal';
import useSWR from 'swr';
import { useAuthStore } from '@/store/useAuthStore';

//찜한 공고의 id
interface LikeButtonProps {
  id: string;
  isBookmarked: boolean;
}

interface BookmarkResponse {
  is_bookmarked: boolean;
}

const LikeButton = ({ id }: LikeButtonProps) => {
  const userId = useAuthStore((state) => state.user?.id);
  //postingData는 is_bookmarked 객체
  const { data: postingData, mutate } = useSWR<BookmarkResponse>(
    userId ? [`/api/postings/${id}/`, userId] : null,
    async ([url]) => {
      const res = (await fetchOnClient(url)) as Response;

      if (!res.ok) throw new Error('API 요청 실패');

      return res.json() as Promise<{ is_bookmarked: boolean }>;
      //비동기 함수는 실제로 Promise반환
    },
  );
  const liked = postingData?.is_bookmarked ?? false;
  const [modalOpen, setModalOpen] = useState(false);
  const shouldOpenModal = useRef(false);

  const { trigger, isMutating, error } = useSWRMutation<BookmarkResponse>(
    `/api/job_posting/${id}/bookmark/`,
    (url: string) => fetchOnClient<BookmarkResponse>(url, { method: 'POST' }),
    {
      optimisticData: (current: BookmarkResponse | undefined) => ({
        //패치 전에 미리 ui 바꾸기
        ...(current || { is_bookmarked: liked }),
        is_bookmarked: !liked,
      }),
      rollbackOnError: true,
    },
  );

  useEffect(() => {
    if (postingData?.is_bookmarked && shouldOpenModal.current) {
      setModalOpen(true);
      shouldOpenModal.current = false;
    }
  }, [postingData?.is_bookmarked]);

  useEffect(() => {
    return () => {
      setModalOpen(false);
      shouldOpenModal.current = false;
    };
  }, []);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      shouldOpenModal.current = true;
      const result = await trigger();
      //찜하기 post 요청
      mutate({ is_bookmarked: result?.is_bookmarked ?? !liked }, false);
    } catch (error) {
      console.error('찜하기 실패:', error);
    }
  };

  return (
    <div>
      <button onClick={handleClick} disabled={isMutating}>
        {liked ? (
          <>
            <AiFillStar className='h-[30px] w-[30px] cursor-pointer text-yellow-300' />
          </>
        ) : (
          <AiOutlineStar className='h-[30px] w-[30px] cursor-pointer text-gray-500' />
        )}
      </button>
      <LikePlusModal open={modalOpen} onOpenChange={setModalOpen} />
      {error && <div>다시 시도해주세요</div>}
      {/* 에러메세지 팝업으로 뜰수 있도록 하기  */}
    </div>
  );
};

export default LikeButton;
