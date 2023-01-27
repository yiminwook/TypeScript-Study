function combine(input1, input2, resultConversion) {
  var result;
  if (typeof input1 === 'number' && typeof input2 === 'number') {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  if (resultConversion === 'as-number') {
    return +result;
  } else {
    return result.toString();
  }
}
var combindedAges = combine(30, 26, 'as-number');
console.log(combindedAges);
var combindedStringAges = combine('30', '26', 'as-number');
console.log(combindedStringAges);
var combinNames = combine('Max', 'Anna', 'as-text');
console.log(combinNames);
