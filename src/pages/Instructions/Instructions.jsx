// Instructions.jsx
import React from 'react';
import { Colors } from '../../constants/colors';
import { Link } from 'react-router-dom';
import YouTubeEmbed from '../../components/YouTubeEmbed/YouTubeEmbed';

const Instructions = () => {
  const instructions = [
    {
      id: 'czYI7NaHymg',
      title: 'বিয়ে এর ব্যতিক্রমী ফিচারসমূহ',
      step: 'বিয়ে এর ব্যতিক্রমী ফিচারসমূহ',
    },
    {
      id: 'NXNa1NAvMbI',
      title: 'বিয়েতে মোবাইল দিয়ে কিভাবে পাত্রীর বায়োডাটা ফ্রীতে দিতে হয়?',
      step: 'বিয়েতে মোবাইল দিয়ে কিভাবে পাত্রীর বায়োডাটা ফ্রীতে দিতে হয়?',
    },
    {
      id: '26Kj5LuD2DY',
      title: 'বিয়ে তে কিভাবে পাত্রের বায়োডাটা দিতে হয়?',
      step: 'বিয়েতে ল্যাপটপ দিয়ে কিভাবে পাত্রীর বায়োডাটা ফ্রীতে দিতে হয়?',
    },
    {
      id: 'X6sjWCZjiuQ',
      title:
        'Send Request || অনুরোধ পাঠান || PNC NIkah',
      step: 'অনুরোধ পাঠানোর নিয়ম ',
    },
    {
      id: 'x0-RXTR0DfQ',
      title:
        'Contact Info Request || যোগাযোগ তথ্য অনুরোধ || PNC NIkah',
      step: 'যোগাযোগ তথ্য অনুরোধের নিয়ম ',
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
        বিয়ে তে কিভাবে পাত্রের বায়োডাটা দিতে হয়? How to create
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
            {index + 1}. {item.step}
          </h6>
          <YouTubeEmbed videoId={item.id} title={item.title} />
        </div>
      ))}
    </div>
  );
};

export default Instructions;
