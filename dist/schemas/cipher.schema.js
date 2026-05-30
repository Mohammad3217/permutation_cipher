"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CipherSchema = exports.validateKey = void 0;
const zod_1 = require("zod");
const validateKey = (key) => {
    if (!Array.isArray(key) || key.length === 0)
        return false;
    const n = key.length;
    const sortedKey = [...key].sort((a, b) => a - b);
    for (let i = 0; i < n; i++) {
        if (sortedKey[i] !== i + 1)
            return false;
    }
    // Check for duplicates
    const uniqueCheck = new Set(key);
    return uniqueCheck.size === key.length;
};
exports.validateKey = validateKey;
exports.CipherSchema = zod_1.z.object({
    text: zod_1.z.string()
        .min(1, 'متن نمی‌تواند خالی باشد')
        .max(parseInt(process.env.MAX_TEXT_LENGTH || '1000'), `متن نمی‌تواند بیشتر از ${process.env.MAX_TEXT_LENGTH} کاراکتر باشد`)
        .refine(text => text.trim().length > 0, 'متن نمی‌تواند فقط شامل فاصله باشد')
        .transform(text => text.trim()),
    key: zod_1.z.array(zod_1.z.number().int().positive())
        .min(1, 'کلید نمی‌تواند خالی باشد')
        .max(10, 'حداکثر طول کلید ۱۰ است')
        .refine(exports.validateKey, 'کلید باید شامل اعداد 1 تا n به ترتیب بدون تکرار باشد')
});
//# sourceMappingURL=cipher.schema.js.map