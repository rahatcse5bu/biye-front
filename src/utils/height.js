import { convertToBengaliNumerals } from "./weight";

export const convertHeightToBengali = (data) => {
  if (!data) {
    return null;
  }

  const numericHeight = Number(data);
  if (Number.isFinite(numericHeight) && numericHeight > 10) {
    const totalInches = numericHeight / 2.54;
    let feet = Math.floor(totalInches / 12);
    let inches = Math.round(totalInches - feet * 12);

    if (inches === 12) {
      feet += 1;
      inches = 0;
    }

    return `${convertToBengaliNumerals(feet)} ফুট ${convertToBengaliNumerals(
      inches
    )} ইঞ্চি`;
  }

  const parts = data.toString().split(".");
  const feet = parts[0];
  const inches = parts.length > 1 ? parts[1] : "";

  return `${convertToBengaliNumerals(feet)} ফুট ${convertToBengaliNumerals(
    inches
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
