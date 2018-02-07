(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!******************************************!*\
  !*** ./src/js/classes/DisplayConsole.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //------------------------------------------------------------------------------

__webpack_require__(/*! intersection-observer */ 8);

__webpack_require__(/*! css/index.less */ 9);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//------------------------------------------------------------------------------
// Alias

var __createElement = document.createElement.bind(document);
var __createTextNode = document.createTextNode.bind(document);
var __createFragment = document.createDocumentFragment.bind(document);

var __toString = Object.prototype.toString;

//------------------------------------------------------------------------------
// Utils

var getInstanceType = function getInstanceType(object) {
  return __toString.call(object).match(/\[object (.+)\]/)[1].toLowerCase();
};

var createDefineProperties = function createDefineProperties(props) {
  var defineProperties = {};

  Object.keys(props).forEach(function (key) {
    defineProperties[key] = {
      value: props[key]
    };
  });

  return defineProperties;
};

//------------------------------------------------------------------------------
// Class Name

var ROOT = 'DisplayConsole';

var CONTAINER = ROOT + 'Container';
var MENU = ROOT + 'Menu';
var ROW = ROOT + 'Row';
var CELL = ROOT + 'Cell';
var CELL_NODE = CELL + '__node';

var ACORDION = CELL + 'Acordion';
var ACORDION_LINE = ACORDION + '__line';
var ACORDION_CHECKBOX = ACORDION + '__checkbox';
var ACORDION_PARAMS = ACORDION + '__params';

var ACORDION_LINE_OPEN = ACORDION_LINE + '--open';

var CONAINER_SHOW = CONTAINER + '--show';

var MENU_SHOW = MENU + '--show';

//------------------------------------------------------------------------------
// onload判定

var isDOMContentLoaded = false;

document.addEventListener('DOMContentLoaded', function () {
  isDOMContentLoaded = true;
});

//------------------------------------------------------------------------------
// DOM生成処理

// Cell__nodeを作成
var createLoggerCellNode = function createLoggerCellNode(type, value) {
  var node = __createElement('span');

  node.className = CELL_NODE + ' ' + CELL_NODE + '--' + type;
  node.textContent = value.toString();

  return node;
};

// 関数の表示用ノードを作成
var createLoggerFunctionNode = function createLoggerFunctionNode(func) {
  var str = func.toString();
  var node = void 0;

  if (str.indexOf('[native code]') !== -1) {
    // ブラウザの基本機能を判別
    node = createLoggerCellNode('function', 'function ' + func.name + '() { [native code] }');
  } else {
    node = createLoggerCellNode('function', 'function ' + func.name + '() {...}');
  }
  return node;
};

// 配列の表示用ノードを作成（一式をフラグメントにまとめて返す）
var createLoggerArrayNode = function createLoggerArrayNode(array) {
  var node = __createFragment();

  node.appendChild(__createTextNode('Array (' + array.length + ') ['));

  // 区切り文字
  // NOTE: createTextNodeしたものを使いまわすと最後にappendChildした位置に移動するだけなので、その都度createTextNodeする
  var delimiter = ', ';

  // 配列長が10を超える場合は省略
  var MAX_LENGTH = 10;
  var isTrim = array.length > MAX_LENGTH;
  if (isTrim) {
    array = array.slice(0, MAX_LENGTH);
  }

  array.forEach(function (v, i) {
    if (i !== 0) {
      node.appendChild(__createTextNode(delimiter));
    }

    var type = getInstanceType(v);

    switch (type) {

      case 'null':
      case 'undefined':
        // nullとundefinedはそのままだと表示されない
        node.appendChild(createLoggerCellNode('null', type));
        break;

      case 'string':
        // 文字列をダブルクォーテーションでくくる
        node.appendChild(createLoggerCellNode('stringValue', '"' + v + '"'));
        break;

      case 'function':
        // functionはtoStringで展開するとソースコードが展開されるので省略形で出力する
        node.appendChild(createLoggerFunctionNode(v));
        break;

      default:
        node.appendChild(createLoggerCellNode(type, v));
        break;

    }
  });

  // 省略した場合は末尾に ... をつける
  if (isTrim) {
    node.appendChild(__createTextNode(delimiter));
    node.appendChild(createLoggerCellNode('leader', '...'));
  }

  node.appendChild(__createTextNode(']'));

  return node;
};

// オブジェクト表示の値表示用ノードを作成
var createLoggerObjectNodeParam = function createLoggerObjectNodeParam(value) {
  var type = getInstanceType(value);

  var node = void 0;

  switch (type) {

    case 'string':
      // 文字列をダブルクォーテーションでくくる
      node = createLoggerCellNode('stringValue', '"' + value + '"');
      break;

    case 'array':
      node = createLoggerArrayNode(value);
      break;

    case 'number':
    case 'boolean':
      node = createLoggerCellNode(type, value);
      break;

    case 'function':
      node = createLoggerFunctionNode(value);
      break;

    case 'null':
    case 'undefined':
      // nullとundefinedはそのままだと表示されない
      node = createLoggerCellNode('null', type);
      break;

    default:
      // Objectクラスや独自のクラスなど
      node = createLoggerCellNode(type, __toString.call(value));
      break;

  }

  return node;
};

// オブジェクトの表示用ノードを作成（一式をフラグメントにまとめて返す）
var createLoggerObjectNode = function createLoggerObjectNode(object) {
  var keys = Object.keys(object);
  var node = __createFragment();

  // 区切り文字
  // NOTE: createTextNodeしたものを使いまわすと最後にappendChildした位置に移動するだけなので、その都度createTextNodeする
  var delimiter = ', ';

  // パラメータ数が4を超える場合は省略
  var MAX_LENGTH = 4;
  var isTrim = keys.length > MAX_LENGTH;
  if (isTrim) {
    keys.splice(MAX_LENGTH);
  }

  node.appendChild(__createTextNode(' {'));

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      var value = object[key];

      if (key !== keys[0]) {
        node.appendChild(__createTextNode(delimiter));
      }

      node.appendChild(createLoggerCellNode('param', key));
      node.appendChild(__createTextNode(': '));

      node.appendChild(createLoggerObjectNodeParam(value));
    }

    // 省略した場合は末尾に ... をつける
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (isTrim) {
    node.appendChild(__createTextNode(delimiter));
    node.appendChild(createLoggerCellNode('leader', '...'));
  }

  node.appendChild(__createTextNode('}'));

  return node;
};

// アコーディオン展開表示用パラメータリストを生成
var createLoggerObjectAcordionParams = function createLoggerObjectAcordionParams(object) {
  var keys = Object.keys(object);
  var node = __createFragment();

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = keys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var key = _step2.value;

      var value = object[key];

      if (key !== keys[0]) {
        node.appendChild(__createTextNode('\n'));
      }

      node.appendChild(createLoggerCellNode('param', key));
      node.appendChild(__createTextNode(': '));

      node.appendChild(createLoggerObjectNodeParam(value));
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return node;
};

// オブジェクト展開表示用アコーディオンを生成
var createLoggerAcordion = function createLoggerAcordion(node, params) {
  var label = __createElement('label');
  label.className = ACORDION;

  // 初期表示用
  var line = __createElement('div');
  line.className = ACORDION_LINE;
  line.appendChild(node);

  label.appendChild(line);

  // パラメータリストの開閉はチェックボックスとCSSを使う
  var input = __createElement('input');
  input.className = ACORDION_CHECKBOX;
  input.type = 'checkbox';

  // パラメータリスト開閉時にクラスの着脱を行う
  input.addEventListener('change', function (event) {
    if (event.target.checked) {
      line.classList.add(ACORDION_LINE_OPEN);
    } else {
      line.classList.remove(ACORDION_LINE_OPEN);
    }
  });

  label.appendChild(input);

  // パラメータリスト
  var acordion = __createElement('div');
  acordion.className = ACORDION_PARAMS;

  acordion.appendChild(params);

  label.appendChild(acordion);

  return label;
};

