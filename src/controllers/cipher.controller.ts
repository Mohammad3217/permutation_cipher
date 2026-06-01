import { Request, Response } from "express";
import { PermutationService } from "../services/permutation.service";
import { KeywordService } from "../services/keyword.service";
import { sanitizeInput } from "../utils/helpers";

const permutationService = new PermutationService();
const keywordService = new KeywordService();

export class CipherController {
  async encrypt(req: Request, res: Response) {
    try {
      let { text, keyword } = req.body;

      // Sanitize input
      text = sanitizeInput(text);
      keyword = sanitizeInput(keyword).toUpperCase().trim();
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
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  async decrypt(req: Request, res: Response) {
    try {
      let { text, keyword } = req.body;

      // Sanitize input
      text = sanitizeInput(text);
      keyword = sanitizeInput(keyword).toUpperCase().trim();

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
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
}
