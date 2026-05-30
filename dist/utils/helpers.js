"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidKey = exports.sanitizeInput = void 0;
const sanitizeInput = (input) => {
    // Remove dangerous characters but keep Persian, English letters, numbers, and basic punctuation
    return input.replace(/[<>\\/'"]/g, '');
};
exports.sanitizeInput = sanitizeInput;
const isValidKey = (key) => {
    if (!Array.isArray(key))
        return false;
    return key.every(item => Number.isInteger(item) && item > 0);
};
exports.isValidKey = isValidKey;
//# sourceMappingURL=helpers.js.map