// Cellを作成
var createLoggerCell = function createLoggerCell(value) {
  var cell = __createElement('div');

  var valueType = getInstanceType(value);

  cell.className = CELL;

  switch (valueType) {

    case 'string':
    case 'number':
    case 'boolean':
      cell.appendChild(createLoggerCellNode(valueType, value));
      break;

    case 'array':
      cell.appendChild(createLoggerArrayNode(value));
      break;

    case 'function':
      cell.appendChild(createLoggerFunctionNode(value));
      break;

    case 'null':
    case 'undefined':
      // nullとundefinedはそのままだと表示されない
      cell.appendChild(createLoggerCellNode('null', valueType));
      break;

    default:
      // Objectクラスや独自のクラスなど

      var node = __createFragment();

      if (value === console) {
        // consoleオブジェクト用に特別な表示
        node.appendChild(createLoggerCellNode('object', 'console'));
      } else {
        var name = value.constructor.name;

        node.appendChild(createLoggerCellNode('object', '[object ' + name + ']'));
      }

      node.appendChild(createLoggerObjectNode(value));

      cell.appendChild(createLoggerAcordion(node, createLoggerObjectAcordionParams(value)));

      break;
  }

  return cell;
};

// Row__infoを作成
var createLoggerRowInfo = function createLoggerRowInfo(frame) {
  var element = __createElement('div');
  element.className = ROW + '__info';

  var lineNumber = frame.lineNumber || undefined;
  var fileName = (frame.fileName || '').split('?')[0] || '<anonymous>';

  // ファイル名
  var filenameNode = __createElement('span');
  filenameNode.textContent = (fileName.length > 24 ? '(...)' : '') + fileName.slice(-24);
  filenameNode.title = fileName;

  element.appendChild(filenameNode);

  // 行番号
  if (lineNumber) {
    var numberNode = __createTextNode(' : ' + lineNumber);
    element.appendChild(numberNode);
  }

  return element;
};

// Font Awesomeアイコン要素を作成
var createLoogerIcon = function createLoogerIcon() {
  var icon = __createElement('i');
  return icon;
};

// Rowを作成
var createLoggerRow = function createLoggerRow(stack) {
  var type = stack.type,
      frame = stack.frame,
      values = stack.values;


  var element = __createElement('div');

  element.className = ROW + ' ' + ROW + '--' + type;

  // 出力の通し番号
  var numberElement = __createElement('div');
  numberElement.className = ROW + '__number';
  numberElement.textContent = stack.id;

  element.appendChild(numberElement);

  // 出力内容
  var valuesElement = __createElement('div');
  valuesElement.className = ROW + '__values';
  valuesElement.appendChild(createLoogerIcon());

  values.forEach(function (v) {
    valuesElement.appendChild(createLoggerCell(v));
  });

  element.appendChild(valuesElement);

  // ファイル名・行番号などの情報ブロック
  element.appendChild(createLoggerRowInfo(frame));

  return element;
};

//------------------------------------------------------------------------------

function intersectionObserverHandler(entries, observer) {
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = entries[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var entry = _step3.value;

      this.autoScroll = entry.intersectionRatio > 0.9;
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }
}

//------------------------------------------------------------------------------
// Event Handler
// NOTE: すべてbindして使うのでfunction構文で定義

function onClickMenu() {
  this.show();
}

function onClickCloseButton() {
  this.hide();
}

function onDOMContentLoaded() {
  var container = this.container,
      menu = this.menu;


  document.body.appendChild(container);
  document.body.appendChild(menu);

  menu.classList.add(MENU_SHOW);
}

//------------------------------------------------------------------------------

var INSTANCE = null;

var DEFAULT_OPTIONS = {
  menuPosition: 'right bottom'
};

var DisplayConsole = function () {
  _createClass(DisplayConsole, null, [{
    key: 'getInstance',
    value: function getInstance(options) {
      return INSTANCE ? INSTANCE : new DisplayConsole(options);
    }
  }]);

  function DisplayConsole(options) {
    var _this = this;

    _classCallCheck(this, DisplayConsole);

    if (INSTANCE) {
      INSTANCE.destroy();
    }
    INSTANCE = this;

    options = Object.assign({}, DEFAULT_OPTIONS, options);

    // モーダル本体
    var container = __createElement('div');
    container.className = CONTAINER;

    // モーダルのヘッダー
    var header = __createElement('header');
    header.className = CONTAINER + '__header';
    header.innerHTML = '<h1>Console</h1>';

    // ログモーダルを閉じるボタン
    var closeButton = __createElement('div');
    closeButton.className = CONTAINER + '__closeButton';

    header.appendChild(closeButton);

    // ログ表示部分
    var body = __createElement('div');
    body.className = CONTAINER + '__body';

    container.appendChild(header);
    container.appendChild(body);

    // モーダル表示ボタン
    var menu = __createElement('div');
    menu.className = MENU;

    options.menuPosition.split(' ').forEach(function (position) {
      switch (position) {
        case 'top':
        case 'middle':
        case 'bottom':
        case 'left':
        case 'center':
        case 'right':
          menu.classList.add(MENU + '--' + position);
          break;

        default:
          break;

      }
    });

    // 自動スクロール有効フラグ
    this.autoScroll = false;

    // readonly(固定値)なプロパティの定義
    Object.defineProperties(this, createDefineProperties({
      // あとで使うor使いそうな要素を保持
      // TODO: 使わないやつは削除する
      container: container,
      header: header,
      body: body,
      menu: menu,
      // 内部処理で使うパラメータ
      stacks: [],
      observer: new IntersectionObserver(intersectionObserverHandler.bind(this))
    }));

    // readonly(getterのみ)なプロパティの定義
    Object.defineProperty(this, 'isShown', {
      get: function get() {
        return _this.container.classList.contains(CONAINER_SHOW);
      }
    });

    // ボタンにイベントリスナーを登録
    menu.addEventListener('click', onClickMenu.bind(this));
    closeButton.addEventListener('click', onClickCloseButton.bind(this));

    // DOM要素の画面への追加
    if (isDOMContentLoaded) {
      onDOMContentLoaded.call(this);
    } else {
      document.addEventListener('DOMContentLoaded', onDOMContentLoaded.bind(this));
    }
  }

  // モーダルを隠す


  _createClass(DisplayConsole, [{
    key: 'hide',
    value: function hide() {
      var container = this.container,
          menu = this.menu;


      if (container.classList.contains(CONAINER_SHOW)) {
        container.classList.remove(CONAINER_SHOW);
      }
      if (!menu.classList.contains(MENU_SHOW)) {
        menu.classList.add(MENU_SHOW);
      }
    }

    // モーダルを表示する

  }, {
    key: 'show',
    value: function show() {
      var container = this.container,
          menu = this.menu,
          body = this.body;


      if (!container.classList.contains(CONAINER_SHOW)) {
        container.classList.add(CONAINER_SHOW);
      }
      if (menu.classList.contains(MENU_SHOW)) {
        menu.classList.remove(MENU_SHOW);
      }

      // 表示した時に下端にスクロールさせる
      // NOTE: 表示切り替え処理の前に呼ぶとちゃんと動かない
      if (body.hasChildNodes()) {
        var nodes = body.childNodes;
        nodes[nodes.length - 1].scrollIntoView();
      }
    }

    // ログの消去

  }, {
    key: 'clear',
    value: function clear() {
      var body = this.body;

      //子要素を全て削除

      while (body.firstChild) {
        body.removeChild(body.firstChild);
      }
    }

    // ログの出力

  }, {
    key: 'output',
    value: function output(type, frame) {
      for (var _len = arguments.length, values = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        values[_key - 2] = arguments[_key];
      }

      var stack = { type: type, frame: frame, values: values, id: this.stacks.length };
      var body = this.body,
          observer = this.observer,
          autoScroll = this.autoScroll;

      // 最後の要素の監視を解除

      if (body.hasChildNodes()) {
        var nodes = body.childNodes;
        observer.disconnect(nodes[nodes.length - 1]);
      }

      this.stacks.push(stack);

      // ログを追加
      var row = createLoggerRow(stack);
      body.appendChild(row);

      // 自動スクロールフラグがTUREの時、下端までスクロールさせる
      if (autoScroll) {
        row.scrollIntoView(false);
      }

      // 最後の要素の監視を開始
      observer.observe(row);
    }

    // インスタンスの破棄

  }, {
    key: 'destroy',
    value: function destroy() {
      var container = this.container,
          menu = this.menu,
          observer = this.observer;

      // DOMを削除

      document.body.removeChild(container);
      document.body.removeChild(menu);
      container = null;
      menu = null;

      // 監視を解除
      observer.disconnect();
      observer = null;

      INSTANCE = null;
    }
  }]);

  return DisplayConsole;
}();

