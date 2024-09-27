/* eslint-disable no-unused-vars */
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Tittle from './Title';
import NavBar from './Navbar';
import { Colors } from '../../constants/colors';
import { useEffect, useContext } from 'react';
import { getToken, removeToken } from '../../utils/cookies';
import UserContext from '../../contexts/UserContext';
import { Toast } from '../../utils/toast';
import { UserInfoServices } from '../../services/userInfo';
import { useQuery } from '@tanstack/react-query';
import AnalyticsService from '../../firebase/analyticsService';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { logOut, user } = useContext(UserContext);
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

  useEffect(() => {
    AnalyticsService.logEvent('page_view', {
      page_path: location.pathname,
      page_title: document.title,
      user_email: user?.email,
      user_name: user?.displayName,
    });
  }, [location]);

  // console.log('firebase~~', {
  //   page_path: location.pathname,
  //   page_title: document.title,
  //   user_email: user?.email ?? '',
  //   user_id: user?.displayName ?? '',
  // });

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
      import.meta.env.VITE_REACT_APP_NODE_ENV === 'production'
    ) {
      console.error('Error', error);
      logoutHandler();
      Toast.errorToast('logout');
      // Toast.errorToast(error?.response?.data?.error);
    }
  }, [isError, error]);

  useEffect(() => {
    Toast.tipsToast(
      'If you have any technical issues,please logout and login again'
    );
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
