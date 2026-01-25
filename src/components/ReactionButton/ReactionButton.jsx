/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from 'react';
import { ReactionsServices } from '../../services/reactions';
import { getToken } from '../../utils/cookies';
import { Toast } from '../../utils/toast';
import UserContext from '../../contexts/UserContext';

const reactionEmojis = {
  like: { emoji: '👍', color: '#0D7377', label: 'Like' },
  dislike: { emoji: '👎', color: '#6B7280', label: 'Dislike' },
  love: { emoji: '❤️', color: '#E85D75', label: 'Love' },
  sad: { emoji: '😢', color: '#F3A712', label: 'Sad' },
  angry: { emoji: '😠', color: '#F4803C', label: 'Angry' },
  wow: { emoji: '😮', color: '#F3C907', label: 'Wow' },
};

const ReactionButton = ({ bioUserId, initialCounts = {} }) => {
  const { userInfo } = useContext(UserContext);
  const [currentReaction, setCurrentReaction] = useState(null);
  const [showReactions, setShowReactions] = useState(false);
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

  return (
    <div className="relative">
      {/* Main Reaction Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowReactions(!showReactions)}
          className="flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
        >
          {currentReaction ? (
            <>
              <span style={{ fontSize: '20px' }}>
                {reactionEmojis[currentReaction].emoji}
              </span>
              <span
                className="text-sm font-medium"
                style={{ color: reactionEmojis[currentReaction].color }}
              >
                {reactionEmojis[currentReaction].label}
              </span>
            </>
          ) : (
            <>
              <span style={{ fontSize: '20px' }}>👍</span>
              <span className="text-sm text-gray-600">React</span>
            </>
          )}
        </button>

        {/* Reaction Counts Display */}
        {getTotalReactions() > 0 && (
          <div className="flex items-center gap-1">
            {topReactions.map(([type, count]) => {
              return (
                <div key={type} className="flex items-center gap-0.5">
                  <span style={{ fontSize: '16px' }}>
                    {reactionEmojis[type].emoji}
                  </span>
                  <span className="text-xs text-gray-600">{count}</span>
                </div>
              );
            })}
            {topReactions.length > 0 && (
              <span className="text-xs text-gray-500 ml-1">
                ({getTotalReactions()})
              </span>
            )}
          </div>
        )}
      </div>

      {/* Reaction Picker Popup */}
      {showReactions && (
        <>
          <div
            role="button"
            tabIndex={0}
            className="fixed inset-0 z-10"
            onClick={() => setShowReactions(false)}
            onKeyDown={(e) => e.key === 'Escape' && setShowReactions(false)}
            aria-label="Close reactions"
          />
          <div className="absolute bottom-full left-0 mb-2 z-20 bg-white rounded-full shadow-lg border border-gray-200 p-2 flex gap-2">
            {Object.entries(reactionEmojis).map(
              ([type, { emoji, color, label }]) => (
                <button
                  key={type}
                  onClick={() => handleReactionClick(type)}
                  className={`
                  relative p-2 rounded-full transition-all duration-200 hover:scale-125 hover:bg-gray-100
                  ${currentReaction === type ? 'bg-gray-100 ring-2' : ''}
                `}
                  style={currentReaction === type ? { ringColor: color } : {}}
                  title={label}
                >
                  <span style={{ fontSize: '24px' }}>{emoji}</span>
                  {reactionCounts[type] > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {reactionCounts[type]}
                    </span>
                  )}
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ReactionButton;
