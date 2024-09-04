/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import { Colors } from '../../constants/colors';
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

  if (
    userInfo?.data?.user_status &&
    ['pending', 'in review', 'banned'].includes(userInfo?.data?.user_status)
  ) {
    return (
      <div>
        <h4 className="font-semibold text-green-500">
          Your bio data is now{' '}
          <span className="font-bold text-indigo-800">
            {userInfo?.data?.user_status}
          </span>
        </h4>
      </div>
    );
  }

  return (
    <div className="mb-5">
      <h2
        className="font-semibold text-left text-sm md:text-xl lg:text-xl"
        style={{ color: Colors.titleText }}
      >
        Active & Inactive Biodata :
      </h2>
      <div className="mt-2 flex items-center">
        <div className="mr-3">
          {isActive ? (
            <span className="text-green-700 font-semibold text-base">
              Active
            </span>
          ) : (
            <span className="text-red-700 font-semibold text-base">
              Inactive
            </span>
          )}
        </div>
        <label className="switch" htmlFor="biodata-toggle">
          <input
            id="biodata-toggle"
            type="checkbox"
            checked={isActive}
            onChange={handleToggle}
            disabled={['pending', 'in review', 'banned'].includes(
              userInfo?.data?.user_status
            )}
            className="disabled:cursor-not-allowed"
          />
          <span className="slider round"></span>
        </label>
      </div>

      {/* Conditionally render content based on toggle state */}

      <div className="mt-4">
        <p
          className={`text-left  font-medium ${isActive ? 'text-green-600' : 'text-red-600'} `}
        >
          {isActive
            ? 'This is the active biodata content that is now visible.'
            : 'This is the Inactive biodata content that is now Invisible.'}
        </p>
      </div>
      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirm}
        message={`Are you sure you want to ${isActive ? 'inactive' : 'active'} this bio data?`}
        loading={loading}
      />
    </div>
  );
};

export default ActiveDeleteButton;
