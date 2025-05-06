import { jwtDecode } from 'jwt-decode';

interface JwtPayloadWithExp {
  exp: number;
}

export function getTokenExpiry(token: string): number | null {
  try {
    const decoded = jwtDecode<JwtPayloadWithExp>(token);
    return decoded.exp ? decoded.exp * 1000 : null;
  } catch {
    return null;
  }
}
