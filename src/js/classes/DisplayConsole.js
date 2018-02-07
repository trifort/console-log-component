//------------------------------------------------------------------------------

import 'babel-polyfill'
import 'intersection-observer'

import 'css/index.less'

//------------------------------------------------------------------------------
// Alias

const __createElement = document.createElement.bind(document)
const __createTextNode = document.createTextNode.bind(document)
const __createFragment = document.createDocumentFragment.bind(document)

const __toString = Object.prototype.toString


//------------------------------------------------------------------------------
// Utils

const getInstanceType = object => {
  return __toString.call(object).match(/\[object (.+)\]/)[1].toLowerCase()
}

const createDefineProperties = props => {
  const defineProperties = {}

  Object.keys(props).forEach(key => {
    defineProperties[key] = {
      value: props[key]
    }
  })

  return defineProperties
}

//------------------------------------------------------------------------------
// Class Name

const ROOT = 'DisplayConsole'

const CONTAINER = `${ ROOT }Container`
const MENU = `${ ROOT }Menu`
const ROW = `${ ROOT }Row`
const CELL = `${ ROOT }Cell`
const CELL_NODE = `${ CELL }__node`

const ACORDION = `${ CELL }Acordion`
const ACORDION_LINE = `${ ACORDION }__line`
const ACORDION_CHECKBOX = `${ ACORDION }__checkbox`
const ACORDION_PARAMS = `${ ACORDION }__params`

const ACORDION_LINE_OPEN = `${ ACORDION_LINE }--open`

const CONAINER_SHOW = `${ CONTAINER }--show`

const MENU_SHOW = `${ MENU }--show`


//------------------------------------------------------------------------------
// onload判定

let isDOMContentLoaded = false

document.addEventListener('DOMContentLoaded', () => {
  isDOMContentLoaded = true
})

//------------------------------------------------------------------------------
// DOM生成処理

// Cell__nodeを作成
const createLoggerCellNode = (type, value) => {
  const node = __createElement('span')

  node.className = `${ CELL_NODE } ${ CELL_NODE }--${type}`
  node.textContent = value.toString()

  return node
}

// 関数の表示用ノードを作成
const createLoggerFunctionNode = (func) => {
  const str = func.toString()
  let node

  if (str.indexOf('[native code]') !== -1) {
    // ブラウザの基本機能を判別
    node = createLoggerCellNode('function', `function ${ func.name }() { [native code] }`)
  } else {
    node = createLoggerCellNode('function', `function ${ func.name }() {...}`)
  }
  return node
}

// 配列の表示用ノードを作成（一式をフラグメントにまとめて返す）
const createLoggerArrayNode = (array) => {
  const node = __createFragment()

  node.appendChild( __createTextNode(`Array (${ array.length }) [`) )

  // 区切り文字
  // NOTE: createTextNodeしたものを使いまわすと最後にappendChildした位置に移動するだけなので、その都度createTextNodeする
  const delimiter = ', '

  // 配列長が10を超える場合は省略
  const MAX_LENGTH = 10
  const isTrim = array.length > MAX_LENGTH
  if (isTrim) {
    array = array.slice(0, MAX_LENGTH)
  }

  array.forEach((v, i) => {
    if (i !== 0) {
      node.appendChild( __createTextNode(delimiter) )
    }

    const type = getInstanceType(v)

    switch (type) {

      case 'null':
      case 'undefined':
        // nullとundefinedはそのままだと表示されない
        node.appendChild( createLoggerCellNode('null', type) )
        break;

      case 'string':
        // 文字列をダブルクォーテーションでくくる
        node.appendChild(createLoggerCellNode('stringValue', `"${ v }"`))
        break;

      case 'function':
        // functionはtoStringで展開するとソースコードが展開されるので省略形で出力する
        node.appendChild(createLoggerFunctionNode(v))
        break;

      default:
        node.appendChild( createLoggerCellNode(type, v) )
        break;

    }
  })

  // 省略した場合は末尾に ... をつける
  if (isTrim) {
    node.appendChild( __createTextNode(delimiter) )
    node.appendChild( createLoggerCellNode('leader', '...') )
  }

  node.appendChild( __createTextNode(']') )

  return node
}

