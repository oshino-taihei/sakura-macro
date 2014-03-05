//==========================================================================
// 選択された文字列を同じ長さで"="のリストに置換する。
// 選択されていない場合は、長さを80とする。
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

// 指定した文字を指定した長さの文字列を生成する
function get_equal_line(length, ch) {
  var ret = "";
  for (var i = 0; i < length; i++) {
    ret += ch;
  }
  return ret;
}

//==========
// MAIN
//==========

// 選択範囲のテキストを取得
var text = Editor.GetSelectedString(0);
var ch = "=";

// 整形後のテキストを出力
if ( text !== "" ) {
  Editor.InsText(get_equal_line(countLength(text), ch));
} else {
  Editor.InsText(get_equal_line(80, ch));
}
