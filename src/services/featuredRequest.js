import { SITE_URL } from '@/lib/seo';
import axios from '../utils/axios';

const getSettings = async () => (await axios.get('/featured-requests/settings')).data.data;

const getMine = async () => (await axios.get('/featured-requests/me')).data.data;

// TODO: the server sets the amount from the admin price; bKash returns to /pay, which confirms it.
const checkout = async () => {
  const callbackURL = `${SITE_URL}/pay?purpose=featured&pathname=/user/account/featured`;
  return (await axios.post('/featured-requests/checkout', { callbackURL })).data.data;
};

const sendTrack = (biodata_ids, event) =>
  axios.post('/featured-requests/track', { biodata_ids, event }).catch(() => {});

// TODO: impressions are counted once per page load per biodata and sent in one batch.
const seenImpressions = new Set();
let pendingImpressions = [];
let flushTimer = null;
const trackImpression = (biodataId) => {
  if (!biodataId || seenImpressions.has(biodataId)) return;
  seenImpressions.add(biodataId);
  pendingImpressions.push(biodataId);
  clearTimeout(flushTimer);
  flushTimer = setTimeout(() => {
    sendTrack(pendingImpressions, 'impression');
    pendingImpressions = [];
  }, 1000);
};

const trackClick = (biodataId) => {
  if (biodataId) sendTrack([biodataId], 'click');
};

export const FeaturedRequestServices = { getSettings, getMine, checkout, trackImpression, trackClick };
