import { useState } from "react";
import { Colors } from "../../constants/colors";
import { convertToBengaliDigits } from "../../utils/language";

const toBn = (value) => convertToBengaliDigits(String(value));

// TODO: mirrors the backend rule: a matching package price wins, otherwise the custom rate rounded down.
const previewPoints = (amount, settings, packages) => {
  const matched = packages.find((item) => item.price === amount);
  if (matched) return matched.points;
  return Math.floor(amount * settings.points_per_taka + 1e-9);
};

export default function CustomPointsCard({ settings, packages, onBuy }) {
  const [value, setValue] = useState("");
  const amount = Number(value);
  const isWhole = value !== "" && Number.isInteger(amount);
  const tooLow = isWhole && amount < settings.min_amount;
  const tooHigh = isWhole && amount > settings.max_amount;
  const isValid = isWhole && !tooLow && !tooHigh;

  let hint = `সর্বনিম্ন ${toBn(settings.min_amount)} টাকা, সর্বোচ্চ ${toBn(settings.max_amount)} টাকা`;
  if (value !== "" && !isWhole) hint = "শুধু পূর্ণ সংখ্যায় টাকার পরিমাণ লিখুন";
  else if (tooLow) hint = `কমপক্ষে ${toBn(settings.min_amount)} টাকা লিখুন`;
  else if (tooHigh) hint = `সর্বোচ্চ ${toBn(settings.max_amount)} টাকা পর্যন্ত কেনা যাবে`;

  const submit = (event) => {
    event.preventDefault();
    if (isValid) onBuy(amount);
  };

  return (
    <form
      onSubmit={submit}
      className="mx-auto mt-8 max-w-xl rounded-lg border bg-white p-6 shadow-md"
      style={{ borderColor: Colors.titleText }}
    >
      <h2
        className="text-xl font-semibold text-center"
        style={{ color: Colors.titleText }}
      >
        কাস্টম পয়েন্ট কিনুন
      </h2>
      <p className="mt-1 text-center text-sm text-gray-500">
        প্রতি ১ টাকায় {toBn(settings.points_per_taka)} পয়েন্ট — আপনার প্রয়োজন মতো পরিমাণ লিখুন
      </p>

      <label htmlFor="custom-points-amount" className="mt-5 block text-sm font-medium text-gray-700">
        টাকার পরিমাণ
      </label>
      <div className="mt-1 flex items-center rounded-lg border border-gray-300 focus-within:border-transparent focus-within:ring-2 focus-within:ring-[#0D7377]">
        <span className="pl-3 text-gray-500">৳</span>
        <input
          id="custom-points-amount"
          type="number"
          inputMode="numeric"
          min={settings.min_amount}
          max={settings.max_amount}
          step={1}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={String(settings.min_amount)}
          className="w-full rounded-lg border-0 bg-transparent px-2 py-2.5 text-gray-900 outline-none focus:ring-0"
          aria-describedby="custom-points-hint"
        />
      </div>
      <p
        id="custom-points-hint"
        className={`mt-1 text-xs ${value !== "" && !isValid ? "text-red-600" : "text-gray-500"}`}
      >
        {hint}
      </p>

      <div className="mt-4 rounded-lg bg-gray-50 px-4 py-3 text-center">
        <span className="text-sm text-gray-500">আপনি পাবেন </span>
        <span className="text-2xl font-bold" style={{ color: Colors.titleText }}>
          {toBn(isValid ? previewPoints(amount, settings, packages) : 0)}
        </span>
        <span className="text-sm text-gray-500"> পয়েন্ট</span>
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="mt-4 w-full rounded py-2.5 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
        style={{
          background: `linear-gradient(to right,${Colors.lnLeft},${Colors.lnRight})`,
        }}
      >
        Buy With Bkash
      </button>
    </form>
  );
}
