
import DisplayConsole from 'classes/DisplayConsole'
import { useStackTrace, replaceMethodNames } from 'js/const'

export default () => {
  const Console = DisplayConsole.getInstance();

  if (Console) {
    Console.destroy()
  }

  if (useStackTrace && Error.prepareStackTrace) {
    Error.prepareStackTrace = null
  }

  // consoleの復帰
  const { console, _console } = window

  console.log(_console)

  if (_console) {
    Object.keys(console).forEach(name => {
      if (replaceMethodNames.indexOf(name) !== -1) {
        console[name] = _console[name]
      }
    })

    window._console = null
  }

}
