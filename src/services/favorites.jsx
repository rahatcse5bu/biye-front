import axios from "axios";
import { baseUrl } from "../utils/url";

const createLikes = async (data, token) => {
  const response = await axios.post(baseUrl + "/favorites", data, {
    headers: {
      Authorization: ` Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
const checkLikes = async (id, token) => {
  const response = await axios.get(baseUrl + `/favorites/check/${id}`, {
    headers: {
      Authorization: ` Bearer ${token}`,
    },
  });
  return response.data;
};
const getLikes = async (bio_id) => {
  if (!bio_id) {
    return null;
  }
  const response = await axios.get(`${baseUrl}/favorites/bio-data/${bio_id}`);
  return response.data;
};
const getUserLikes = async (user_id, bio_id) => {
  if (!user_id || !bio_id) {
    return null;
  }
  const response = await axios.get(
    `${baseUrl}/favorites/user-data/${user_id}/${bio_id}`
  );
  return response.data;
};
const getUserLikesList = async (token) => {
  if (!token) {
    return null;
  }
  const response = await axios.get(`${baseUrl}/favorites`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
const getUserLikesByWhoList = async (token) => {
  if (!token) {
    return null;
  }
  const response = await axios.get(`${baseUrl}/favorites/likes-who`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
export const LikesServices = {
  createLikes,
  getLikes,
  getUserLikes,
  getUserLikesList,
  getUserLikesByWhoList,
  checkLikes,
};
