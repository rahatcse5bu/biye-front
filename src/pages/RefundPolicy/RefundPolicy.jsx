// import React from 'react';
import { Colors } from "../../constants/colors";
function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-screen-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1
          className="text-xl md:text-2xl lg:text-3xl font-semibold text-center mb-8"
          style={{ color: Colors.titleText }}
        >
          রিফান্ড পলিসি
        </h1>

        <p className="text-gray-700 mb-6">
          আমি কি রিফান্ড রিকুয়েস্ট করতে পারবো?
          <p>
            {" "}
            জ্বি। আপনি আপনার একাউন্টে পর্যাপ্ত পয়েন্ট থাকা সাপেক্ষে রিফান্ড
            রিকুয়েস্ট করতে পারবেন।
          </p>
        </p>

        <p className="text-gray-700 mb-6">
          রিফান্ড পলিসি কিরকম?{" "}
          <p>
            আপনার একাউন্টে পর্যাপ্ত পয়েন্ট থাকা সাপেক্ষে শুধু রিফান্ড রিকুয়েস্ট
            করতে পারবেন! পেমেন্ট করার ৬ ঘন্টার মধ্যে রিফান্ড রিকুয়েস্ট করলে
            স্বাভাবিক রিফান্ড পাবেন ইনশাআল্লহ। পেমেন্ট করার ৬ ঘন্টা পর কিংবা ৩
            দিনের মধ্যে রিফান্ড রিকুয়েস্ট করলে ১.৫ পয়েন্ট=১৳ রেটে রিফান্ড পাবেন।
          </p>
        </p>

        <p className="text-gray-700 mb-6">
          কতদিন পর্যন্ত রিফান্ড রিকুয়েস্ট করতে পারবো?{" "}
          <p>৩ দিন পর্যন্ত রিফান্ড রিকুয়েস্ট করতে পারবেন।</p>
        </p>

        <p className="text-gray-700 mb-6">
          কাস্টম এমাউন্ট রিফান্ড করতে পারবো?{" "}
          <p>
            না, পারবেন না। আপনার করা ট্রান্সজেকশনের বিপরীতে শুধুমাত্র রিফান্ড
            রিকুয়েস্ট করতে পারবেন।
          </p>
        </p>

        <p className="text-gray-700 mb-6">
          রিফান্ড পেতে কতদিন লাগতে পারে?{" "}
          <p>নির্ভর করে। সর্বোচ্চ ৩ কার্যদিবসের মধ্যে রিফান্ড পাবেন।</p>
        </p>
      </div>
    </div>
  );
}

export default RefundPolicy;
