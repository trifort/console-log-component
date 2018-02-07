
import getStackTrace from 'services/getStackTrace'
import DisplayConsole from 'classes/DisplayConsole'

import { useStackTrace, replaceMethodNames } from 'js/const'

export default (options) => {
  // 画面表示コンソール本体
  const Console = DisplayConsole.getInstance(options);

  //----------------------------------------------------------------------------

  if (useStackTrace) {
    // V8エンジン用 Stack Trace API
    const { prepareStackTrace } = Error

    // NOTE: Error.stackが呼ばれた時に実行される
    Error.prepareStackTrace = function(error, structuredStackTrace) {
      const message = error.message || 'Error'

      if (!message.match(/^console\[.+\] stack$/)) {
        const callsite = structuredStackTrace[0]

        const fileURL = callsite.getEvalOrigin() || callsite.getFileName()
        const fileName = fileURL.match(/^[^\s]+/)[0]

        const props = {
          message,
          functionName: callsite.getFunctionName(),
          methodName: callsite.getMethodName(),
          fileName,
          lineNumber: callsite.getLineNumber(),
          columnNumber: callsite.getColumnNumber(),
          //      error,
          //      position: callsite.getPosition(),
          //      type: callsite.getTypeName(),
          //      self: callsite.getThis(),
          //      isNative: callsite.isNative(),
          //      isEval: callsite.isEval(),
          //      isToplevel: callsite.isToplevel(),
        }

        Console.output('error', props, message);
      }

      return prepareStackTrace ? prepareStackTrace(error, structuredStackTrace) : {}
    }
  }

  // catchされなかったErrorを拾う
  window.addEventListener('error', event => {
    const { message, error } = event

    // NOTE: V8エンジンではErrorEventのerrorプロパティが空
    if (error) {
      if (error.stack) {
        const frames = getStackTrace(error);
        Console.output('error', frames[0], message);
      } else {
        // Safari用判定
        const { line, column } = error
        if (line || column) {
          const props = {
            lineNumber: line,
            columnNumber: column,
          }
          Console.output('error', props, message);
        }
      }
    }
  })


  //----------------------------------------------------------------------------

  const _console = {};

  function consoleMethodFactory (name) {

    // オリジナルのメソッドを退避
    // applyで実行するのでbindの必要はない
    _console[name] = console[name];

    // アロー関数だとbind効かない
    const consoleMethod = function (...args) {
      const tracer = new Error(`console[${ name }] stack`);

      switch (name) {

        case 'clear':
          Console.clear();
          break;

        default:
          if (useStackTrace) {
            // use v8 stack trace API
            Error.captureStackTrace(tracer, consoleMethod);

            // 一時的にError.prepareStackTraceを無効化する
            const { prepareStackTrace } = Error
            Error.prepareStackTrace = null

            // Error.prepareStackTraceを発火させるためにはstackを呼び出す必要がある
            if (tracer.stack) {
              const frames = getStackTrace(tracer, consoleMethod);
              Console.output(name, frames[0], ...args);
            }

            // Error.prepareStackTraceを元に戻す
            Error.prepareStackTrace = prepareStackTrace
          } else {
            // without v8
            try {
              throw tracer;
            } catch (error) {
              if (error.stack) {
                const frames = getStackTrace(error, consoleMethod);
                Console.output(name, frames[0], ...args);
              }
            }
          }
          break;

      }

      // オリジナルを実行
      Function.prototype.apply.call(_console[name], console, args);
    }

    return consoleMethod;
  }

  window._console = _console;

  //------------------------------------------------------------------------------
  // consoleのメソッドの置き換え

  Object.keys(console).forEach(name => {
    if (Object.prototype.toString.call(console[name]) === '[object Function]') {
      // 関数の場合
      if (replaceMethodNames.indexOf(name) !== -1) {
        // replaceMethodNamesで指定したメソッドは置き換える
        console[name] = consoleMethodFactory(name);
      } else {
        // それ以外のメソッドはエイリアスを作成
        _console[name] = console[name].bind(console);
      }
    } else {
      // 関数以外はエイリアスを作成
      _console[name] = console[name];
    }
  });

  return Console;
};
