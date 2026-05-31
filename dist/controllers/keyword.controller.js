"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeywordCipherController = void 0;
const permutation_service_1 = require("../services/permutation.service");
const keyword_service_1 = require("../services/keyword.service");
const helpers_1 = require("../utils/helpers");
const permutationService = new permutation_service_1.PermutationService();
const keywordService = new keyword_service_1.KeywordService();
class KeywordCipherController {
    async encrypt(req, res) {
        try {
            let { text, keyword } = req.body;
            // Sanitize input
            text = (0, helpers_1.sanitizeInput)(text);
            keyword = keyword.toUpperCase().trim();
            // Validate keyword
            const validation = keywordService.validateKeyword(keyword);
            if (!validation.valid) {
                return res.status(400).json({
                    success: false,
                    error: validation.error
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
                keyword: keyword,
                message: `متن با موفقیت با کلمه کلید "${keyword}" رمزنگاری شد`
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                error: error.message || 'خطا در رمزنگاری'
            });
        }
    }
    async decrypt(req, res) {
        try {
            let { text, keyword } = req.body;
            // Sanitize input
            text = (0, helpers_1.sanitizeInput)(text);
            keyword = keyword.toUpperCase().trim();
            // Validate keyword
            const validation = keywordService.validateKeyword(keyword);
            if (!validation.valid) {
                return res.status(400).json({
                    success: false,
                    error: validation.error
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
                keyword: keyword,
                message: `متن با موفقیت با کلمه کلید "${keyword}" رمزگشایی شد`
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                error: error.message || 'خطا در رمزگشایی'
            });
        }
    }
    // متد جدید برای دریافت اطلاعات کلید بدون رمزنگاری
    async getKeyInfo(req, res) {
        try {
            const { keyword } = req.body;
            const validation = keywordService.validateKeyword(keyword);
            if (!validation.valid) {
                return res.status(400).json({
                    success: false,
                    error: validation.error
                });
            }
            const uppercased = keyword.toUpperCase();
            const letters = uppercased.split('');
            const numbers = keywordService.keywordToNumbers(uppercased);
            const permutation = keywordService.keywordToPermutation(uppercased);
            res.json({
                success: true,
                keyword: uppercased,
                letters: letters,
                letterValues: numbers,
                permutation: permutation,
                blockSize: permutation.length,
                message: `اطلاعات کلید برای "${uppercased}" با موفقیت تولید شد`
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    }
}
exports.KeywordCipherController = KeywordCipherController;
//# sourceMappingURL=keyword.controller.js.map