export class PermutationService {
  private readonly PADDING_CHAR = '-';

  validateKey(key: number[]): boolean {
    if (!Array.isArray(key) || key.length === 0) return false;
    
    const n = key.length;
    const sortedKey = [...key].sort((a, b) => a - b);
    
    // Check if key contains numbers 1 to n exactly once
    for (let i = 0; i < n; i++) {
      if (sortedKey[i] !== i + 1) return false;
    }
    
    return true;
  }

  getInverseKey(key: number[]): number[] {
    const inverse = new Array(key.length);
    for (let i = 0; i < key.length; i++) {
      inverse[key[i] - 1] = i + 1;
    }
    return inverse;
  }

  permuteBlock(block: string, key: number[]): string {
    const result = new Array(key.length);
    for (let i = 0; i < key.length; i++) {
      result[key[i] - 1] = block[i];
    }
    return result.join('');
  }

  encrypt(text: string, key: number[]): string {
    if (!this.validateKey(key)) {
      throw new Error('کلید نامعتبر است');
    }

    const blockSize = key.length;
    let result = '';

    // Pad the text
    let paddedText = text;
    const remainder = text.length % blockSize;
    if (remainder !== 0) {
      const paddingNeeded = blockSize - remainder;
      paddedText += this.PADDING_CHAR.repeat(paddingNeeded);
    }

    // Process each block
    for (let i = 0; i < paddedText.length; i += blockSize) {
      const block = paddedText.substring(i, i + blockSize);
      const encryptedBlock = this.permuteBlock(block, key);
      result += encryptedBlock;
    }

    return result;
  }

  decrypt(encryptedText: string, key: number[]): string {
    if (!this.validateKey(key)) {
      throw new Error('کلید نامعتبر است');
    }

    const inverseKey = this.getInverseKey(key);
    const blockSize = key.length;
    let result = '';

    // Process each block
    for (let i = 0; i < encryptedText.length; i += blockSize) {
      const block = encryptedText.substring(i, i + blockSize);
      const decryptedBlock = this.permuteBlock(block, inverseKey);
      result += decryptedBlock;
    }

    // Remove padding characters
    return result.replace(new RegExp(`${this.PADDING_CHAR}+$`), '');
  }
}