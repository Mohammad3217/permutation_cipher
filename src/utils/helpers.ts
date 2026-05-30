export const sanitizeInput = (input: string): string => {
  // Remove dangerous characters but keep Persian, English letters, numbers, and basic punctuation
  return input.replace(/[<>\\/'"]/g, '');
};

export const isValidKey = (key: any): key is number[] => {
  if (!Array.isArray(key)) return false;
  return key.every(item => Number.isInteger(item) && item > 0);
};