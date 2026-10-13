export const educationTypeOptions = [
  {
    value: 'জেনারেল',
  },
  {
    value: 'কওমি',
  },
  {
    value: 'আলিয়া',
  },
];
// TODO: values are stored as-is, so existing ones never change; only labels say running (চলমান) or completed (সম্পন্ন).
export const educationOptions = [
  { value: "এস.এস.সি'র নিচে" },
  { value: 'এস.এস.সি চলমান', label: 'এস.এস.সি / দাখিল চলমান' },
  { value: 'এস.এস.সি', label: 'এস.এস.সি / দাখিল সম্পন্ন' },
  { value: 'এইচ.এস.সি চলমান', label: 'এইচ.এস.সি / আলিম চলমান' },
  { value: 'এইচ.এস.সি', label: 'এইচ.এস.সি / আলিম সম্পন্ন' },
  { value: 'ডিপ্লোমা চলমান' },
  { value: 'ডিপ্লোমা', label: 'ডিপ্লোমা সম্পন্ন' },
  { value: 'স্নাতক চলমান', label: 'স্নাতক (অনার্স) / ফাজিল চলমান' },
  { value: 'স্নাতক', label: 'স্নাতক (অনার্স) / ফাজিল সম্পন্ন' },
  { value: 'স্নাতকোত্তর চলমান', label: 'স্নাতকোত্তর (মাস্টার্স) / কামিল চলমান' },
  { value: 'স্নাতকোত্তর', label: 'স্নাতকোত্তর (মাস্টার্স) / কামিল সম্পন্ন' },
  { value: 'পিএইচডি চলমান' },
  { value: 'ডক্টরেট', label: 'পিএইচডি / ডক্টরেট সম্পন্ন' },
  { value: 'বিএড চলমান' },
  { value: 'বিএড', label: 'বিএড সম্পন্ন' },
  { value: 'এমএড চলমান' },
  { value: 'এমএড', label: 'এমএড সম্পন্ন' },
  { value: 'এমফিল চলমান' },
  { value: 'এমফিল', label: 'এমফিল সম্পন্ন' },
  { value: 'পোস্ট ডক চলমান' },
  { value: 'পোস্ট ডক', label: 'পোস্ট ডক সম্পন্ন' },
];

// TODO: each level shows the blocks of every stage before it; "Running" blocks ask the current year instead of the pass year.
export const LEVEL_BLOCKS = {
  "এস.এস.সি'র নিচে": ['belowSsc'],
  'এস.এস.সি চলমান': ['sscRunning'],
  'এস.এস.সি': ['ssc', 'sscNext'],
  'এইচ.এস.সি চলমান': ['ssc', 'hscRunning'],
  'এইচ.এস.সি': ['ssc', 'hsc'],
  'ডিপ্লোমা চলমান': ['ssc', 'diplomaRunning'],
  'ডিপ্লোমা': ['ssc', 'diploma'],
  'স্নাতক চলমান': ['ssc', 'afterSsc', 'honsRunning'],
  'স্নাতক': ['ssc', 'afterSsc', 'hons'],
  'স্নাতকোত্তর চলমান': ['ssc', 'afterSsc', 'hons', 'mscRunning'],
  'স্নাতকোত্তর': ['ssc', 'afterSsc', 'hons', 'msc'],
  'পিএইচডি চলমান': ['ssc', 'afterSsc', 'hons', 'msc', 'phdRunning'],
  'ডক্টরেট': ['ssc', 'afterSsc', 'hons', 'msc', 'phd'],
  'বিএড চলমান': ['ssc', 'afterSsc', 'hons', 'bedRunning'],
  'বিএড': ['ssc', 'afterSsc', 'hons', 'bed'],
  'এমএড চলমান': ['ssc', 'afterSsc', 'hons', 'bed', 'medRunning'],
  'এমএড': ['ssc', 'afterSsc', 'hons', 'bed', 'med'],
  'এমফিল চলমান': ['ssc', 'afterSsc', 'hons', 'msc', 'mphilRunning'],
  'এমফিল': ['ssc', 'afterSsc', 'hons', 'msc', 'mphil'],
  'পোস্ট ডক চলমান': ['ssc', 'afterSsc', 'hons', 'msc', 'phd', 'postdocRunning'],
  'পোস্ট ডক': ['ssc', 'afterSsc', 'hons', 'msc', 'phd', 'postdoc'],
};

// TODO: fields added with the running/professional levels; kept in one state object in the form.
export const EXTRA_EDU_FIELDS = [
  'ssc_inst', 'after_ssc_inst',
  'ssc_exam_year',
  'msc_running_year',
  'phd_running_year',
  'bed_inst', 'bed_running_year', 'bed_pass_year',
  'med_inst', 'med_running_year', 'med_pass_year',
  'mphil_sub', 'mphil_inst', 'mphil_running_year', 'mphil_pass_year',
  'postdoc_sub', 'postdoc_inst', 'postdoc_running_year', 'postdoc_pass_year',
];
export const classType = [
  { value: '১০ম' },
  { value: '৯ম' },
  { value: '৮ম' },
  { value: '৭ম' },
  { value: '৬ষ্ঠ' }, // This value remains unchanged
  { value: '৫ম' },
  { value: '৪র্থ' }, // This value remains unchanged
  { value: '৩য়' }, // This value remains unchanged
  { value: '২য়' }, // This value remains unchanged
  { value: '১ম' },
];
export const group = [
  { value: 'বিজ্ঞান বিভাগ' },
  { value: 'ব্যবসা বিভাগ' },
  { value: 'মানবিক বিভাগ' },
  { value: 'ভোকেশনাল' },
];
export const result = [
  { value: 'A+ (All Subjects)' },
  { value: 'A+' },
  { value: 'A' },
  { value: 'A-' },
  { value: 'B' },
  { value: 'C' },
  { value: 'D' },
];
export const hscOptions = [
  { value: 'HSC প্রথম বর্ষ' },
  { value: 'HSC দ্বিতীয় বর্ষ' },
  { value: 'এখনো HSC রেজাল্ট দেয় নি' },
  { value: 'SSC এর পর আর পড়াশোনা করা হয় নি' },
];
export const deenStatusOptions = [
  { value: 'হাফেজ', label: 'হাফেজ' },
  { value: 'মাওলানা', label: 'মাওলানা' },
  { value: 'মুফতি', label: 'মুফতি' },
  { value: 'মুফাসসির', label: 'মুফাসসির' },
  { value: 'আদিব', label: 'আদিব' },
];
export const afterSscOptions = [
  {
    value: 'HSC',
  },
  {
    value: 'ডিপ্লোমা',
  },
];

export const qawmiEducationOptions = [
  { value: 'প্রাথমিক দ্বীনি শিক্ষা' },
  { value: 'ইবতিদাইয়্যাহ' },
  { value: 'মুতাওয়াসসিতাহ' },
  { value: 'সানাবিয়া উলইয়া' },
  { value: 'ফযীলত' },
  { value: 'তাকমীল' },
  { value: 'তাখাসসুস' },
];

export const qawmiResult = [
  { value: 'মুমতায' },
  { value: 'জায়্যিদ জিদ্দান' },
  { value: 'জায়্যিদ' },
  { value: 'মাকবুল' },
];
