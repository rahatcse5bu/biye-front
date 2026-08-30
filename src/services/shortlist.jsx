import axios from '../utils/axios';

const toggleShortlist = async (data, token) => {
  void token;
  const response = await axios.post('/shortlist', data);
  return response.data;
};

const checkShortlist = async (id, token) => {
  void token;
  const response = await axios.get(`/shortlist/check/${id}`);
  return response.data;
};

const getMyShortlist = async (token) => {
  if (!token) {
    return null;
  }
  const response = await axios.get('/shortlist');
  return response.data;
};

const getWhoShortlistedMe = async (token) => {
  if (!token) {
    return null;
  }
  const response = await axios.get('/shortlist/who-shortlisted-me');
  return response.data;
};

const toggleUnverifiedShortlist = async (unverified_bio, token) => {
  void token;
  const response = await axios.post('/unverified-shortlist', {
    unverified_bio,
  });
  return response.data;
};

const checkUnverifiedShortlist = async (id, token) => {
  void token;
  const response = await axios.get(`/unverified-shortlist/check/${id}`);
  return response.data;
};

export const ShortlistServices = {
  toggleShortlist,
  checkShortlist,
  getMyShortlist,
  getWhoShortlistedMe,
  toggleUnverifiedShortlist,
  checkUnverifiedShortlist,
};
