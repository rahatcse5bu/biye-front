import { useState, useEffect } from 'react';
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';
import { useUser } from '../../contexts/useUser';
import { Toast } from '../../utils/toast';
import { getErrorMessage } from '../../utils/error';
import { UserInfoServices } from '../../services/userInfo';
import { getToken } from '../../utils/cookies';

const ActiveDeleteButton = () => {
  const { userInfo } = useUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // console.log('userInfo~~~', userInfo);

  useEffect(() => {
    setIsActive(userInfo?.data?.user_status === 'active' ? true : false);
  }, [userInfo]);
  const handleToggle = () => {
    setIsDialogOpen(true);
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      const data = await UserInfoServices.updateUserStatusByUser(
        {
          user_status: isActive === true ? 'inactive' : 'active',
        },
        getToken()?.token
      );
      if (data.success) {
        Toast.successToast('আপনার বায়োডাটা স্ট্যাটাস্ট আপডেট হয়েছে।');
        setIsActive(!isActive);
      } else {
        Toast.errorToast('আপনার বায়োডাটা আপডেট স্ট্যাটাস্ট করা হয়নি।');
      }
    } catch (error) {
      Toast.errorToast(getErrorMessage(error));
    } finally {
      setIsDialogOpen(false);
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const lockedStatus = ['pending', 'in review', 'banned', 'ban'].includes(userInfo?.data?.user_status);
  const lockedLabels = { pending: 'অপেক্ষমাণ', 'in review': 'পর্যালোচনাধীন', banned: 'নিষিদ্ধ', ban: 'নিষিদ্ধ' };

  if (lockedStatus) {
    return (
      <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800">
        আপনার বায়োডাটা এখন <strong>{lockedLabels[userInfo.data.user_status]}</strong> অবস্থায় আছে, তাই এই মুহূর্তে দৃশ্যমানতা পরিবর্তন করা যাবে না।
      </p>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-gray-900">
            {isActive ? 'বায়োডাটা দৃশ্যমান' : 'বায়োডাটা লুকানো'}
          </p>
          <p className="mt-0.5 text-xs text-gray-500">
            {isActive
              ? 'অন্য সদস্যরা আপনার বায়োডাটা দেখতে ও প্রস্তাব পাঠাতে পারবেন।'
              : 'আপনার বায়োডাটা কেউ দেখতে পাবে না।'}
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={isActive}
          aria-label="বায়োডাটার দৃশ্যমানতা"
          onClick={handleToggle}
          disabled={loading}
          className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D7377]/40 focus-visible:ring-offset-2 disabled:opacity-60 ${
            isActive ? 'bg-[#0D7377]' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform motion-reduce:transition-none ${
              isActive ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirm}
        message={
          isActive
            ? 'আপনি কি বায়োডাটা লুকাতে চান? লুকালে কেউ আপনার বায়োডাটা দেখতে পাবে না।'
            : 'আপনি কি বায়োডাটা আবার দৃশ্যমান করতে চান?'
        }
        loading={loading}
      />
    </div>
  );
};

export default ActiveDeleteButton;
