const Console = ConsoleLogComponent.init({
  menuPosition: 'right top'
})

// 動作確認用サンプルスクリプト
// 一定間隔ごとにconsole.logを実行する
const TEST_PARAMS = {
  string: 'Output console test : type of string',
  number: 9999,
  object: {
    name: 'Test Object',
    value: 'test value',
    number: 1024,
    bool: true,
    array: [2, 4, 8, 16, 32, 64],
    "null": null,
    "undefined": undefined,
  },
  function: function testFunc () {},
  array: [2, 4, 8, 16, 32, 64],
  bool: true,
  "null": null,
  "undefined": undefined,
  error: 'tf-logger error test',
  warn: 'tf-logger warn test',
}

const keys = Object.keys(TEST_PARAMS)

window.itervalTimer = 0

const startOutputTest = () => {
  if (window.itervalTimer) {
    clearInterval(window.itervalTimer)
  }

  console.info('[ConsoleLogComponent sample] start output test messages by setInterval.');

  window.intervalTimer = setInterval(function () {
    const length = keys.length
    const i = Math.floor(Math.random() * length)

    const name = keys[i]
    const param = TEST_PARAMS[name]

    switch (name) {
      case 'error':
        throw new Error(param)
        break;
      case 'warn':
        console.warn(param)
        break;
      default:
        console.log(param)
        break;
    }

  }, 1000)
}

const stopOutputTest = () => {
  console.info('[ConsoleLogComponent sample] stop output test messages by setInterval.');
  clearInterval(window.intervalTimer)
}

const destroy = () => {
  stopOutputTest()
  ConsoleLogComponent.destroy()
}

window.startOutputTest = startOutputTest
window.stopOutputTest = stopOutputTest
window.destroy = destroy

document.addEventListener('DOMContentLoaded', function onDOMContentLoaded () {
  startOutputTest()
})

console.log('script end')
