"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermutationService = void 0;
/**
 * سرویس رمزنگاری جایگشتی (Permutation Cipher Service)
 * این کلاس مسئول انجام عملیات رمزنگاری و رمزگشایی با استفاده از جایگشت بلوک‌ها است
 */
class PermutationService {
    // کاراکتری که برای پر کردن بلوک‌های ناقص استفاده می‌شود
    PADDING_CHAR = '-';
    /**
     * اعتبارسنجی کلید جایگشت
     * @param key - آرایه اعداد که نمایانگر کلید است
     * @returns true اگر کلید معتبر باشد، در غیر این صورت false
     *
     * یک کلید معتبر باید شرایط زیر را داشته باشد:
     * 1. یک آرایه باشد و خالی نباشد
     * 2. شامل اعداد 1 تا n باشد (هر عدد دقیقاً یک بار)
     * مثلاً [2, 3, 1] برای بلوک 3 تایی معتبر است
     */
    validateKey(key) {
        // بررسی می‌کنیم که کلید آرایه باشد و خالی نباشد
        if (!Array.isArray(key) || key.length === 0)
            return false;
        const n = key.length;
        // یک کپی از کلید را مرتب می‌کنیم تا بررسی کنیم همه اعداد 1 تا n را دارد
        const sortedKey = [...key].sort((a, b) => a - b);
        // چک می‌کنیم که آرایه مرتب شده شامل اعداد 1 تا n به ترتیب باشد
        for (let i = 0; i < n; i++) {
            if (sortedKey[i] !== i + 1)
                return false;
        }
        return true;
    }
    /**
     * محاسبه کلید معکوس برای رمزگشایی
     * @param key - کلید اصلی
     * @returns کلید معکوس که جایگشت برعکس را انجام می‌دهد
     *
     * مثال: اگر کلید [3,1,2] باشد، معکوس آن [2,3,1] می‌شود
     * یعنی: موقعیت 1 به 3 می‌رود، موقعیت 2 به 1 می‌رود، موقعیت 3 به 2 می‌رود
     */
    getInverseKey(key) {
        const inverse = new Array(key.length);
        // برای هر موقعیت، مشخص می‌کنیم که کدام اندیس به این موقعیت آمده است
        for (let i = 0; i < key.length; i++) {
            // key[i] - 1 ایندیس مقصد است، مقدار آن i+1 یعنی شماره حرف مبدأ
            inverse[key[i] - 1] = i + 1;
        }
        return inverse;
    }
    /**
     * اعمال جایگشت روی یک بلوک
     * @param block - بلوک متنی به طول کلید
     * @param key - کلید جایگشت
     * @returns بلوک جابجا شده
     *
     * مثال: block = "ABC", key = [3,1,2]
     * حرف اول (A) می‌رود به موقعیت 3
     * حرف دوم (B) می‌رود به موقعیت 1
     * حرف سوم (C) می‌رود به موقعیت 2
     * نتیجه: "BCA"
     */
    permuteBlock(block, key) {
        const result = new Array(key.length);
        // هر حرف را به موقعیت جدیدش منتقل می‌کنیم
        for (let i = 0; i < key.length; i++) {
            // key[i] - 1 تبدیل به اندیس آرایه (چون شماره موقعیت‌ها از 1 شروع می‌شود)
            result[key[i] - 1] = block[i];
        }
        return result.join('');
    }
    /**
     * رمزنگاری متن اصلی
     * @param text - متن اصلی برای رمزنگاری
     * @param key - کلید جایگشت
     * @returns متن رمز شده
     *
     * مراحل:
     * 1. اعتبارسنجی کلید
     * 2. در صورت نیاز متن را با کاراکتر '-' پر می‌کنیم تا بر بلوک‌ها تقسیم شود
     * 3. هر بلوک را جداگانه جایگشت می‌زنیم
     * 4. بلوک‌های رمز شده را به هم می‌چسبانیم
     */
    encrypt(text, key) {
        // ابتدا بررسی می‌کنیم کلید معتبر است یا نه
        if (!this.validateKey(key)) {
            throw new Error('کلید نامعتبر است');
        }
        const blockSize = key.length;
        let result = '';
        // مرحله 2: پر کردن متن (padding)
        let paddedText = text;
        const remainder = text.length % blockSize;
        if (remainder !== 0) {
            const paddingNeeded = blockSize - remainder;
            paddedText += this.PADDING_CHAR.repeat(paddingNeeded);
        }
        // مرحله 3 و 4: پردازش هر بلوک و جمع‌آوری نتایج
        for (let i = 0; i < paddedText.length; i += blockSize) {
            const block = paddedText.substring(i, i + blockSize);
            const encryptedBlock = this.permuteBlock(block, key);
            result += encryptedBlock;
        }
        return result;
    }
    /**
     * رمزگشایی متن رمز شده
     * @param encryptedText - متن رمز شده
     * @param key - کلید جایگشت (همان کلید رمزنگاری)
     * @returns متن اصلی بازیابی شده
     *
     * مراحل:
     * 1. اعتبارسنجی کلید
     * 2. محاسبه کلید معکوس برای برگرداندن جایگشت
     * 3. هر بلوک را با کلید معکوس جایگشت می‌زنیم
     * 4. کاراکترهای اضافی ('-') را از انتها حذف می‌کنیم
     */
    decrypt(encryptedText, key) {
        // مرحله 1: بررسی کلید
        if (!this.validateKey(key)) {
            throw new Error('کلید نامعتبر است');
        }
        // مرحله 2: ساختن کلید معکوس
        const inverseKey = this.getInverseKey(key);
        const blockSize = key.length;
        let result = '';
        // مرحله 3: پردازش هر بلوک با کلید معکوس
        for (let i = 0; i < encryptedText.length; i += blockSize) {
            const block = encryptedText.substring(i, i + blockSize);
            const decryptedBlock = this.permuteBlock(block, inverseKey);
            result += decryptedBlock;
        }
        // مرحله 4: حذف کاراکترهای padding از انتهای متن
        // regex: به دنبال یک یا چند کاراکتر padding در انتهای متن می‌گردد
        return result.replace(new RegExp(`${this.PADDING_CHAR}+$`), '');
    }
}
exports.PermutationService = PermutationService;
//# sourceMappingURL=coments.js.map