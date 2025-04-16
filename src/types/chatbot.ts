export interface ChatbotResponse {
  step: number;
  selection_path: string;
  options: string[];
  title?: string; //확정아님
  subtitle?: string; //확정아님
  answer: string;
  is_terminate: boolean;
}
