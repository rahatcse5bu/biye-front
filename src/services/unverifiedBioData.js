import axiosInstance from '../utils/axios';
import { convertToQuery } from '../utils/query';

const getAll = async (query = {}) => {
  const queryString = convertToQuery(query);
  const res = await axiosInstance.get(`/unverified-biodatas?${queryString}`);
  return res.data;
};

const getById = async (id) => {
  const res = await axiosInstance.get(`/unverified-biodatas/${id}`);
  return res.data;
};

const purchaseContact = async (unverified_bio, token) => {
  const res = await axiosInstance.post(
    '/unverified-contact-purchase',
    { unverified_bio },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

const checkPurchase = async (bioId, token) => {
  const res = await axiosInstance.get(
    `/unverified-contact-purchase/check/${bioId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const UnverifiedBioDataServices = {
  getAll,
  getById,
  purchaseContact,
  checkPurchase,
};
