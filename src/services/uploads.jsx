import axios from '../utils/axios';

const MAX_FILE_SIZE = 1024 * 1024;
const MAX_PHOTOS = 5;

const validateImages = (files, existingPhotos = []) => {
  if (existingPhotos.length + files.length > MAX_PHOTOS) {
    throw new Error(
      `সর্বোচ্চ ${MAX_PHOTOS}টি ছবি আপলোড করা যাবে। আপনার বর্তমানে ${existingPhotos.length}টি ছবি আছে।`
    );
  }

  for (const file of files) {
    if (!file.type.startsWith('image/')) {
      throw new Error(`"${file.name}" - শুধুমাত্র ছবি আপলোড করা যাবে`);
    }
    if (file.size > MAX_FILE_SIZE) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      throw new Error(`"${file.name}" ছবির সাইজ ১ MB এর বেশি। (${sizeMB} MB)`);
    }
  }
};

const uploadMultipleImages = async (files, existingPhotos = [], token) => {
  if (!token) {
    throw new Error('ছবি আপলোড করতে লগইন করুন');
  }

  validateImages(files, existingPhotos);
  const formData = new FormData();
  files.forEach((file) => formData.append('images', file));

  const { data } = await axios.post('/uploads/images', formData);

  if (!data?.success || !Array.isArray(data?.data?.urls)) {
    throw new Error('ছবি আপলোড করতে সমস্যা হয়েছে');
  }

  return data.data.urls;
};

const deleteImage = async (url, token) => {
  if (!url?.includes('res.cloudinary.com')) {
    return;
  }
  if (!token) {
    throw new Error('ছবি মুছতে লগইন করুন');
  }

  await axios.delete('/uploads/image', {
    data: { url },
  });
};

export const ImageUploadService = {
  uploadMultipleImages,
  deleteImage,
  MAX_FILE_SIZE,
  MAX_PHOTOS,
};
