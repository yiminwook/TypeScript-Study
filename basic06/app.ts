/* eslint-disable indent */
//Decorator
//대문자가 앞으로 오는 함수명
//데코레이터는 클래스가 정의될때 실행된다.

function Logger(str: string) {
  console.log('LOGGER FACTORY');
  return function <T>(constructor: T) {
    console.log(str);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log('TEMPLATE FACTORY');
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T,
  ) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        console.log('Rendering template');
        const hookEl = document.getElementById(hookId);

        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector('h1')!.textContent += ': ' + this.name;
        }
      }
    };
  };
}

@Logger('LOGGING - PERSON') //나중에 실행
@WithTemplate('<h1>My Person Object</h1>', 'app') //먼저실행
class Person2 {
  name = 'Max';
  constructor() {
    console.log('Creating person object');
  }
}

const pers = new Person2();

console.log(pers);

console.log('--------------------------------------------------------');

//Property Decorater
function Log(target: any, name: string | symbol) {
  console.log('Property Decorater');
  console.log('target', target);
  console.log('name', name);
  console.log('--------------------------------------------------------');
}

//Method decorator
function Log2(
  target: any,
  name: string | symbol,
  descriptor: PropertyDescriptor,
) {
  console.log('Method decorator');
  console.log('target', target);
  console.log('name', name);
  console.log('descriptor', descriptor);
  console.log('--------------------------------------------------------');
}

//Accessor decorator
function Log3(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator');
  console.log('target', target);
  console.log('name', name);
  console.log('descriptor', descriptor);
  console.log('--------------------------------------------------------');
}

function Log4(target: any, name: string | symbol, position: number) {
  console.log('Parameter decorator');
  console.log('target', target);
  console.log('name', name);
  console.log('postion', position); //parameter index
  console.log('--------------------------------------------------------');
}

class Product {
  @Log
  title: string;
  private _price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log2
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }

  @Log3
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error('invalid price = should be positive!');
    }
  }
}

const book = new Product('book', 10);
console.log(book);

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalDescriptor = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalDescriptor.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = 'This works!';

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();
const button2 = document.querySelector('button')!;
button2.addEventListener('click', p.showMessage);

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; //['required', 'positive]
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      'required',
    ],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      'positive',
    ],
  };
}

function Validate(obj: any) {
  console.log(registeredValidators);
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    //유효성검사가 없으면 true
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    //prop === propName
    for (const validator of objValidatorConfig[prop]) {
      //required or positive
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', e => {
  e.preventDefault();

  const titleEl = document.getElementById('course-title') as HTMLInputElement;
  const priceEl = document.getElementById('course-price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);
  if (!Validate(createdCourse)) {
    alert('Invalid input, please try again!');
    return;
  }
});
