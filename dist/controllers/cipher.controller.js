"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CipherController = void 0;
const permutation_service_1 = require("../services/permutation.service");
const helpers_1 = require("../utils/helpers");
const permutationService = new permutation_service_1.PermutationService();
class CipherController {
    async encrypt(req, res) {
        try {
            let { text, key } = req.body;
            // Sanitize input
            text = (0, helpers_1.sanitizeInput)(text);
            // Encrypt
            const encrypted = permutationService.encrypt(text, key);
            res.json({
                success: true,
                result: encrypted,
                message: 'متن با موفقیت رمزنگاری شد'
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    }
    async decrypt(req, res) {
        try {
            let { text, key } = req.body;
            // Sanitize input
            text = (0, helpers_1.sanitizeInput)(text);
            // Decrypt
            const decrypted = permutationService.decrypt(text, key);
            res.json({
                success: true,
                result: decrypted,
                message: 'متن با موفقیت رمزگشایی شد'
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
exports.CipherController = CipherController;
//# sourceMappingURL=cipher.controller.js.map