import '../styles/globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Header from '@/components/header/Header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
    <html lang='ko' className='h-full'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background-ivory h-full min-h-screen antialiased`}
      >
        <Header />
        <main className='h-full pt-[70px]'>{children}</main>
      </body>
    </html>
  );
}
