/* eslint-disable react/prop-types */
import { Button } from '@material-tailwind/react';
import female from '../../assets/icons/female.svg';
import male from '../../assets/icons/male.svg';
import { Colors } from '../../constants/colors';
import {
  formatDate,
  formatDateAndCalculateAge,
  getDateMonthYear,
} from '../../utils/date';
import { useNavigate } from 'react-router-dom';
import { ScrollToTop } from '../../constants/ScrolltoTop';
import { FaBan, FaEye, FaHeart, FaRegHeart } from 'react-icons/fa';
import { LikesServices } from '../../services/favorites';
import { getToken } from '../../utils/cookies';
import { Toast } from '../../utils/toast';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import { DisLikesServices } from '../../services/unfavorites';
import { RiProhibitedFill, RiProhibitedLine } from 'react-icons/ri';
import { convertHeightToBengali } from '../../utils/height';
import { GeneralInfoServices } from '../../services/generalInfo';
import { useState, useEffect } from 'react';

const BioData = ({ biodata }) => {
  const [likes, setLikes] = useState(false);
  const [count, setCount] = useState(false);
  const [disLikes, setDisLikes] = useState(false);
  const [countDisLike, setDisLikesCount] = useState(false);
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);

  const { data: checkLikes } = useQuery({
    queryKey: [
      'check-likes',
      biodata?.user,
      userInfo?.data?._id,
      getToken()?.token,
    ],
    queryFn: async () => {
      return await LikesServices.checkLikes(biodata?.user, getToken()?.token);
    },
    retry: false,
  });
  const { data: checkDisLikes } = useQuery({
    queryKey: [
      'check-dislikes',
      biodata?.user,
      userInfo?.data?._id,
      getToken()?.token,
    ],
    queryFn: async () => {
      return await DisLikesServices.checkDisLikes(
        biodata?.user,
        getToken()?.token
      );
    },
    retry: false,
  });

  useEffect(() => {
    if (checkLikes) {
      setLikes(checkLikes?.data);
    }
  }, [checkLikes]);
  useEffect(() => {
    if (checkDisLikes) {
      setDisLikes(checkDisLikes?.data);
    }
  }, [checkDisLikes]);

  useEffect(() => {
    if (biodata) {
      setCount(biodata?.likes_count);
    }
  }, [biodata]);
  useEffect(() => {
    if (biodata) {
      setDisLikesCount(biodata?.dislikes_count);
    }
  }, [biodata]);

  // console.log("likes", likes);
  // console.log(checkLikes);
  // console.log(biodata);

  const bioDataHandler = async () => {
    // update watch count
    if (biodata?._id) {
      try {
        await GeneralInfoServices.updateWatchOfBioData(biodata?._id);
        // console.log("watch-response", response);
      } catch (error) {
        console.error('Error incrementing view count', error);
      }
    }
    // navigate to biodata page
    navigate(`/biodata/${biodata?.user_id}`);
  };

  // ? FOR GIVING like REACTION
  const likeButtonHandler = async () => {
    if (!userInfo?.data?._id || !getToken()?.token) {
      Toast.errorToast('Please,Login First');
      return;
    }

    if (!biodata?.user) {
      return;
    }

    if (likes) {
      setCount((prev) => prev - 1);
    }

    if (!likes) {
      setCount((prev) => prev + 1);
    }

    try {
      setLikes((prev) => !prev);
      const data = await LikesServices.createLikes(
        { bio_user: biodata?.user },
        getToken().token
      );
      if (data?.success) {
        Toast.successToast('আপনার রিয়াকশন যুক্ত করা হয়েছে');
      }
      // console.log("likes~~", data);
    } catch (error) {
      console.log(error);
    }
  };
  // ? FOR GIVING dis-like REACTION
  const DisLikeButtonHandler = async () => {
    if (!userInfo?.data?._id || !getToken().token) {
      Toast.errorToast('Please,Login First');
      return;
    }

    if (!biodata?.user) {
      return;
    }

    if (disLikes) {
      setDisLikesCount((prev) => prev - 1);
    }

    if (!disLikes) {
      setDisLikesCount((prev) => prev + 1);
    }

    try {
      setDisLikes((prev) => !prev);

      const data = await DisLikesServices.createDisLikes(
        { bio_user: biodata?.user },
        getToken().token
      );
      console.log('dislikes~~', data);
      if (data?.success) {
        Toast.successToast('আপনার রিয়াকশন যুক্ত করা হয়েছে');
      }
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("like count~", data);
  // console.log("dislikes~", userDisLikesData);

  // console.log(
  //   'biodata?.date_of_birth',
  //   biodata?.date_of_birth,
  //   formatDateAndCalculateAge(biodata?.date_of_birth)?.age
  // );

  return (
    <div className="my-5 min-w-[280px] relative hover:shadow-2xl transition-all  duration-300 ease-in rounded-md border-2">
      <ScrollToTop />
      <div
        style={{
          backgroundColor: Colors.pncPrimaryColor,
        }}
        className="h-[200px] min flex relative  flex-col justify-center rounded-t-md text-white"
      >
        <img
          className="w-16 h-16 mx-auto rounded-full "
          src={biodata?.gender === 'মহিলা' ? female : male}
          alt=""
        />
        <h4 className="my-2"> বায়োডাটা নং </h4>
        <h3>
          {biodata?.gender === 'মহিলা' ? 'PNCF-' : 'PNCM-'}
          {biodata?.user_id}
        </h3>
        {/* view icons */}
        <div className="flex absolute top-2 left-2">
          <FaEye className="w-6 h-6 mr-2" />
          {biodata?.views_count}
        </div>
        {/*dislikes icons */}
        <button
          onClick={DisLikeButtonHandler}
          disabled={likes}
          className="flex absolute disabled:cursor-not-allowed cursor-pointer top-2  right-2"
        >
          {disLikes ? <RiProhibitedFill /> : <RiProhibitedLine />}
        </button>
        {/* like icons */}
        <button
          disabled={disLikes}
          onClick={likeButtonHandler}
          className=" absolute flex items-center disabled:cursor-not-allowed bottom-2 left-2 cursor-pointer"
        >
          {likes ? (
            <FaHeart className="w-6 h-6 " />
          ) : (
            <FaRegHeart className="w-6 h-6 text-white" />
          )}
          {count > 0 && <span className="ml-1 ">{count}</span>}
        </button>
      </div>
      <div className="mx-2 mt-4">
        <table className="min-w-full divide-y divide-gray-200 border-0 border-gray-300">
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap border-r border-t border-b">
                জন্মসন
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap border-b border-t">
                {formatDate(getDateMonthYear(biodata?.date_of_birth))}
                <b className="text-indigo-900">
                  {` [${formatDateAndCalculateAge(biodata?.date_of_birth)?.age}Y]`}
                </b>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap border-r  border-b">
                উচ্চতা{' '}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-b">
                <span>{convertHeightToBengali(biodata?.height)}</span>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap border-r border-b">
                গাত্রবর্ন{' '}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-b">
                {biodata?.screen_color}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap border-r border-b">
                উপজেলা{' '}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-b">
                {biodata?.upzilla}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="my-4">
        <Button
          onClick={bioDataHandler}
          className=" rounded-3xl"
          style={{
            background: `linear-gradient(to right,${Colors.lnLeft},${Colors.lnRight} )`,
          }}
        >
          সম্পূর্ন বায়োডাটা
        </Button>
      </div>
    </div>
  );
};

export default BioData;
