import {
  BookmarkIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  FaceSmileIcon,
  HandThumbDownIcon,
  HeartIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PencilSquareIcon,
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';

// TODO: grouped account menu; Icon is a component so the sidebar can colour it for the active page.
const sidebarSections = [
  {
    title: 'বায়োডাটা',
    items: [
      { Icon: Squares2X2Icon, title: 'ড্যাশবোর্ড', path: '/user/account/dashboard' },
      { Icon: PencilSquareIcon, title: 'বায়োডাটা এডিট করুন', path: '/user/account/edit-biodata' },
      { Icon: QuestionMarkCircleIcon, title: 'আমার প্রশ্ন সেট করুন', path: '/user/account/bio-questions' },
    ],
  },
  {
    title: 'আমার তালিকা',
    items: [
      { Icon: FaceSmileIcon, title: 'আমার রিঅ্যাকশনসমূহ', path: '/user/account/reactions' },
      { Icon: HeartIcon, title: 'পছন্দের তালিকা', path: '/user/account/likes' },
      { Icon: HandThumbDownIcon, title: 'অপছন্দের তালিকা', path: '/user/account/dislikes' },
      { Icon: BookmarkIcon, title: 'আমার শর্টলিস্ট', path: '/user/account/shortlist' },
    ],
  },
  {
    title: 'প্রস্তাব ও পেমেন্ট',
    items: [
      { Icon: ShoppingBagIcon, title: 'আমার বায়োডাটা ক্রয়সমূহ', path: '/user/account/purchases' },
      { Icon: InboxArrowDownIcon, title: 'আমার বায়োডাটা অনুরোধসমূহ', path: '/user/account/bio-requests' },
      { Icon: CreditCardIcon, title: 'পেমেন্ট এবং রিফান্ড', path: '/user/account/payment-and-refund' },
    ],
  },
  {
    title: 'সহায়তা',
    items: [
      { Icon: LifebuoyIcon, title: 'সাপোর্ট ও রিপোর্ট', path: '/user/account/myreports' },
      { Icon: Cog6ToothIcon, title: 'সেটিংস', path: '/user/account/settings' },
    ],
  },
];

export { sidebarSections };
