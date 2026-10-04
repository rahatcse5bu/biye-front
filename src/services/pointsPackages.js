import api from '../utils/axios';

export const pointsPackageService = {
  list: async () => {
    const response = await api.get('/points-packages');
    return response.data?.data || [];
  },
};
