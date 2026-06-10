"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    console.error('Error:', error.message);
    res.status(500).json({
        success: false,
        error: 'خطای داخلی سرور',
        message: process.env.NODE_ENV === 'development' ? error.message : ""
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.middleware.js.map