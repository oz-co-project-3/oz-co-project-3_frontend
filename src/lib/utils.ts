import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 제어 문자 제거 (텍스트 복사-붙여넣기 과정이나 다른 편집기에서 코드를 가져올 때 발생)
 * 제어 문자: \u0000-\u001F 범위
 * 제로 너비 공백: \u200B, \u200C, \u200D 등
 * 바이트 순서 표시(BOM): \uFEFF
 */
export function cleanString(str: string) {
  return str.replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200D\uFEFF]/g, '');
}
