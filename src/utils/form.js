export const getDataFromRange = (data) => {
  const responseData = `${data?.min}-${data?.max}`;
  return responseData;
};
export const dataToRange = (data) => {
  if (!data) {
    return {
      min: 5,
      max: 6,
    };
  }
  const temp = data.split("-");
  return {
    min: Number(temp[0]),
    max: Number(temp[1]),
  };
};

export const getDataFromMultipleInputExpectedPartner = (data) => {
  let responseData = [];
  data.forEach((item) => {
    responseData.push(item.value);
  });
  return responseData;
};
export const getDataFromMultipleInput = (data) => {
  let responseData = "";
  data.forEach((item, index) => {
    responseData += item.value;
    if (index < data.length - 1) {
      responseData += ",";
    }
  });
  return responseData;
};

export const dataToMultipleExpectedPartner = (data = []) => {
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }
  const responseData = [];
  data.forEach((item) => {
    responseData.push({
      value: item,
      label: item,
    });
  });
  return responseData;
};
export const dataToMultiple = (data) => {
  if (!data) {
    return [];
  }
  const temp = data.split(",");
  const responseData = [];
  temp.forEach((item) => {
    responseData.push({
      value: item,
      label: item,
    });
  });
  return responseData;
};
