export const sendFirebaseError = (error) => {
  if (error.includes('auth/email-already-in-use')) {
    return 'auth/email-already-in-use';
  }

  return error;
};
