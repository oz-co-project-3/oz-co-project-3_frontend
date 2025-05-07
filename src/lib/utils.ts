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
export const cleanString = (str: string): string => {
  return str.replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200D\uFEFF]/g, '');
};

/**
 * 위치 정보를 줄여서 표시
 * @param location 주소
 * @returns 대략적인 위치 정보
 */
export const getBriefLocation = (location: string): string => {
  const [province, city] = location.split(' ');
  return `${province} ${city ?? ''}`;
};
