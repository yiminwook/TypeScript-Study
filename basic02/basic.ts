const n1 = 5;
const n2 = 2.8;
const result = true;
const resultPhrase = 'Result is:...';

function add(n1: number, n2: number, showResult: boolean, phrase: string) {
  if (showResult) {
    return console.log(phrase, n1 + n2);
  } else {
    return showResult;
  }
}

add(n1, n2, result, resultPhrase);
