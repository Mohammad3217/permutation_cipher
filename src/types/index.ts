export interface PermutationKey {
  key: number[];
}

export interface CipherRequest {
  text: string;
  key: number[];
}

export interface CipherResponse {
  success: boolean;
  result: string;
  message?: string;
}

export interface ErrorResponse {
  success: boolean;
  error: string;
  details?: any;
}