import SearchBarSuspense from '@/components/common/searchbar/Searchbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav className='fixed top-16 right-0 left-0 z-10 flex h-14 items-center bg-white'>
        <div className='w-full'>
          <SearchBarSuspense />
        </div>
        <br />
        <hr />
      </nav>
      <main className='pt-[120px]'>{children}</main>
    </div>
  );
}
