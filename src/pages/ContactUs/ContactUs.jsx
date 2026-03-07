import { useState } from 'react';
import { Colors } from '../../constants/colors';
import { ContactServices } from '../../services/contact';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    console.log('formData~~', formData);

    try {
      const response = await ContactServices.createContactUsByEmail(formData);
      if (response.success === true) {
        setSuccessMessage('Your message has been sent successfully.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          bio: '',
          message: '',
        });
      } else {
        setErrorMessage(
          'There was an issue sending your message. Please try again later.'
        );
      }
    } catch (error) {
      setErrorMessage(
        'There was an error sending your message. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto p-4">
        <h1
          className="text-3xl font-semibold mb-4 text-center"
          style={{ color: Colors.titleText }}
        >
          যোগাযোগ করুন
        </h1>
        <div className="text-center mb-8">
          <p className="text-gray-700 text-xl md:text-2xl lg:text-3xl">
            আপনার যে কোন জিজ্ঞাসা, নিম্নোক্ত ফর্মে পূরণ করে আমাদের কাছে পাঠিয়ে
            দিন।
          </p>
          <p className="text-gray-700 text-xl md:text-2xl lg:text-3xl">
            আমরা শীঘ্রই আপনার সাথে যোগাযোগ করবো ইন শা আল্লাহ।
          </p>
        </div>
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2"
              >
                আপনার নাম <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                placeholder="মো ঃ রাহাত"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2"
              >
                আপনার ইমেইল <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                placeholder="rahat.cse5.bu@gmail.com"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-gray-700 font-semibold mb-2"
              >
                আপনার মোবাইল নাম্বার <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                placeholder="01793278360"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="bio"
                className="block text-gray-700 font-semibold mb-2"
              >
                আপনার বায়োডাটা নং
              </label>
              <input
                type="text"
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                placeholder="BID-2102"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-gray-700 font-semibold mb-2"
              >
                আপনি যা লিখে চান <span className="text-red-600">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                placeholder=" আমি একাউন্ট ডিলিট করতে পারতেছি না "
                required
              />
            </div>
            {errorMessage && (
              <div className="mb-4 text-red-600 text-center">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="mb-4 text-green-600 text-center">
                {successMessage}
              </div>
            )}
            <div className="text-center">
              <button
                type="submit"
                className="text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-600 transition duration-300"
                style={{
                  background: `linear-gradient(to right,${Colors.lnLeft},${Colors.lnRight} )`,
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'মেসেজ পাঠান'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
