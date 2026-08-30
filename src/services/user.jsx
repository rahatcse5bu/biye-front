import axios from '../utils/axios';

const googleAuth = async (payload) => {
  const { data } = await axios.post('/user-info/google-auth', payload);
  return data;
};

const register = async (payload) => {
  const { data } = await axios.post('/user-info/register', payload);
  return data;
};

const login = async (payload) => {
  const { data } = await axios.post('/user-info/login', payload);
  return data;
};

const changePassword = async (payload, token) => {
  const { data } = await axios.patch('/user-info/change-password', payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return data;
};

const getCurrentUser = async (token) => {
  const { data } = await axios.get('/user-info/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const verifyToken = async (token) => {
  const { data } = await axios.get(`/token/verify-token`, {
    headers: {
      Authorization: token,
    },
  });
  return data;
};

const createUserInfo = async (data) => {
  const generalInfo = await axios.post('/user-info', data);
  return generalInfo;
};

const getUserToken = async (tokenId) => {
  if (!tokenId) {
    return null;
  }
  const { data } = await axios.get('/token/create-token/' + tokenId);
  return data;
};

const getUserInfoByEmail = async (email) => {
  if (!email) {
    return null;
  }
  const { data } = await axios.get('/user-info/email/' + email);
  return data;
};

const getGeneralInfoByUserId = async (id) => {
  if (!id) {
    return null;
  }
  console.log(id);
  const { data } = await axios.get(`/general-info/${id}/user-id`);
  console.log(data);
  return data;
};

const createAddressInfo = async (data, token) => {
  const generalInfo = await axios.post('/address', data, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  return generalInfo.data;
};
const updateGeneralInfo = async (updatedData, token) => {
  if (!updatedData || !token) {
    return null;
  }
  const { data } = await axios.put(`/general-info`, updatedData, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  return data;
};
const updateAddressInfo = async (updatedData, token) => {
  if (!updatedData || !token) {
    return null;
  }
  const { data } = await axios.put(`/address`, updatedData, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  return data;
};

const getAddressInfoByUserId = async (id) => {
  if (!id) {
    return null;
  }
  // console.log(id);
  const { data } = await axios.get(`/address/${id}/user-id`);
  console.log(data);
  return data;
};

const updateEducationalQualification = async (updatedData, token) => {
  if (!updatedData || !token) {
    return null;
  }
  const { data } = await axios.put(`/educational-qualification`, updatedData, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  return data;
};
const updateFamilyInfo = async (updatedData, token) => {
  if (!updatedData || !token) {
    return null;
  }
  const { data } = await axios.put(`/family-status`, updatedData, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  return data;
};
const updatePersonalInfo = async (updatedData, token) => {
  if (!updatedData || !token) {
    return null;
  }
  const { data } = await axios.put(`/personal-info`, updatedData, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  return data;
};
const updateOccupation = async (updatedData, token) => {
  if (!updatedData || !token) {
    return null;
  }
  const { data } = await axios.put(`/occupation`, updatedData, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  return data;
};
const updateOngikarNama = async (updatedData, token) => {
  if (!updatedData || !token) {
    return null;
  }
  const { data } = await axios.put(`/ongikar-nama`, updatedData, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  return data;
};
const updateContact = async (updatedData, token) => {
  if (!updatedData || !token) {
    return null;
  }
  const { data } = await axios.put(`/contact`, updatedData, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  return data;
};
const updateExpectedLifePartner = async (updatedData, token) => {
  if (!updatedData || !token) {
    return null;
  }
  const { data } = await axios.put(`/expected-life-partner`, updatedData, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  return data;
};
const updateMaritalInfo = async (updatedData, token) => {
  if (!updatedData || !token) {
    return null;
  }
  const { data } = await axios.put(`/marital-info`, updatedData, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  return data;
};

const createEducationalQualification = async (data, token) => {
  const educationalQualification = await axios.post(
    '/educational-qualification',
    data,
    {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }
  );
  return educationalQualification.data;
};
const createFamilyInfo = async (data, token) => {
  const familyInfo = await axios.post('/family-status', data, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  return familyInfo.data;
};
const createPersonalInfo = async (data, token) => {
  const response = await axios.post('/personal-info', data, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
const createOccupation = async (data, token) => {
  const response = await axios.post('/occupation', data, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
const createOngikarNama = async (data, token) => {
  const response = await axios.post('/ongikar-nama', data, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
const createContact = async (data, token) => {
  const response = await axios.post('/contact', data, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
const createExpectedLifePartner = async (data, token) => {
  const response = await axios.post('/expected-life-partner', data, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
const createMaritalInfo = async (data, token) => {
  const response = await axios.post('/marital-info', data, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

const getEducationalQualificationByUserId = async (id) => {
  if (!id) {
    return null;
  }
  console.log(id);
  const { data } = await axios.get(`/educational-qualification/${id}/user-id`);
  console.log(data);
  return data;
};
const getFamilyInfoByUserId = async (id) => {
  if (!id) {
    return null;
  }
  console.log(id);
  const { data } = await axios.get(`/family-status/${id}/user-id`);
  console.log(data);
  return data;
};
const getPersonalInfoByUserId = async (id) => {
  if (!id) {
    return null;
  }
  console.log(id);
  const { data } = await axios.get(`/personal-info/${id}/user-id`);
  console.log(data);
  return data;
};
const getOccupationInfoByUserId = async (id) => {
  if (!id) {
    return null;
  }
  console.log(id);
  const { data } = await axios.get(`/occupation/${id}/user-id`);
  console.log(data);
  return data;
};
const getOngikarNamaByUserId = async (id) => {
  if (!id) {
    return null;
  }
  console.log(id);
  const { data } = await axios.get(`/ongikar-nama/${id}/user-id`);
  console.log(data);
  return data;
};
const getContactByUserId = async (id, token) => {
  if (!id) {
    return null;
  }
  console.log(id);
  const { data } = await axios.get(`/contact/${id}/user-id`, {
    headers: {
      Authorization: token,
    },
  });
  console.log(data);
  return data;
};
const getExpectedLifePartnerByUserId = async (id) => {
  if (!id) {
    return null;
  }
  console.log(id);
  const { data } = await axios.get(`/expected-life-partner/${id}/user-id`);
  console.log(data);
  return data;
};
const getMaritalInfoByUserId = async (id) => {
  if (!id) {
    return null;
  }
  console.log(id);
  const { data } = await axios.get(`/marital-info/${id}/user-id`);
  console.log(data);
  return data;
};

export const userServices = {
  googleAuth,
  register,
  login,
  changePassword,
  getCurrentUser,
  createUserInfo,
  getUserInfoByEmail,
  getGeneralInfoByUserId,
  getUserToken,
  getAddressInfoByUserId,
  updateGeneralInfo,
  updateAddressInfo,
  createAddressInfo,
  verifyToken,
  updateEducationalQualification,
  createEducationalQualification,
  getEducationalQualificationByUserId,
  createFamilyInfo,
  getFamilyInfoByUserId,
  updateFamilyInfo,
  getPersonalInfoByUserId,
  createPersonalInfo,
  updatePersonalInfo,
  getOccupationInfoByUserId,
  updateOccupation,
  createOccupation,
  getOngikarNamaByUserId,
  updateOngikarNama,
  createOngikarNama,
  getContactByUserId,
  createContact,
  updateContact,
  getExpectedLifePartnerByUserId,
  updateExpectedLifePartner,
  createExpectedLifePartner,
  getMaritalInfoByUserId,
  createMaritalInfo,
  updateMaritalInfo,
};
