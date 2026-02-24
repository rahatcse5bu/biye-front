/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';
import { FaCamera, FaTrash, FaSpinner } from 'react-icons/fa';
import { ImgbbService } from '../../services/imgbb';
import { Toast } from '../../utils/toast';

const PhotoUpload = ({ photos = [], setPhotos }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    // Check total count
    if (photos.length + files.length > ImgbbService.MAX_PHOTOS) {
      Toast.errorToast(
        `সর্বোচ্চ ${ImgbbService.MAX_PHOTOS}টি ছবি আপলোড করা যাবে।`
      );
      return;
    }

    // Validate sizes
    for (const file of files) {
      if (file.size > ImgbbService.MAX_FILE_SIZE) {
        const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
        Toast.errorToast(
          `"${file.name}" - ছবির সাইজ ১ MB এর বেশি (${sizeMB} MB)`
        );
        return;
      }
      // Validate type
      if (!file.type.startsWith('image/')) {
        Toast.errorToast(`"${file.name}" - শুধুমাত্র ছবি আপলোড করা যাবে`);
        return;
      }
    }

    setUploading(true);
    try {
      const urls = await ImgbbService.uploadMultipleImages(files, photos);
      setPhotos((prev) => [...prev, ...urls]);
      Toast.successToast(`${urls.length}টি ছবি আপলোড হয়েছে`);
    } catch (error) {
      console.error('Upload error:', error);
      Toast.errorToast(error.message || 'ছবি আপলোড করতে সমস্যা হয়েছে');
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemovePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="my-4">
      <label className="block text-lg font-semibold text-gray-700 mb-2">
        ছবি আপলোড করুন{' '}
        <span className="text-sm font-normal text-gray-500">
          (সর্বোচ্চ {ImgbbService.MAX_PHOTOS}টি, প্রতিটি সর্বোচ্চ ১ MB)
        </span>
      </label>

      {/* Photo grid */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-3">
        {photos.map((url, index) => (
          <div key={index} className="relative group">
            <img
              src={url}
              alt={`ছবি ${index + 1}`}
              className="w-full h-24 sm:h-28 object-cover rounded-lg border-2 border-gray-200"
            />
            <button
              type="button"
              onClick={() => handleRemovePhoto(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
              title="ছবি মুছুন"
            >
              <FaTrash size={10} />
            </button>
            {index === 0 && (
              <span className="absolute bottom-1 left-1 bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded">
                প্রোফাইল
              </span>
            )}
          </div>
        ))}

        {/* Add photo button */}
        {photos.length < ImgbbService.MAX_PHOTOS && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="w-full h-24 sm:h-28 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-indigo-400 hover:text-indigo-500 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <FaSpinner className="animate-spin text-xl mb-1" />
            ) : (
              <FaCamera className="text-xl mb-1" />
            )}
            <span className="text-xs">
              {uploading ? 'আপলোড হচ্ছে...' : 'ছবি যোগ করুন'}
            </span>
          </button>
        )}
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        multiple
        className="hidden"
      />

      <p className="text-xs text-gray-500">
        * প্রথম ছবিটি প্রোফাইল ছবি হিসেবে দেখানো হবে। শুধুমাত্র পাত্র (পুরুষ) এর
        জন্য প্রযোজ্য।
      </p>
    </div>
  );
};

export default PhotoUpload;
