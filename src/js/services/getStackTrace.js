/**
 * Errorオブジェクトからスタックトレースの配列を返す
 */

// NOTE: パースされる情報はブラウザのError.stackの実装に依存するため、環境ごとに得られる情報に違いがあります

// Error.stackを解析するモジュール
import ErrorStackParser from 'error-stack-parser'

// IEがFunction.nameに対応していないので、そのpolyfill
import 'function.name-polyfill'

/**
 * Errorオブジェクトからスタックトレースの配列を返す
 * @param   {object} error  発生元を特定したいErrorオブジェクト
 * @param   {object} method 実行元としての判定から除外する関数
 * @returns {Array}         パースされたスタック情報の配列
 */
export default function getStackTrace(error, method) {
  return ErrorStackParser.parse(error).filter(stack => {
    return !method || stack.functionName !== method.name;
  });
}
