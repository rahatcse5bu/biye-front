/* eslint-disable react/prop-types */

/**
 * BiodataTypeBadge Component
 * Displays a badge indicating whether a biodata is verified or unverified (admin-created)
 */
const BiodataTypeBadge = ({ isUnverified = false, position = 'top-12 right-2' }) => {
  if (!isUnverified) {
    // Don't show badge for verified biodatas (default appearance)
    return null;
  }

  return (
    <div
      className={`absolute ${position} px-3 py-1 rounded-full text-xs font-bold text-white bg-orange-500 shadow-md`}
    >
      অ-যাচাইকৃত
    </div>
  );
};

export default BiodataTypeBadge;
