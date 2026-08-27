import axios from 'axios';

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/api/v1'
    : 'https://biye-backend.vercel.app/api/v1';

const createContactPurchaseData = async (data, token) => {
  if (!token) return;

  const response = await axios.post(baseUrl + '/contact-purchase-data', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const ContactPurchaseDataServices = {
  createContactPurchaseData,
};
