import '../styles/globals.css';
import localFont from 'next/font/local';
import type { Metadata } from 'next';
import Header from '@/components/header/Header';
import SwrProvider from '@/store/SwrProvider';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: '시니어내일',
  description: '시니어 세대 일자리 플랫폼',
  icons: {
    icon: '/favicon/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' className={`${pretendard.variable} h-full`}>
      <body
        className={`${pretendard.className} bg-background-ivory h-full min-h-screen antialiased`}
      >
        <SwrProvider>
          <Header />
          <main className='h-full pt-[70px]'>{children}</main>
        </SwrProvider>
      </body>
    </html>
  );
}
