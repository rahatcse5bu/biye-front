import axios from 'axios';

const baseUrl =
  import.meta.env.VITE_REACT_APP_NODE_ENV === 'development'
    ? 'http://localhost:5000/api/v1'
    : 'https://server.pncnikah.com/api/v1';

const getQuestionsByUser = async (userId) => {
  const response = await axios.get(
    `${baseUrl}/bio-questions/user/${userId}`
  );
  return response.data;
};

const getMyQuestions = async (token) => {
  if (!token) {
    return null;
  }
  const response = await axios.get(`${baseUrl}/bio-questions/my-questions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const upsertQuestions = async (questions, token) => {
  if (!token) {
    return null;
  }
  const response = await axios.post(
    `${baseUrl}/bio-questions`,
    { questions },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

const deleteQuestions = async (token) => {
  if (!token) {
    return null;
  }
  const response = await axios.delete(`${baseUrl}/bio-questions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const BioQuestionServices = {
  getQuestionsByUser,
  getMyQuestions,
  upsertQuestions,
  deleteQuestions,
};
