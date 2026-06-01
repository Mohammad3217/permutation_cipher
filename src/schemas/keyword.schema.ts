import { z } from "zod";

export const KeywordCipherSchema = z.object({
  text: z
    .string()
    .min(1, "متن نمی‌تواند خالی باشد")
    .max(
      parseInt(process.env.MAX_TEXT_LENGTH || "1000"),
      `متن نمی‌تواند بیشتر از ${process.env.MAX_TEXT_LENGTH} کاراکتر باشد`,
    )
    .refine(
      (text) => text.trim().length > 0,
      "متن نمی‌تواند فقط شامل فاصله باشد",
    )
    .transform((text) => text.trim()),

  keyword: z
    .string()
    .min(2, "کلمه کلید باید حداقل ۲ حرف باشد")
    .max(26, "کلمه کلید نباید بیشتر از ۲۶ حرف باشد")
    .regex(/^[A-Za-z]+$/, "کلمه کلید باید فقط شامل حروف انگلیسی باشد")
    .transform((keyword) => keyword.toUpperCase()),
});

export type KeywordCipherInput = z.infer<typeof KeywordCipherSchema>;
