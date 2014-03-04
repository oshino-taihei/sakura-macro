//==========================================================================
// TSVテキストをwiki記法のテーブルに変換する
//
// 【例】:
// (変換前)
// EMPLOYEE_ID	FIRST_NAME	LAST_NAME	EMAIL
// 198	Donald	OConnell	DOCONNEL
// 199	Douglas	Grant	DGRANT
// 200	Jennifer	Whalen	JWHALEN
// 201	Michael	Hartstein	MHARTSTE
// (変換後)
// |EMPLOYEE_ID|FIRST_NAME|LAST_NAME|EMAIL|
// |198|Donald|OConnell|DOCONNEL|
// |199|Douglas|Grant|DGRANT|
// |200|Jennifer|Whalen|JWHALEN|
// |201|Michael|Hartstein|MHARTSTE|

//==========================================================================

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

