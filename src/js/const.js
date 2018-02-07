
// V8エンジン判定フラグ
export const useStackTrace = typeof Error.captureStackTrace !== 'undefined';

// 置き換え対象のメソッド名
export const replaceMethodNames = ['log', 'error', 'info', 'warn', 'dir', 'clear'];
