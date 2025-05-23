import { getSecureCookie } from '../utils/secureCookie';

export function isAuthenticated(): boolean {
  const auth = getSecureCookie('auth');
  return !!auth?.jwt;
}
