/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BookmarkIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import { ShortlistServices } from '../../services/shortlist';
import { DisLikesServices } from '../../services/unfavorites';
import { getToken } from '../../utils/cookies';
import { Toast } from '../../utils/toast';
import BioContext from '../../contexts/BioContext';
import UserContext from '../../contexts/UserContext';
import { useNavigate } from '@/lib/navigation';

const baseButton =
  'inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none';

const BioInfoButton = () => {
  const { bio } = useContext(BioContext);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [isIgnored, setIsIgnored] = useState(false);

  const bioUserId = bio?.generalInfo?.user;
  const currentUserId = userInfo?.data?._id;
  const token = getToken()?.token;
  const canCheck = !!bioUserId && !!token && bioUserId !== currentUserId;

  const { data: shortlistStatus } = useQuery({
    queryKey: ['shortlist-check', bioUserId],
    queryFn: () => ShortlistServices.checkShortlist(bioUserId, token),
    retry: false,
    enabled: canCheck,
  });

  const { data: ignoreStatus } = useQuery({
    queryKey: ['dislike-check', bioUserId],
    queryFn: () => DisLikesServices.checkDisLikes(bioUserId, token),
    retry: false,
    enabled: canCheck,
  });

  useEffect(() => {
    if (shortlistStatus?.data?.shortlisted !== undefined) {
      setIsShortlisted(shortlistStatus.data.shortlisted);
    }
  }, [shortlistStatus]);

  useEffect(() => {
    if (typeof ignoreStatus?.data === 'boolean') setIsIgnored(ignoreStatus.data);
  }, [ignoreStatus]);

  const shortlistMutation = useMutation({
    mutationFn: () => ShortlistServices.toggleShortlist({ bio_user: bioUserId }, token),
    onSuccess: (data) => {
      const shortlisted = Boolean(data?.data?.shortlisted);
      setIsShortlisted(shortlisted);
      queryClient.invalidateQueries({ queryKey: ['shortlist-check', bioUserId] });
      queryClient.invalidateQueries({ queryKey: ['my-shortlist'] });
      Toast.successToast(shortlisted ? 'শর্টলিস্টে যোগ করা হয়েছে' : 'শর্টলিস্ট থেকে সরানো হয়েছে');
    },
    onError: (error) => {
      Toast.errorToast(error?.response?.data?.message || 'শর্টলিস্ট আপডেট করা যায়নি');
    },
  });

  // TODO: "Ignore" uses the dislike list (অপছন্দের তালিকা); the endpoint toggles, so clicking again undoes it.
  const ignoreMutation = useMutation({
    mutationFn: () => DisLikesServices.createDisLikes({ bio_user: bioUserId }, token),
    onSuccess: () => {
      const ignored = !isIgnored;
      setIsIgnored(ignored);
      queryClient.invalidateQueries({ queryKey: ['dislike-check', bioUserId] });
      queryClient.invalidateQueries({ queryKey: ['my-dis-likes'] });
      Toast.successToast(ignored ? 'অপছন্দের তালিকায় যোগ করা হয়েছে' : 'অপছন্দের তালিকা থেকে সরানো হয়েছে');
    },
    onError: (error) => {
      Toast.errorToast(error?.response?.data?.message || 'আপডেট করা যায়নি');
    },
  });

  const requireLogin = () => {
    if (token) return true;
    Toast.errorToast('এই কাজের জন্য লগইন করুন');
    navigate('/login');
    return false;
  };

  if (bioUserId === currentUserId) {
    return null;
  }

  const busy = shortlistMutation.isPending || ignoreMutation.isPending;

  return (
    <div className="space-y-3 p-4">
      {isShortlisted ? (
        <div className="space-y-2">
          <p
            className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-brand-900/20 bg-brand-900/10 px-4 py-2.5 text-sm font-bold text-brand-900"
            role="status"
          >
            <BookmarkSolidIcon className="h-5 w-5" aria-hidden="true" />
            শর্টলিস্টে আছে
          </p>
          <button
            type="button"
            onClick={() => requireLogin() && shortlistMutation.mutate()}
            disabled={busy}
            className={`${baseButton} border-rose-200 bg-white text-rose-700 hover:border-rose-300 hover:bg-rose-50 focus-visible:ring-rose-500`}
          >
            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            {shortlistMutation.isPending ? 'সরানো হচ্ছে...' : 'শর্টলিস্ট থেকে সরান'}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => requireLogin() && shortlistMutation.mutate()}
          disabled={busy}
          className={`${baseButton} border-brand-900 bg-brand-900 text-white shadow-sm hover:border-[#0F8287] hover:bg-[#0F8287] focus-visible:ring-brand-900`}
        >
          <BookmarkIcon className="h-5 w-5" aria-hidden="true" />
          {shortlistMutation.isPending ? 'যোগ করা হচ্ছে...' : 'শর্টলিস্ট করুন'}
        </button>
      )}

      <button
        type="button"
        onClick={() => requireLogin() && ignoreMutation.mutate()}
        disabled={busy}
        aria-pressed={isIgnored}
        className={`${baseButton} focus-visible:ring-gray-500 ${
          isIgnored
            ? 'border-gray-700 bg-gray-700 text-white hover:bg-gray-800'
            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
        }`}
      >
        <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
        {ignoreMutation.isPending ? 'অপেক্ষা করুন...' : isIgnored ? 'ইগনোর বাতিল করুন' : 'ইগনোর করুন'}
      </button>
    </div>
  );
};

export default BioInfoButton;