exports.default = DisplayConsole;

/***/ }),
/* 1 */
/*!*************************!*\
  !*** ./src/js/const.js ***!
  \*************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

// V8エンジン判定フラグ
var useStackTrace = exports.useStackTrace = typeof Error.captureStackTrace !== 'undefined';

// 置き換え対象のメソッド名
var replaceMethodNames = exports.replaceMethodNames = ['log', 'error', 'info', 'warn', 'dir', 'clear'];

/***/ }),
/* 2 */
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _init = __webpack_require__(/*! methods/init */ 3);

var _init2 = _interopRequireDefault(_init);

var _destroy = __webpack_require__(/*! methods/destroy */ 14);

var _destroy2 = _interopRequireDefault(_destroy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// エントリポイント
exports.default = {
  init: _init2.default,
  destroy: _destroy2.default
};

/***/ }),
/* 3 */
/*!********************************!*\
  !*** ./src/js/methods/init.js ***!
  \********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getStackTrace = __webpack_require__(/*! services/getStackTrace */ 4);

var _getStackTrace2 = _interopRequireDefault(_getStackTrace);

var _DisplayConsole = __webpack_require__(/*! classes/DisplayConsole */ 0);

var _DisplayConsole2 = _interopRequireDefault(_DisplayConsole);

var _const = __webpack_require__(/*! js/const */ 1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (options) {
  // 画面表示コンソール本体
  var Console = _DisplayConsole2.default.getInstance(options);

  //----------------------------------------------------------------------------

  if (_const.useStackTrace) {
    // V8エンジン用 Stack Trace API
    var prepareStackTrace = Error.prepareStackTrace;

    // NOTE: Error.stackが呼ばれた時に実行される

    Error.prepareStackTrace = function (error, structuredStackTrace) {
      var message = error.message || 'Error';

      if (!message.match(/^console\[.+\] stack$/)) {
        var callsite = structuredStackTrace[0];

        var fileURL = callsite.getEvalOrigin() || callsite.getFileName();
        var fileName = fileURL.match(/^[^\s]+/)[0];

        var props = {
          message: message,
          functionName: callsite.getFunctionName(),
          methodName: callsite.getMethodName(),
          fileName: fileName,
          lineNumber: callsite.getLineNumber(),
          columnNumber: callsite.getColumnNumber()
          //      error,
          //      position: callsite.getPosition(),
          //      type: callsite.getTypeName(),
          //      self: callsite.getThis(),
          //      isNative: callsite.isNative(),
          //      isEval: callsite.isEval(),
          //      isToplevel: callsite.isToplevel(),
        };

        Console.output('error', props, message);
      }

      return prepareStackTrace ? prepareStackTrace(error, structuredStackTrace) : {};
    };
  }

  // catchされなかったErrorを拾う
  window.addEventListener('error', function (event) {
    var message = event.message,
        error = event.error;

    // NOTE: V8エンジンではErrorEventのerrorプロパティが空

    if (error) {
      if (error.stack) {
        var frames = (0, _getStackTrace2.default)(error);
        Console.output('error', frames[0], message);
      } else {
        // Safari用判定
        var line = error.line,
            column = error.column;

        if (line || column) {
          var props = {
            lineNumber: line,
            columnNumber: column
          };
          Console.output('error', props, message);
        }
      }
    }
  });

  //----------------------------------------------------------------------------

  var _console = {};

  function consoleMethodFactory(name) {

    // オリジナルのメソッドを退避
    // applyで実行するのでbindの必要はない
    _console[name] = console[name];

    // アロー関数だとbind効かない
    var consoleMethod = function consoleMethod() {
      var tracer = new Error('console[' + name + '] stack');

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      switch (name) {

        case 'clear':
          Console.clear();
          break;

        default:
          if (_const.useStackTrace) {
            // use v8 stack trace API
            Error.captureStackTrace(tracer, consoleMethod);

            // 一時的にError.prepareStackTraceを無効化する
            var _prepareStackTrace = Error.prepareStackTrace;

            Error.prepareStackTrace = null;

            // Error.prepareStackTraceを発火させるためにはstackを呼び出す必要がある
            if (tracer.stack) {
              var frames = (0, _getStackTrace2.default)(tracer, consoleMethod);
              Console.output.apply(Console, [name, frames[0]].concat(args));
            }

            // Error.prepareStackTraceを元に戻す
            Error.prepareStackTrace = _prepareStackTrace;
          } else {
            // without v8
            try {
              throw tracer;
            } catch (error) {
              if (error.stack) {
                var _frames = (0, _getStackTrace2.default)(error, consoleMethod);
                Console.output.apply(Console, [name, _frames[0]].concat(args));
              }
            }
          }
          break;

      }

      // オリジナルを実行
      Function.prototype.apply.call(_console[name], console, args);
    };

    return consoleMethod;
  }

  window._console = _console;

  //------------------------------------------------------------------------------
  // consoleのメソッドの置き換え

  Object.keys(console).forEach(function (name) {
    if (Object.prototype.toString.call(console[name]) === '[object Function]') {
      // 関数の場合
      if (_const.replaceMethodNames.indexOf(name) !== -1) {
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

/***/ }),
/* 4 */
/*!******************************************!*\
  !*** ./src/js/services/getStackTrace.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getStackTrace;

var _errorStackParser = __webpack_require__(/*! error-stack-parser */ 5);

var _errorStackParser2 = _interopRequireDefault(_errorStackParser);

__webpack_require__(/*! function.name-polyfill */ 7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Errorオブジェクトからスタックトレースの配列を返す
 * @param   {object} error  発生元を特定したいErrorオブジェクト
 * @param   {object} method 実行元としての判定から除外する関数
 * @returns {Array}         パースされたスタック情報の配列
 */
/**
 * Errorオブジェクトからスタックトレースの配列を返す
 */

// NOTE: パースされる情報はブラウザのError.stackの実装に依存するため、環境ごとに得られる情報に違いがあります

// Error.stackを解析するモジュール
function getStackTrace(error, method) {
  return _errorStackParser2.default.parse(error).filter(function (stack) {
    return !method || stack.functionName !== method.name;
  });
}

// IEがFunction.nameに対応していないので、そのpolyfill

/***/ }),
/* 5 */
/*!***************************************************************!*\
  !*** ./node_modules/error-stack-parser/error-stack-parser.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {
    'use strict';
    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    /* istanbul ignore next */
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! stackframe */ 6)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object') {
        module.exports = factory(require('stackframe'));
    } else {
        root.ErrorStackParser = factory(root.StackFrame);
    }
}(this, function ErrorStackParser(StackFrame) {
    'use strict';

    var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+\:\d+/;
    var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+\:\d+|\(native\))/m;
    var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code\])?$/;

    return {
        /**
         * Given an Error object, extract the most information from it.
         *
         * @param {Error} error object
         * @return {Array} of StackFrames
         */
        parse: function ErrorStackParser$$parse(error) {
            if (typeof error.stacktrace !== 'undefined' || typeof error['opera#sourceloc'] !== 'undefined') {
                return this.parseOpera(error);
            } else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) {
                return this.parseV8OrIE(error);
            } else if (error.stack) {
                return this.parseFFOrSafari(error);
            } else {
                throw new Error('Cannot parse given Error object');
            }
        },

        // Separate line and column numbers from a string of the form: (URI:Line:Column)
        extractLocation: function ErrorStackParser$$extractLocation(urlLike) {
            // Fail-fast but return locations like "(native)"
            if (urlLike.indexOf(':') === -1) {
                return [urlLike];
            }

            var regExp = /(.+?)(?:\:(\d+))?(?:\:(\d+))?$/;
            var parts = regExp.exec(urlLike.replace(/[\(\)]/g, ''));
            return [parts[1], parts[2] || undefined, parts[3] || undefined];
        },

        parseV8OrIE: function ErrorStackParser$$parseV8OrIE(error) {
            var filtered = error.stack.split('\n').filter(function(line) {
                return !!line.match(CHROME_IE_STACK_REGEXP);
            }, this);

            return filtered.map(function(line) {
                if (line.indexOf('(eval ') > -1) {
                    // Throw away eval information until we implement stacktrace.js/stackframe#8
                    line = line.replace(/eval code/g, 'eval').replace(/(\(eval at [^\()]*)|(\)\,.*$)/g, '');
                }
                var tokens = line.replace(/^\s+/, '').replace(/\(eval code/g, '(').split(/\s+/).slice(1);
                var locationParts = this.extractLocation(tokens.pop());
                var functionName = tokens.join(' ') || undefined;
                var fileName = ['eval', '<anonymous>'].indexOf(locationParts[0]) > -1 ? undefined : locationParts[0];

                return new StackFrame({
                    functionName: functionName,
                    fileName: fileName,
                    lineNumber: locationParts[1],
                    columnNumber: locationParts[2],
                    source: line
                });
            }, this);
        },

        parseFFOrSafari: function ErrorStackParser$$parseFFOrSafari(error) {
            var filtered = error.stack.split('\n').filter(function(line) {
                return !line.match(SAFARI_NATIVE_CODE_REGEXP);
            }, this);

            return filtered.map(function(line) {
                // Throw away eval information until we implement stacktrace.js/stackframe#8
                if (line.indexOf(' > eval') > -1) {
                    line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g, ':$1');
                }

                if (line.indexOf('@') === -1 && line.indexOf(':') === -1) {
                    // Safari eval frames only have function names and nothing else
                    return new StackFrame({
                        functionName: line
                    });
                } else {
                    var tokens = line.split('@');
                    var locationParts = this.extractLocation(tokens.pop());
                    var functionName = tokens.join('@') || undefined;

                    return new StackFrame({
                        functionName: functionName,
                        fileName: locationParts[0],
                        lineNumber: locationParts[1],
                        columnNumber: locationParts[2],
                        source: line
                    });
                }
            }, this);
        },

        parseOpera: function ErrorStackParser$$parseOpera(e) {
            if (!e.stacktrace || (e.message.indexOf('\n') > -1 &&
                e.message.split('\n').length > e.stacktrace.split('\n').length)) {
                return this.parseOpera9(e);
            } else if (!e.stack) {
                return this.parseOpera10(e);
            } else {
                return this.parseOpera11(e);
            }
        },

        parseOpera9: function ErrorStackParser$$parseOpera9(e) {
            var lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
            var lines = e.message.split('\n');
            var result = [];

            for (var i = 2, len = lines.length; i < len; i += 2) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                    result.push(new StackFrame({
                        fileName: match[2],
                        lineNumber: match[1],
                        source: lines[i]
                    }));
                }
            }

            return result;
        },

        parseOpera10: function ErrorStackParser$$parseOpera10(e) {
            var lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
            var lines = e.stacktrace.split('\n');
            var result = [];

            for (var i = 0, len = lines.length; i < len; i += 2) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                    result.push(
                        new StackFrame({
                            functionName: match[3] || undefined,
                            fileName: match[2],
                            lineNumber: match[1],
                            source: lines[i]
                        })
                    );
                }
            }

            return result;
        },

        // Opera 10.65+ Error.stack very similar to FF/Safari
        parseOpera11: function ErrorStackParser$$parseOpera11(error) {
            var filtered = error.stack.split('\n').filter(function(line) {
                return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/);
            }, this);

            return filtered.map(function(line) {
                var tokens = line.split('@');
                var locationParts = this.extractLocation(tokens.pop());
                var functionCall = (tokens.shift() || '');
                var functionName = functionCall
                        .replace(/<anonymous function(: (\w+))?>/, '$2')
                        .replace(/\([^\)]*\)/g, '') || undefined;
                var argsRaw;
                if (functionCall.match(/\(([^\)]*)\)/)) {
                    argsRaw = functionCall.replace(/^[^\(]+\(([^\)]*)\)$/, '$1');
                }
                var args = (argsRaw === undefined || argsRaw === '[arguments not available]') ?
                    undefined : argsRaw.split(',');

                return new StackFrame({
                    functionName: functionName,
                    args: args,
                    fileName: locationParts[0],
                    lineNumber: locationParts[1],
                    columnNumber: locationParts[2],
                    source: line
                });
            }, this);
        }
    };
}));


