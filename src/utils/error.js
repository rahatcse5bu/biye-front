export const getErrorMessage = (error) => {
  let msg =
    error?.response?.data?.message || error?.message || 'Something went wrong';
  return msg;
};
