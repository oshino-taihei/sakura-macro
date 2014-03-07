//==========================================================================
// 選択されたテキスト中のs2dao変数にバインド変数をリテラルとして付与する。
// すでにリテラルが付与されている場合は無視する。
// 【例】
// (変換前)
// and value1 = /*cond.value1*/
// and value2 = /*cond.value2*/
// and date = /*cond.date*/:cond_date
// and const = /*cond.const*/1
// (変換後)
// and value1 = /*cond.value1*/:cond_value1
// and value2 = /*cond.value2*/:cond_value2
// and date = /*cond.date*/:cond_date
// and const = /*cond.const*/1
//==========================================================================

function convert_s2dao_to_bind(text) {
  return text.replace(/(\/\*(.*)\.+(.*)\*\/)\s/gm, "$1:$2_$3");
}

//==========
// MAIN
//==========

// 選択範囲のテキストを取得
var text = Editor.GetSelectedString(0);

// 変換後のテキストを挿入
if ( text !== "" ) Editor.InsText(convert_s2dao_to_bind(text));
