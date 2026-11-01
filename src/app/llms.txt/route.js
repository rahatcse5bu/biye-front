import { SITE_URL } from "@/lib/seo";
import { blogExcerpt, fetchBlogPosts } from "@/lib/blog";

export const revalidate = 3600;

const PAGES = [
  ["সকল বায়োডাটা", "/biodatas", "ধর্ম, বয়স, জেলা, পেশা ও শিক্ষা অনুযায়ী পাত্র-পাত্রীর বায়োডাটা খুঁজুন।"],
  ["বায়োডাটা জমা দিন", "/biodata-submit", "ধাপে ধাপে নিজের বা পরিবারের সদস্যের বিয়ের বায়োডাটা তৈরি করুন।"],
  ["পয়েন্ট প্যাকেজ", "/points-package", "যোগাযোগ তথ্য পেতে পয়েন্ট কেনার প্যাকেজ ও দাম।"],
  ["সাধারণ জিজ্ঞাসা", "/faq", "অনুরোধ, পয়েন্ট, পেমেন্ট ও অভিভাবকের সম্মতি নিয়ে প্রশ্নোত্তর।"],
  ["আমাদের সম্পর্কে", "/about-us", "বিবাহ কারা, কেন এবং কীভাবে কাজ করে।"],
  ["যোগাযোগ", "/contact-us", "সাপোর্ট টিমের ইমেইল ও ফোন নম্বর।"],
  ["ব্লগ", "/blog", "বিয়ে, বায়োডাটা ও জীবনসঙ্গী নির্বাচন নিয়ে লেখা।"],
  ["রিফান্ড পলিসি", "/refund-policy", "পয়েন্ট ও পেমেন্ট ফেরতের নিয়ম।"],
  ["ব্যবহারের শর্তাবলি", "/terms-and-condition", "প্ল্যাটফর্ম ব্যবহারের নিয়ম।"],
  ["প্রাইভেসি পলিসি", "/privacy-policy", "ব্যক্তিগত তথ্য কীভাবে সংরক্ষণ ও ব্যবহার করা হয়।"],
];

export async function GET() {
  // TODO: a backend outage must not 500 llms.txt; the blog section is simply left out.
  const { posts } = await fetchBlogPosts(1, 50).catch(() => ({ posts: [] }));
  const link = ([title, path, note]) => `- [${title}](${SITE_URL}${path}): ${note}`;

  const body = [
    "# বিবাহ (Bibaho)",
    "",
    "> বিবাহ বাংলাদেশের একটি ম্যাট্রিমনি প্ল্যাটফর্ম। সব ধর্মের পাত্র-পাত্রী ও তাদের অভিভাবকেরা এখানে বিয়ের বায়োডাটা জমা দেন এবং পছন্দের বায়োডাটা খুঁজে অভিভাবকের সাথে যোগাযোগ করেন।",
    "",
    "Bibaho is a Bangladeshi matrimony site for every religion. Biodatas are published only with a guardian's consent. Contact details are unlocked in two steps: a request (30 points) that the biodata owner approves, then the guardian's contact (70 points). Points are bought with bKash.",
    "",
    "## প্রধান পাতা",
    "",
    ...PAGES.map(link),
    ...(posts.length
      ? ["", "## ব্লগ", "", ...posts.map((post) => link([post.title, `/blog/${encodeURIComponent(post.slug)}`, blogExcerpt(post).replace(/\s+/g, " ")]))]
      : []),
    "",
    "## Optional",
    "",
    `- [Sitemap](${SITE_URL}/sitemap-v2.xml): বায়োডাটা ও ব্লগসহ সব পাবলিক পাতার তালিকা।`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
