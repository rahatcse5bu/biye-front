import axios from '../utils/axios';

const createDisLikes = async (data, token) => {
  void token;
  const response = await axios.post('/un-favorites', data);
  return response.data;
};
const checkDisLikes = async (id, token) => {
  void token;
  const response = await axios.get(`/un-favorites/check/${id}`);
  return response.data;
};
const getDisLikes = async (bio_id) => {
  if (!bio_id) {
    return null;
  }
  const response = await axios.get(`/un-favorites/bio-data/${bio_id}`);
  return response.data;
};
const getUserDisLikes = async (user_id, bio_id) => {
  if (!user_id || !bio_id) {
    return;
  }
  const response = await axios.get(
    `/un-favorites/user-data/${user_id}/${bio_id}`
  );
  return response.data;
};
const getUserDisLikesList = async (token) => {
  if (!token) {
    return null;
  }
  const response = await axios.get('/un-favorites');
  return response.data;
};

const getMyDisLikesList = async (token) => {
  if (!token) {
    return null;
  }
  const response = await axios.get('/un-favorites');
  return response.data;
};
const getDisLikesListByUser = async (token, bio_user) => {
  if (!token) {
    return null;
  }
  const response = await axios.get(`/un-favorites/bio-user/${bio_user}`);
  return response.data;
};
const getUserDisLikesByWhoList = async (token) => {
  if (!token) {
    return null;
  }
  const response = await axios.get('/un-favorites/dislikes-who');
  return response.data;
};
export const DisLikesServices = {
  createDisLikes,
  getDisLikes,
  getUserDisLikes,
  getUserDisLikesList,
  getUserDisLikesByWhoList,
  checkDisLikes,
  getMyDisLikesList,
  getDisLikesListByUser,
};
