/* eslint-disable react/prop-types */
import { useState } from 'react';
import FormTitle from '../FormTitle/FormTitle';
import Select from '../Select/Select';
import { Colors } from '../../constants/colors';
import { useQuery } from '@tanstack/react-query';
import { userServices } from '../../services/user';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import { useEffect } from 'react';
import { getToken } from '../../utils/cookies';
import LoadingCircle from '../LoadingCircle/LoadingCircle';
import { OngikarNamaServices } from '../../services/ongikarNama';
import { getErrorMessage } from '../../utils/error';
import { Toast } from '../../utils/toast';

const OngikarNamaForm = ({ userForm, setUserForm, religion = 'islam' }) => {
  const [isAgree, setIsAgree] = useState('');
  const [isTrue, setIsTrue] = useState('');
  const [isFamilyKnow, setIsFamilyKnow] = useState('');
  const [requestPracticingStatus, setRequestPracticingStatus] = useState('');
  const { userInfo } = useContext(UserContext);
  const [loading, setLoading] = useState(false);


  const siteUrl = import.meta.env.VITE_SITE_URL || 'pncnikah.com';

  const { data: ongikarNamaInfo = null, isLoading } = useQuery({
    queryKey: ['ongikar-nama', userInfo?.data?._id, getToken()?.token],
    queryFn: async () => {
      return await OngikarNamaServices.getOngikarNamaByUser(getToken()?.token);
    },
    retry: false,
    enabled: !!userInfo?.data?._id,
  });

  useEffect(() => {
    if (ongikarNamaInfo?.data) {
      const { is_family_know, isTrueData, isAgree, request_practicing_status } = ongikarNamaInfo.data;
      setIsAgree(isAgree);
      setIsTrue(isTrueData);
      setIsFamilyKnow(is_family_know);
      setRequestPracticingStatus(request_practicing_status || '');
    }
  }, [ongikarNamaInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    let ongikarNamaInfoData = {
      isAgree: isAgree,
      isTrueData: isTrue,
      is_family_know: isFamilyKnow,
      request_practicing_status: requestPracticingStatus,
    };

    if (!getToken()?.token || !userInfo?.data._id) {
      alert('Please logout and try again');
      return;
    }

    // console.log(ongikarNamaInfoData);

    try {
      setLoading(true);
      let data;
      if (ongikarNamaInfo?.success === true) {
        data = await OngikarNamaServices.updateOngikarNama(
          ongikarNamaInfoData,
          getToken().token
        );
      } else {
        data = await OngikarNamaServices.createOngikarNama(
          { ...ongikarNamaInfoData, user_form: userForm },
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

      // for token error redirect to logout
      // if (errorMsg.includes("You are not authorized")) {
      // 	await logOut();
      // 	removeToken();
      // 	navigate("/");
      // }
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  // 	verifyToken(
  // 		userInfo?.data[0]?.id,
  // 		logOut,
  // 		"ongikar-nama-info-verify-token"
  // 	);
  // }, [logOut, userInfo?.data]);

  const conditionOptions = [
    {
      value: 'হ্যা',
    },
    {
      value: 'না',
    },
  ];
  const backButtonHandler = () => {
    if (userForm > 1) {
      setUserForm((prev) => prev - 1);
    }
  };
  return (
    <div>
      <FormTitle title="অঙ্গীকারনামা" />
      {isLoading ? (
        <LoadingCircle classes="mt-10" />
      ) : (
        <form action="" onSubmit={submitHandler}>
          <Select
            required
            value={isFamilyKnow}
            setValue={setIsFamilyKnow}
            options={conditionOptions}
            title={`${siteUrl} ওয়েবসাইটে বায়োডাটা জমা দিচ্ছেন, তা আপনার অভিভাবক জানেন?`}
          />

          <Select
            required
            value={isTrue}
            setValue={setIsTrue}
            options={conditionOptions}
            title={religion === 'islam' 
              ? "আল্লাহ'র শপথ করে সাক্ষ্য দিন, যে তথ্যগুলো দিয়েছেন সব সত্য?"
              : "আপনি কি সাক্ষ্য দিচ্ছেন যে তথ্যগুলো দিয়েছেন সব সত্য?"}
          />

          <Select
            required
            value={isAgree}
            setValue={setIsAgree}
            options={conditionOptions}
            title={religion === 'islam'
              ? `কোনো মিথ্যা তথ্য প্রদান করলে দুনিয়াবী আইনগত এবং আখিরাতের দায়ভার ${siteUrl} কর্তৃপক্ষ নিবে না। আপনি কি সম্মত?`
              : `কোনো মিথ্যা তথ্য প্রদান করলে আইনগত দায়ভার ${siteUrl} কর্তৃপক্ষ নিবে না। আপনি কি সম্মত?`}
          />
          <Select
            required
            value={requestPracticingStatus}
            setValue={setRequestPracticingStatus}
            options={conditionOptions}
            title="আপনি কি প্র্যাকটিসিং পাত্র/পাত্রী খুঁজছেন?"
          />
          <div className="flex items-center justify-between my-5">
            <button
              type="button"
              onClick={backButtonHandler}
              className="px-5 py-2 text-xl text-white bg-gray-700 rounded-3xl"
            >
              Back
            </button>
            <button
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

export default OngikarNamaForm;
