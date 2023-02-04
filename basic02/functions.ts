/* eslint-disable prefer-const */
function add3(n1: number, n2: number): number {
  return n1 + n2;
}
//void: 함수안에 리턴문이 없어도 됌
//undefined: 함수안에 리턴문을 적어야함! 좀더 명확하게 해야함.
function printResult(num: number): void {
  console.log('Result: ' + num);
}
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}
printResult(add(5, 12)); //Result: 17
console.log(printResult(add(5, 12))); //undefined 반환값이 없음

let combineValues: (a: number, b: number) => number;
combineValues = add;

console.log(combineValues(8, 8));

addAndHandle(10, 20, para => {
  console.log(para);
});
