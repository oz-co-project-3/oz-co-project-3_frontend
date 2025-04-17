export interface ChatbotResponse {
  step: number;
  selection_path: string;
  answer: string;
  options: string[] | string | null;
  is_terminate: boolean;
}
