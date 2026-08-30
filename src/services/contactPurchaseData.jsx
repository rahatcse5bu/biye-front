import axios from '../utils/axios';

const createContactPurchaseData = async (data, token) => {
  if (!token) return;

  const response = await axios.post('/contact-purchase-data', data);
  return response.data;
};

export const ContactPurchaseDataServices = {
  createContactPurchaseData,
};
