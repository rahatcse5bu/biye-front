import React from 'react';

const Advertisement = ({ colors }) => {
  const services = [
    'ব্যক্তিগত ওয়েবসাইট/অ্যাপ',
    'ব্যবসায়ীক ওয়েবসাইট/অ্যাপ',
    'কম্পানির ওয়েবসাইট/অ্যাপ',
    'শিক্ষা প্রতিষ্ঠান ওয়েবসাইট/অ্যাপ',
    'ই-কমার্স ওয়েবসাইট/অ্যাপ',
  ];

  return (
    <div
      style={{
        background: `linear-gradient(90deg, ${colors.lnLeft}, ${colors.lnRight})`,
      }}
      className="relative max-w-screen-lg px-8 py-6 mx-auto my-6 text-white bg-blue-600 md:flex md:items-center md:justify-between lg:rounded-lg shadow-lg"
    >
      <div className="md:flex md:flex-col md:items-start">
        <h2 className="mb-4 text-3xl py-3 font-extrabold sm:text-4xl lg:text-5xl">
          PNC Soft Tech - একটি সফটওয়্যার ডেভেলপমেন্ট কম্পানি
        </h2>
        <ul className="flex flex-wrap gap-4 text-lg md:gap-6">
          {services.map((service, index) => (
            <li key={index} className="flex items-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7 text-green-400"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <p>{service}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 md:mt-0 md:flex md:flex-col justify-between md:items-end">
        <button className="px-5 py-3 font-semibold text-white transition transform shadow-md focus:outline-none rounded-lg bg-emerald-500 hover:bg-emerald-600 hover:scale-105">
          <a
            href="https://wa.me/+8801793278360"
            target="_blank"
            rel="noreferrer"
            className="text-sm md:text-base whitespace-nowrap"
          >
            মেসেজ দিন
          </a>
        </button>
        <a
          href="https://pncsoft.tech"
          target="_blank"
          rel="noreferrer"
          className="mt-4 text-xs whitespace-nowrap font-semibold underline md:mt-6 lg:text-sm"
        >
          আমাদের ওয়েবসাইট
        </a>
      </div>
      <div className="absolute top-0 right-0 px-2 py-1 text-xs font-bold text-white bg-orange-600 rounded-bl-lg">
        <span className="uppercase">Ad</span>
      </div>
    </div>
  );
};

export default Advertisement;
