import axios from "../utils/axios.config";

export const ReactionsServices = {
  // Toggle reaction
  toggleReaction: async (token, bioUser, reactionType) => {
    const { data } = await axios.post(
      "/reactions/toggle",
      {
        bio_user: bioUser,
        reaction_type: reactionType,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    return data;
  },

  // Get user's reaction for a biodata
  getUserReaction: async (token, bioUser) => {
    const { data } = await axios.get(`/reactions/user-reaction/${bioUser}`, {
      headers: {
        authorization: token,
      },
    });
    return data;
  },

  // Get my reactions list (with optional type filter)
  getMyReactionsList: async (token, reactionType = null) => {
    const url = reactionType
      ? `/reactions/my-reactions?reaction_type=${reactionType}`
      : "/reactions/my-reactions";
    const { data } = await axios.get(url, {
      headers: {
        authorization: token,
      },
    });
    return data;
  },

  // Get reactions to my biodata (with optional type filter)
  getReactionsToMe: async (token, reactionType = null) => {
    const url = reactionType
      ? `/reactions/reactions-to-me?reaction_type=${reactionType}`
      : "/reactions/reactions-to-me";
    const { data } = await axios.get(url, {
      headers: {
        authorization: token,
      },
    });
    return data;
  },

  // Get reaction counts for a biodata
  getReactionCounts: async (bioUser) => {
    const { data } = await axios.get(`/reactions/counts/${bioUser}`);
    return data;
  },

  // Get all reactions (admin)
  getAllReactions: async (token) => {
    const { data } = await axios.get("/reactions/all", {
      headers: {
        authorization: token,
      },
    });
    return data;
  },
};
