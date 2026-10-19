import { SITE_URL } from '@/lib/seo';
import axios from '../utils/axios';

const getSettings = async () => (await axios.get('/featured-requests/settings')).data.data;

const getMine = async () => (await axios.get('/featured-requests/me')).data.data;

// TODO: the server sets the amount from the admin price; bKash returns to /pay, which confirms it.
const checkout = async () => {
  const callbackURL = `${SITE_URL}/pay?purpose=featured&pathname=/user/account/featured`;
  return (await axios.post('/featured-requests/checkout', { callbackURL })).data.data;
};

export const FeaturedRequestServices = { getSettings, getMine, checkout };
