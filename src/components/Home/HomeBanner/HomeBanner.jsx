import React from 'react';
import { Colors } from '../../../constants/colors';

const HomeBanner = () => {
  return (
    <div>
      <div className="pt-6 text-3xl font-bold home-titlee md:text-4xl lg:text-5xl">
        <h1>বাংলাদেশী ইসলামিক</h1>
        <h1>
          ম্যাট্রিমনি{' '}
          <span
            style={{
              color: Colors.titleText,
            }}
            className="font-bold text-4xl"
          >
            PNC নিকাহ
          </span>
        </h1>
      </div>
      <div className="mt-4 mb-4 text-3xl home-subtitlee md:text-4xl lg:text-5xl">
        <h3>আপনার নিজ উপজেলায় দ্বীনদার পাত্রপাত্রী খুঁজুন খুব সহজে</h3>
      </div>
    </div>
  );
};

export default HomeBanner;
