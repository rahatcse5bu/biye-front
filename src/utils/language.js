export const checkLanguage = () => {
  let digit = "০১২৩৪৫৬৭৮৯";
  console.log(digit);
};

export function convertToBengaliDigits(englishNumber) {
  if (!englishNumber) {
    return;
  }
  const englishToBengaliMap = {
    0: "০",
    1: "১",
    2: "২",
    3: "৩",
    4: "৪",
    5: "৫",
    6: "৬",
    7: "৭",
    8: "৮",
    9: "৯",
    ".": ".", // Keeping decimal point as is
    "-": "-",
  };

  // Convert the input to a string to handle both numbers and strings as input
  const numberString = englishNumber.toString();

  // Replace each English digit with its Bengali counterpart
  const bengaliNumberString = numberString
    .split("")
    .map((char) => {
      return englishToBengaliMap[char] || char; // If char is not a digit, keep it as is
    })
    .join("");

  return bengaliNumberString;
}
