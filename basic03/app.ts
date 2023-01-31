/* eslint-disable prefer-const */
interface Greetable {
  age: number;
}

//interface는 선언적 병합이 가능
//type에서 가능한 computed value는 사용이 불가
interface Greetable {
  greet: (phrase: string) => void;
  response(phrase: string): void;
}

//interface는 여러개를 상속받아 확장 할 수 있다.
//단. 자바스크립트 문법 class에서는 하나만 상속가능
interface Named extends Greetable {
  //?가 붙으면 해당값이 없어도 허용
  readonly name?: string;
  outputName?: string;
}

class Person implements Named, Greetable {
  name?: string; //읽기전용
  age = 30;

  constructor(name?: string) {
    //선택적속성
    this.name = name;
  }
  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  }
  response(phrase: string) {
    console.log(phrase + ' ' + this.name);
  }
}

let user1: Greetable = new Person('Mike');
let user2: Greetable = new Person();

user1.greet('Hi there - I am');
user1.response('hello');
console.log(user2);
