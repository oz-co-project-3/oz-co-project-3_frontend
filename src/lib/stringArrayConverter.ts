/**
 * 배열을 쉼표(,)로 연결된 문자열로 변환
 */
export function arrayToString(arr?: string[] | null): string {
  if (!arr || arr.length === 0) return '';
  return arr.join(',');
}

/**
 * 쉼표(,)로 연결된 문자열을 배열로 변환
 */
export function stringToArray(str?: string | string[] | null): string[] {
  if (!str || typeof str !== 'string') return Array.isArray(str) ? str : [];
  return str
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * 객체의 특정 필드들을 배열 → 문자열로 변환
 */
const FIELDS_TO_CONVERT = ['interests', 'purposes', 'sources'] as const;
type FieldsToConvert = (typeof FIELDS_TO_CONVERT)[number];

type ConvertibleFields = {
  [key in FieldsToConvert]?: string | string[];
};

export function convertArrayFieldsToString<T extends ConvertibleFields>(data: T): T {
  const result = { ...data };
  console.log('🔥 result:', result);

  FIELDS_TO_CONVERT.forEach((key) => {
    const value = result[key];
    if (Array.isArray(value)) {
      result[key] = value.join(',') as T[typeof key];
    }
  });

  return result;
}

/**
 * 객체의 특정 필드들을 문자열 → 배열로 변환
 */
export function convertStringFieldsToArray<T extends ConvertibleFields>(data: T): T {
  const result = { ...data };

  FIELDS_TO_CONVERT.forEach((key) => {
    const value = result[key];
    if (typeof value === 'string') {
      result[key] = value.split(',').map((v) => v.trim()) as T[typeof key];
    }
  });

  return result;
}
