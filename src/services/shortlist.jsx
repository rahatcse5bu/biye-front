import axios from 'axios';
import { baseUrl } from '../utils/url';

const toggleShortlist = async (data, token) => {
  const response = await axios.post(baseUrl + '/shortlist', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

const checkShortlist = async (id, token) => {
  const response = await axios.get(baseUrl + `/shortlist/check/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getMyShortlist = async (token) => {
  if (!token) {
    return null;
  }
  const response = await axios.get(`${baseUrl}/shortlist`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getWhoShortlistedMe = async (token) => {
  if (!token) {
    return null;
  }
  const response = await axios.get(`${baseUrl}/shortlist/who-shortlisted-me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const ShortlistServices = {
  toggleShortlist,
  checkShortlist,
  getMyShortlist,
  getWhoShortlistedMe,
};
