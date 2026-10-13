import axios from 'axios';
import { getToken } from './cookies';
import { baseUrl } from './url';

const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.request.use(
  (config) => {
    const token = getToken()?.token;

    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const BIODATA_STAGED_EVENT = 'biye:biodata-staged';

api.interceptors.response.use(
  (response) => {
    // TODO: a save to a published biodata was held for review; the revision banner listens and refreshes.
    if (response?.data?.pending_review && typeof window !== 'undefined') {
      window.dispatchEvent(new Event(BIODATA_STAGED_EVENT));
    }
    return response;
  },
  (error) => Promise.reject(error)
);

export { api };
export default api;
