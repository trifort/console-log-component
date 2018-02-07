# ConsoleLogComponent
ブラウザ標準のconsoleオブジェクトのメソッドを置き換え、
`console.log`などの結果を開発者ツールだけでなくコンテンツ画面上にも表示します。

## Download
- [consoleLogComponent.js](https://trifort.github.io/console-log-component/docs/1.0.0/consoleLogComponent.js)

## Usage
In a browser:
```html
<script src="consoleLogComponent.js"></script>
<script>
  var Console = ConsoleLogComponent.init()
</script>
```

Using npm:
```sh
$ npm i -S console-log-component
```
```js
import ConsoleLogComponent from 'console-log-component'
const Console = ConsoleLogComponent.init()
```

## Options
|Name|Type|Default|Description|
|---|---|---|---|
|menuPosition|`String`|`right bottom`|メニューボタンの表示位置。縦方向（top、middle、bottom）と横方向（left、center、right）の値をスペース区切りで指定する。|

### `menuPosition`
```js
const Console = ConsoleLogComponent.init({
  menuPosition: 'top left'
})
```

## API

### `show()`
DisplayConsoleのDOMを表示する。

### `hide()`
DisplayConsoleのDOMを非表示にする。

### `clear()`
表示されているログを消去する。

### `destroy()`
DisplayConsoleインスタンスを破棄する。

### `output(type, frame, values)`
DisplayConsoleのDOMにログ出力を追加する。

|Name|Type|Description|
|---|---|---|
|type|`String`|出力タイプ。log、error、warnなどconsoleのメソッド名と共通。|
|frame|`Object`|実行ファイル名や行番号などの情報を持つオブジェクト。|
|values|`Array`|出力内容。console.logなどの引数に相当する可変長配列。可変長引数をメソッド側で配列化する。|

## License
MIT
