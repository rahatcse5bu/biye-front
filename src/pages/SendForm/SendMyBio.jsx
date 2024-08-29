import { Colors } from '../../constants/colors';

const SendMyBio = ({ formData, setFormData }) => {
  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      {/* Column 1 */}
      {[
        { label: 'আপনার উপজেলা', id: 'upzilla', type: 'text' },
        { label: 'আপনার জিলা', id: 'zilla', type: 'text' },
        {
          label: 'সর্বোচ্চ শিক্ষাগত যোগ্যতা',
          id: 'maxEducation',
          type: 'text',
        },
        { label: 'শিক্ষা প্রতিষ্ঠান', id: 'institution', type: 'text' },
        { label: 'বাবার পেশা', id: 'fatherProfession', type: 'text' },
        { label: 'মায়ের পেশা', id: 'motherProfession', type: 'text' },
        { label: 'আপনার উচ্চতা', id: 'height', type: 'text' },
        { label: 'আপনার গায়ের রং', id: 'color', type: 'text' },
        { label: 'আপনার ওজন', id: 'weight', type: 'text' },
      ].map((field) => (
        <div key={field.id}>
          <label
            style={{ color: Colors.titleText }}
            htmlFor={field.id}
            className="block text-sm font-medium text-gray-700"
          >
            {field.label}
          </label>
          <input
            type={field.type}
            id={field.id}
            value={formData[field.id]}
            onChange={handleChange}
            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2
            }`}
          />
        </div>
      ))}

      {/* Column 2 */}
      {[
        { label: 'জবের অবস্থা', id: 'job', type: 'textarea' },
        { label: 'ইনকাম', id: 'salary', type: 'textarea' },
        { label: 'পারিবারিক অবস্থা', id: 'familyStatus', type: 'textarea' },
        {
          label: 'ভাই বোনদের বিস্তারিত',
          id: 'siblingsDetails',
          type: 'textarea',
        },
        {
          label: 'আপনার/পরিবারের দ্বীনি অবস্থা',
          id: 'deeniCondition',
          type: 'textarea',
        },
        {
          label: 'আপনার/পরিবারের অর্থনৈতিক অবস্থা',
          id: 'economicalCondition',
          type: 'textarea',
        },
        { label: 'আপনার জবের অবস্থা', id: 'jobPosition', type: 'textarea' },
        {
          label: 'আপনার বৈবাহিক অবস্থা',
          id: 'maritalStatus',
          type: 'textarea',
        },
        {
          label: 'আপনার শারীরিক মানসিক রোগ আছে?',
          id: 'physicalMentalConditions',
          type: 'textarea',
        },
      ].map((field) => (
        <div key={field.id}>
          <label
            style={{ color: Colors.titleText }}
            htmlFor={field.id}
            className="block text-sm font-medium text-gray-700"
          >
            {field.label}
          </label>
          <textarea
            rows="3"
            id={field.id}
            value={formData[field.id]}
            onChange={handleChange}
            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 
            }`}
          />
        </div>
      ))}
      <div className="md:col-span-2">
        <label
          style={{ color: Colors.titleText }}
          htmlFor="aboutMe"
          className="block text-sm font-medium text-gray-700"
        >
          আপনার নিজের সম্পর্কে লিখুন
        </label>
        <textarea
          id="aboutMe"
          rows="4"
          value={formData.aboutMe}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        ></textarea>
      </div>
    </div>
  );
};

export default SendMyBio;
