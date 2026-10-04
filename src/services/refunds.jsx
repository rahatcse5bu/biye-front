import axios from '../utils/axios';

const addRefundRequest = async (data, token) => {
  void token;
  const response = await axios.post('/refund/refund-req', data);
  return response.data;
};

const getRefundRequest = async (token) => {
  void token;
  const response = await axios.get('/refund/refund-req');
  return response.data;
};

const updateRefundRequest = async (data, token) => {
  void token;
  const response = await axios.put('/refund/refund-req', data);
  return response.data;
};

const requestRefund = async (paymentId, reason) => {
  const response = await axios.post('/refund-requests', { payment_id: paymentId, reason });
  return response.data;
};

const getMyRefundRequests = async () => {
  const response = await axios.get('/refund-requests/me');
  return response.data?.data || [];
};

export const refundServices = {
  addRefundRequest: addRefundRequest,
  getRefundRequest: getRefundRequest,
  updateRefundRequest: updateRefundRequest,
  requestRefund,
  getMyRefundRequests,
};
