export const CHATBOT_API = {
  BASE: `${process.env.NEXT_PUBLIC_API_URL}/api/admin/chatbot`,
  DETAIL: (id: number) => `${process.env.NEXT_PUBLIC_API_URL}/api/admin/chatbot/${id}`,
};
