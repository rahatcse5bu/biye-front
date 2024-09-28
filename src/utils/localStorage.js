export const setGenderToLocal = (gender) => {
  // console.log('set-gender', gender);
  localStorage.setItem('pnc-nikah-gender', gender);
};

export const getGender = () => {
  return localStorage.getItem('pnc-nikah-gender');
};