/***/ }),
/* 6 */
/*!***********************************************!*\
  !*** ./node_modules/stackframe/stackframe.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {
    'use strict';
    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    /* istanbul ignore next */
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.StackFrame = factory();
    }
}(this, function() {
    'use strict';
    function _isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function _capitalize(str) {
        return str.charAt(0).toUpperCase() + str.substring(1);
    }

    function _getter(p) {
        return function() {
            return this[p];
        };
    }

    var booleanProps = ['isConstructor', 'isEval', 'isNative', 'isToplevel'];
    var numericProps = ['columnNumber', 'lineNumber'];
    var stringProps = ['fileName', 'functionName', 'source'];
    var arrayProps = ['args'];

    var props = booleanProps.concat(numericProps, stringProps, arrayProps);

    function StackFrame(obj) {
        if (obj instanceof Object) {
            for (var i = 0; i < props.length; i++) {
                if (obj.hasOwnProperty(props[i]) && obj[props[i]] !== undefined) {
                    this['set' + _capitalize(props[i])](obj[props[i]]);
                }
            }
        }
    }

    StackFrame.prototype = {
        getArgs: function() {
            return this.args;
        },
        setArgs: function(v) {
            if (Object.prototype.toString.call(v) !== '[object Array]') {
                throw new TypeError('Args must be an Array');
            }
            this.args = v;
        },

        getEvalOrigin: function() {
            return this.evalOrigin;
        },
        setEvalOrigin: function(v) {
            if (v instanceof StackFrame) {
                this.evalOrigin = v;
            } else if (v instanceof Object) {
                this.evalOrigin = new StackFrame(v);
            } else {
                throw new TypeError('Eval Origin must be an Object or StackFrame');
            }
        },

        toString: function() {
            var functionName = this.getFunctionName() || '{anonymous}';
            var args = '(' + (this.getArgs() || []).join(',') + ')';
            var fileName = this.getFileName() ? ('@' + this.getFileName()) : '';
            var lineNumber = _isNumber(this.getLineNumber()) ? (':' + this.getLineNumber()) : '';
            var columnNumber = _isNumber(this.getColumnNumber()) ? (':' + this.getColumnNumber()) : '';
            return functionName + args + fileName + lineNumber + columnNumber;
        }
    };

    for (var i = 0; i < booleanProps.length; i++) {
        StackFrame.prototype['get' + _capitalize(booleanProps[i])] = _getter(booleanProps[i]);
        StackFrame.prototype['set' + _capitalize(booleanProps[i])] = (function(p) {
            return function(v) {
                this[p] = Boolean(v);
            };
        })(booleanProps[i]);
    }

    for (var j = 0; j < numericProps.length; j++) {
        StackFrame.prototype['get' + _capitalize(numericProps[j])] = _getter(numericProps[j]);
        StackFrame.prototype['set' + _capitalize(numericProps[j])] = (function(p) {
            return function(v) {
                if (!_isNumber(v)) {
                    throw new TypeError(p + ' must be a Number');
                }
                this[p] = Number(v);
            };
        })(numericProps[j]);
    }

    for (var k = 0; k < stringProps.length; k++) {
        StackFrame.prototype['get' + _capitalize(stringProps[k])] = _getter(stringProps[k]);
        StackFrame.prototype['set' + _capitalize(stringProps[k])] = (function(p) {
            return function(v) {
                this[p] = String(v);
            };
        })(stringProps[k]);
    }

    return StackFrame;
}));


