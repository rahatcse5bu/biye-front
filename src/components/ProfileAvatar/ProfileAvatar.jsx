'use client';

import { useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { getGender, getProfilePhoto } from '../../utils/localStorage';

export default function ProfileAvatar({ className = '', iconClassName = '' }) {
  const [failedSrc, setFailedSrc] = useState(null);
  // TODO: female photos stay private, so they always get the icon.
  const photo = getGender() !== 'মহিলা' ? getProfilePhoto() : null;

  if (!photo || failedSrc === photo) {
    return <UserCircleIcon className={iconClassName} aria-hidden="true" />;
  }

  return (
    <img
      className={className}
      src={photo}
      alt="ব্যবহারকারীর প্রোফাইল"
      onError={() => setFailedSrc(photo)}
      // TODO: catches errors fired before hydration attached onError.
      ref={(img) => {
        if (img?.complete && img.naturalWidth === 0) setFailedSrc(photo);
      }}
    />
  );
}
