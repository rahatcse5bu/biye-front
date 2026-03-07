/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ShortlistServices } from '../../services/shortlist';
import { getToken } from '../../utils/cookies';
import { Toast } from '../../utils/toast';
import BioContext from '../../contexts/BioContext';
import UserContext from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const BioInfoButton = () => {
  const { bio } = useContext(BioContext);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isShortlisted, setIsShortlisted] = useState(false);

  const bioUserId = bio?.generalInfo?.user;
  const currentUserId = userInfo?.data?._id;
  const token = getToken()?.token;

  // Check if this biodata is already shortlisted
  const { data: shortlistStatus } = useQuery({
    queryKey: ['shortlist-check', bioUserId],
    queryFn: async () => {
      return await ShortlistServices.checkShortlist(bioUserId, token);
    },
    retry: false,
    enabled: !!bioUserId && !!token && bioUserId !== currentUserId,
  });

  useEffect(() => {
    if (shortlistStatus?.data?.shortlisted !== undefined) {
      setIsShortlisted(shortlistStatus.data.shortlisted);
    }
  }, [shortlistStatus]);

  // Toggle shortlist mutation
  const toggleMutation = useMutation({
    mutationFn: async () => {
      return await ShortlistServices.toggleShortlist(
        { bio_user: bioUserId },
        token
      );
    },
    onSuccess: (data) => {
      setIsShortlisted(data?.data?.shortlisted);
      queryClient.invalidateQueries({ queryKey: ['shortlist-check', bioUserId] });
      queryClient.invalidateQueries({ queryKey: ['my-shortlist'] });
      Toast.successToast(data?.message || 'Shortlist updated successfully');
    },
    onError: (error) => {
      console.error('Shortlist error:', error);
      Toast.errorToast(error?.response?.data?.message || 'Failed to update shortlist');
    },
  });

  const handleShortlistClick = () => {
    if (!token) {
      Toast.errorToast('Please login to shortlist');
      navigate('/login');
      return;
    }

    if (bioUserId === currentUserId) {
      Toast.errorToast('You cannot shortlist yourself');
      return;
    }

    toggleMutation.mutate();
  };

  // Don't show buttons for own biodata
  if (bioUserId === currentUserId) {
    return null;
  }

  return (
    <div className="flex gap-3 p-4">
      <button
        onClick={handleShortlistClick}
        disabled={toggleMutation.isPending}
        className={`flex-1 text-sm sm:text-base text-white border-2 transition-all duration-500 ease-out py-2 px-3 sm:px-7 rounded-full ${
          isShortlisted
            ? 'bg-yellow-600 hover:bg-yellow-700 border-yellow-600'
            : 'bg-green-800 hover:bg-green-600 border-green-800'
        } ${toggleMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {toggleMutation.isPending
          ? 'Loading...'
          : isShortlisted
          ? 'Shortlisted ✓'
          : 'Shortlist'}
      </button>
      <button className="flex-1 text-sm sm:text-base bg-red-900 hover:bg-red-600 border-2 transition-all duration-500 ease-out border-red-900 text-white py-2 px-3 sm:px-7 rounded-full">
        Ignore
      </button>
    </div>
  );
};

export default BioInfoButton;
