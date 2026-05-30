import { z } from 'zod';

export const validateKey = (key: number[]): boolean => {
  if (!Array.isArray(key) || key.length === 0) return false;
  const n = key.length;
  const sortedKey = [...key].sort((a, b) => a - b);
  
  for (let i = 0; i < n; i++) {
    if (sortedKey[i] !== i + 1) return false;
  }
  
  // Check for duplicates
  const uniqueCheck = new Set(key);
  return uniqueCheck.size === key.length;
};

export const CipherSchema = z.object({
  text: z.string()
    .min(1, 'متن نمی‌تواند خالی باشد')
    .max(parseInt(process.env.MAX_TEXT_LENGTH || '1000'), `متن نمی‌تواند بیشتر از ${process.env.MAX_TEXT_LENGTH} کاراکتر باشد`)
    .refine(text => text.trim().length > 0, 'متن نمی‌تواند فقط شامل فاصله باشد')
    .transform(text => text.trim()),
  
  key: z.array(z.number().int().positive())
    .min(1, 'کلید نمی‌تواند خالی باشد')
    .max(10, 'حداکثر طول کلید ۱۰ است')
    .refine(validateKey, 'کلید باید شامل اعداد 1 تا n به ترتیب بدون تکرار باشد')
});

export type CipherInput = z.infer<typeof CipherSchema>;