/***/ }),
/* 7 */
/*!**************************************************************!*\
  !*** ./node_modules/function.name-polyfill/Function.name.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

(function() {

var fnNameMatchRegex = /^\s*function\s+([^\(\s]*)\s*/;

function _name() {
  var match, name;
  if (this === Function || this === Function.prototype.constructor) {
    name = "Function";
  }
  else if (this !== Function.prototype) {
    match = ("" + this).match(fnNameMatchRegex);
    name = match && match[1];
  }
  return name || "";
}

// Inspect the polyfill-ability of this browser
var needsPolyfill = !("name" in Function.prototype && "name" in (function x() {}));
var canDefineProp = typeof Object.defineProperty === "function" &&
  (function() {
    var result;
    try {
      Object.defineProperty(Function.prototype, "_xyz", {
        get: function() {
          return "blah";
        },
        configurable: true
      });
      result = Function.prototype._xyz === "blah";
      delete Function.prototype._xyz;
    }
    catch (e) {
      result = false;
    }
    return result;
  })();
var canDefineGetter = typeof Object.prototype.__defineGetter__ === "function" &&
  (function() {
    var result;
    try {
      Function.prototype.__defineGetter__("_abc", function() {
        return "foo";
      });
      result = Function.prototype._abc === "foo";
      delete Function.prototype._abc;
    }
    catch (e) {
      result = false;
    }
    return result;
  })();



// Add the "private" property for testing, even if the real property can be polyfilled
Function.prototype._name = _name;


// Polyfill it!
// For:
//  * IE >=9 <12
//  * Chrome <33
if (needsPolyfill) {
  // For:
  //  * IE >=9 <12
  //  * Chrome >=5 <33
  if (canDefineProp) {
    Object.defineProperty(Function.prototype, "name", {
      get: function() {
        var name = _name.call(this);

        // Since named function definitions have immutable names, also memoize the
        // output by defining the `name` property directly on this Function
        // instance so that this polyfill will not need to be invoked again
        if (this !== Function.prototype) {
          Object.defineProperty(this, "name", {
            value: name,
            configurable: true
          });
        }

        return name;
      },
      configurable: true
    });
  }
  // For:
  //  * Chrome <5
  else if (canDefineGetter) {
    // NOTE:
    // The snippet:
    //
    //     x.__defineGetter__('y', z);
    //
    // ...is essentially equivalent to:
    //
    //     Object.defineProperty(x, 'y', {
    //       get: z,
    //       configurable: true,  // <-- key difference #1
    //       enumerable: true     // <-- key difference #2
    //     });
    //
    Function.prototype.__defineGetter__("name", function() {
      var name = _name.call(this);

      // Since named function definitions have immutable names, also memoize the
      // output by defining the `name` property directly on this Function
      // instance so that this polyfill will not need to be invoked again
      if (this !== Function.prototype) {
        this.__defineGetter__("name", function() { return name; });
      }

      return name;
    });
  }
}

})();


/***/ }),
/* 8 */
/*!*********************************************************************!*\
  !*** ./node_modules/intersection-observer/intersection-observer.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the W3C SOFTWARE AND DOCUMENT NOTICE AND LICENSE.
 *
 *  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 */

