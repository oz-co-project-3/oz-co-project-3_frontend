import { create } from 'zustand';
import type { ChatbotResponse } from '@/types/chatbot';

// 채팅 메시지 타입 정의 (user 또는 bot의 메시지)
interface ChatMessage {
  sender: 'user' | 'bot';
  message: string;
}

// 챗봇 전역 상태 타입 정의
interface ChatbotState {
  open: boolean;
  isNotFoundPage: boolean;
  chatData: ChatbotResponse | null;
  chatLog: ChatMessage[];
  selectionPath: string[];
  setOpen: (value: boolean) => void; // 챗봇 열림 상태 설정
  setIsNotFoundPage: (value: boolean) => void; // not-found 추가
  appendUserMessage: (message: string) => void; // 사용자 메시지 추가
  appendBotMessage: (message: string) => void; // 봇 메시지 추가
  setChatData: (data: ChatbotResponse) => void; // 서버 응답 설정
  setSelectionPath: (path: string[]) => void; // 선택 경로 설정
  reset: () => void; // 상태 전체 초기화
}

export const useChatbotStore = create<ChatbotState>()((set) => {
  // 사용자 메시지를 채팅 로그에 추가
  const appendUserMessage = (message: string) => {
    set((state) => ({ chatLog: [...state.chatLog, { sender: 'user', message }] }));
  };

  // 봇 메시지를 채팅 로그에 추가
  const appendBotMessage = (message: string) => {
    set((state) => ({ chatLog: [...state.chatLog, { sender: 'bot', message }] }));
  };

  // 서버로부터 받은 챗봇 응답 데이터를 상태에 저장
  const setChatData = (data: ChatbotResponse) => {
    set({ chatData: data });
  };

  // 사용자가 선택한 옵션 경로 업데이트
  const setSelectionPath = (path: string[]) => {
    set({ selectionPath: path });
  };

  // 챗봇 팝업 open 여부 제어
  const setOpen = (value: boolean) => {
    set({ open: value });
  };

  // NotFound 페이지 진입 여부 상태 설정
  const setIsNotFoundPage = (value: boolean) => {
    set({ isNotFoundPage: value });
  };

  // 챗봇 상태 전체 초기화 (채팅 로그, 응답 데이터, 선택 경로 초기화)
  const reset = () => {
    set({
      chatData: null,
      chatLog: [],
      selectionPath: [],
    });
  };

  // 초기 상태 반환
  return {
    open: false,
    isNotFoundPage: false,
    chatData: null,
    chatLog: [],
    selectionPath: [],
    setOpen,
    setIsNotFoundPage,
    appendUserMessage,
    appendBotMessage,
    setChatData,
    setSelectionPath,
    reset,
  };
});