// オブジェクト表示の値表示用ノードを作成
const createLoggerObjectNodeParam = (value) => {
  const type = getInstanceType(value)

  let node;

  switch (type) {

    case 'string':
      // 文字列をダブルクォーテーションでくくる
      node = createLoggerCellNode('stringValue', `"${ value }"`)
      break;

    case 'array':
      node = createLoggerArrayNode(value)
      break;

    case 'number':
    case 'boolean':
      node = createLoggerCellNode(type, value)
      break;

    case 'function':
      node = createLoggerFunctionNode(value)
      break;

    case 'null':
    case 'undefined':
      // nullとundefinedはそのままだと表示されない
      node = createLoggerCellNode('null', type)
      break;

    default:
      // Objectクラスや独自のクラスなど
      node = createLoggerCellNode(type, __toString.call(value))
      break;

  }

  return node
}

// オブジェクトの表示用ノードを作成（一式をフラグメントにまとめて返す）
const createLoggerObjectNode = (object) => {
  const keys = Object.keys(object)
  const node = __createFragment()

  // 区切り文字
  // NOTE: createTextNodeしたものを使いまわすと最後にappendChildした位置に移動するだけなので、その都度createTextNodeする
  const delimiter = ', '

  // パラメータ数が4を超える場合は省略
  const MAX_LENGTH = 4
  const isTrim = keys.length > MAX_LENGTH
  if (isTrim) {
    keys.splice(MAX_LENGTH)
  }

  node.appendChild(__createTextNode(' {'))

  for (let key of keys) {
    const value = object[key]

    if (key !== keys[0]) {
      node.appendChild(__createTextNode(delimiter))
    }

    node.appendChild(createLoggerCellNode('param', key))
    node.appendChild(__createTextNode(': '))

    node.appendChild(createLoggerObjectNodeParam(value))
  }

  // 省略した場合は末尾に ... をつける
  if (isTrim) {
    node.appendChild( __createTextNode(delimiter) )
    node.appendChild( createLoggerCellNode('leader', '...') )
  }

  node.appendChild(__createTextNode('}'))

  return node
}

// アコーディオン展開表示用パラメータリストを生成
const createLoggerObjectAcordionParams = (object) => {
  const keys = Object.keys(object)
  const node = __createFragment()

  for (let key of keys) {
    const value = object[key]

    if (key !== keys[0]) {
      node.appendChild(__createTextNode('\n'))
    }

    node.appendChild(createLoggerCellNode('param', key))
    node.appendChild(__createTextNode(': '))

    node.appendChild(createLoggerObjectNodeParam(value))
  }

  return node
}

// オブジェクト展開表示用アコーディオンを生成
const createLoggerAcordion = (node, params) => {
  const label = __createElement('label')
  label.className = ACORDION

  // 初期表示用
  const line = __createElement('div')
  line.className = ACORDION_LINE
  line.appendChild(node)

  label.appendChild(line)

  // パラメータリストの開閉はチェックボックスとCSSを使う
  const input = __createElement('input')
  input.className = ACORDION_CHECKBOX
  input.type = 'checkbox'

  // パラメータリスト開閉時にクラスの着脱を行う
  input.addEventListener('change', event => {
    if (event.target.checked) {
      line.classList.add(ACORDION_LINE_OPEN)
    } else {
      line.classList.remove(ACORDION_LINE_OPEN)
    }
  })

  label.appendChild(input)

  // パラメータリスト
  const acordion = __createElement('div')
  acordion.className = ACORDION_PARAMS

  acordion.appendChild(params)

  label.appendChild(acordion)

  return label
}

