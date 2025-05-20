import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error('❌ VITE_SECRET_KEY is not defined in environment variables.');
}

// Encrypt any serializable value
export const encryptData = (data: unknown): string => {
  const json = JSON.stringify(data);
  return CryptoJS.AES.encrypt(json, SECRET_KEY).toString();
};

// Decrypt an encrypted string
export const decryptData = <T = unknown>(cipherText: string): T | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted) as T;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Decryption failed:', error);
    }
    return null;
  }
};
