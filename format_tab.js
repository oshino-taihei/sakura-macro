//==========================================================================
// 選択されたTSVテキストを
// 整形し各項目の開始位置をそろえたパイプ区切りのテキストに変換する。
//
// 【例】:
// (変換前)
// DEPARTMENT_ID DEPARTMENT_NAME EMPLOYEE_ID EMPLOYEE_NAME
// 10  Administration  200 Jennifer Whalen
// 20  Marketing 201 Michael Hartstein
// 20  Marketing 202 Pat Fay
// (変換後)
// |DEPARTMENT_ID|DEPARTMENT_NAME|EMPLOYEE_ID|    EMPLOYEE_NAME|
// |           10| Administration|        200|  Jennifer Whalen|
// |           20|      Marketing|        201|Michael Hartstein|
// |           20|      Marketing|        202|          Pat Fay|
//==========================================================================

/****************************************************************
* バイト数を数える
*
* 引数 ： str 文字列
* 戻り値： バイト数 
* 参考: http://www.kanaya440.com/contents/tips/javascript/006.html
****************************************************************/
function countLength(str) {
    var r = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        // Shift_JIS: 0x0 ～ 0x80, 0xa0 , 0xa1 ～ 0xdf , 0xfd ～ 0xff
        // Unicode : 0x0 ～ 0x80, 0xf8f0, 0xff61 ～ 0xff9f, 0xf8f1 ～ 0xf8f3
        if ( (c >= 0x0 && c < 0x81) || (c == 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
            r += 1;
        } else {
            r += 2;
        }
    }
    return r;
}

// 指定した桁数でパディングした文字列を返す
// str : パディング対象文字列
// length : パディング桁数
// padding_char : パディングする文字(" "など)
function pad(str, length, padding_char) {
  var padding = "";
  for (var i = countLength(str); i < length; i++) {
    padding += padding_char;
  }
  return padding + str;
}

// タブ区切りのテキストを整形されたスペース区切りのテキストにして返す
// tabtext : タブ区切りのテキスト
function format_tab(tabtext) {
  var lines = tabtext.split("\n");
  var rettext = "";
  var maxes; // 各列の文字の最大長を保持するリスト(i番目にi列目の要素の最大長が入る)
  var text_list = []; // タブ区切りのデータを2次元配列として保持するためのリスト
  for (var i = 0; i < lines.length; i++) {
    var cells = lines[i].split("\t");
    l = cells.length;
    // maxes配列を初期化(要素数をセル数、各値の初期値は0)
    if (i === 0) {
      maxes = new Array(l);
      for (var k = 0; k < l; k++) {
        maxes[k] = 0;
      }
    }
    // 行をタブで区切ったセルを見て、その列の最大長を保持
    for (var j = 0; j < l; j++) {
      maxes[j] = Math.max(maxes[j], countLength(cells[j]));
    }
    // 空行は無視
    if (lines[i] !== "") {
      text_list.push(cells);
    }
  }
  
  // 整形して返す
  for (var l = 0; l < text_list.length; l++) {
    for (var m = 0; m < text_list[l].length; m++) {
      rettext += pad(text_list[l][m], maxes[m], " ") + "|";
    }
    rettext = rettext.slice(0, -1); // 行末の余分なパイプを削除
  }
  rettext = rettext.replace(/^(.+?)$/gm, "|$1|"); // 各行の先頭・末尾にパイプを追加
  return rettext;
}

//==========
// MAIN
//==========

// 選択範囲のテキストを取得
var tabtext = Editor.GetSelectedString(0);

// 整形後のテキストを出力
if ( tabtext !== "" ) Editor.InsText(format_tab(tabtext));
