import { useState } from 'react';
import { userServices } from '../services/user';
import { getToken } from '../utils/cookies';

const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const changePassword = async (currentPassword, newPassword) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = getToken()?.token;
      if (!token) {
        throw new Error('User not authenticated.');
      }

      await userServices.changePassword(
        { currentPassword, newPassword },
        token
      );
      setSuccess(true);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          'Password could not be changed.'
      );
    } finally {
      setLoading(false);
    }
  };

  return { changePassword, loading, error, success };
};

export default useChangePassword;
