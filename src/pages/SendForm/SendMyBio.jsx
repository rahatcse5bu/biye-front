import { Colors } from '../../constants/colors';
import {
  HiMapPin,
  HiAcademicCap,
  HiBriefcase,
  HiUsers,
  HiHeart,
  HiUser,
} from 'react-icons/hi2';

const SendMyBio = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const sections = [
    {
      title: 'ঠিকানা',
      icon: <HiMapPin />,
      fields: [
        { label: 'আপনার উপজেলা', id: 'upzilla', type: 'text' },
        { label: 'আপনার জিলা', id: 'zilla', type: 'text' },
      ],
    },
    {
      title: 'শিক্ষা ও পেশা',
      icon: <HiAcademicCap />,
      fields: [
        {
          label: 'সর্বোচ্চ শিক্ষাগত যোগ্যতা',
          id: 'maxEducation',
          type: 'text',
        },
        { label: 'শিক্ষা প্রতিষ্ঠান', id: 'institution', type: 'text' },
        { label: 'জবের অবস্থা', id: 'job', type: 'textarea' },
        { label: 'আপনার জবের পজিশন', id: 'jobPosition', type: 'textarea' },
        { label: 'ইনকাম', id: 'salary', type: 'text' },
      ],
    },
    {
      title: 'পারিবারিক তথ্য',
      icon: <HiUsers />,
      fields: [
        { label: 'বাবার পেশা', id: 'fatherProfession', type: 'text' },
        { label: 'মায়ের পেশা', id: 'motherProfession', type: 'text' },
        { label: 'পারিবারিক অবস্থা', id: 'familyStatus', type: 'textarea' },
        {
          label: 'ভাই বোনদের বিস্তারিত',
          id: 'siblingsDetails',
          type: 'textarea',
        },
        {
          label: 'আপনার/পরিবারের অর্থনৈতিক অবস্থা',
          id: 'economicalCondition',
          type: 'textarea',
        },
      ],
    },
    {
      title: 'ব্যক্তিগত তথ্য',
      icon: <HiUser />,
      fields: [
        { label: 'আপনার উচ্চতা', id: 'height', type: 'text' },
        { label: 'আপনার গায়ের রং', id: 'color', type: 'text' },
        { label: 'আপনার ওজন', id: 'weight', type: 'text' },
        { label: 'আপনার বৈবাহিক অবস্থা', id: 'maritalStatus', type: 'text' },
        {
          label: 'শারীরিক/মানসিক রোগ আছে?',
          id: 'physicalMentalConditions',
          type: 'textarea',
        },
      ],
    },
    {
      title: 'দ্বীনী অবস্থা',
      icon: <HiHeart />,
      fields: [
        {
          label: 'আপনার/পরিবারের দ্বীনী অবস্থা',
          id: 'deeniCondition',
          type: 'textarea',
        },
      ],
    },
  ];

  return (
    <div className="space-y-5">
      {sections.map((section) => (
        <div
          key={section.title}
          className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden"
        >
          {/* Section Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
            <span className="text-lg" style={{ color: Colors.primary900 }}>
              {section.icon}
            </span>
            <h4
              className="text-sm font-semibold"
              style={{ color: Colors.primary900 }}
            >
              {section.title}
            </h4>
          </div>

          {/* Section Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {section.fields.map((field) => (
              <div key={field.id}>
                <label
                  htmlFor={field.id}
                  className="block text-xs font-medium text-gray-500 mb-1.5"
                >
                  {field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    rows="3"
                    id={field.id}
                    value={formData[field.id]}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all resize-none bg-white"
                    placeholder={field.label}
                  />
                ) : (
                  <input
                    type="text"
                    id={field.id}
                    value={formData[field.id]}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all bg-white"
                    placeholder={field.label}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* About Me - Full Width */}
      <div className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
          <span className="text-lg" style={{ color: Colors.primary900 }}>
            <HiBriefcase />
          </span>
          <h4
            className="text-sm font-semibold"
            style={{ color: Colors.primary900 }}
          >
            নিজের সম্পর্কে
          </h4>
        </div>
        <div className="p-4">
          <textarea
            id="aboutMe"
            rows="4"
            value={formData.aboutMe}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all resize-none bg-white"
            placeholder="আপনার নিজের সম্পর্কে বিস্তারিত লিখুন..."
          />
        </div>
      </div>
    </div>
  );
};

export default SendMyBio;
