import { LoginFormData, LoginResponseData } from "@/types/user";

export async function loginUser(data: LoginFormData): Promise<LoginResponseData> {
  const response = await fetch("/api/user/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("로그인 실패");
  }

  const result: LoginResponseData = await response.json();
  return result;
}