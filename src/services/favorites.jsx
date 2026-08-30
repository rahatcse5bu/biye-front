import axios from '../utils/axios';

const createLikes = async (data, token) => {
  void token;
  const response = await axios.post('/favorites', data);
  return response.data;
};
const checkLikes = async (id, token) => {
  void token;
  const response = await axios.get(`/favorites/check/${id}`);
  return response.data;
};
const getLikes = async (bio_id) => {
  if (!bio_id) {
    return null;
  }
  const response = await axios.get(`/favorites/bio-data/${bio_id}`);
  return response.data;
};
const getUserLikes = async (user_id, bio_id) => {
  if (!user_id || !bio_id) {
    return null;
  }
  const response = await axios.get(`/favorites/user-data/${user_id}/${bio_id}`);
  return response.data;
};
const getUserLikesList = async (token) => {
  if (!token) {
    return null;
  }
  const response = await axios.get('/favorites');
  return response.data;
};
const getMyLikesList = async (token) => {
  if (!token) {
    return null;
  }
  const response = await axios.get('/favorites');
  return response.data;
};
const getLikesListByUser = async (token, bio_user) => {
  if (!token) {
    return null;
  }
  const response = await axios.get(`/favorites/bio-user/${bio_user}`);
  return response.data;
};
const getUserLikesByWhoList = async (token) => {
  if (!token) {
    return null;
  }
  const response = await axios.get('/favorites/likes-who');
  return response.data;
};
export const LikesServices = {
  createLikes,
  getLikes,
  getUserLikes,
  getUserLikesList,
  getUserLikesByWhoList,
  checkLikes,
  getMyLikesList,
  getLikesListByUser,
};
