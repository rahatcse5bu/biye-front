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
import useVisibilityChange from '../../hooks/useVisibilityChange';
import { setupNotifications } from '../../firebase/app';
import {
  sendNativeNotification,
  toastNotification,
} from '../../utils/notificationHelpers';

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
    AnalyticsService.logEvent(
      `page_view-${location.pathname}-${document.title}`,
      {
        page_path: location.pathname,
        page_title: document.title,
        user_email: user?.email,
        user_name: user?.displayName,
      }
    );
  }, [location]);
  const isForeground = useVisibilityChange();
  useEffect(() => {
    setupNotifications((message) => {
      if (isForeground) {
        // App is in the foreground, show toast notification
        toastNotification({
          title: 'anis molla',
          description: 'ania saklsldas kjksdads',
          status: 'info',
        });
      } else {
        // App is in the background, show native notification
        sendNativeNotification({
          title: 'anis2',
          body: 'anis anis anis',
        });
      }
    });
  }, []);

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
