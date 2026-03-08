// utils.js
import { clearUserLocalStorage } from './localStorage';

export const handleLogout = async (logOut, setIsHovered, removeToken) => {
  await logOut();
  setIsHovered(false);
  removeToken();
  clearUserLocalStorage();
  window.location.href = '/';
};
