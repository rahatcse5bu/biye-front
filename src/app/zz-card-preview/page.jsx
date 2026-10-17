'use client';

import BioData from '@/components/BioData/BioData';

const base = { gender: 'পুরুষ', date_of_birth: '1996-04-12', height: "5'7", screen_color: 'উজ্জ্বল শ্যামলা', upzilla: 'সাভার', views_count: 128 };
const cards = [
  { ...base, _id: 'a', user_id: 1001, religion: 'islam', religious_type: 'practicing_muslim' },
  { ...base, _id: 'b', user_id: 1002, religion: 'hinduism', gender: 'মহিলা' },
  { ...base, _id: 'c', user_id: 1003, religion: 'christianity', religious_type: 'practicing_christian' },
  { ...base, _id: 'd', user_id: 1004, religion: 'islam', gender: 'মহিলা' },
  { ...base, _id: 'e', user_id: 1005, religion: 'হিন্দু', religious_type: 'practicing_hindu' },
  { ...base, _id: 'f', user_id: 1006, religion: 'খ্রিস্টান', gender: 'মহিলা' },
];

export default function Preview() {
  return (
    <div className="grid grid-cols-3 gap-6 bg-[#F7F9F9] p-6" style={{ width: 1000 }}>
      {cards.map((b) => <BioData key={b._id} biodata={b} />)}
    </div>
  );
}