(function(window, document) {
'use strict';


// Exits early if all IntersectionObserver and IntersectionObserverEntry
// features are natively supported.
if ('IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype) {

  // Minimal polyfill for Edge 15's lack of `isIntersecting`
  // See: https://github.com/w3c/IntersectionObserver/issues/211
  if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
    Object.defineProperty(window.IntersectionObserverEntry.prototype,
      'isIntersecting', {
      get: function () {
        return this.intersectionRatio > 0;
      }
    });
  }
  return;
}


/**
 * An IntersectionObserver registry. This registry exists to hold a strong
 * reference to IntersectionObserver instances currently observering a target
 * element. Without this registry, instances without another reference may be
 * garbage collected.
 */
var registry = [];


/**
 * Creates the global IntersectionObserverEntry constructor.
 * https://w3c.github.io/IntersectionObserver/#intersection-observer-entry
 * @param {Object} entry A dictionary of instance properties.
 * @constructor
 */
function IntersectionObserverEntry(entry) {
  this.time = entry.time;
  this.target = entry.target;
  this.rootBounds = entry.rootBounds;
  this.boundingClientRect = entry.boundingClientRect;
  this.intersectionRect = entry.intersectionRect || getEmptyRect();
  this.isIntersecting = !!entry.intersectionRect;

  // Calculates the intersection ratio.
  var targetRect = this.boundingClientRect;
  var targetArea = targetRect.width * targetRect.height;
  var intersectionRect = this.intersectionRect;
  var intersectionArea = intersectionRect.width * intersectionRect.height;

  // Sets intersection ratio.
  if (targetArea) {
    this.intersectionRatio = intersectionArea / targetArea;
  } else {
    // If area is zero and is intersecting, sets to 1, otherwise to 0
    this.intersectionRatio = this.isIntersecting ? 1 : 0;
  }
}


/**
 * Creates the global IntersectionObserver constructor.
 * https://w3c.github.io/IntersectionObserver/#intersection-observer-interface
 * @param {Function} callback The function to be invoked after intersection
 *     changes have queued. The function is not invoked if the queue has
 *     been emptied by calling the `takeRecords` method.
 * @param {Object=} opt_options Optional configuration options.
 * @constructor
 */
function IntersectionObserver(callback, opt_options) {

  var options = opt_options || {};

  if (typeof callback != 'function') {
    throw new Error('callback must be a function');
  }

  if (options.root && options.root.nodeType != 1) {
    throw new Error('root must be an Element');
  }

  // Binds and throttles `this._checkForIntersections`.
  this._checkForIntersections = throttle(
      this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT);

  // Private properties.
  this._callback = callback;
  this._observationTargets = [];
  this._queuedEntries = [];
  this._rootMarginValues = this._parseRootMargin(options.rootMargin);

  // Public properties.
  this.thresholds = this._initThresholds(options.threshold);
  this.root = options.root || null;
  this.rootMargin = this._rootMarginValues.map(function(margin) {
    return margin.value + margin.unit;
  }).join(' ');
}


/**
 * The minimum interval within which the document will be checked for
 * intersection changes.
 */
IntersectionObserver.prototype.THROTTLE_TIMEOUT = 100;


/**
 * The frequency in which the polyfill polls for intersection changes.
 * this can be updated on a per instance basis and must be set prior to
 * calling `observe` on the first target.
 */
IntersectionObserver.prototype.POLL_INTERVAL = null;

/**
 * Use a mutation observer on the root element
 * to detect intersection changes.
 */
IntersectionObserver.prototype.USE_MUTATION_OBSERVER = true;


/**
 * Starts observing a target element for intersection changes based on
 * the thresholds values.
 * @param {Element} target The DOM element to observe.
 */
IntersectionObserver.prototype.observe = function(target) {
  var isTargetAlreadyObserved = this._observationTargets.some(function(item) {
    return item.element == target;
  });

  if (isTargetAlreadyObserved) {
    return;
  }

  if (!(target && target.nodeType == 1)) {
    throw new Error('target must be an Element');
  }

  this._registerInstance();
  this._observationTargets.push({element: target, entry: null});
  this._monitorIntersections();
  this._checkForIntersections();
};


/**
 * Stops observing a target element for intersection changes.
 * @param {Element} target The DOM element to observe.
 */
IntersectionObserver.prototype.unobserve = function(target) {
  this._observationTargets =
      this._observationTargets.filter(function(item) {

    return item.element != target;
  });
  if (!this._observationTargets.length) {
    this._unmonitorIntersections();
    this._unregisterInstance();
  }
};


/**
 * Stops observing all target elements for intersection changes.
 */
IntersectionObserver.prototype.disconnect = function() {
  this._observationTargets = [];
  this._unmonitorIntersections();
  this._unregisterInstance();
};


/**
 * Returns any queue entries that have not yet been reported to the
 * callback and clears the queue. This can be used in conjunction with the
 * callback to obtain the absolute most up-to-date intersection information.
 * @return {Array} The currently queued entries.
 */
IntersectionObserver.prototype.takeRecords = function() {
  var records = this._queuedEntries.slice();
  this._queuedEntries = [];
  return records;
};


/**
 * Accepts the threshold value from the user configuration object and
 * returns a sorted array of unique threshold values. If a value is not
 * between 0 and 1 and error is thrown.
 * @private
 * @param {Array|number=} opt_threshold An optional threshold value or
 *     a list of threshold values, defaulting to [0].
 * @return {Array} A sorted list of unique and valid threshold values.
 */
IntersectionObserver.prototype._initThresholds = function(opt_threshold) {
  var threshold = opt_threshold || [0];
  if (!Array.isArray(threshold)) threshold = [threshold];

  return threshold.sort().filter(function(t, i, a) {
    if (typeof t != 'number' || isNaN(t) || t < 0 || t > 1) {
      throw new Error('threshold must be a number between 0 and 1 inclusively');
    }
    return t !== a[i - 1];
  });
};


/**
 * Accepts the rootMargin value from the user configuration object
 * and returns an array of the four margin values as an object containing
 * the value and unit properties. If any of the values are not properly
 * formatted or use a unit other than px or %, and error is thrown.
 * @private
 * @param {string=} opt_rootMargin An optional rootMargin value,
 *     defaulting to '0px'.
 * @return {Array<Object>} An array of margin objects with the keys
 *     value and unit.
 */
IntersectionObserver.prototype._parseRootMargin = function(opt_rootMargin) {
  var marginString = opt_rootMargin || '0px';
  var margins = marginString.split(/\s+/).map(function(margin) {
    var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
    if (!parts) {
      throw new Error('rootMargin must be specified in pixels or percent');
    }
    return {value: parseFloat(parts[1]), unit: parts[2]};
  });

  // Handles shorthand.
  margins[1] = margins[1] || margins[0];
  margins[2] = margins[2] || margins[0];
  margins[3] = margins[3] || margins[1];

  return margins;
};


/**
 * Starts polling for intersection changes if the polling is not already
 * happening, and if the page's visibilty state is visible.
 * @private
 */
IntersectionObserver.prototype._monitorIntersections = function() {
  if (!this._monitoringIntersections) {
    this._monitoringIntersections = true;

    // If a poll interval is set, use polling instead of listening to
    // resize and scroll events or DOM mutations.
    if (this.POLL_INTERVAL) {
      this._monitoringInterval = setInterval(
          this._checkForIntersections, this.POLL_INTERVAL);
    }
    else {
      addEvent(window, 'resize', this._checkForIntersections, true);
      addEvent(document, 'scroll', this._checkForIntersections, true);

      if (this.USE_MUTATION_OBSERVER && 'MutationObserver' in window) {
        this._domObserver = new MutationObserver(this._checkForIntersections);
        this._domObserver.observe(document, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
      }
    }
  }
};


/**
 * Stops polling for intersection changes.
 * @private
 */
IntersectionObserver.prototype._unmonitorIntersections = function() {
  if (this._monitoringIntersections) {
    this._monitoringIntersections = false;

    clearInterval(this._monitoringInterval);
    this._monitoringInterval = null;

    removeEvent(window, 'resize', this._checkForIntersections, true);
    removeEvent(document, 'scroll', this._checkForIntersections, true);

    if (this._domObserver) {
      this._domObserver.disconnect();
      this._domObserver = null;
    }
  }
};


/**
 * Scans each observation target for intersection changes and adds them
 * to the internal entries queue. If new entries are found, it
 * schedules the callback to be invoked.
 * @private
 */
IntersectionObserver.prototype._checkForIntersections = function() {
  var rootIsInDom = this._rootIsInDom();
  var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect();

  this._observationTargets.forEach(function(item) {
    var target = item.element;
    var targetRect = getBoundingClientRect(target);
    var rootContainsTarget = this._rootContainsTarget(target);
    var oldEntry = item.entry;
    var intersectionRect = rootIsInDom && rootContainsTarget &&
        this._computeTargetAndRootIntersection(target, rootRect);

    var newEntry = item.entry = new IntersectionObserverEntry({
      time: now(),
      target: target,
      boundingClientRect: targetRect,
      rootBounds: rootRect,
      intersectionRect: intersectionRect
    });

    if (!oldEntry) {
      this._queuedEntries.push(newEntry);
    } else if (rootIsInDom && rootContainsTarget) {
      // If the new entry intersection ratio has crossed any of the
      // thresholds, add a new entry.
      if (this._hasCrossedThreshold(oldEntry, newEntry)) {
        this._queuedEntries.push(newEntry);
      }
    } else {
      // If the root is not in the DOM or target is not contained within
      // root but the previous entry for this target had an intersection,
      // add a new record indicating removal.
      if (oldEntry && oldEntry.isIntersecting) {
        this._queuedEntries.push(newEntry);
      }
    }
  }, this);

  if (this._queuedEntries.length) {
    this._callback(this.takeRecords(), this);
  }
};


/**
 * Accepts a target and root rect computes the intersection between then
 * following the algorithm in the spec.
 * TODO(philipwalton): at this time clip-path is not considered.
 * https://w3c.github.io/IntersectionObserver/#calculate-intersection-rect-algo
 * @param {Element} target The target DOM element
 * @param {Object} rootRect The bounding rect of the root after being
 *     expanded by the rootMargin value.
 * @return {?Object} The final intersection rect object or undefined if no
 *     intersection is found.
 * @private
 */
IntersectionObserver.prototype._computeTargetAndRootIntersection =
    function(target, rootRect) {

  // If the element isn't displayed, an intersection can't happen.
  if (window.getComputedStyle(target).display == 'none') return;

  var targetRect = getBoundingClientRect(target);
  var intersectionRect = targetRect;
  var parent = getParentNode(target);
  var atRoot = false;

  while (!atRoot) {
    var parentRect = null;
    var parentComputedStyle = parent.nodeType == 1 ?
        window.getComputedStyle(parent) : {};

    // If the parent isn't displayed, an intersection can't happen.
    if (parentComputedStyle.display == 'none') return;

    if (parent == this.root || parent == document) {
      atRoot = true;
      parentRect = rootRect;
    } else {
      // If the element has a non-visible overflow, and it's not the <body>
      // or <html> element, update the intersection rect.
      // Note: <body> and <html> cannot be clipped to a rect that's not also
      // the document rect, so no need to compute a new intersection.
      if (parent != document.body &&
          parent != document.documentElement &&
          parentComputedStyle.overflow != 'visible') {
        parentRect = getBoundingClientRect(parent);
      }
    }

    // If either of the above conditionals set a new parentRect,
    // calculate new intersection data.
    if (parentRect) {
      intersectionRect = computeRectIntersection(parentRect, intersectionRect);

      if (!intersectionRect) break;
    }
    parent = getParentNode(parent);
  }
  return intersectionRect;
};


/**
 * Returns the root rect after being expanded by the rootMargin value.
 * @return {Object} The expanded root rect.
 * @private
 */
IntersectionObserver.prototype._getRootRect = function() {
  var rootRect;
  if (this.root) {
    rootRect = getBoundingClientRect(this.root);
  } else {
    // Use <html>/<body> instead of window since scroll bars affect size.
    var html = document.documentElement;
    var body = document.body;
    rootRect = {
      top: 0,
      left: 0,
      right: html.clientWidth || body.clientWidth,
      width: html.clientWidth || body.clientWidth,
      bottom: html.clientHeight || body.clientHeight,
      height: html.clientHeight || body.clientHeight
    };
  }
  return this._expandRectByRootMargin(rootRect);
};


/**
 * Accepts a rect and expands it by the rootMargin value.
 * @param {Object} rect The rect object to expand.
 * @return {Object} The expanded rect.
 * @private
 */
IntersectionObserver.prototype._expandRectByRootMargin = function(rect) {
  var margins = this._rootMarginValues.map(function(margin, i) {
    return margin.unit == 'px' ? margin.value :
        margin.value * (i % 2 ? rect.width : rect.height) / 100;
  });
  var newRect = {
    top: rect.top - margins[0],
    right: rect.right + margins[1],
    bottom: rect.bottom + margins[2],
    left: rect.left - margins[3]
  };
  newRect.width = newRect.right - newRect.left;
  newRect.height = newRect.bottom - newRect.top;

  return newRect;
};


/**
 * Accepts an old and new entry and returns true if at least one of the
 * threshold values has been crossed.
 * @param {?IntersectionObserverEntry} oldEntry The previous entry for a
 *    particular target element or null if no previous entry exists.
 * @param {IntersectionObserverEntry} newEntry The current entry for a
 *    particular target element.
 * @return {boolean} Returns true if a any threshold has been crossed.
 * @private
 */
IntersectionObserver.prototype._hasCrossedThreshold =
    function(oldEntry, newEntry) {

  // To make comparing easier, an entry that has a ratio of 0
  // but does not actually intersect is given a value of -1
  var oldRatio = oldEntry && oldEntry.isIntersecting ?
      oldEntry.intersectionRatio || 0 : -1;
  var newRatio = newEntry.isIntersecting ?
      newEntry.intersectionRatio || 0 : -1;

  // Ignore unchanged ratios
  if (oldRatio === newRatio) return;

  for (var i = 0; i < this.thresholds.length; i++) {
    var threshold = this.thresholds[i];

    // Return true if an entry matches a threshold or if the new ratio
    // and the old ratio are on the opposite sides of a threshold.
    if (threshold == oldRatio || threshold == newRatio ||
        threshold < oldRatio !== threshold < newRatio) {
      return true;
    }
  }
};


/**
 * Returns whether or not the root element is an element and is in the DOM.
 * @return {boolean} True if the root element is an element and is in the DOM.
 * @private
 */
IntersectionObserver.prototype._rootIsInDom = function() {
  return !this.root || containsDeep(document, this.root);
};


/**
 * Returns whether or not the target element is a child of root.
 * @param {Element} target The target element to check.
 * @return {boolean} True if the target element is a child of root.
 * @private
 */
IntersectionObserver.prototype._rootContainsTarget = function(target) {
  return containsDeep(this.root || document, target);
};


/**
 * Adds the instance to the global IntersectionObserver registry if it isn't
 * already present.
 * @private
 */
IntersectionObserver.prototype._registerInstance = function() {
  if (registry.indexOf(this) < 0) {
    registry.push(this);
  }
};


/**
 * Removes the instance from the global IntersectionObserver registry.
 * @private
 */
IntersectionObserver.prototype._unregisterInstance = function() {
  var index = registry.indexOf(this);
  if (index != -1) registry.splice(index, 1);
};


/**
 * Returns the result of the performance.now() method or null in browsers
 * that don't support the API.
 * @return {number} The elapsed time since the page was requested.
 */
function now() {
  return window.performance && performance.now && performance.now();
}


/**
 * Throttles a function and delays its executiong, so it's only called at most
 * once within a given time period.
 * @param {Function} fn The function to throttle.
 * @param {number} timeout The amount of time that must pass before the
 *     function can be called again.
 * @return {Function} The throttled function.
 */
function throttle(fn, timeout) {
  var timer = null;
  return function () {
    if (!timer) {
      timer = setTimeout(function() {
        fn();
        timer = null;
      }, timeout);
    }
  };
}


/**
 * Adds an event handler to a DOM node ensuring cross-browser compatibility.
 * @param {Node} node The DOM node to add the event handler to.
 * @param {string} event The event name.
 * @param {Function} fn The event handler to add.
 * @param {boolean} opt_useCapture Optionally adds the even to the capture
 *     phase. Note: this only works in modern browsers.
 */
function addEvent(node, event, fn, opt_useCapture) {
  if (typeof node.addEventListener == 'function') {
    node.addEventListener(event, fn, opt_useCapture || false);
  }
  else if (typeof node.attachEvent == 'function') {
    node.attachEvent('on' + event, fn);
  }
}


/**
 * Removes a previously added event handler from a DOM node.
 * @param {Node} node The DOM node to remove the event handler from.
 * @param {string} event The event name.
 * @param {Function} fn The event handler to remove.
 * @param {boolean} opt_useCapture If the event handler was added with this
 *     flag set to true, it should be set to true here in order to remove it.
 */
function removeEvent(node, event, fn, opt_useCapture) {
  if (typeof node.removeEventListener == 'function') {
    node.removeEventListener(event, fn, opt_useCapture || false);
  }
  else if (typeof node.detatchEvent == 'function') {
    node.detatchEvent('on' + event, fn);
  }
}


/**
 * Returns the intersection between two rect objects.
 * @param {Object} rect1 The first rect.
 * @param {Object} rect2 The second rect.
 * @return {?Object} The intersection rect or undefined if no intersection
 *     is found.
 */
function computeRectIntersection(rect1, rect2) {
  var top = Math.max(rect1.top, rect2.top);
  var bottom = Math.min(rect1.bottom, rect2.bottom);
  var left = Math.max(rect1.left, rect2.left);
  var right = Math.min(rect1.right, rect2.right);
  var width = right - left;
  var height = bottom - top;

  return (width >= 0 && height >= 0) && {
    top: top,
    bottom: bottom,
    left: left,
    right: right,
    width: width,
    height: height
  };
}


/**
 * Shims the native getBoundingClientRect for compatibility with older IE.
 * @param {Element} el The element whose bounding rect to get.
 * @return {Object} The (possibly shimmed) rect of the element.
 */
function getBoundingClientRect(el) {
  var rect;

  try {
    rect = el.getBoundingClientRect();
  } catch (err) {
    // Ignore Windows 7 IE11 "Unspecified error"
    // https://github.com/w3c/IntersectionObserver/pull/205
  }

  if (!rect) return getEmptyRect();

  // Older IE
  if (!(rect.width && rect.height)) {
    rect = {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    };
  }
  return rect;
}


/**
 * Returns an empty rect object. An empty rect is returned when an element
 * is not in the DOM.
 * @return {Object} The empty rect.
 */
function getEmptyRect() {
  return {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0
  };
}

/**
 * Checks to see if a parent element contains a child elemnt (including inside
 * shadow DOM).
 * @param {Node} parent The parent element.
 * @param {Node} child The child element.
 * @return {boolean} True if the parent node contains the child node.
 */
function containsDeep(parent, child) {
  var node = child;
  while (node) {
    if (node == parent) return true;

    node = getParentNode(node);
  }
  return false;
}


/**
 * Gets the parent node of an element or its host element if the parent node
 * is a shadow root.
 * @param {Node} node The node whose parent to get.
 * @return {Node|null} The parent node or null if no parent exists.
 */
function getParentNode(node) {
  var parent = node.parentNode;

  if (parent && parent.nodeType == 11 && parent.host) {
    // If the parent is a shadow root, return the host element.
    return parent.host;
  }
  return parent;
}


// Exposes the constructors globally.
window.IntersectionObserver = IntersectionObserver;
window.IntersectionObserverEntry = IntersectionObserverEntry;

}(window, document));


