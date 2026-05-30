import { Request, Response } from 'express';
import { PermutationService } from '../services/permutation.service';
import { sanitizeInput } from '../utils/helpers';

const permutationService = new PermutationService();

export class CipherController {
  async encrypt(req: Request, res: Response) {
    try {
      let { text, key } = req.body;
      
      // Sanitize input
      text = sanitizeInput(text);
      
      // Encrypt
      const encrypted = permutationService.encrypt(text, key);
      
      res.json({
        success: true,
        result: encrypted,
        message: 'متن با موفقیت رمزنگاری شد'
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  async decrypt(req: Request, res: Response) {
    try {
      let { text, key } = req.body;
      
      // Sanitize input
      text = sanitizeInput(text);
      
      // Decrypt
      const decrypted = permutationService.decrypt(text, key);
      
      res.json({
        success: true,
        result: decrypted,
        message: 'متن با موفقیت رمزگشایی شد'
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }
}