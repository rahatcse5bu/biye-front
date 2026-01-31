/* eslint-disable react/prop-types */
import { useState, useEffect, useContext, useRef } from 'react';
import { ReactionsServices } from '../../services/reactions';
import { getToken } from '../../utils/cookies';
import { Toast } from '../../utils/toast';
import UserContext from '../../contexts/UserContext';
import { FaRegComment } from 'react-icons/fa';
import { BiLike } from 'react-icons/bi';

const reactionEmojis = {
  like: { emoji: '👍', color: '#2078F4', label: 'Like', labelBn: 'লাইক' },
  love: { emoji: '❤️', color: '#F33E58', label: 'Love', labelBn: 'ভালোবাসা' },
  wow: { emoji: '😮', color: '#F7B125', label: 'Wow', labelBn: 'বিস্ময়' },
  sad: { emoji: '😢', color: '#F7B125', label: 'Sad', labelBn: 'দুঃখিত' },
  angry: { emoji: '😠', color: '#E9710F', label: 'Angry', labelBn: 'রাগ' },
  dislike: {
    emoji: '👎',
    color: '#6B7280',
    label: 'Dislike',
    labelBn: 'ডিসলাইক',
  },
};

const ReactionButton = ({
  bioUserId,
  initialCounts = {},
  showCommentButton = false,
  onCommentClick,
}) => {
  const { userInfo } = useContext(UserContext);
  const [currentReaction, setCurrentReaction] = useState(null);
  const [showReactions, setShowReactions] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const leaveTimeoutRef = useRef(null);
  const [reactionCounts, setReactionCounts] = useState({
    like: 0,
    dislike: 0,
    love: 0,
    sad: 0,
    angry: 0,
    wow: 0,
    ...initialCounts,
  });

  // Fetch user's current reaction
  useEffect(() => {
    const fetchUserReaction = async () => {
      if (userInfo?.data?._id && getToken()?.token) {
        try {
          const response = await ReactionsServices.getUserReaction(
            getToken().token,
            bioUserId
          );
          if (response?.data?.reaction_type) {
            setCurrentReaction(response.data.reaction_type);
          }
        } catch (error) {
          // User hasn't reacted yet
          console.log('No reaction found');
        }
      }
    };
    fetchUserReaction();
  }, [bioUserId, userInfo]);

  // Fetch reaction counts
  useEffect(() => {
    const fetchReactionCounts = async () => {
      try {
        const response = await ReactionsServices.getReactionCounts(bioUserId);
        if (response?.data) {
          setReactionCounts(response.data);
        }
      } catch (error) {
        console.log('Error fetching reaction counts', error);
      }
    };
    fetchReactionCounts();
  }, [bioUserId]);

  const handleReactionClick = async (reactionType) => {
    if (!userInfo?.data?._id || !getToken()?.token) {
      Toast.errorToast('Please, Login First');
      return;
    }

    // Store previous state for rollback on error
    const previousReaction = currentReaction;
    const previousCounts = { ...reactionCounts };

    try {
      // Update counts immediately (optimistic update)
      if (previousReaction === reactionType) {
        // Removing reaction
        setCurrentReaction(null);
        setReactionCounts((prev) => ({
          ...prev,
          [reactionType]: Math.max(0, prev[reactionType] - 1),
        }));
      } else {
        // Adding or changing reaction
        setCurrentReaction(reactionType);
        setReactionCounts((prev) => ({
          ...prev,
          ...(previousReaction && {
            [previousReaction]: Math.max(0, prev[previousReaction] - 1),
          }),
          [reactionType]: prev[reactionType] + 1,
        }));
      }

      setShowReactions(false);

      // Make API call
      const response = await ReactionsServices.toggleReaction(
        getToken().token,
        bioUserId,
        reactionType
      );

      if (response?.success) {
        Toast.successToast(
          response.message || 'আপনার রিয়াকশন যুক্ত করা হয়েছে'
        );
        // Refresh counts from server
        const countsResponse =
          await ReactionsServices.getReactionCounts(bioUserId);
        if (countsResponse?.data) {
          setReactionCounts(countsResponse.data);
        }
      }
    } catch (error) {
      console.log('Error toggling reaction', error);
      Toast.errorToast('রিয়াকশন যুক্ত করতে সমস্যা হয়েছে');
      // Revert on error
      setCurrentReaction(previousReaction);
      setReactionCounts(previousCounts);
    }
  };

  const getTotalReactions = () => {
    return Object.values(reactionCounts).reduce((sum, count) => sum + count, 0);
  };

  const topReactions = Object.entries(reactionCounts)
    .filter(([, count]) => count > 0)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const handleMouseEnter = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setShowReactions(true);
    }, 500);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    // Add delay before closing to allow mouse to move to popup
    leaveTimeoutRef.current = setTimeout(() => {
      setShowReactions(false);
    }, 300);
  };

  const handlePopupMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
  };

  const handlePopupMouseLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setShowReactions(false);
    }, 200);
  };

  const handleQuickLike = () => {
    if (currentReaction === 'like') {
      handleReactionClick('like'); // Remove reaction
    } else {
      handleReactionClick('like'); // Add like
    }
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="w-full">
      {/* Reaction Summary Bar - Facebook Style */}
      {getTotalReactions() > 0 && (
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200">
          <div className="flex items-center gap-1">
            {/* Stacked Emoji Icons */}
            <div className="flex items-center -space-x-1">
              {topReactions.map(([type], index) => (
                <div
                  key={type}
                  className="w-5 h-5 rounded-full bg-white border border-white flex items-center justify-center shadow-sm"
                  style={{ zIndex: 3 - index }}
                >
                  <span className="text-xs">{reactionEmojis[type].emoji}</span>
                </div>
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-1">
              {currentReaction && getTotalReactions() > 1
                ? `আপনি ও ${getTotalReactions() - 1} জন`
                : currentReaction
                  ? 'আপনি'
                  : getTotalReactions().toLocaleString('bn-BD')}
            </span>
          </div>
          {showCommentButton && (
            <span className="text-sm text-gray-500 hover:underline cursor-pointer">
              ০টি মন্তব্য
            </span>
          )}
        </div>
      )}

      {/* Action Buttons Row - Facebook Style */}
      <div className="flex items-center border-t border-gray-200 relative">
        {/* Like Button with Hover Reactions */}
        <div
          className="flex-1 relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            onClick={handleQuickLike}
            className={`w-full flex items-center justify-center gap-2 py-2.5 hover:bg-gray-100 transition-all duration-200 rounded-md ${isAnimating ? 'scale-95' : ''}`}
          >
            {currentReaction ? (
              <>
                <span
                  className="text-xl transition-transform duration-200 hover:scale-110"
                  style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }}
                >
                  {reactionEmojis[currentReaction].emoji}
                </span>
                <span
                  className="font-semibold text-sm"
                  style={{ color: reactionEmojis[currentReaction].color }}
                >
                  {reactionEmojis[currentReaction].labelBn}
                </span>
              </>
            ) : (
              <>
                <BiLike className="text-xl text-gray-600" />
                <span className="font-medium text-sm text-gray-600">লাইক</span>
              </>
            )}
          </button>

          {/* Floating Reaction Picker - Facebook Style */}
          {showReactions && (
            <div
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 animate-fadeIn"
              onMouseEnter={handlePopupMouseEnter}
              onMouseLeave={handlePopupMouseLeave}
            >
              <div className="bg-white rounded-full shadow-xl border border-gray-100 p-1.5 flex gap-0.5">
                {Object.entries(reactionEmojis).map(
                  ([type, { emoji, labelBn }], index) => (
                    <button
                      key={type}
                      onClick={() => handleReactionClick(type)}
                      className={`
                      relative p-1.5 rounded-full transition-all duration-200 
                      hover:scale-150 hover:-translate-y-2 hover:bg-transparent
                      ${currentReaction === type ? 'scale-125 -translate-y-1' : ''}
                    `}
                      style={{
                        transitionDelay: `${index * 30}ms`,
                        animation: 'popIn 0.3s ease-out forwards',
                        animationDelay: `${index * 50}ms`,
                      }}
                      title={labelBn}
                    >
                      <span className="text-2xl block transition-transform duration-200 hover:animate-bounce">
                        {emoji}
                      </span>
                      {/* Tooltip on hover */}
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full opacity-0 hover:opacity-100 whitespace-nowrap pointer-events-none">
                        {labelBn}
                      </span>
                    </button>
                  )
                )}
              </div>
              {/* Arrow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-gray-100 transform rotate-45 -mt-1.5" />
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-200" />

        {/* Comment Button */}
        {showCommentButton && (
          <button
            onClick={onCommentClick}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 hover:bg-gray-100 transition-colors duration-200 rounded-md"
          >
            <FaRegComment className="text-lg text-gray-600" />
            <span className="font-medium text-sm text-gray-600">মন্তব্য</span>
          </button>
        )}
      </div>

      {/* Add CSS animations */}
      <style>{`
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.5) translateY(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(5px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ReactionButton;
