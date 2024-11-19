import CryptoJS from "crypto-js";
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export const encrytPassword = (password: string) => {
  const encryptedPassword = CryptoJS.AES.encrypt(
    password,
    `${SECRET_KEY}`
  ).toString();
  return encryptedPassword;
};

export const decryptPassword = (encryptedPassword: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY);
  const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedPassword;
};
