import SearchBar from '@/components/common/searchbar/Searchbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav className='bg-white'>
        <SearchBar />
        <br />
        <hr />
      </nav>
      {children}
    </div>
  );
}
