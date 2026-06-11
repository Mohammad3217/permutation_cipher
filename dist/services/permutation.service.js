"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermutationService = void 0;
class PermutationService {
    PADDING_CHAR = "-";
    validateKey(key) {
        if (!Array.isArray(key) || key.length === 0)
            return false;
        const n = key.length;
        const sortedKey = [...key].sort((a, b) => a - b);
        // Check if key contains numbers 1 to n exactly once
        for (let i = 0; i < n; i++) {
            if (sortedKey[i] !== i + 1)
                return false;
        }
        return true;
    }
    getInverseKey(key) {
        const inverse = new Array(key.length);
        for (let i = 0; i < key.length; i++) {
            inverse[key[i] - 1] = i + 1;
        }
        return inverse;
    }
    permuteBlock(block, key) {
        const result = new Array(key.length);
        for (let i = 0; i < key.length; i++) {
            result[key[i] - 1] = block[i];
        }
        return result.join("");
    }
    encrypt(text, key) {
        if (!this.validateKey(key)) {
            throw new Error("کلید نامعتبر است");
        }
        const blockSize = key.length;
        if (blockSize <= 0)
            return "";
        const rowCount = Math.ceil(text.length / blockSize);
        const matrix = Array.from({ length: rowCount }, () => Array(blockSize).fill(this.PADDING_CHAR));
        let index = 0;
        for (let r = 0; r < rowCount; r++) {
            for (let c = 0; c < blockSize; c++) {
                if (index < text.length) {
                    matrix[r][c] = text[index];
                    index++;
                }
            }
        }
        let result = "";
        const inverseKey = this.getInverseKey(key);
        for (const col of inverseKey) {
            if (col < 0 || col > blockSize)
                continue;
            for (let r = 0; r < rowCount; r++) {
                result += matrix[r][col - 1];
            }
        }
        return result;
    }
    decrypt(encryptedText, key) {
        if (!this.validateKey(key)) {
            throw new Error("کلید نامعتبر است");
        }
        const blockSize = key.length;
        if (key.length <= 0 || !key.length)
            return "";
        const rowCount = encryptedText.length / blockSize;
        if (!Number.isInteger(rowCount)) {
            throw new Error("طول رشته رمز شده با کلید وارد شده هماهنگ نیست و نمی تواند رمز گشایی شود.");
        }
        const matrix = Array.from({ length: rowCount }, () => Array(blockSize).fill(""));
        let idx = 0;
        const inverseKey = this.getInverseKey(key);
        for (const col of inverseKey) {
            if (col < 0 || col > blockSize)
                continue;
            for (let r = 0; r < rowCount; r++) {
                matrix[r][col - 1] = encryptedText[idx];
                idx++;
            }
        }
        let result = "";
        for (let r = 0; r < rowCount; r++) {
            for (let c = 0; c < blockSize; c++) {
                result += matrix[r][c];
            }
        }
        while (result.endsWith(this.PADDING_CHAR)) {
            result = result.slice(0, -1);
        }
        return result;
    }
}
exports.PermutationService = PermutationService;
//# sourceMappingURL=permutation.service.js.map