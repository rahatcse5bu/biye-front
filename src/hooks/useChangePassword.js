import { useContext, useState } from 'react';
import UserContext from '../contexts/UserContext';
import { userServices } from '../services/user';
import { getToken, setToken } from '../utils/cookies';

const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { setTokenInfo } = useContext(UserContext);

  const changePassword = async (currentPassword, newPassword) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = getToken()?.token;
      if (!token) {
        throw new Error('User not authenticated.');
      }

      const response = await userServices.changePassword(
        { currentPassword, newPassword },
        token
      );
      // TODO: the old token is revoked by the password change, so swap in the new one.
      const nextToken = response?.data?.token;
      if (nextToken) {
        setToken({ token: nextToken });
        setTokenInfo({ token: nextToken });
      }
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
