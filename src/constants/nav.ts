export const seekerNavItems = [
  { name: '프로필', href: '/dashboard/job-seeker/profile' },
  { name: '이력서', href: '/dashboard/job-seeker/resume' },
  { name: '지원한 채용공고', href: '/dashboard/job-seeker/job-postings/applied' },
  { name: '찜한 채용공고', href: '/dashboard/job-seeker/job-postings/favorite' },
] as const;

export const businessNavItems = [
  { name: '기업 프로필', href: '/dashboard/business/profile' },
  { name: '현재 채용공고', href: '/dashboard/business/job-postings/current' },
  { name: '이전 채용공고', href: '/dashboard/business/job-postings/expired' },
  { name: '채용공고 등록', href: '/dashboard/business/job-postings/post' },
] as const;
