//==========================================================================
// 選択されたエクセルからコピペしたようなタブ区切りのテキストを
// 整形し各項目の開始位置をそろえたスペース区切りのテキストに変換する。
//
// 【例】:
// (変換前)
//header	value1	value2	value3
//asdf	asdf	asdf	asdf
//132	12341234	13	12345
//AA	BB	CC	DD
// (変換後)
//header   value1 value2 value3
//  asdf     asdf   asdf   asdf
//   132 12341234     13  12345
//    AA       BB     CC     DD
//==========================================================================

// 指定した桁数でパディングした文字列を返す
// str : パディング対象文字列
// length : パディング桁数
// padding_char : パディングする文字(" "など)
function pad(str, length, padding_char) {
	var padding = "";
	for (var i = str.length; i < length; i++) {
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
  	if (i == 0) {
  		maxes = new Array(l);
  		for (var k = 0; k < l; k++) {
  			maxes[k] = 0;
  		}
  	}
  	// 行をタブで区切ったセルを見て、その列の最大長を保持
  	for (var j = 0; j < l; j++) {
  		maxes[j] = Math.max(maxes[j], cells[j].length);
  	}
  	// 空行は無視
  	if (lines[i] != "") {
  		text_list.push(cells);
  	}
  }
  
  // 整形して返す
  for (var i = 0; i < text_list.length; i++) {
  	for (var j = 0; j < text_list[i].length; j++) {
  		rettext += pad(text_list[i][j], maxes[j], " ") + " ";
  	}
  	rettext = rettext.slice(0, -1) // 行末の余分なスペースを削除
  }
  return rettext;
} 

//==========
// MAIN
//==========

// 選択範囲のテキストを取得
var tabtext = Editor.GetSelectedString(0);

// 整形後のテキストを出力
if ( tabtext != "" ) Editor.InsText(format_tab(tabtext));

