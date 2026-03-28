import axios from 'axios';
import axiosInstance from '../utils/axios';

const baseUrl =
  import.meta.env.VITE_REACT_APP_NODE_ENV === 'development'
    ? 'http://localhost:5000/api/v1'
    : 'https://server.pncnikah.com/api/v1';

const purchaseContact = async (biodataId, token) => {
  const response = await axios.post(
    baseUrl + `/unverified-biodatas/${biodataId}/purchase-contact`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

const getUnverifiedContactPurchases = async (token) => {
  const response = await axiosInstance.get(
    `/unverified-contact-purchases`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const getUnverifiedContactPurchaseById = async (biodataId, token) => {
  const response = await axiosInstance.get(
    `/unverified-contact-purchases/${biodataId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const UnverifiedContactPurchaseService = {
  purchaseContact,
  getUnverifiedContactPurchases,
  getUnverifiedContactPurchaseById,
};
