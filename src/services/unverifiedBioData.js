import axios from 'axios';
import axiosInstance from '../utils/axios';
import { convertToQuery } from '../utils/query';

const baseUrl =
  import.meta.env.VITE_REACT_APP_NODE_ENV === 'development'
    ? 'http://localhost:5000/api/v1'
    : 'https://server.pncnikah.com/api/v1';

const getAll = async (query = {}) => {
  const queryString = convertToQuery(query);
  const res = await axios.get(`${baseUrl}/unverified-biodatas?${queryString}`);
  return res.data;
};

const getById = async (id) => {
  const res = await axios.get(`${baseUrl}/unverified-biodatas/${id}`);
  return res.data;
};

const purchaseContact = async (unverified_bio, token) => {
  const res = await axios.post(
    `${baseUrl}/unverified-contact-purchase`,
    { unverified_bio },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

const checkPurchase = async (bioId, token) => {
  const res = await axios.get(
    `${baseUrl}/unverified-contact-purchase/check/${bioId}`,
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
