'use client';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex h-full w-full flex-col overflow-y-auto'>
      <div className='flex w-full flex-1'>
        <div className='mx-auto flex w-full max-w-[1200px] gap-4 py-6'>
          <div className='flex flex-1 flex-col gap-4'>{children}</div>
        </div>
      </div>
    </main>
  );
}