// Cellを作成
const createLoggerCell = (value) => {
  const cell = __createElement('div')

  const valueType = getInstanceType(value)

  cell.className = CELL

  switch (valueType) {

    case 'string':
    case 'number':
    case 'boolean':
      cell.appendChild(createLoggerCellNode(valueType, value))
      break;

    case 'array':
      cell.appendChild(createLoggerArrayNode(value))
      break;

    case 'function':
      cell.appendChild(createLoggerFunctionNode(value))
      break;

    case 'null':
    case 'undefined':
      // nullとundefinedはそのままだと表示されない
      cell.appendChild(createLoggerCellNode('null', valueType))
      break;

    default:
      // Objectクラスや独自のクラスなど

      const node = __createFragment()

      if (value === console) {
        // consoleオブジェクト用に特別な表示
        node.appendChild(createLoggerCellNode('object', 'console'))
      } else {
        const { name } = value.constructor
        node.appendChild(createLoggerCellNode('object', `[object ${ name }]`))
      }

      node.appendChild(createLoggerObjectNode(value))

      cell.appendChild(createLoggerAcordion(node, createLoggerObjectAcordionParams(value)))

      break;
  }

  return cell
}

// Row__infoを作成
const createLoggerRowInfo = (frame) => {
  const element = __createElement('div')
  element.className = `${ ROW }__info`

  const lineNumber = frame.lineNumber || undefined
  const fileName = (frame.fileName || '').split('?')[0] || '<anonymous>'

  // ファイル名
  const filenameNode = __createElement('span')
  filenameNode.textContent = (fileName.length > 24 ? '(...)' : '') + fileName.slice(-24)
  filenameNode.title = fileName

  element.appendChild(filenameNode)

  // 行番号
  if (lineNumber) {
    const numberNode = __createTextNode(` : ${ lineNumber }`)
    element.appendChild(numberNode)
  }

  return element
}

// Font Awesomeアイコン要素を作成
const createLoogerIcon = () => {
  const icon = __createElement('i')
  return icon
}

// Rowを作成
const createLoggerRow = (stack) => {
  const { type, frame, values } = stack

  const element = __createElement('div')

  element.className = `${ ROW } ${ ROW }--${type}`

  // 出力の通し番号
  const numberElement = __createElement('div')
  numberElement.className = `${ ROW }__number`
  numberElement.textContent = stack.id

  element.appendChild(numberElement)

  // 出力内容
  const valuesElement = __createElement('div')
  valuesElement.className = `${ ROW }__values`
  valuesElement.appendChild(createLoogerIcon())

  values.forEach(v => {
    valuesElement.appendChild(createLoggerCell(v))
  })

  element.appendChild(valuesElement)

  // ファイル名・行番号などの情報ブロック
  element.appendChild(createLoggerRowInfo(frame))

  return element
}


//------------------------------------------------------------------------------

function intersectionObserverHandler (entries, observer) {
  for (let entry of entries) {
    this.autoScroll = entry.intersectionRatio > 0.9
  }
}


//------------------------------------------------------------------------------
// Event Handler
// NOTE: すべてbindして使うのでfunction構文で定義

function onClickMenu () {
  this.show()
}

function onClickCloseButton () {
  this.hide()
}

function onDOMContentLoaded () {
  const { container, menu } = this

  document.body.appendChild(container)
  document.body.appendChild(menu)

  menu.classList.add(MENU_SHOW)
}


//------------------------------------------------------------------------------

let INSTANCE = null;

const DEFAULT_OPTIONS = {
  menuPosition: 'right bottom',
};

export default class DisplayConsole {

  static getInstance(options) {
    return INSTANCE ? INSTANCE : new DisplayConsole(options)
  }

