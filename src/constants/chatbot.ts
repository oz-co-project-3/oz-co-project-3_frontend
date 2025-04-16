import type { ChatbotResponse } from '@/types/chatbot';

export const MOCK_RESPONSES: ChatbotResponse[] = [
  {
    step: 1,
    selection_path: '',
    options: ['회원', '개인', '기업'],
    answer: '',
    is_terminate: false,
  },
  {
    step: 2,
    selection_path: '개인',
    options: ['이력서', '공고', '커뮤니티'],
    answer: '',
    is_terminate: false,
  },
  {
    step: 3,
    selection_path: '개인/이력서',
    options: ['작성', '수정', '삭제'],
    answer: '',
    is_terminate: false,
  },
  {
    step: 4,
    selection_path: '개인/이력서/작성',
    options: [],
    answer: '로그인 > 프로필 > 이력서 작성',
    is_terminate: true,
  },
];
