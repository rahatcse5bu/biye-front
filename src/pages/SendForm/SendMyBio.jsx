import React from 'react';
import { Colors } from '../../constants/colors';
const SendMyBio = () => {
    return (
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4"  >
        {/* Column 1 */}
        <div>
          <label  style={{ color: Colors.titleText }} htmlFor="upzilla" className="block text-sm font-medium text-gray-700">আপনার উপজেলা</label>
          <input type="text" id="upzilla" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>

        <div>
          <label  style={{ color: Colors.titleText }} htmlFor="zilla" className="block text-sm font-medium text-gray-700">আপনার জিলা</label>
          <input type="text" id="zilla" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>

        <div>
          <label  style={{ color: Colors.titleText }} htmlFor="max-education" className="block text-sm font-medium text-gray-700">সর্বোচ্চ শিক্ষাগত যোগ্যতা</label>
          <input type="text" id="max-education" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>

        <div>
          <label  style={{ color: Colors.titleText }} htmlFor="institution" className="block text-sm font-medium text-gray-700">শিক্ষা প্রতিষ্ঠান</label>
          <input type="text" id="institution" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>

        {/* Column 2 */}
        <div>
          <label  style={{ color: Colors.titleText }} htmlFor="job" className="block text-sm font-medium text-gray-700">জবের অবস্থা</label>
          <textarea  rows="3" id="job" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>

        <div>
          <label  style={{ color: Colors.titleText }} htmlFor="salary" className="block text-sm font-medium text-gray-700">ইনকাম</label>
          <textarea  rows="3" id="salary" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>

        <div>
          <label  style={{ color: Colors.titleText }} htmlFor="father-profession" className="block text-sm font-medium text-gray-700">বাবার পেশা</label>
          <input type="text" id="father-profession" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>

        <div>
          <label  style={{ color: Colors.titleText }} htmlFor="mother-profession" className="block text-sm font-medium text-gray-700">মায়ের পেশা</label>
          <textarea  rows="3" id="mother-profession" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>

        <div>
          <label  style={{ color: Colors.titleText }} htmlFor="family-status" className="block text-sm font-medium text-gray-700">পারিবারিক অবস্থা</label>
          <textarea  rows="3" id="family-status" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>

        <div>
          <label  style={{ color: Colors.titleText }} htmlFor="no-of-siblings" className="block text-sm font-medium text-gray-700">ভাই বোনদের বিস্তারিত</label>
          <textarea  rows="3" id="siblings-details" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>

        <div>
          <label  style={{ color: Colors.titleText }} htmlFor="deeni-condition" className="block text-sm font-medium text-gray-700">আপনার/পরিবারের দ্বীনি অবস্থা</label>
          <textarea id="deeni-condition" rows="3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
        </div>

        <div>
          <label  style={{ color: Colors.titleText }} htmlFor="economical-condition" className="block text-sm font-medium text-gray-700">আপনার/পরিবারের অর্থনৈতিক অবস্থা</label>
          <textarea id="economical-condition" rows="3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
        </div>

        {/* Additional Fields */}
        <div>
          <label  style={{ color: Colors.titleText }} htmlFor="height" className="block text-sm font-medium text-gray-700">আপনার উচ্চতা</label>
          <input type="text" id="height" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>

        <div>
          <label  style={{ color: Colors.titleText }} htmlFor="color" className="block text-sm font-medium text-gray-700">আপনার গায়ের রং</label>
          <input type="text" id="color" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>

        <div>
          <label  style={{ color: Colors.titleText }} htmlFor="weight" className="block text-sm font-medium text-gray-700"> আপনার ওজন</label>
          <input type="text" id="weight" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>

        <div>
          <label  style={{ color: Colors.titleText }} htmlFor="job-position" className="block text-sm font-medium text-gray-700"> আপনার  জবের অবস্থা</label>
          <textarea  rows="3" id="job-position" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>

        <div>
          <label  style={{ color: Colors.titleText }} htmlFor="marital-status" className="block text-sm font-medium text-gray-700">আপনার বৈবাহিক অবস্থা</label>
          <textarea  rows="3" id="marital-status" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div>
          <label  style={{ color: Colors.titleText }} htmlFor="marital-status" className="block text-sm font-medium text-gray-700">আপনার শারীরিক মানসিক রোগ আছে?</label>
          <textarea  rows="3" id="marital-status" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>

        {/* New "About Me" Field */}
        <div className="md:col-span-2">
          <label  style={{ color: Colors.titleText }} htmlFor="about-me" className="block text-sm font-medium text-gray-700">আপনার নিজের সম্পর্কে লিখুন</label>
          <textarea id="about-me" rows="4" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
        </div>
      </form>
    );
};

export default SendMyBio;