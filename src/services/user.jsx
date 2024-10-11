import axios from 'axios';
const baseUrl =
  import.meta.env.VITE_REACT_APP_NODE_ENV === 'development'
    ? 'http://localhost:5000/api/v1'
    : 'https://server.pncnikah.com/api/v1';

// console.log(baseUrl);

const verifyToken = async (token) => {
  const { data } = await axios.get(baseUrl + `/token/verify-token`, {
    headers: {
      Authorization: token,
    },
  });
  return data;
};

const createUserInfo = async (data) => {
  const generalInfo = await axios.post(baseUrl + '/user-info', data);
  return generalInfo;
};

const createUserInfoForGoogleSignIn = async (data, token = '') => {
  const generalInfo = await axios.post(
    baseUrl + '/user-info/create-login-user',
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return generalInfo;
};

const getUserToken = async (tokenId) => {
  if (!tokenId) {
    return null;
  }
  const { data } = await axios.get(baseUrl + '/token/create-token/' + tokenId);
  return data;
};

const getUserInfoByEmail = async (email) => {
  if (!email) {
    return null;
  }
  const { data } = await axios.get(baseUrl + '/user-info/email/' + email);
  return data;
};

const getGeneralInfoByUserId = async (id) => {
  if (!id) {
    return null;
  }
  console.log(id);
  const { data } = await axios.get(baseUrl + `/general-info/${id}/user-id`);
  console.log(data);
  return data;
};

const createAddressInfo = async (data, token) => {
  const generalInfo = await axios.post(baseUrl + '/address', data, {
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
  const { data } = await axios.put(baseUrl + `/general-info`, updatedData, {
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
  const { data } = await axios.put(baseUrl + `/address`, updatedData, {
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
  const { data } = await axios.get(baseUrl + `/address/${id}/user-id`);
  console.log(data);
  return data;
};

const updateEducationalQualification = async (updatedData, token) => {
  if (!updatedData || !token) {
    return null;
  }
  const { data } = await axios.put(
    baseUrl + `/educational-qualification`,
    updatedData,
    {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }
  );
  return data;
};
const updateFamilyInfo = async (updatedData, token) => {
  if (!updatedData || !token) {
    return null;
  }
  const { data } = await axios.put(baseUrl + `/family-status`, updatedData, {
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
  const { data } = await axios.put(baseUrl + `/personal-info`, updatedData, {
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
  const { data } = await axios.put(baseUrl + `/occupation`, updatedData, {
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
  const { data } = await axios.put(baseUrl + `/ongikar-nama`, updatedData, {
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
  const { data } = await axios.put(baseUrl + `/contact`, updatedData, {
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
  const { data } = await axios.put(
    baseUrl + `/expected-life-partner`,
    updatedData,
    {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }
  );
  return data;
};
const updateMaritalInfo = async (updatedData, token) => {
  if (!updatedData || !token) {
    return null;
  }
  const { data } = await axios.put(baseUrl + `/marital-info`, updatedData, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  return data;
};

const createEducationalQualification = async (data, token) => {
  const educationalQualification = await axios.post(
    baseUrl + '/educational-qualification',
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
  const familyInfo = await axios.post(baseUrl + '/family-status', data, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  return familyInfo.data;
};
const createPersonalInfo = async (data, token) => {
  const response = await axios.post(baseUrl + '/personal-info', data, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
const createOccupation = async (data, token) => {
  const response = await axios.post(baseUrl + '/occupation', data, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
const createOngikarNama = async (data, token) => {
  const response = await axios.post(baseUrl + '/ongikar-nama', data, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
const createContact = async (data, token) => {
  const response = await axios.post(baseUrl + '/contact', data, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
const createExpectedLifePartner = async (data, token) => {
  const response = await axios.post(baseUrl + '/expected-life-partner', data, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
const createMaritalInfo = async (data, token) => {
  const response = await axios.post(baseUrl + '/marital-info', data, {
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
  const { data } = await axios.get(
    baseUrl + `/educational-qualification/${id}/user-id`
  );
  console.log(data);
  return data;
};
const getFamilyInfoByUserId = async (id) => {
  if (!id) {
    return null;
  }
  console.log(id);
  const { data } = await axios.get(baseUrl + `/family-status/${id}/user-id`);
  console.log(data);
  return data;
};
const getPersonalInfoByUserId = async (id) => {
  if (!id) {
    return null;
  }
  console.log(id);
  const { data } = await axios.get(baseUrl + `/personal-info/${id}/user-id`);
  console.log(data);
  return data;
};
const getOccupationInfoByUserId = async (id) => {
  if (!id) {
    return null;
  }
  console.log(id);
  const { data } = await axios.get(baseUrl + `/occupation/${id}/user-id`);
  console.log(data);
  return data;
};
const getOngikarNamaByUserId = async (id) => {
  if (!id) {
    return null;
  }
  console.log(id);
  const { data } = await axios.get(baseUrl + `/ongikar-nama/${id}/user-id`);
  console.log(data);
  return data;
};
const getContactByUserId = async (id, token) => {
  if (!id) {
    return null;
  }
  console.log(id);
  const { data } = await axios.get(baseUrl + `/contact/${id}/user-id`, {
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
  const { data } = await axios.get(
    baseUrl + `/expected-life-partner/${id}/user-id`
  );
  console.log(data);
  return data;
};
const getMaritalInfoByUserId = async (id) => {
  if (!id) {
    return null;
  }
  console.log(id);
  const { data } = await axios.get(baseUrl + `/marital-info/${id}/user-id`);
  console.log(data);
  return data;
};

export const userServices = {
  createUserInfo,
  createUserInfoForGoogleSignIn,
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
