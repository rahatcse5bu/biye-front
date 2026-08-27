const getStorage = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage;
};

export const setGenderToLocal = (gender) => {
  getStorage()?.setItem('pnc-nikah-gender', gender);
};

export const getGender = () => {
  return getStorage()?.getItem('pnc-nikah-gender') || null;
};

export const setProfilePhotoToLocal = (photoUrl) => {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  if (photoUrl) {
    storage.setItem('pnc-nikah-profile-photo', photoUrl);
  } else {
    storage.removeItem('pnc-nikah-profile-photo');
  }
};

export const getProfilePhoto = () => {
  return getStorage()?.getItem('pnc-nikah-profile-photo') || null;
};

export const setReligionToLocal = (religion, religiousType) => {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  if (religion) {
    storage.setItem('pnc-nikah-religion', religion);
  } else {
    storage.removeItem('pnc-nikah-religion');
  }

  if (religiousType) {
    storage.setItem('pnc-nikah-religious-type', religiousType);
  } else {
    storage.removeItem('pnc-nikah-religious-type');
  }
};

export const getReligionInfo = () => {
  const storage = getStorage();

  return {
    religion: storage?.getItem('pnc-nikah-religion') || null,
    religiousType: storage?.getItem('pnc-nikah-religious-type') || null,
  };
};

export const clearUserLocalStorage = () => {
  const storage = getStorage();

  storage?.removeItem('pnc-nikah-profile-photo');
  storage?.removeItem('pnc-nikah-gender');
  storage?.removeItem('pnc-nikah-religion');
  storage?.removeItem('pnc-nikah-religious-type');
};
