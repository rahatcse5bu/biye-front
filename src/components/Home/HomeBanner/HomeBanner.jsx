import React from 'react';
import { Colors } from '../../../constants/colors';

// eslint-disable-next-line react/prop-types
const HomeBanner = ({ content }) => {
  return (
    <div>
      <div className="pt-6 text-3xl font-bold home-titlee md:text-4xl lg:text-5xl">
        <h1>{content?.title1 || 'বাংলাদেশী ইসলামিক'}</h1>
        <h1>
          ম্যাট্রিমনি{' '}
          <span
            style={{
              color: Colors.titleText,
            }}
            className="font-bold text-4xl"
          >
            বিয়ে
          </span>
        </h1>
      </div>
      <div className="mt-4 mb-4 text-3xl home-subtitlee md:text-4xl lg:text-5xl">
        <h3>{content?.subtitle || 'আপনার নিজ উপজেলায় দ্বীনদার পাত্রপাত্রী খুঁজুন খুব সহজে'}</h3>
      </div>
    </div>
  );
};

export default HomeBanner;
