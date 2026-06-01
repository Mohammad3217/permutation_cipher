"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CipherController = void 0;
const permutation_service_1 = require("../services/permutation.service");
const keyword_service_1 = require("../services/keyword.service");
const helpers_1 = require("../utils/helpers");
const permutationService = new permutation_service_1.PermutationService();
const keywordService = new keyword_service_1.KeywordService();
class CipherController {
    async encrypt(req, res) {
        try {
            let { text, keyword } = req.body;
            // Sanitize input
            text = (0, helpers_1.sanitizeInput)(text);
            keyword = (0, helpers_1.sanitizeInput)(keyword).toUpperCase().trim();
            // Validate keyword
            const validation = keywordService.validateKeyword(keyword);
            if (!validation.valid) {
                return res.status(400).json({
                    success: false,
                    error: validation.error,
                });
            }
            // Convert keyword to permutation key
            const key = keywordService.keywordToPermutation(keyword);
            // Encrypt
            const encrypted = permutationService.encrypt(text, key);
            res.json({
                success: true,
                result: encrypted,
                key: key, // برگرداندن کلید ساخته شده برای اطلاع کاربر
                message: `متن با موفقیت با کلمه کلید "${keyword}" رمزنگاری شد`,
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                error: error.message,
            });
        }
    }
    async decrypt(req, res) {
        try {
            let { text, keyword } = req.body;
            // Sanitize input
            text = (0, helpers_1.sanitizeInput)(text);
            keyword = (0, helpers_1.sanitizeInput)(keyword).toUpperCase().trim();
            const validation = keywordService.validateKeyword(keyword);
            if (!validation.valid) {
                return res.status(400).json({
                    success: false,
                    error: validation.error,
                });
            }
            // Convert keyword to permutation key
            const key = keywordService.keywordToPermutation(keyword);
            // Decrypt
            const decrypted = permutationService.decrypt(text, key);
            res.json({
                success: true,
                result: decrypted,
                key: key,
                message: `متن با موفقیت با کلمه کلید "${keyword}" رمزگشایی شد`,
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                error: error.message,
            });
        }
    }
}
exports.CipherController = CipherController;
//# sourceMappingURL=cipher.controller.js.map