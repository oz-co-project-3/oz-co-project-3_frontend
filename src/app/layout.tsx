import '../styles/globals.css';
import localFont from 'next/font/local';
import type { Metadata } from 'next';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import SwrProvider from '@/store/SwrProvider';
import AutoTokenRefresher from '@/components/common/AutoTokenRefresher';
import AuthInitializer from '@/components/common/AuthInitializer';
import { ChatbotButtonWrapper } from '@/components/chatbot/ChatbotButtonWrapper';

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
      <body className={`${pretendard.className} bg-background-ivory antialiased`}>
        <SwrProvider>
          <AuthInitializer />
          <AutoTokenRefresher />
          <Header />
          <div className='min-h-[calc(100vh)] pt-[70px] pb-16'>{children}</div>
        <ChatbotButtonWrapper />
          <Footer />
        </SwrProvider>
      </body>
    </html>
  );
}
