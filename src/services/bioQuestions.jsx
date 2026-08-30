import axios from '../utils/axios';

const getQuestionsByUser = async (userId) => {
  const response = await axios.get(`/bio-questions/user/${userId}`);
  return response.data;
};

const getMyQuestions = async (token) => {
  if (!token) {
    return null;
  }
  const response = await axios.get('/bio-questions/my-questions');
  return response.data;
};

const upsertQuestions = async (questions, token) => {
  if (!token) {
    return null;
  }
  const response = await axios.post('/bio-questions', { questions });
  return response.data;
};

const deleteQuestions = async (token) => {
  if (!token) {
    return null;
  }
  const response = await axios.delete('/bio-questions');
  return response.data;
};

export const BioQuestionServices = {
  getQuestionsByUser,
  getMyQuestions,
  upsertQuestions,
  deleteQuestions,
};
