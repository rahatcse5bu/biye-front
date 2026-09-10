import { Colors } from "../../../constants/colors";

function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <article className="max-w-screen-md mx-auto bg-white p-6 rounded-lg shadow-md" aria-labelledby="refund-title">
        <h1
          id="refund-title"
          className="text-xl md:text-2xl lg:text-3xl font-semibold text-center mb-8"
          style={{ color: Colors.titleText }}
        >
          রিফান্ড পলিসি
        </h1>

        <section lang="bn" aria-labelledby="refund-bn-title">
          <h2 id="refund-bn-title" className="text-xl font-semibold mb-6" style={{ color: Colors.titleText }}>
            বাংলা সংস্করণ
          </h2>
          <section className="text-gray-700 mb-6">
            <h3 className="mb-2 font-semibold">আমি কি রিফান্ড রিকুয়েস্ট করতে পারবো?</h3>
            <p>
              জ্বি। আপনি আপনার একাউন্টে পর্যাপ্ত পয়েন্ট থাকা সাপেক্ষে রিফান্ড
              রিকুয়েস্ট করতে পারবেন।
            </p>
          </section>

          <section className="text-gray-700 mb-6">
            <h3 className="mb-2 font-semibold">রিফান্ড পলিসি কিরকম?</h3>
            <p>
              আপনার একাউন্টে পর্যাপ্ত পয়েন্ট থাকা সাপেক্ষে শুধু রিফান্ড রিকুয়েস্ট
              করতে পারবেন! পেমেন্ট করার ৬ ঘন্টার মধ্যে রিফান্ড রিকুয়েস্ট করলে
              স্বাভাবিক রিফান্ড পাবেন ইনশাআল্লহ। পেমেন্ট করার ৬ ঘন্টা পর কিংবা ৩
              দিনের মধ্যে রিফান্ড রিকুয়েস্ট করলে ১.৫ পয়েন্ট=১৳ রেটে রিফান্ড পাবেন।
            </p>
          </section>

          <section className="text-gray-700 mb-6">
            <h3 className="mb-2 font-semibold">কতদিন পর্যন্ত রিফান্ড রিকুয়েস্ট করতে পারবো?</h3>
            <p>৩ দিন পর্যন্ত রিফান্ড রিকুয়েস্ট করতে পারবেন।</p>
          </section>

          <section className="text-gray-700 mb-6">
            <h3 className="mb-2 font-semibold">কাস্টম এমাউন্ট রিফান্ড করতে পারবো?</h3>
            <p>
              না, পারবেন না। আপনার করা ট্রান্সজেকশনের বিপরীতে শুধুমাত্র রিফান্ড
              রিকুয়েস্ট করতে পারবেন।
            </p>
          </section>

          <section className="text-gray-700">
            <h3 className="mb-2 font-semibold">রিফান্ড পেতে কতদিন লাগতে পারে?</h3>
            <p>নির্ভর করে। সর্বোচ্চ ৩ কার্যদিবসের মধ্যে রিফান্ড পাবেন।</p>
          </section>
        </section>

        <section lang="en" aria-labelledby="refund-en-title" className="mt-10 border-t border-gray-200 pt-8">
          <h2 id="refund-en-title" className="text-xl font-semibold mb-6" style={{ color: Colors.titleText }}>
            Refund Policy — English Version
          </h2>
          <section className="text-gray-700 mb-6">
            <h3 className="mb-2 font-semibold">Can I request a refund?</h3>
            <p>Yes. You can request a refund provided you have sufficient points in your account.</p>
          </section>

          <section className="text-gray-700 mb-6">
            <h3 className="mb-2 font-semibold">What is the refund policy?</h3>
            <p>
              You can only request a refund if you have sufficient points in your
              account. If you request a refund within 6 hours of payment, you will
              receive the standard refund, InshaAllah. If you request a refund
              after 6 hours or within 3 days of payment, you will receive a refund
              at a rate of 1.5 points = ৳1.
            </p>
          </section>

          <section className="text-gray-700 mb-6">
            <h3 className="mb-2 font-semibold">How long do I have to request a refund?</h3>
            <p>You can request a refund for up to 3 days.</p>
          </section>

          <section className="text-gray-700 mb-6">
            <h3 className="mb-2 font-semibold">Can I request a refund for a custom amount?</h3>
            <p>No. You can only request a refund against a transaction you have made.</p>
          </section>

          <section className="text-gray-700">
            <h3 className="mb-2 font-semibold">How long does it take to receive a refund?</h3>
            <p>It depends. You will receive your refund within a maximum of 3 working days.</p>
          </section>
        </section>
      </article>
    </div>
  );
}

export default RefundPolicy;
