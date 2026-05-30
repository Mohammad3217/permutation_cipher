"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cipher_controller_1 = require("./controllers/cipher.controller");
const validation_middleware_1 = require("./middlewares/validation.middleware");
const rateLimit_middleware_1 = require("./middlewares/rateLimit.middleware");
const errorHandler_middleware_1 = require("./middlewares/errorHandler.middleware");
const cipher_schema_1 = require("./schemas/cipher.schema");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const cipherController = new cipher_controller_1.CipherController();
// Middlewares پایه
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "1mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
// فقط در production از helmet استفاده کن
if (process.env.NODE_ENV === "production") {
    const helmet = require("helmet");
    app.use(helmet());
}
// Apply rate limiting to all routes
app.use("/api", rateLimit_middleware_1.limiter);
// Routes
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "public", "index.html"));
});
app.post("/api/encrypt", (0, validation_middleware_1.validate)(cipher_schema_1.CipherSchema), cipherController.encrypt.bind(cipherController));
app.post("/api/decrypt", (0, validation_middleware_1.validate)(cipher_schema_1.CipherSchema), cipherController.decrypt.bind(cipherController));
// Health check
app.get("/api/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});
// Error handler
app.use(errorHandler_middleware_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map