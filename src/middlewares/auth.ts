import { getSecureCookie } from '../utils/secureCookie';

export function isAuthenticated(): boolean {
  try {
    const auth = getSecureCookie('auth');
    return !!auth?.jwt;
  } catch {
    return false;
  }
}
