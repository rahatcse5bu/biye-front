/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react';
import FormTitle from '../FormTitle/FormTitle';
import Input from '../Input/Input';
import Textarea from '../Textarea/Textarea';
import { occupationOptions } from './professionInfoForm.constant';
import { Colors } from '../../constants/colors';
import UserContext from '../../contexts/UserContext';
import { useQuery } from '@tanstack/react-query';
import { getToken } from '../../utils/cookies';
import LoadingCircle from '../LoadingCircle/LoadingCircle';
import MultipleSelect from '../MultitpleSelect/MultipleSelect';
import {
  dataToMultipleExpectedPartner,
  getDataFromMultipleInputExpectedPartner,
} from '../../utils/form';
import { ProfessionalInfoServices } from '../../services/professionalInfo';
import { getErrorMessage } from '../../utils/error';
import { Toast } from '../../utils/toast';
import { FaPlus, FaTrash } from 'react-icons/fa';

// Empty working history template
const emptyWorkingHistory = {
  company_name: '',
  designation: '',
  start_date: '',
  end_date: '',
  is_current: false,
  job_description: '',
};

const ProfessionInfoForm = ({ userForm, setUserForm }) => {
  const [occupation, setOccupation] = useState();
  const [income, setIncome] = useState('');
  const [occupationInfo, setOccupationInfo] = useState();
  const [workingHistory, setWorkingHistory] = useState([{ ...emptyWorkingHistory }]);
  const { userInfo } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const backButtonHandler = () => {
    if (userForm > 1) {
      setUserForm((prev) => prev - 1);
    }
  };
  const { data: professionalInfo = null, isLoading } = useQuery({
    queryKey: ['professional-info', userInfo?.data?._id, getToken()?.token],
    queryFn: async () => {
      return await ProfessionalInfoServices.getProfessionalInfoByUser(
        getToken()?.token
      );
    },
    retry: false,
    enabled: !!userInfo?.data?._id,
  });

  // useEffect(() => {
  // 	verifyToken(
  // 		userInfo?.data[0]?.id,
  // 		logOut,
  // 		"professional-info-verify-token"
  // 	);
  // }, [logOut, userInfo?.data]);

  useEffect(() => {
    if (professionalInfo?.data) {
      const { occupation, occupation_details, monthly_income, working_history } =
        professionalInfo.data;
      setOccupation(dataToMultipleExpectedPartner(occupation));
      setOccupationInfo(occupation_details);
      setIncome(monthly_income);
      if (working_history && working_history.length > 0) {
        setWorkingHistory(working_history);
      }
    }
  }, [professionalInfo]);

  // Add new working history entry
  const addWorkingHistory = () => {
    setWorkingHistory([...workingHistory, { ...emptyWorkingHistory }]);
  };

  // Remove working history entry
  const removeWorkingHistory = (index) => {
    if (workingHistory.length > 1) {
      const updated = workingHistory.filter((_, i) => i !== index);
      setWorkingHistory(updated);
    }
  };

  // Update working history field
  const updateWorkingHistory = (index, field, value) => {
    const updated = [...workingHistory];
    updated[index] = { ...updated[index], [field]: value };
    // If is_current is checked, clear end_date
    if (field === 'is_current' && value === true) {
      updated[index].end_date = '';
    }
    setWorkingHistory(updated);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    let professionalInfoData = {
      occupation: getDataFromMultipleInputExpectedPartner(occupation),
      occupation_details: occupationInfo,
      monthly_income: income,
      working_history: workingHistory.filter(wh => wh.company_name || wh.designation),
    };

    if (!getToken()?.token || !userInfo?.data?._id) {
      alert('Please logout and try again');
      return;
    }

    console.log(professionalInfoData);
    let data;
    try {
      setLoading(true);
      if (professionalInfo?.success === true) {
        data = await ProfessionalInfoServices.updateProfessionalInfo(
          professionalInfoData,
          getToken().token
        );
      } else {
        data = await ProfessionalInfoServices.createProfessionalInfo(
          { ...professionalInfoData, user_form: userForm },
          getToken().token
        );
      }
      if (data.success) {
        Toast.successToast('আপনার তথ্য সেভ করা হয়েছে ');
        setUserForm((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
      const errorMsg = getErrorMessage(error);
      Toast.errorToast(errorMsg);

      //! for token error redirect to logout
      // if (errorMsg.includes("You are not authorized")) {
      //   await logOut();
      //   removeToken();
      //   navigate("/");
      // }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <FormTitle title="পেশাগত তথ্য" />
      {isLoading ? (
        <LoadingCircle classes="mt-10" />
      ) : (
        <form onSubmit={submitHandler} action="">
          {/* <Select
					title="পেশা "
					value={occupation}
					options={occupationOptions}
					setValue={setOccupation}
					required
				/> */}
          <MultipleSelect
            title="পেশা"
            options={occupationOptions}
            value={occupation}
            setValue={setOccupation}
            closeMenuOnSelect={true}
            classes="z-10"
            required
          />
          <Textarea
            title="পেশার বিস্তারিত বিবরণ"
            value={occupationInfo}
            setValue={setOccupationInfo}
            subtitle=" আপনার কর্মস্থল কোথায়, আপনি কোন প্রতিষ্ঠানে কাজ করছেন, আপনার উপার্জন হালাল কি না ইত্যাদি লিখতে পারেন।"
            required
          />
          <Input
            title="মাসিক আয়"
            type="number"
            value={income}
            setValue={setIncome}
          />
          {/* Dynamic Working History Section */}
          <div className="mt-8 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-700">কর্মসংস্থান ইতিহাস</h3>
              <button
                type="button"
                onClick={addWorkingHistory}
                className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                <FaPlus /> নতুন যোগ করুন
              </button>
            </div>

            {workingHistory.map((history, index) => (
              <div key={index} className="p-4 mb-4 border-2 border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-600">কর্মসংস্থান #{index + 1}</h4>
                  {workingHistory.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeWorkingHistory(index)}
                      className="flex items-center gap-1 px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      <FaTrash size={12} /> মুছুন
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      প্রতিষ্ঠানের নাম
                    </label>
                    <input
                      type="text"
                      value={history.company_name}
                      onChange={(e) => updateWorkingHistory(index, 'company_name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="প্রতিষ্ঠানের নাম লিখুন"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      পদবি
                    </label>
                    <input
                      type="text"
                      value={history.designation}
                      onChange={(e) => updateWorkingHistory(index, 'designation', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="পদবি লিখুন"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      শুরুর তারিখ
                    </label>
                    <input
                      type="month"
                      value={history.start_date}
                      onChange={(e) => updateWorkingHistory(index, 'start_date', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      শেষের তারিখ
                    </label>
                    <input
                      type="month"
                      value={history.end_date}
                      onChange={(e) => updateWorkingHistory(index, 'end_date', e.target.value)}
                      disabled={history.is_current}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${history.is_current ? 'bg-gray-100' : ''}`}
                    />
                  </div>

                  <div className="flex items-center md:col-span-2">
                    <input
                      type="checkbox"
                      id={`is_current_${index}`}
                      checked={history.is_current}
                      onChange={(e) => updateWorkingHistory(index, 'is_current', e.target.checked)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <label htmlFor={`is_current_${index}`} className="ml-2 text-sm text-gray-700">
                      বর্তমানে এখানে কর্মরত
                    </label>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      কাজের বিবরণ (ঐচ্ছিক)
                    </label>
                    <textarea
                      value={history.job_description}
                      onChange={(e) => updateWorkingHistory(index, 'job_description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="কাজের বিবরণ লিখুন"
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

export default ProfessionInfoForm;
