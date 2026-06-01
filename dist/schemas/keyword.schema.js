"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeywordCipherSchema = void 0;
const zod_1 = require("zod");
exports.KeywordCipherSchema = zod_1.z.object({
    text: zod_1.z
        .string()
        .min(1, "متن نمی‌تواند خالی باشد")
        .max(parseInt(process.env.MAX_TEXT_LENGTH || "1000"), `متن نمی‌تواند بیشتر از ${process.env.MAX_TEXT_LENGTH} کاراکتر باشد`)
        .refine((text) => text.trim().length > 0, "متن نمی‌تواند فقط شامل فاصله باشد")
        .transform((text) => text.trim()),
    keyword: zod_1.z
        .string()
        .min(2, "کلمه کلید باید حداقل ۲ حرف باشد")
        .max(10, "کلمه کلید نباید بیشتر از ۱۰ حرف باشد")
        .regex(/^[A-Za-z]+$/, "کلمه کلید باید فقط شامل حروف انگلیسی باشد")
        .transform((keyword) => keyword.toUpperCase()),
});
//# sourceMappingURL=keyword.schema.js.map