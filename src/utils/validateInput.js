export default function validateInput(inputValue) {
  // Regular expression pattern to match harmful characters
  const blackListCharacters = /[<>&'"`~!@#$^*()_=+\[\]{}\\|;?]/;

  // Check if the inputValue matches the harmful pattern
  if (blackListCharacters.test(inputValue)) {
    // Return false if harmful characters are found
    return false;
  }

  // If no harmful characters are found, return true (input is valid)
  return true;
};