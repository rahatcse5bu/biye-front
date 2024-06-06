export function calculateRange(range) {
  // Split the range string by the hyphen
  const [minStr, maxStr] = range.split("-");

  // Convert the split string values to numbers
  const min = parseInt(minStr.trim(), 10);
  const max = parseInt(maxStr.trim(), 10);

  // Return an object with the min and max values
  return {
    min,
    max,
  };
}
