import React from 'react';
import { Colors } from '../../../constants/colors';

const IslamicQuote = () => {
  return (
    <div className="home-desc border border-gray-300 rounded-xl py-4 md:py-8">
      <p className="text-xl content md:text-2xl lg:text-3xl">
        যে ব্যক্তি বিয়ে করলো সে তার অর্ধেক দ্বীন পূর্ণ করে ফেললো। বাকি অর্ধেকের
        জন্য সে আল্লাহকে ভয় করুক।
      </p>
      <p
        style={{
          color: Colors.titleText,
        }}
        className="text-sm ref md:text-xl lg:text-2xl"
      >
        (বায়হাকী, শু&rsquo;আবুল ঈমান - ৫৪৮৬)
      </p>
    </div>
  );
};

export default IslamicQuote;
