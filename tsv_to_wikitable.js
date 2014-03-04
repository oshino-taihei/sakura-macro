//==========================================================================
// TSVテキストをwiki記法のテーブルに変換する
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

// TSVテキストをセパレータを"|"にして返す
// tabtext : TSVテキスト
function tsv_to_wikitable(tabtext) {
  var rettext = tabtext;
  rettext = rettext.replace(/\t/g, "|");
  rettext = rettext.replace(/^(.+?)$/gm, "|$1|");
  return rettext;
} 

//==========
// MAIN
//==========

// 選択範囲のテキストを取得
var tabtext = Editor.GetSelectedString(0);

// 整形後のテキストを出力
if ( tabtext != "" ) Editor.InsText(tsv_to_wikitable(tabtext));

