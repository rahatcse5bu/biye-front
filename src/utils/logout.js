// utils.js
export const handleLogout = async (logOut, setIsHovered, removeToken) => {
  await logOut();
  setIsHovered(false);
  removeToken();
  window.location.href = '/';
};
