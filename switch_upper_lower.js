//==========================================================================
// 選択されたテキストの大文字、小文字を切り替える。
// 実際の仕様としては、
// 選択されたテキスト中に大文字が含まれるならば全て小文字にし、そうでないなら全て大文字にする。
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

// 指定したテキストに大文字が含まれるならば全て小文字に、
// そうでないならば全て大文字に変換した文字列を返す。
function switch_upper_lower(text) {
  if (text.match(/[A-Z]/)) {
    return text.toLowerCase();
  } else {
    return text.toUpperCase();
  }
}

//==========
// MAIN
//==========

// 選択範囲のテキストを取得
var text = Editor.GetSelectedString(0);

// 整形後のテキストを出力
if ( text !== "" ) Editor.InsText(switch_upper_lower(text));
