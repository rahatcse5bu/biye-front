// import axios from "axios";
// const baseUrl =
// 	import.meta.env.VITE_REACT_APP_NODE_ENV === "development"
// 		? "http://localhost:5000/api/v1"
// 		: "https://server.pncnikah.com/api/v1";

// const addRefundRequest = async (data, token) => {
// 	const response = await axios.post(baseUrl + "/refund/", data, {
// 		headers: {
// 			Authorization: token,
// 			"Content-Type": "application/json",
// 		},
// 	});
// 	return response.data;
// };

// const getRefundRequest = async (token) => {
// 	const response = await axios.get(baseUrl + "/refund/", {
// 		headers: {
// 			Authorization: token,
// 		},
// 	});
// 	return response.data;
// };

// export const refundServices = {
// 	addRefundRequest: addRefundRequest,
// 	getRefundRequest: getRefundRequest,
// };

import axios from 'axios';

const baseUrl =
  import.meta.env.VITE_REACT_APP_NODE_ENV === 'development'
    ? 'http://localhost:5000/api/v1'
    : 'https://server.pncnikah.com/api/v1';

const addRefundRequest = async (data, token) => {
  const response = await axios.post(baseUrl + '/refund/refund-req', data, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

const getRefundRequest = async (token) => {
  const response = await axios.get(baseUrl + '/refund/refund-req', {
    headers: {
      Authorization: token,
    },
  });

  // console.log("get-refund-data", response);
  return response.data;
};

const updateRefundRequest = async (data, token) => {
  const response = await axios.put(baseUrl + '/refund/refund-req', data, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const refundServices = {
  addRefundRequest: addRefundRequest,
  getRefundRequest: getRefundRequest,
  updateRefundRequest: updateRefundRequest,
};
