import { useQueryClient } from '@tanstack/react-query';
import { createContext, useEffect, useState } from 'react';
import { userServices } from '../services/user';
import { getToken, removeToken } from '../utils/cookies';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [tokenInfo, setTokenInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    let isActive = true;

    const clearAuth = (clearQueries = false) => {
      removeToken();
      setUser(null);
      setUserInfo(null);
      setTokenInfo(null);
      if (clearQueries) queryClient.clear();
    };

    const restoreUser = async () => {
      try {
        const token = getToken()?.token;

        if (!token) {
          clearAuth();
          return;
        }

        const response = await userServices.getCurrentUser(token);
        const currentUser = response?.data;

        if (!response?.success || !currentUser?.email) {
          throw new Error('Invalid authentication session');
        }

        if (isActive) {
          setUser(currentUser);
          setUserInfo(response);
          setTokenInfo({ token });
        }
      } catch {
        if (isActive) {
          clearAuth(true);
        }
      } finally {
        if (isActive) {
          setUserLoading(false);
        }
      }
    };

    restoreUser();

    return () => {
      isActive = false;
    };
  }, [queryClient]);

  const logOut = async () => {
    setUserLoading(true);
    removeToken();
    setUser(null);
    setUserInfo(null);
    setTokenInfo(null);
    queryClient.clear();
    setUserLoading(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        logOut,
        userLoading,
        setUserLoading,
        setUser,
        userInfo,
        tokenInfo,
        setTokenInfo,
        setUserInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