/***/ }),
/* 9 */
/*!****************************!*\
  !*** ./src/css/index.less ***!
  \****************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader??ref--1-1!../../node_modules/postcss-loader/lib!../../node_modules/less-loader/dist/cjs.js!./index.less */ 10);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ 12)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--1-1!../../node_modules/postcss-loader/lib/index.js!../../node_modules/less-loader/dist/cjs.js!./index.less", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--1-1!../../node_modules/postcss-loader/lib/index.js!../../node_modules/less-loader/dist/cjs.js!./index.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 10 */
/*!*************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader?{"minimize":true}!./node_modules/postcss-loader/lib!./node_modules/less-loader/dist/cjs.js!./src/css/index.less ***!
  \*************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ 11)(false);
// imports


// module
exports.push([module.i, "@-webkit-keyframes containerShow{0%{opacity:0}to{opacity:1}}@keyframes containerShow{0%{opacity:0}to{opacity:1}}.DisplayConsoleContainer{display:none;position:absolute;top:0;left:0;right:0;bottom:0;overflow:hidden;width:95%;height:95%;margin:auto;background-color:#fff;border-radius:4px;border:1px solid #e0e0e0;-webkit-box-shadow:0 2px 8px rgba(0,0,0,.3);box-shadow:0 2px 8px rgba(0,0,0,.3);z-index:9999999}.DisplayConsoleContainer--show{-webkit-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-animation:containerShow .12s ease-in;animation:containerShow .12s ease-in}.DisplayConsoleContainer--show,.DisplayConsoleContainer__header{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-direction:normal}.DisplayConsoleContainer__header{position:relative;-webkit-box-orient:horizontal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;width:100%;height:44px;background-color:#c5dfe3;border-bottom:1px solid #ccc}.DisplayConsoleContainer__header h1{-webkit-box-flex:1;-webkit-flex:1 1 0%;-ms-flex:1 1 0%;flex:1 1 0%;padding:0 .5em;margin:0;font-size:24px;line-height:44px}.DisplayConsoleContainer__closeButton{position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;width:36px;height:36px;margin:4px;background-color:#fff;border:1px solid #666;border-radius:4px;cursor:pointer}.DisplayConsoleContainer__closeButton:after,.DisplayConsoleContainer__closeButton:before{content:\"\";display:inline-block;position:absolute;top:0;left:0;right:0;bottom:0;width:20px;height:0;margin:auto;border-top:1px solid #000}.DisplayConsoleContainer__closeButton:before{-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}.DisplayConsoleContainer__closeButton:after{-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);transform:rotate(-45deg)}.DisplayConsoleContainer__body{-webkit-box-flex:1;-webkit-flex:1 1 0%;-ms-flex:1 1 0%;flex:1 1 0%;position:relative;overflow:auto;-webkit-overflow-scrolling:touch;color:#333}.DisplayConsoleMenu{position:absolute;display:none;width:44px;height:44px;margin:auto;border-radius:50%;background:#000;-webkit-box-shadow:0 4px 12px rgba(0,0,0,.5);box-shadow:0 4px 12px rgba(0,0,0,.5);font-size:24px;line-height:1;font-weight:700;z-index:9999999;cursor:pointer;font-family:monospace}.DisplayConsoleMenu--top{top:12px}.DisplayConsoleMenu--middle{top:0;bottom:0}.DisplayConsoleMenu--bottom{bottom:12px}.DisplayConsoleMenu--left{left:12px}.DisplayConsoleMenu--center{left:0;right:0}.DisplayConsoleMenu--right{right:12px}.DisplayConsoleMenu--show{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.DisplayConsoleMenu:after,.DisplayConsoleMenu:before{content:\"\";display:inline-block;position:absolute;top:0;left:0;right:0;bottom:0;width:20px;height:0;margin:auto}.DisplayConsoleMenu:before{height:15px;border-top:3px solid #fff;border-bottom:3px solid #fff}.DisplayConsoleMenu:after{height:0;border-top:3px solid #fff}.DisplayConsoleRow{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;width:100%;height:auto;font-family:Monaco,Consolas,monospace;min-height:21px;font-size:11px;line-height:21px}.DisplayConsoleRow+.DisplayConsoleRow{border-top:1px solid #e0e0e0}.DisplayConsoleRow__number{display:inline-block;min-width:2em;padding:0 6px;font-size:9px;text-align:center;color:#999;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.DisplayConsoleRow__values{-webkit-box-flex:1;-webkit-flex:1 1 0%;-ms-flex:1 1 0%;flex:1 1 0%}.DisplayConsoleRow__info{-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;width:auto;padding:0 6px;font-size:9px;text-align:right;white-space:nowrap;color:#999;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.DisplayConsoleRow i{display:inline-block;width:1em;height:100%;margin-right:.5em;font-size:1.2em;line-height:1.6;vertical-align:top}.DisplayConsoleRow i:before{width:14px;height:14px;border-radius:7px;color:#fff;display:block;text-align:center;font-style:normal;line-height:14px;font-size:10px;margin-top:3px}.DisplayConsoleRow--error{background-color:#ffe3e3;color:red}.DisplayConsoleRow--error i:before{content:\"\\D7\";background-color:red}.DisplayConsoleRow--warn{background-color:#ffffdc}.DisplayConsoleRow--warn i:before{content:\"!\";background-color:#ffce00}.DisplayConsoleRow--info i:before{content:\"i\";background-color:blue}@media (max-width:798px){.DisplayConsoleRow{position:relative;padding-bottom:24px;min-height:24px;font-size:14px;line-height:24px}.DisplayConsoleRow i{max-height:24px}.DisplayConsoleRow__info{position:absolute;bottom:0;right:0;-webkit-align-self:flex-end;-ms-flex-item-align:end;align-self:flex-end;width:100%}}.DisplayConsoleRow i{max-height:21px}.DisplayConsoleCell{display:inline-block;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;letter-spacing:.04em;word-break:break-all;vertical-align:top}.DisplayConsoleCell+.DisplayConsoleCell{margin-left:1em;white-space:pre-line}.DisplayConsoleCell__node{display:inline-block}.DisplayConsoleCell__node--boolean,.DisplayConsoleCell__node--number{color:blue}.DisplayConsoleCell__node--stringValue{color:red}.DisplayConsoleCell__node--null{color:#999}.DisplayConsoleCell__node--param{color:purple}.DisplayConsoleCell__node--leader{letter-spacing:-.3em;margin-right:.3em}.DisplayConsoleCellAcordion__line{position:relative;display:inline-block;padding-left:12px}.DisplayConsoleCellAcordion__line:before{content:\"\";display:inline-block;position:absolute;top:0;bottom:0;left:0;width:0;height:0;margin:auto;border:4px solid transparent;border-left-color:#666;border-left-width:8px;border-right-width:0}.DisplayConsoleCellAcordion__line--open:before{-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg)}.DisplayConsoleCellAcordion__params{display:none;padding-left:2em}.DisplayConsoleCellAcordion__checkbox{display:none}.DisplayConsoleCellAcordion__checkbox:checked+.DisplayConsoleCellAcordion__params{display:block;white-space:pre-line}", ""]);

// exports


/***/ }),
/* 11 */
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 12 */
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ 13);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 13 */
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 14 */
/*!***********************************!*\
  !*** ./src/js/methods/destroy.js ***!
  \***********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DisplayConsole = __webpack_require__(/*! classes/DisplayConsole */ 0);

var _DisplayConsole2 = _interopRequireDefault(_DisplayConsole);

var _const = __webpack_require__(/*! js/const */ 1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var Console = _DisplayConsole2.default.getInstance();

  if (Console) {
    Console.destroy();
  }

  if (_const.useStackTrace && Error.prepareStackTrace) {
    Error.prepareStackTrace = null;
  }

  // consoleの復帰
  var _window = window,
      console = _window.console,
      _console = _window._console;


  console.log(_console);

  if (_console) {
    Object.keys(console).forEach(function (name) {
      if (_const.replaceMethodNames.indexOf(name) !== -1) {
        console[name] = _console[name];
      }
    });

    window._console = null;
  }
};

/***/ })
/******/ ]);
});