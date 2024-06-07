import axios from "axios";

const baseUrl =
  import.meta.env.VITE_REACT_APP_NODE_ENV === "development"
    ? "http://localhost:5000/api/v1"
    : "https://server.pnc-nikah.com/api/v1";

const createDisLikes = async (data, token) => {
  const response = await axios.post(baseUrl + "/un-favorites", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
const checkDisLikes = async (id, token) => {
  const response = await axios.get(baseUrl + `/un-favorites/check/${id}`, {
    headers: {
      Authorization: ` Bearer ${token}`,
    },
  });
  return response.data;
};
const getDisLikes = async (bio_id) => {
  if (!bio_id) {
    return null;
  }
  const response = await axios.get(
    `${baseUrl}/un-favorites/bio-data/${bio_id}`
  );
  return response.data;
};
const getUserDisLikes = async (user_id, bio_id) => {
  if (!user_id || !bio_id) {
    return;
  }
  const response = await axios.get(
    `${baseUrl}/un-favorites/user-data/${user_id}/${bio_id}`
  );
  return response.data;
};
const getUserDisLikesList = async (token) => {
  if (!token) {
    return null;
  }
  const response = await axios.get(`${baseUrl}/un-favorites`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
const getUserDisLikesByWhoList = async (token) => {
  if (!token) {
    return null;
  }
  const response = await axios.get(`${baseUrl}/un-favorites/dislikes-who`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
export const DisLikesServices = {
  createDisLikes,
  getDisLikes,
  getUserDisLikes,
  getUserDisLikesList,
  getUserDisLikesByWhoList,
  checkDisLikes,
};
