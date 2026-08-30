import axios from '../utils/axios';

const getAchievementByUser = async (token) => {
  if (!token) return null;
  const { data } = await axios.get(`/achievement/token`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

const createAchievement = async (achievementData, token) => {
  if (!token) return null;
  const { data } = await axios.post(`/achievement`, achievementData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return data;
};

const updateAchievement = async (achievementData, token) => {
  if (!token) return null;
  const { data } = await axios.put(`/achievement`, achievementData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return data;
};

export const AchievementServices = {
  getAchievementByUser,
  createAchievement,
  updateAchievement,
};
