import Cookies from "js-cookie";
const setToken = (data) => {
  Cookies.set("pnc-nikha-tokenInfo", JSON.stringify(data), { expires: 30 });
};

const getToken = () => {
  let data = Cookies.get("pnc-nikha-tokenInfo");
  if (data) {
    data = JSON.parse(data);
  }
  return data;
};

const removeToken = () => {
  Cookies.remove("pnc-nikha-tokenInfo");
};

export { setToken, getToken, removeToken };
