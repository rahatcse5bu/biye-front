/* eslint-disable no-unused-vars */
import {
	BiSolidDashboard,
	BiEdit,
	BiListCheck,
	BiListUl,
	BiSolidAddToQueue,
} from "react-icons/bi";

import { BsFlag, BsEmojiSmile } from "react-icons/bs";
import { FaQuestionCircle } from "react-icons/fa";

import { FiSettings, FiLogOut } from "react-icons/fi";

const sidebarDetails = [
	{
		icon: (
			<BiSolidDashboard className="h-6 w-6 p-1 bg-gray-100 rounded-md" />
		),
		title: "ড্যাশবোর্ড",
		path: "/user/account/dashboard",
	},
	{
		icon: (
			<BiEdit className="h-6 w-6 p-1 bg-gray-100 rounded-md" />
		),
		title: "বায়োডাটা এডিট করুন",
		path: "/user/account/edit-biodata",
	},
	{
		icon: (			<FaQuestionCircle className="h-6 w-6 p-1 bg-gray-100 rounded-md" />
		),
		title: "আমার প্রশ্ন সেট করুন",
		path: "/user/account/bio-questions",
	},
	{
		icon: (
			<BsEmojiSmile className="h-6 w-6 p-1 bg-gray-100 rounded-md" />
		),
		title: "আমার রিঅ্যাকশনসমূহ",
		path: "/user/account/reactions",
	},
	{
		icon: (			<BiListCheck className="h-6 w-6 p-1 bg-gray-100 rounded-md" />
		),
		title: "পছন্দের তালিকা ",
		path: "/user/account/likes",
	},
	{
		icon: (
			<BiListUl className="h-6 w-6 p-1 bg-gray-100 rounded-md" />
		),
		title: "অপছন্দের তালিকা ",
		path: "/user/account/dislikes",
	},
	{
		icon: (
			<BiListCheck className="h-6 w-6 p-1 bg-gray-100 rounded-md" />
		),
		title: "আমার শর্টলিস্ট",
		path: "/user/account/shortlist",
	},
	{
		icon: (
			<BiSolidAddToQueue className="h-6 w-6 p-1 bg-gray-100 rounded-md" />
		),
		title: "আমার বায়োডাটা ক্রয়সমূহ",
		path: "/user/account/purchases",
	},
	{
		icon: (
			<BiSolidAddToQueue className="h-6 w-6 p-1 bg-gray-100 rounded-md" />
		),
		title: "আমার বায়োডাটা অনুরোধসমূহ",
		path: "/user/account/bio-requests",
	},
	{
		icon: (
			<BiSolidAddToQueue className="h-6 w-6 p-1 bg-gray-100 rounded-md" />
		),
		title: "পেমেন্ট এবং রিফান্ড ",
		path: "/user/account/payment-and-refund",
	},
	{
		icon: (
			<BsFlag className="h-6 w-6 p-1 bg-gray-100 rounded-md" />
		),
		title: "সাপোর্ট & রিপোর্ট ",
		path: "/user/account/myreports",
	},
	{
		icon: (
			<FiSettings className="h-6 w-6 p-1 bg-gray-100 rounded-md" />
		),
		title: "সেটিংস ",
		path: "/user/account/settings",
	},
];

export { sidebarDetails };
