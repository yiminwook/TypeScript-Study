/* eslint-disable indent */
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'max',
  privileges: ['create-server'],
  startDate: new Date(),
};

type CombinableType = string | number;
type Numberic = number | boolean;

//intersection type 타입간의 공통점을 뽑아낸다.
type Universal = CombinableType & Numberic; //number type

//type overload 반환되는 타입이 여러개일 때, 조건을 걸어서 특정 타입으로 반환하도록한다.
function add4(a: number, b: number): number;
function add4(a: string, b: string): string;
function add4(a: string, b: number): string;
function add4(a: number, b: string): string;
function add4(a: CombinableType, b: CombinableType) {
  //타입가드
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

const resultAdd4 = add4('1', 1);
resultAdd4.split(''); //add4의 반환값이 string이기 때문에 split()을 사용가능하다.

type UnknownEmpoloyee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmpoloyee) {
  console.log('Name: ' + emp.name);
  if ('privileges' in emp) {
    //key(객체) 또는 index(배열)를 확인
    console.log('Privilges' + emp.privileges);
  }
  if ('startDate' in emp) {
    console.log('Start Date' + emp.startDate);
  }
}

printEmployeeInformation(e1);

class Car {
  drive() {
    console.log('Driving...');
  }
}

class Truck {
  drive() {
    console.log('Driving...');
  }
  loadCargo(amount: number) {
    console.log('Loading cargo...' + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  // if ('loadCargo' in vehicle) {
  //   vehicle.loadCargo(1000);
  // }
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

interface Bird {
  type: 'Bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'Horse';
  runningSpeed: number;
}
type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case 'Bird':
      speed = animal.flyingSpeed;
      break;
    case 'Horse':
      speed = animal.runningSpeed;
  }
  console.log('Moving at speed: ' + speed);
}

moveAnimal({ type: 'Bird', flyingSpeed: 100 });

//type casting 형변환
const userInputElement1 = document.getElementById(
  'user-input1',
) as HTMLInputElement;
const userInputElement2 = <HTMLInputElement>(
  document.getElementById('user-input2')
);

userInputElement1.value = 'Hi there!';
userInputElement2.value = 'Hello!';

console.log(userInputElement1);

//index type 유연하게 활용할 수 있다.
interface ErrorContainer {
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: 'Not a vaild email',
  username: 'Must start with a capital character!',
};

//optional chaining (?.)
fetch('localhost:3000', { method: 'POST' })
  .then(data => data)
  .catch(err => console.log(err.date?.time)); //undefined
//접근하고자 하는 데이터가 없으면 undefined를 리턴시키고 컴파일 오류를 일으키지 않는다.

//null 병합
const inputData1 = '';
const inputData2 = null;

//빈문자열이나 0일때
const storedData1 = inputData1 || 'DEFALUT';
//null과 undefined만 초기값을 넣어준다.
const storedData2 = inputData1 ?? 'DEFALUT';

//null이거나 undefined일때
const storedData3 = inputData2 || 'DEFALUT';
const storedData4 = inputData2 ?? 'DEFALUT';

console.log('storedData1', storedData1); //DEFALUT
console.log('storedData2', storedData2); //""
console.log('storedData3', storedData3); //DEFALUT
console.log('storedData4', storedData4); //DEFALUT
