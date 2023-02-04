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

//intersaction type 타입간의 공통점을 뽑아낸다.
type Universal = CombinableType & Numberic; //number type

function add4(a: CombinableType, b: CombinableType) {
  //타입가드
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

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
