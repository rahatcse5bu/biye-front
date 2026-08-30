/* eslint-disable no-unused-vars */
import { Link, useNavigate } from '@/lib/navigation';

import Tittle from './Title';
import NavBar from './Navbar';
import { Colors } from '../../constants/colors';
import { useEffect, useContext } from 'react';
import { getToken, removeToken } from '../../utils/cookies';
import UserContext from '../../contexts/UserContext';
import { Toast } from '../../utils/toast';
import { UserInfoServices } from '../../services/userInfo';
import { useQuery } from '@tanstack/react-query';

const Header = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(UserContext);
  // console.log('user~~', user);

  const {
    data: tokenData,
    isError,
    error,
  } = useQuery({
    queryKey: ['user-info', getToken()?.token],
    queryFn: async () => {
      return await UserInfoServices.verifyTokenByUser(getToken()?.token);
    },
    retry: false,
    enabled: !!getToken()?.token,
  });

  // console.log('error~~', error);

  const logoutHandler = async () => {
    await logOut();
    removeToken();
    // navigate('/');
    window.location.href = '/';
  };

  // console.log("user~~", user);

  useEffect(() => {
    if (
      isError &&
      error &&
      getToken()?.token &&
      process.env.NODE_ENV === 'production'
    ) {
      console.error('Error', error);
      logoutHandler();
      Toast.errorToast('logout');
      // Toast.errorToast(error?.response?.data?.error);
    }
  }, [isError, error]);

  useEffect(() => {
    // Removed technical issues toast
  }, []);

  const elementStyle = {
    backgroundColor: Colors.secondary,
    color: Colors.textColor,
  };
  return (
    <>
      <NavBar />
    </>
  );
};

export default Header;
