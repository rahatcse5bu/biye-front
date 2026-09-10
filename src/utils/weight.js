function stringToInt(inputString) {
  // Use the parseInt function to convert the string to an integer
  const integerValue = parseInt(inputString, 10);

  // Check if the conversion was successful
  if (!isNaN(integerValue)) {
    return integerValue; // Return the integer value
  } else {
    // Handle the case where the input string cannot be converted to an integer
    return null; // You can also return a default value or handle the error differently
  }
}

export function convertToBengaliNumerals(inputString) {
  if (!inputString && inputString !== 0) {
    return "0";
  }
  inputString = String(inputString);
  const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const bengaliNumerals = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

  for (let i = 0; i < 10; i++) {
    const regex = new RegExp(englishDigits[i], "g");
    inputString = inputString.replace(regex, bengaliNumerals[i]);
  }

  return inputString;
}

export function convertToEnglishDigits(inputString) {
  if (!inputString) {
    return "0";
  }

  let digit = inputString.trim();

  if (digit.length > 3) {
    digit = digit.slice(0, 3);
  }

  if (digit.length >= 2) {
    digit = digit.slice(0, 2);
  }

  const bengaliNumerals = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  for (let i = 0; i < 10; i++) {
    const regex = new RegExp(bengaliNumerals[i], "g");
    digit = digit.replace(regex, englishDigits[i]);
  }

  return stringToInt(digit);
}
