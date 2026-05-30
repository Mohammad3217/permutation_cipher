import express from "express";
import cors from "cors";
import { CipherController } from "./controllers/cipher.controller";
import { validate } from "./middlewares/validation.middleware";
import { limiter } from "./middlewares/rateLimit.middleware";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { CipherSchema } from "./schemas/cipher.schema";
import path from "path";

const app = express();
const cipherController = new CipherController();

// Middlewares پایه
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// فقط در production از helmet استفاده کن
if (process.env.NODE_ENV === "production") {
  const helmet = require("helmet");
  app.use(helmet());
}

// Apply rate limiting to all routes
app.use("/api", limiter);

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.post(
  "/api/encrypt",
  validate(CipherSchema),
  cipherController.encrypt.bind(cipherController),
);
app.post(
  "/api/decrypt",
  validate(CipherSchema),
  cipherController.decrypt.bind(cipherController),
);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Error handler
app.use(errorHandler);

export default app;
