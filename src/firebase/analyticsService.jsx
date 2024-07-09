// src/analyticsService.js

import { logEvent, setUserId, setUserProperties } from "firebase/analytics";
import { analytics } from "./app";

const AnalyticsService = {
  logEvent: (eventName, eventParams) => {
    logEvent(analytics, eventName, eventParams);
  },
  setUserId: (userId) => {
    setUserId(analytics, userId);
  },
  setUserProperties: (properties) => {
    setUserProperties(analytics, properties);
  },
};

export default AnalyticsService;
