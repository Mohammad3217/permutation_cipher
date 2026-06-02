import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";

export const validate = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: unknown) {
      // console.error("Validation error:", error);
      
      if (error instanceof ZodError) {
        // 
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