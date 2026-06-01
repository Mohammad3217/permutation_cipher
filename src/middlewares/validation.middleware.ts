import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export const validate = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: unknown) {
      res.status(400).json({
        success: false,
        error: "خطای اعتبارسنجی",
        details: error,
      });
    }
  };
};
