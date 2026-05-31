export class KeywordService {
  
  // تبدیل حرف به عدد (A=1, B=2, ..., Z=26)
  letterToNumber(letter: string): number {
    const upperLetter = letter.toUpperCase();
    const code = upperLetter.charCodeAt(0);
    if (code < 65 || code > 90) {
      throw new Error(`حرف نامعتبر: ${letter}. فقط حروف انگلیسی مجاز است`);
    }
    return code - 64; // A=1, B=2, ...
  }

  // تبدیل کلمه به آرایه اعداد
  keywordToNumbers(keyword: string): number[] {
    const numbers: number[] = [];
    for (let i = 0; i < keyword.length; i++) {
      const char = keyword[i];
      // فقط حروف انگلیسی مجاز
      if (!/^[A-Za-z]$/.test(char)) {
        throw new Error(`کاراکتر نامعتبر در کلمه کلید: "${char}". فقط حروف انگلیسی مجاز است`);
      }
      numbers.push(this.letterToNumber(char));
    }
    return numbers;
  }

  // تبدیل آرایه اعداد به جایگشت مرتب (1 تا n)
  // مثلاً [3,9,16,8,5,18] => [3,1,6,2,4,5] 
  // (بر اساس مرتب‌سازی اعداد)
  numbersToPermutation(numbers: number[]): number[] {
    // ایجاد جفت‌های (عدد، ایندکس اصلی)
    const pairs = numbers.map((num, idx) => ({ num, idx }));
    
    // مرتب‌سازی بر اساس عدد
    pairs.sort((a, b) => a.num - b.num);
    
    // ایجاد جایگشت
    const permutation = new Array(numbers.length);
    for (let i = 0; i < pairs.length; i++) {
      permutation[pairs[i].idx] = i + 1;
    }
    
    return permutation;
  }

  // یک مرحله‌ای: از کلمه به کلید جایگشت
  keywordToPermutation(keyword: string): number[] {
    // حذف کاراکترهای تکراری (اختیاری)
    const uniqueKeyword = this.removeDuplicates(keyword);
    
    // تبدیل به اعداد
    const numbers = this.keywordToNumbers(uniqueKeyword);
    
    // تبدیل به جایگشت
    const permutation = this.numbersToPermutation(numbers);
    
    return permutation;
  }

  // حذف حروف تکراری از کلمه
  removeDuplicates(keyword: string): string {
    const seen = new Set<string>();
    let result = '';
    for (const char of keyword.toUpperCase()) {
      if (!seen.has(char)) {
        seen.add(char);
        result += char;
      }
    }
    return result;
  }

  // اعتبارسنجی کلمه کلید
  validateKeyword(keyword: string): { valid: boolean; error?: string } {
    if (!keyword || keyword.trim().length === 0) {
      return { valid: false, error: 'کلمه کلید نمی‌تواند خالی باشد' };
    }
    
    if (keyword.length < 2) {
      return { valid: false, error: 'کلمه کلید باید حداقل ۲ حرف داشته باشد' };
    }
    
    if (keyword.length > 10) {
      return { valid: false, error: 'کلمه کلید نباید بیشتر از ۱۰ حرف باشد' };
    }
    
    if (!/^[A-Za-z]+$/.test(keyword)) {
      return { valid: false, error: 'کلمه کلید باید فقط شامل حروف انگلیسی باشد' };
    }
    
    return { valid: true };
  }

  // نمایش کلید برای دیباگ
  displayPermutation(keyword: string): void {
    const permutation = this.keywordToPermutation(keyword);
    console.log(`کلمه: ${keyword}`);
    console.log(`حروف: ${keyword.toUpperCase().split('').join(', ')}`);
    console.log(`اعداد حروف: ${this.keywordToNumbers(keyword).join(', ')}`);
    console.log(`جایگشت: [${permutation.join(', ')}]`);
  }
}