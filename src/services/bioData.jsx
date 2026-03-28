import axios from 'axios';
import { convertToQuery } from '../utils/query';
import axiosInstance from '../utils/axios';
const baseUrl =
  import.meta.env.VITE_REACT_APP_NODE_ENV === 'development'
    ? 'http://localhost:5000/api/v1'
    : 'https://server.pncnikah.com/api/v1';

const getAllDivisions = async () => {
  const response = await axios.get('/divisions.json');
  //console.log(response);
  return response.data;
};

const getAllDistricts = async (division) => {
  const res1 = await axios.get('/divisions.json');
  const divisions = res1?.data;
  const resp2 = await axios.get('/districts.json');
  const districts = resp2?.data;
  if (!division) {
    return districts;
  }
  const findDivision = divisions?.find((d) => d.value === division);
  //console.log(findDivision);
  const divisionId = findDivision?.id;
  //console.log(divisionId);
  const filteredDistricts = districts?.filter(
    (d) => d.division_id === divisionId
  );
  //console.log(filteredDistricts);
  return filteredDistricts;
};

const getAllUpzilla = async (district) => {
  const res1 = await axios.get('/upzila.json');
  const upzillas = res1?.data;
  const resp2 = await axios.get('/districts.json');
  const districts = resp2?.data;
  if (!district) {
    return upzillas;
  }
  const findDistrict = districts?.find((d) => d.value === district);
  //console.log(findDistrict);
  const districtId = findDistrict?.id;
  //console.log(districtId);
  const filteredUpzillas = upzillas?.filter(
    (d) => d.district_id === districtId
  );
  //console.log(filteredUpzillas);
  return filteredUpzillas;
};

const getALLGeneralInfo = async (query) => {
  const queryString = convertToQuery(query);
  // console.log(
  //   '🚀 ~ file: bioData.jsx:55 ~ getALLGeneralInfo ~ queryString:',
  //   queryString
  // );

  const generalInfo = await axios.get(baseUrl + `/general-info?${queryString}`);
  return generalInfo.data;
};

const getALLUnverifiedBiodatas = async (query) => {
  const queryString = convertToQuery(query);
  const unverifiedBiodatas = await axios.get(
    baseUrl + `/unverified-biodatas?${queryString}`
  );
  return unverifiedBiodatas.data;
};

const getALLBiodatas = async (query) => {
  // Fetch verified and unverified independently so one failure doesn't block the other
  const [verifiedResult, unverifiedResult] = await Promise.allSettled([
    axios.get(baseUrl + `/general-info?${convertToQuery(query)}`),
    axios.get(baseUrl + `/unverified-biodatas?${convertToQuery(query)}`),
  ]);

  const verifiedData = verifiedResult.status === 'fulfilled' ? verifiedResult.value.data : null;
  const unverifiedData = unverifiedResult.status === 'fulfilled' ? unverifiedResult.value.data : null;

  // If verified completely failed, throw so the UI shows an error
  if (!verifiedData) throw verifiedResult.reason;

  const verifiedBiodatas = (verifiedData?.data || []).map((bio) => ({
    ...bio,
    is_unverified: false,
  }));

  const unverifiedBiodatas = (unverifiedData?.data || []).map((bio) => ({
    ...bio,
    is_unverified: true,
  }));

  const combined = [...verifiedBiodatas, ...unverifiedBiodatas].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const total =
    (verifiedData?.size || verifiedData?.meta?.total || 0) +
    (unverifiedData?.meta?.total || unverifiedData?.size || 0);

  return {
    success: true,
    data: combined,
    size: total,
    page: verifiedData?.page || query?.page || 1,
    limit: verifiedData?.limit || query?.limit || 12,
  };
};

const getBioData = async (id) => {
  try {
    // Try to fetch verified biodata first (by user_id)
    const { data } = await axios.get(baseUrl + '/bio-data/' + Number(id));
    return { ...data, is_unverified: false };
  } catch (error) {
    // If not found, try to fetch as unverified biodata (by biodata _id)
    try {
      const { data } = await axios.get(baseUrl + `/unverified-biodatas/${id}`);
      return { ...data, is_unverified: true };
    } catch (unverifiedError) {
      // If both fail, throw the original error
      throw error;
    }
  }
};

const createGeneralInfo = async (data, token) => {
  const generalInfo = await axios.post(baseUrl + '/general-info', data, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  });
  return generalInfo.data;
};

const getBioDataStatistics = async (id) => {
  if (!id) {
    return null;
  }
  const bioData = await axios.get(
    baseUrl + `/bio-choice-data/statistics/${id}`
  );
  return bioData.data;
};
const getAllBioDataStats = async () => {
  const bioData = await axiosInstance.get(`/bio-data/stats`);
  return bioData.data;
};

export const BioDataServices = {
  getALLGeneralInfo,
  getALLUnverifiedBiodatas,
  getALLBiodatas,
  getBioData,
  getAllDivisions,
  getAllDistricts,
  getAllUpzilla,
  createGeneralInfo,
  getBioDataStatistics,
  getAllBioDataStats,
};
