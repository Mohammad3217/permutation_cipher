"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const validate = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            console.error("Validation error:", error);
            if (error instanceof zod_1.ZodError) {
                // در نسخه جدید zod، از issues استفاده می‌شود نه errors
                const firstError = error.issues[0];
                const firstField = firstError.path.join('.');
                const simpleMessage = firstField
                    ? `خطا در فیلد "${firstField}": ${firstError.message}`
                    : firstError.message;
                // جزئیات کامل همه خطاها
                const allErrors = error.issues.map(err => ({
                    field: err.path.join('.') || 'body',
                    message: err.message,
                    code: err.code
                }));
                return res.status(400).json({
                    success: false,
                    error: "خطای اعتبارسنجی",
                    message: simpleMessage,
                    details: allErrors
                });
            }
            return res.status(400).json({
                success: false,
                error: "خطای اعتبارسنجی",
                message: "داده ارسال شده معتبر نیست"
            });
        }
    };
};
exports.validate = validate;
//# sourceMappingURL=validation.middleware.js.map