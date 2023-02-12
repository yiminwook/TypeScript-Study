import _ from 'lodash'; //바닐라 자바스크립트 서드파티 라이브러리
//@types/lodash가 타입스크립트에서 사용할 수 있도록 변환시켜줌 .d.ts

import 'reflect-metadata'; //class-tansformer의 의존성 라이브러리
import { plainToClass } from 'class-transformer';
import { Product } from './product.model';

import { validate } from 'class-validator';

console.log(_.shuffle([1, 2, 3]));

declare let GLOBAL: string;

console.log(GLOBAL);

const products = [
  { title: 'A Carpet', price: 29.99 },
  { title: 'A Book', price: 10.99 },
];

const loadedProducts = plainToClass(Product, products);

for (const prod of loadedProducts) {
  console.log(prod.getProductInfo());
}

const newProd = new Product('', -5.99);
validate(newProd).then(errors => {
  //조건에 맞지 않은 갯수만큼 Error객체의 배열을 리턴, catch는 쓰지 않는다.;
  if (errors.length > 0) {
    for (const err of errors) {
      console.log(Object.values(err.constraints as object)[0]);
    }
  }
  return console.log(newProd.getProductInfo());
});
