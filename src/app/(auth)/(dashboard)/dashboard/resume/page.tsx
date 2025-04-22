import ResumeCard from '@/components/resume/ResumeCard';

export default async function ResumePage() {
  return (
    <>
      <section className='flex flex-col gap-4 rounded-md bg-white px-4 py-10'>
        <h2 className='border-b pb-4 text-2xl font-bold'>내 이력서</h2>
        <ResumeCard id='1' />
        <ResumeCard id='2' />
        <ResumeCard id='3' />
      </section>
    </>
  );
}
