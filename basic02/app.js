var n1 = 5;
var n2 = 2.8;
var printResult = true;
var resultPhrase = 'Result is:...';
function add(n1, n2, showResult, phrase) {
  if (showResult) {
    return console.log(phrase, n1 + n2);
  } else {
    return showResult;
  }
}
add(n1, n2, printResult, resultPhrase);
