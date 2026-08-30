import axiosInstance from '../utils/axios';

const purchaseContact = async (biodataId, token) => {
  const response = await axiosInstance.post(
    `/unverified-biodatas/${biodataId}/purchase-contact`,
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
  const response = await axiosInstance.get(`/unverified-contact-purchases`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
