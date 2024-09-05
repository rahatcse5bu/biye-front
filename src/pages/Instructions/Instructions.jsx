// Instructions.jsx
import React from 'react';
import { Colors } from '../../constants/colors';
import { Link } from 'react-router-dom';
import YouTubeEmbed from '../../components/YouTubeEmbed/YouTubeEmbed';

const Instructions = () => {
  const instructions = [
    {
      id: 'NXNa1NAvMbI',
      title: 'PNC নিকাহতে মোবাইল দিয়ে কিভাবে পাত্রীর বায়োডাটা ফ্রীতে দিতে হয়?',
      step: '1. PNC নিকাহতে মোবাইল দিয়ে কিভাবে পাত্রীর বায়োডাটা ফ্রীতে দিতে হয়?',
    },
    {
      id: '26Kj5LuD2DY',
      title: 'PNC নিকাহ তে কিভাবে পাত্রের বায়োডাটা দিতে হয়?',
      step: '2. PNC নিকাহতে ল্যাপটপ দিয়ে কিভাবে পাত্রীর বায়োডাটা ফ্রীতে দিতে হয়?',
    },
    {
      id: 'X6sjWCZjiuQ',
      title:
        'Bio-data purchase 1st step || বায়োডাটা ক্রয় প্রথম পদক্ষেপ || PNC NIkah',
      step: '3. বায়োডাটা ক্রয় প্রথম পদক্ষেপ ',
    },
    {
      id: 'x0-RXTR0DfQ',
      title:
        'Bio-data purchase second step || বায়োডাটা ক্রয় দ্বিতীয় পদক্ষেপ || PNC NIkah',
      step: '4. বায়োডাটা ক্রয় দ্বিতীয় পদক্ষেপ ',
    },
  ];

  return (
    <div className="max-w-2xl mx-auto mt-5 mb-8 px-4">
      <Link
        to="/user/account/edit-biodata"
        className="block w-full text-left underline text-green-600 font-semibold ml-2"
        aria-label="Edit biodata"
      >
        বায়োডাটা তৈরি করুন
      </Link>

      <h1
        className="text-3xl font-semibold mb-4"
        style={{ color: Colors.titleText }}
      >
        নির্দেশনা সমুহ
      </h1>

      <h4
        className="text-xl font-semibold mb-4 ml-2"
        style={{ color: Colors.titleText }}
      >
        PNC নিকাহ তে কিভাবে পাত্রের বায়োডাটা দিতে হয়? How to create
        bridegroom&apos;s biodata on PNC Nikah for free || PNC Nikah
      </h4>
      <hr />
      <br />

      {instructions.map((item, index) => (
        <div key={index}>
          <h6
            className="text-xl font-semibold text-left mb-4 ml-2"
            style={{ color: Colors.titleText }}
          >
            {item.step}
          </h6>
          <YouTubeEmbed videoId={item.id} title={item.title} />
        </div>
      ))}
    </div>
  );
};

export default Instructions;
