export interface ChatbotBase {
  step: number;
  selection_path: string;
  answer: string;
  options: string | null;
  is_terminate: boolean;
  url?: string;
}

export interface ChatbotPrompt extends ChatbotBase {
  id: number;
}

export type ChatbotResponse = ChatbotBase;