  constructor(options) {
    if (INSTANCE) {
      INSTANCE.destroy()
    }
    INSTANCE = this

    options = Object.assign({}, DEFAULT_OPTIONS, options)

    // モーダル本体
    const container = __createElement('div')
    container.className = CONTAINER

    // モーダルのヘッダー
    const header = __createElement('header')
    header.className = `${ CONTAINER }__header`
    header.innerHTML = '<h1>Console</h1>'

    // ログモーダルを閉じるボタン
    const closeButton = __createElement('div')
    closeButton.className = `${ CONTAINER }__closeButton`

    header.appendChild(closeButton)

    // ログ表示部分
    const body = __createElement('div')
    body.className = `${ CONTAINER }__body`

    container.appendChild(header)
    container.appendChild(body)

    // モーダル表示ボタン
    const menu = __createElement('div')
    menu.className = MENU

    options.menuPosition.split(' ').forEach(position => {
      switch (position) {
        case 'top':
        case 'middle':
        case 'bottom':
        case 'left':
        case 'center':
        case 'right':
          menu.classList.add(`${ MENU }--${ position }`)
          break;

        default:
          break;

      }
    })

    // 自動スクロール有効フラグ
    this.autoScroll = false

    // readonly(固定値)なプロパティの定義
    Object.defineProperties(this, createDefineProperties({
      // あとで使うor使いそうな要素を保持
      // TODO: 使わないやつは削除する
      container,
      header,
      body,
      menu,
      // 内部処理で使うパラメータ
      stacks: [],
      observer: new IntersectionObserver(intersectionObserverHandler.bind(this)),
    }))

    // readonly(getterのみ)なプロパティの定義
    Object.defineProperty(this, 'isShown', {
      get: () => {
        return this.container.classList.contains(CONAINER_SHOW)
      }
    })

    // ボタンにイベントリスナーを登録
    menu.addEventListener('click', onClickMenu.bind(this))
    closeButton.addEventListener('click', onClickCloseButton.bind(this))

    // DOM要素の画面への追加
    if (isDOMContentLoaded) {
      onDOMContentLoaded.call(this)
    } else {
      document.addEventListener('DOMContentLoaded', onDOMContentLoaded.bind(this))
    }
  }

  // モーダルを隠す
  hide() {
    const { container, menu } = this

    if (container.classList.contains(CONAINER_SHOW)) {
      container.classList.remove(CONAINER_SHOW)
    }
    if (!menu.classList.contains(MENU_SHOW)) {
      menu.classList.add(MENU_SHOW)
    }
  }

  // モーダルを表示する
  show() {
    const { container, menu, body } = this

    if (!container.classList.contains(CONAINER_SHOW)) {
      container.classList.add(CONAINER_SHOW)
    }
    if (menu.classList.contains(MENU_SHOW)) {
      menu.classList.remove(MENU_SHOW)
    }

    // 表示した時に下端にスクロールさせる
    // NOTE: 表示切り替え処理の前に呼ぶとちゃんと動かない
    if (body.hasChildNodes()) {
      const nodes = body.childNodes
      nodes[nodes.length - 1].scrollIntoView()
    }

  }

  // ログの消去
  clear() {
    const { body } = this

    //子要素を全て削除
    while (body.firstChild) {
      body.removeChild(body.firstChild);
    }
  }

  // ログの出力
  output(type, frame, ...values) {
    const stack = { type, frame, values, id: this.stacks.length }
    const { body, observer, autoScroll } = this

    // 最後の要素の監視を解除
    if (body.hasChildNodes()) {
      const nodes = body.childNodes
      observer.disconnect(nodes[nodes.length - 1])
    }

    this.stacks.push(stack)

    // ログを追加
    const row = createLoggerRow(stack)
    body.appendChild(row)

    // 自動スクロールフラグがTUREの時、下端までスクロールさせる
    if (autoScroll) {
      row.scrollIntoView(false)
    }

    // 最後の要素の監視を開始
    observer.observe(row)
  }

  // インスタンスの破棄
  destroy() {
    let { container, menu, observer } = this

    // DOMを削除
    document.body.removeChild(container)
    document.body.removeChild(menu)
    container = null
    menu = null

    // 監視を解除
    observer.disconnect()
    observer = null;

    INSTANCE = null
  }
}
