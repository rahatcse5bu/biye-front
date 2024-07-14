import { convertToBengaliNumerals } from "./weight";

export const convertHeightToBengali = (data) => {
  if (!data) {
    return null;
  }
  let height = data?.toString();

  const parts = height.toString().split(".");
  let feet = parts[0];
  let inch = "";

  if (parts.length > 1) {
    inch = parts[1];
  }

  return `${convertToBengaliNumerals(feet)} ফুট ${convertToBengaliNumerals(
    inch
  )} ইঞ্চি`;
};

export function convertToFeetAndInches(decimalHeight) {
  if (!decimalHeight) {
    return null;
  }
  const feet = Math.floor(decimalHeight);
  const inches = Math.round((decimalHeight - feet) * 12);

  return `${feet} ফুট ${inches} ইঞ্চি`;
}
