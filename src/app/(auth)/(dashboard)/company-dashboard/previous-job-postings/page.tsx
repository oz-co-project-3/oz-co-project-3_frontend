import ExpiredJobPostingCardTemp from '@/components/dashboard/company/job-posting/ExpiredJobPostingCardTemp';
import { Button } from '@/components/ui/button';

export default async function PreviousJobPostingsPage() {
  return (
    <>
      <section className='flex flex-col gap-4 rounded-md bg-white px-4 py-10'>
        <div className='flex justify-between border-b pb-4'>
          <h2 className='text-2xl font-bold'>이전 채용공고</h2>
          <Button className='bg-main-light hover:bg-main-dark cursor-pointer'>
            채용 공고 등록
          </Button>
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
