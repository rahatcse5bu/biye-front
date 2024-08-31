import Cookies from 'js-cookie';
const setToken = (data) => {
  Cookies.set('pnc-nikha-tokenInfo', JSON.stringify(data), { expires: 30 });
};
const setUserOPenSmall = (data) => {
  Cookies.set('pnc-nikha-user-open-small', JSON.stringify(data));
};
const setUserOPenLarge = (data) => {
  Cookies.set('pnc-nikha-user-open-large', JSON.stringify(data));
};

const getToken = () => {
  let data = Cookies.get('pnc-nikha-tokenInfo');
  if (data) {
    data = JSON.parse(data);
  }
  return data;
};
const getUserOPenSmall = () => {
  let data = Cookies.get('pnc-nikha-user-open-small');
  if (data) {
    data = JSON.parse(data);
  }
  return data;
};
const getUserOPenLarge = () => {
  let data = Cookies.get('pnc-nikha-user-open-large');
  if (data) {
    data = JSON.parse(data);
  }
  return data;
};

const removeToken = () => {
  Cookies.remove('pnc-nikha-tokenInfo');
};

export {
  setToken,
  getToken,
  removeToken,
  getUserOPenLarge,
  getUserOPenSmall,
  setUserOPenSmall,
  setUserOPenLarge,
};
