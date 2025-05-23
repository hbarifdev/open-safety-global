import Cookies from 'js-cookie';
import { encryptData, decryptData } from './encryption';

const DEFAULT_EXPIRES = 7; 

const isDev = import.meta.env.VITE_NODE_ENV === 'development'; 

export function setSecureCookie(key: string, data: any, expires: number = DEFAULT_EXPIRES): void {
  try {
    const json = JSON.stringify(data);
    const encrypted = encryptData(json); 
    Cookies.set(key, encrypted, { expires }); 
    if (isDev) {
      console.log(`Cookie set successfully for ${key}:`, data);
    }
  } catch (error) {
    if (isDev) {
      console.error(`Failed to set secure cookie [${key}]:`, error);
    }
  }
}

export function getSecureCookie(key: string): any | null {
  const encrypted = Cookies.get(key); 
  if (!encrypted || typeof encrypted !== 'string') return null;

  try {
    const decrypted = decryptData(encrypted); 
    return JSON.parse(decrypted);
  } catch (error) {
    if (isDev) {
      console.error(`Failed to decrypt cookie [${key}]:`, error);
    }
    return null;
  }
}

export function removeSecureCookie(key: string): void {
  try {
    Cookies.remove(key); 
    if (isDev) {
      console.log(`Cookie removed: ${key}`);
    }
  } catch (error) {
    if (isDev) {
      console.error(`Failed to remove secure cookie [${key}]:`, error);
    }
  }
}
