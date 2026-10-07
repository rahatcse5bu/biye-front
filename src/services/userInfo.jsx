import axios from '../utils/axios';

const getUserInfoStatus = async (bioId) => {
  if (!bioId) {
    return null;
  }
  const response = await axios.get(`/user-info/status/${bioId}`);
  return response.data;
};
const getAllUsersInfoId = async (token) => {
  if (!token) {
    return null;
  }
  const response = await axios.get(`/user-info/all-users-id`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
const verifyTokenByUser = async (token) => {
  if (!token) {
    return null;
  }
  const response = await axios.get(`/user-info/verify-token`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
const updateUserInfo = async (data, token) => {
  if (!token) {
    return null;
  }
  const response = await axios.put(`/user-info`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
const updateUserStatusByUser = async (data, token) => {
  if (!token) {
    return null;
  }
  const response = await axios.put(`/user-info/update-status`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// TODO: saves the header religion filter on the logged-in account.
const updateMyPreferences = async (preferredReligion) => {
  const response = await axios.patch('/user-info/me/preferences', {
    preferred_religion: preferredReligion,
  });
  return response.data;
};

export const UserInfoServices = {
  updateMyPreferences,
  getUserInfoStatus,
  updateUserInfo,
  verifyTokenByUser,
  getAllUsersInfoId,
  updateUserStatusByUser,
};
