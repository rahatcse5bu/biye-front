import { useState } from "react";
import { CalculatorIcon } from "@heroicons/react/24/outline";
import { convertToBengaliDigits } from "../../utils/language";
import ButtonSpinner from "./ButtonSpinner";

const toBn = (value) => convertToBengaliDigits(String(value));

// TODO: mirrors the backend rule: a matching package price wins, otherwise the custom rate rounded down.
const previewPoints = (amount, settings, packages) => {
  const matched = packages.find((item) => item.price === amount);
  if (matched) return matched.points;
  return Math.floor(amount * settings.points_per_taka + 1e-9);
};

export default function CustomPointsCard({ settings, packages, onBuy, loading = false, disabled = false }) {
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
    if (isValid && !disabled) onBuy(amount);
  };

  const points = isValid ? previewPoints(amount, settings, packages) : 0;
  const invalid = value !== "" && !isValid;

  return (
    <form
      onSubmit={submit}
      className="mt-8 grid gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:grid-cols-[1fr_1.1fr] md:items-center md:gap-10 md:p-8"
    >
      <div>
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-900/10 text-brand-900">
          <CalculatorIcon className="h-6 w-6" aria-hidden="true" />
        </span>
        <h2 className="mt-4 text-xl font-bold text-gray-900">নিজের পরিমাণে পয়েন্ট কিনুন</h2>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          প্যাকেজ না নিয়ে প্রয়োজন মতো টাকার পরিমাণ লিখুন। প্রতি ১ টাকায়{" "}
          <b className="text-gray-900">{toBn(settings.points_per_taka)} পয়েন্ট</b>।
        </p>
      </div>

      <div>
        <label htmlFor="custom-points-amount" className="block text-sm font-semibold text-gray-700">
          টাকার পরিমাণ
        </label>
        <div
          className={`mt-1.5 flex items-center rounded-xl border bg-white transition-colors focus-within:ring-2 ${
            invalid ? "border-red-300 focus-within:ring-red-200" : "border-gray-200 focus-within:border-brand-900 focus-within:ring-brand-900/15"
          }`}
        >
          <span className="pl-4 text-lg font-semibold text-gray-400">৳</span>
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
            className="w-full rounded-xl border-0 bg-transparent px-2 py-3 text-lg font-semibold text-gray-900 outline-none focus:ring-0"
            aria-invalid={invalid || undefined}
            aria-describedby="custom-points-hint"
          />
          <span className="whitespace-nowrap pr-4 text-sm text-gray-500" aria-live="polite">
            = <b className="text-brand-900">{toBn(points)}</b> পয়েন্ট
          </span>
        </div>
        <p id="custom-points-hint" className={`mt-1.5 text-xs ${invalid ? "text-red-600" : "text-gray-500"}`}>
          {hint}
        </p>

        <button
          type="submit"
          disabled={!isValid || disabled}
          aria-busy={loading}
          className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-900 px-4 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#0F8287] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
        >
          {loading ? (
            <>
              <ButtonSpinner /> অপেক্ষা করুন...
            </>
          ) : (
            "বিকাশ দিয়ে কিনুন"
          )}
        </button>
      </div>
    </form>
  );
}
