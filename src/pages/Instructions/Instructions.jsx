import { Colors } from '../../constants/colors';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
const Instructions = () => {
  return (
    <div className="max-w-2xl mx-auto mt-8 mb-8">
      <h1
        className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4"
        style={{ color: Colors.titleText }}
      >
        নির্দেশনা সমুহ
      </h1>
      <div>
        <h4
          className="text-md md:text-lg lg:text-xl font-semibold mb-4"
          style={{ color: Colors.titleText }}
        >
          PNC নিকাহ তে কিভাবে পাত্রের বায়োডাটা দিতে হয়? How to create
          bridegroom&apos;s biodata on PNC NIkah for free || PNC Nikah
        </h4>

        <div className="my-10"></div>
        <h6
          className="text-md text-left  md:text-lg lg:text-xl font-semibold mb-4"
          style={{ color: Colors.titleText }}
        >
          1. PNC নিকাহতে মোবাইল দিয়ে কিভাবে পাত্রীর বায়োডাটা ফ্রীতে দিতে হয়?
        </h6>
        <LiteYouTubeEmbed
          id="NXNa1NAvMbI"
          title="PNC নিকাহতে মোবাইল দিয়ে কিভাবে পাত্রীর বায়োডাটা ফ্রীতে দিতে হয়?"
        />
        <div className="my-10"></div>
        <h6
          className="text-md text-left  md:text-lg lg:text-xl font-semibold mb-4"
          style={{ color: Colors.titleText }}
        >
          2. PNC নিকাহতে ল্যাপটপ দিয়ে কিভাবে পাত্রীর বায়োডাটা ফ্রীতে দিতে হয়?
        </h6>
        <LiteYouTubeEmbed
          id="26Kj5LuD2DY"
          title="PNC নিকাহ তে কিভাবে পাত্রের বায়োডাটা দিতে হয়? How to create bridegroom's biodata on PNC NIkah  for free || PNC Nikah"
        />
      </div>
    </div>
  );
};

export default Instructions;
