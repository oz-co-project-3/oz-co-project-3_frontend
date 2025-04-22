export default async function Resume() {
  return (
    <article className='flex flex-col gap-2 p-4'>
      <div className='flex flex-col gap-2 rounded-md border p-4'>
        <h3 className='text-lg font-bold'>경력</h3>
        <p className='text-sm text-gray-500'>경력</p>
      </div>

      <div className='flex flex-col gap-2 rounded-md border p-4'>
        <h3 className='text-lg font-bold'>스킬</h3>
        <p className='text-sm text-gray-500'>스킬</p>
      </div>

      <div className='flex flex-col gap-2 rounded-md border p-4'>
        <h3 className='text-lg font-bold'>수상</h3>
        <p className='text-sm text-gray-500'>수상</p>
      </div>

      <div className='flex flex-col gap-2 rounded-md border p-4'>
        <h3 className='text-lg font-bold'>학력</h3>
        <p className='text-sm text-gray-500'>학력</p>
      </div>

      <div className='flex flex-col gap-2 rounded-md border p-4'>
        <h3 className='text-lg font-bold'>언어</h3>
        <p className='text-sm text-gray-500'>언어</p>
      </div>
    </article>
  );
}
