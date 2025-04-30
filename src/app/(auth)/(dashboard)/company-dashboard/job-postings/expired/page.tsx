import ExpiredJobPostingCardTemp from '@/components/job-posting/ExpiredJobPostingCardTemp';
import Link from 'next/link';

export default async function PreviousJobPostingsPage() {
  return (
    <>
      <section className='flex flex-col gap-4 rounded-md bg-white px-8 py-10'>
        <div className='flex justify-between border-b pb-4'>
          <h2 className='text-2xl font-bold'>이전 채용공고</h2>
          <Link
            href='/company-dashboard/job-posting/create'
            className='bg-main-light hover:bg-main-dark cursor-pointer rounded-md px-5 py-1.5 text-white'
          >
            채용 공고 등록
          </Link>
        </div>

        <ExpiredJobPostingCardTemp />
        <ExpiredJobPostingCardTemp />
        <ExpiredJobPostingCardTemp />
        <ExpiredJobPostingCardTemp />
        <ExpiredJobPostingCardTemp />
        <ExpiredJobPostingCardTemp />
        <ExpiredJobPostingCardTemp />
      </section>
    </>
  );
}

// 버튼 내용 바꾸기
// 마감일 연장 -> 재등록
// 수정 -> 수정 후 재등록
