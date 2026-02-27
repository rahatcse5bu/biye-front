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
