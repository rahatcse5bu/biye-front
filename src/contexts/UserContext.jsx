/* eslint-disable react/prop-types */
// src/contexts/UserContext.js
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  updatePassword,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/app.jsx';

// Create a new context instance
const UserContext = createContext();

// Create a provider component to wrap your app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [tokenInfo, setTokenInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const googleProvider = new GoogleAuthProvider();

  // const {
  //   data: userInfo = null,
  //   isLoading: userInfoFetchLoading,
  //   refetch: userInfoRefetch,
  // } = useQuery({
  //   queryKey: ["user-info", user?.email],
  //   queryFn: async () => {
  //     return await userServices.getUserInfoByEmail(user?.email);
  //   },
  //   retry: false,
  //   enabled: !!user?.email,
  // });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserLoading(false);
      // console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleGoogleSignIn = () => {
    setUserLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const createUser = (email, password) => {
    setUserLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setUserLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  const updateUserPassword = (password) => {
    return updatePassword(auth.currentUser, password);
  };

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const logOut = () => {
    setUserLoading(true);
    setUser(null);
    return signOut(auth);
  };

  // console.log({ userInfo });
  // console.log({ tokenInfo });

  return (
    <UserContext.Provider
      value={{
        user,
        updateUserPassword,
        createUser,
        handleGoogleSignIn,
        updateUserProfile,
        signIn,
        forgotPassword,
        logOut,
        userLoading,
        setUserLoading,
        setUser,
        userInfo,
        tokenInfo,
        setTokenInfo,
        setUserInfo,
        // userInfoRefetch,
        // userInfoFetchLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
