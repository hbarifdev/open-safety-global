import Cookies from 'js-cookie';
import { encryptData, decryptData } from './encryption';

const DEFAULT_EXPIRES = 7; // days

// Make sure to use the correct prefix for Vite's environment variables
const isDev = import.meta.env.VITE_NODE_ENV === 'development'; 

export function setSecureCookie(key: string, data: any, expires: number = DEFAULT_EXPIRES): void {
  try {
    const json = JSON.stringify(data);
    const encrypted = encryptData(json); // Encrypt the data
    Cookies.set(key, encrypted, { expires }); // Set the encrypted cookie
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
  const encrypted = Cookies.get(key); // Retrieve the cookie value
  if (!encrypted || typeof encrypted !== 'string') return null;

  try {
    const decrypted = decryptData(encrypted); // Decrypt the cookie value
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
    Cookies.remove(key); // Remove the cookie
    if (isDev) {
      console.log(`Cookie removed: ${key}`);
    }
  } catch (error) {
    if (isDev) {
      console.error(`Failed to remove secure cookie [${key}]:`, error);
    }
  }
}
