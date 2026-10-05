import axios from '../utils/axios';

const getSidebarCounts = async () => {
  const response = await axios.get('/account/sidebar-counts');
  return response.data?.data || {};
};

export const AccountServices = {
  getSidebarCounts,
};
