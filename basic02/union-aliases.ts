type Combinable = number | string;
type ConversionDescriptor = 'as-number' | 'as-text';

function combine(
  input1: Combinable,
  input2: Combinable,
  //리터럴타입 다른 string이 들어오지 못하게 지정해줌
  resultConversion: ConversionDescriptor,
) {
  let result: string | number;
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

const combindedAges = combine(30, 26, 'as-number');
console.log(combindedAges);

const combindedStringAges = combine('30', '26', 'as-number');
console.log(combindedStringAges);

const combinNames = combine('Max', 'Anna', 'as-text');
console.log(combinNames);
