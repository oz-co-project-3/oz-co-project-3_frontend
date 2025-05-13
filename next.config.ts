import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  images: {
    // 1) 도메인 단위 허용
    domains: [
      'co-pj-bk.s3.ap-northeast-2.amazonaws.com',
      // 필요하다면 추가 호스트를 여기에 나열
    ],

    // 2) 더 세밀한 패턴 매칭 (선택)
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'co-pj-bk.s3.ap-northeast-2.amazonaws.com',
    //     port: '',
    //     pathname: '/**',      // 모든 경로 허용
    //   },
    // ],

    // 3) Data/Blob URL 렌더링이 필요하다면 unoptimized 옵션 사용
    // unoptimized: true,
  },
};

export default nextConfig;
