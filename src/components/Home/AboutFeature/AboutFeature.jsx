import React, { useState } from 'react';
import CustomButton from '../../CustomButton/CustomButton';
import { Colors } from '../../../constants/colors';
import { FaYoutube } from 'react-icons/fa';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import CustomModal from '../../CustomModal/CustomModal';

const AboutFeature = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="my-4 px-2">
      <CustomButton
        onClick={() => {
          setOpenModal(true);
        }}
        className=" flex w-full mx-auto md:w-[50%] items-center justify-center border hover:bg-transparent border-indigo-700 rounded-full py-2 bg-white"
      >
        <FaYoutube className="mb-0 pb-0 mr-2 text-red-500 w-12 h-6  rounded-full bg-white" />{' '}
        <span
          className="md:text-xl text-sm"
          style={{
            color: Colors.titleText,
          }}
        >
          বিয়ে এর ব্যতিক্রমী ফিচারসমূহ
        </span>
      </CustomButton>
      <CustomModal
        onClose={() => setOpenModal(false)}
        isOpen={openModal}
        title="বিয়ে এর ব্যতিক্রমী ফিচারসমূহ"
      >
        <LiteYouTubeEmbed
          id="czYI7NaHymg"
          title="বিয়ে এর ব্যতিক্রমী ফিচারসমূহ"
        />
      </CustomModal>
    </div>
  );
};

export default AboutFeature;
