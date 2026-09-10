import { Colors } from "../../../constants/colors";

function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <article className="max-w-screen-md mx-auto bg-white p-6 rounded-lg shadow-md" aria-labelledby="terms-title">
        <h1
          id="terms-title"
          className="text-xl md:text-2xl lg:text-3xl font-semibold text-center mb-8"
          style={{ color: Colors.titleText }}
        >
          ব্যবহারের শর্তাবলি
        </h1>

        <section lang="bn" aria-labelledby="terms-bn-title">
          <h2 id="terms-bn-title" className="text-xl font-semibold mb-6" style={{ color: Colors.titleText }}>
            বাংলা সংস্করণ
          </h2>
          <p className="text-gray-700 mb-6">
            আমাদের ওয়েবসাইট ব্যবহার করার আগে অনুগ্রহ করে এই শর্তাবলি মনোযোগ দিয়ে
            পড়ুন। সেবায় প্রবেশ বা সেবা ব্যবহারের মাধ্যমে আপনি এই শর্তাবলি মেনে
            চলতে সম্মত হচ্ছেন। শর্তাবলির কোনো অংশের সঙ্গে একমত না হলে অনুগ্রহ করে
            আমাদের ওয়েবসাইট ব্যবহার করবেন না।
          </p>

          <h3 className="text-2xl font-semibold mb-4">১. ওয়েবসাইটের ব্যবহার</h3>
          <p className="text-gray-700 mb-6">
            এই ওয়েবসাইটটি কেবল সাধারণ তথ্য ও ব্যবহারের জন্য। পূর্বঘোষণা ছাড়াই
            এটি পরিবর্তিত হতে পারে।
          </p>

          <h3 className="text-2xl font-semibold mb-4">২. গোপনীয়তা নীতিমালা</h3>
          <p className="text-gray-700 mb-6">
            এই ওয়েবসাইটের ব্যবহার আমাদের গোপনীয়তা নীতিমালারও অধীন। আমাদের
            কার্যপদ্ধতি বুঝতে অনুগ্রহ করে আমাদের{" "}
            <a href="/privacy-policy" className="underline underline-offset-2">গোপনীয়তা নীতিমালা</a>{" "}
            পড়ুন।
          </p>

          <h3 className="text-2xl font-semibold mb-4">৩. বিষয়বস্তু</h3>
          <p className="text-gray-700 mb-6">
            এই ওয়েবসাইটের বিষয়বস্তু কেবল আপনার সাধারণ তথ্য ও ব্যবহারের জন্য।
            পূর্বঘোষণা ছাড়াই এটি পরিবর্তিত হতে পারে।
          </p>

          <h3 className="text-2xl font-semibold mb-4">৪. দায়সংক্রান্ত ঘোষণা</h3>
          <p className="text-gray-700 mb-6">
            এই ওয়েবসাইটের কোনো তথ্য বা উপকরণ ব্যবহার সম্পূর্ণরূপে আপনার নিজস্ব
            ঝুঁকিতে হবে।
          </p>

          <h3 className="text-2xl font-semibold mb-4">৫. শর্তাবলির পরিবর্তন</h3>
          <p className="text-gray-700 mb-6">
            আমরা পূর্বঘোষণা ছাড়াই যেকোনো সময় এই শর্তাবলি সংশোধন করতে পারি। এই
            ওয়েবসাইট ব্যবহারের মাধ্যমে আপনি এই শর্তাবলির বর্তমান সংস্করণ মেনে
            চলতে সম্মত হচ্ছেন।
          </p>

          <h3 className="text-2xl font-semibold mb-4">৬. যোগাযোগ করুন</h3>
          <p className="text-gray-700">
            এই শর্তাবলি সম্পর্কে আপনার কোনো প্রশ্ন থাকলে অনুগ্রহ করে আমাদের সঙ্গে{" "}
            <a href="/contact-us" className="underline underline-offset-2">যোগাযোগ করুন</a>।
          </p>
        </section>

        <section lang="en" aria-labelledby="terms-en-title" className="mt-10 border-t border-gray-200 pt-8">
          <h2 id="terms-en-title" className="text-xl font-semibold mb-6" style={{ color: Colors.titleText }}>
            Terms and Conditions — English Version
          </h2>
          <p className="text-gray-700 mb-6">
            Please read these Terms and Conditions carefully before using our
            website. By accessing or using the service, you agree to be bound by
            these Terms. If you disagree with any part of the terms, please do not
            use our website.
          </p>

          <h3 className="text-2xl font-semibold mb-4">1. Use of Website</h3>
          <p className="text-gray-700 mb-6">
            This website is for general information and use only. It is subject to
            change without notice.
          </p>

          <h3 className="text-2xl font-semibold mb-4">2. Privacy Policy</h3>
          <p className="text-gray-700 mb-6">
            Your use of this website is also governed by our Privacy Policy.
            Please review our <a href="/privacy-policy" className="underline underline-offset-2">Privacy Policy</a> to understand our practices.
          </p>

          <h3 className="text-2xl font-semibold mb-4">3. Content</h3>
          <p className="text-gray-700 mb-6">
            The content of this website is for your general information and use
            only. It is subject to change without notice.
          </p>

          <h3 className="text-2xl font-semibold mb-4">4. Disclaimer</h3>
          <p className="text-gray-700 mb-6">
            The use of any information or materials on this website is entirely at
            your own risk.
          </p>

          <h3 className="text-2xl font-semibold mb-4">5. Changes to Terms and Conditions</h3>
          <p className="text-gray-700 mb-6">
            We may revise these Terms and Conditions at any time without prior
            notice. By using this website, you are agreeing to be bound by the
            current version of these Terms and Conditions.
          </p>

          <h3 className="text-2xl font-semibold mb-4">6. Contact Us</h3>
          <p className="text-gray-700">
            If you have any questions about these Terms and Conditions, please{" "}
            <a href="/contact-us" className="underline underline-offset-2">contact us</a>.
          </p>
        </section>
      </article>
    </div>
  );
}

export default TermsAndConditions;
