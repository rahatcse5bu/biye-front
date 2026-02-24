const IMGBB_API_KEY = '1d1dbbaafb1ad6fd4d12b28e44cb0495';
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const MAX_PHOTOS = 5;

/**
 * Upload a single image to imgbb
 * @param {File} file - The image file to upload
 * @returns {Promise<string>} - The URL of the uploaded image
 */
const uploadImage = async (file) => {
  if (file.size > MAX_FILE_SIZE) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
    throw new Error(`ছবির সাইজ ১ MB এর বেশি হতে পারবে না। (${sizeMB} MB)`);
  }

  const formData = new FormData();
  formData.append('image', file);

  const url = `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`;
  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error('ছবি আপলোড করতে সমস্যা হয়েছে');
  }

  return data.data.display_url;
};

/**
 * Upload multiple images to imgbb
 * @param {File[]} files - Array of image files
 * @param {string[]} existingPhotos - Already uploaded photo URLs
 * @returns {Promise<string[]>} - Array of uploaded image URLs
 */
const uploadMultipleImages = async (files, existingPhotos = []) => {
  const totalPhotos = existingPhotos.length + files.length;
  if (totalPhotos > MAX_PHOTOS) {
    throw new Error(
      `সর্বোচ্চ ${MAX_PHOTOS}টি ছবি আপলোড করা যাবে। আপনার বর্তমানে ${existingPhotos.length}টি ছবি আছে।`
    );
  }

  // Validate all file sizes first
  for (const file of files) {
    if (file.size > MAX_FILE_SIZE) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      throw new Error(`"${file.name}" ছবির সাইজ ১ MB এর বেশি। (${sizeMB} MB)`);
    }
  }

  const uploadPromises = files.map((file) => uploadImage(file));
  const urls = await Promise.all(uploadPromises);
  return urls;
};

export const ImgbbService = {
  uploadImage,
  uploadMultipleImages,
  MAX_FILE_SIZE,
  MAX_PHOTOS,
};
