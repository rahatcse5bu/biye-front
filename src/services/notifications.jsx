import Ably from 'ably';
import api from '../utils/axios';

export const notificationService = {
  list: async () => {
    const response = await api.get('/notifications?limit=30');
    return response.data?.data || [];
  },

  unreadCount: async () => {
    const response = await api.get('/notifications/unread-count');
    return response.data?.data?.count || 0;
  },

  markRead: async (id) => {
    await api.patch(`/notifications/${id}/read`);
  },

  markAllRead: async () => {
    await api.patch('/notifications/read-all');
  },

  createRealtimeClient: () =>
    new Ably.Realtime({
      authCallback: async (_params, callback) => {
        try {
          const response = await api.get('/notifications/ably-token');
          callback(null, response.data?.data);
        } catch (error) {
          callback(error, null);
        }
      },
    }),
};
