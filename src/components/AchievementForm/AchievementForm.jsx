/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react';
import FormTitle from '../FormTitle/FormTitle';
import { Colors } from '../../constants/colors';
import UserContext from '../../contexts/UserContext';
import { useQuery } from '@tanstack/react-query';
import { getToken } from '../../utils/cookies';
import LoadingCircle from '../LoadingCircle/LoadingCircle';
import { AchievementServices } from '../../services/achievement';
import { getErrorMessage } from '../../utils/error';
import { Toast } from '../../utils/toast';
import { FaPlus, FaTrash } from 'react-icons/fa';

const emptyAchievement = {
  title: '',
  year: '',
  description: '',
};

const AchievementForm = ({ userForm, setUserForm }) => {
  const [achievements, setAchievements] = useState([{ ...emptyAchievement }]);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useContext(UserContext);

  const backButtonHandler = () => {
    if (userForm > 1) setUserForm((prev) => prev - 1);
  };

  const { data: achievementData = null, isLoading } = useQuery({
    queryKey: ['achievement', userInfo?.data?._id, getToken()?.token],
    queryFn: async () => {
      return await AchievementServices.getAchievementByUser(getToken()?.token);
    },
    retry: false,
    enabled: !!userInfo?.data?._id,
  });

  useEffect(() => {
    if (achievementData?.data?.achievements?.length > 0) {
      setAchievements(achievementData.data.achievements);
    }
  }, [achievementData]);

  const addAchievement = () => {
    setAchievements([...achievements, { ...emptyAchievement }]);
  };

  const removeAchievement = (index) => {
    if (achievements.length > 1) {
      setAchievements(achievements.filter((_, i) => i !== index));
    }
  };

  const updateAchievement = (index, field, value) => {
    const updated = [...achievements];
    updated[index] = { ...updated[index], [field]: value };
    setAchievements(updated);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!getToken()?.token || !userInfo?.data?._id) {
      alert('Please logout and try again');
      return;
    }

    const payload = {
      achievements: achievements.filter((a) => a.title.trim()),
    };

    try {
      setLoading(true);
      let data;
      if (achievementData?.success === true) {
        data = await AchievementServices.updateAchievement(
          payload,
          getToken().token
        );
      } else {
        data = await AchievementServices.createAchievement(
          { ...payload, user_form: userForm },
          getToken().token
        );
      }
      if (data.success) {
        Toast.successToast('আপনার তথ্য সেভ করা হয়েছে');
        setUserForm((prev) => prev + 1);
      }
    } catch (error) {
      Toast.errorToast(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <FormTitle title="অর্জন ও কৃতিত্ব" />
      {isLoading ? (
        <LoadingCircle classes="mt-10" />
      ) : (
        <form onSubmit={submitHandler}>
          <div className="mt-4 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-700">অর্জনসমূহ</h3>
              <button
                type="button"
                onClick={addAchievement}
                className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                <FaPlus /> নতুন যোগ করুন
              </button>
            </div>

            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="p-4 mb-4 border-2 border-gray-200 rounded-lg bg-gray-50"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-600">
                    অর্জন #{index + 1}
                  </h4>
                  {achievements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAchievement(index)}
                      className="flex items-center gap-1 px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      <FaTrash size={12} /> মুছুন
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label
                      htmlFor={`title-${index}`}
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      শিরোনাম <span className="text-red-500">*</span>
                    </label>
                    <input
                      id={`title-${index}`}
                      type="text"
                      value={achievement.title}
                      onChange={(e) =>
                        updateAchievement(index, 'title', e.target.value)
                      }
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="যেমন: বোর্ড বৃত্তি, চ্যাম্পিয়নশিপ, পুরস্কার..."
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`year-${index}`}
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      সাল (ঐচ্ছিক)
                    </label>
                    <input
                      id={`year-${index}`}
                      type="text"
                      value={achievement.year}
                      onChange={(e) =>
                        updateAchievement(index, 'year', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="যেমন: ২০২০"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`desc-${index}`}
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      বিবরণ (ঐচ্ছিক)
                    </label>
                    <input
                      id={`desc-${index}`}
                      type="text"
                      value={achievement.description}
                      onChange={(e) =>
                        updateAchievement(index, 'description', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="সংক্ষিপ্ত বিবরণ লিখুন"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between my-5">
            <button
              type="button"
              onClick={backButtonHandler}
              className="px-5 py-2 text-xl text-white bg-gray-700 rounded-3xl"
            >
              Back
            </button>
            <button
              disabled={loading}
              type="submit"
              className="px-5 py-2 text-xl text-white rounded-3xl"
              style={{
                background: `linear-gradient(to right,${Colors.lnLeft},${Colors.lnRight})`,
              }}
            >
              {loading ? <LoadingCircle /> : 'Save & Next'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AchievementForm;
