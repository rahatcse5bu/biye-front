export const setGenderToLocal = (gender) => {
  // console.log('set-gender', gender);
  localStorage.setItem('pnc-nikah-gender', gender);
};

export const getGender = () => {
  return localStorage.getItem('pnc-nikah-gender');
};

export const setProfilePhotoToLocal = (photoUrl) => {
  if (photoUrl) {
    localStorage.setItem('pnc-nikah-profile-photo', photoUrl);
  } else {
    localStorage.removeItem('pnc-nikah-profile-photo');
  }
};

export const getProfilePhoto = () => {
  return localStorage.getItem('pnc-nikah-profile-photo');
};

export const setReligionToLocal = (religion, religiousType) => {
  if (religion) {
    localStorage.setItem('pnc-nikah-religion', religion);
  } else {
    localStorage.removeItem('pnc-nikah-religion');
  }
  if (religiousType) {
    localStorage.setItem('pnc-nikah-religious-type', religiousType);
  } else {
    localStorage.removeItem('pnc-nikah-religious-type');
  }
};

export const getReligionInfo = () => {
  return {
    religion: localStorage.getItem('pnc-nikah-religion') || null,
    religiousType: localStorage.getItem('pnc-nikah-religious-type') || null,
  };
};

export const clearUserLocalStorage = () => {
  localStorage.removeItem('pnc-nikah-profile-photo');
  localStorage.removeItem('pnc-nikah-gender');
  localStorage.removeItem('pnc-nikah-religion');
  localStorage.removeItem('pnc-nikah-religious-type');
};
