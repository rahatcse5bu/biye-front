export const convertToQuery = (query = {}) => {
  let queryString = '';

  if (!Object.values(query).length) {
    return '';
  }

  Object.keys(query).forEach((key, index) => {
    if (query[key]) {
      queryString += `${key}=${query[key]}`;
      if (index < Object.keys(query).length - 1) {
        queryString += '&';
      }
    }
  });

  return queryString;
};
