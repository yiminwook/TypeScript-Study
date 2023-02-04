//제네릭 타입
const names: Array<string> = ['Max', 'Manuel'];

names[0].split('');

const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('This is done!');
  }, 2000);
});

promise.then(data => data.split(''));

//T와 U는 Object이어야함을 명시
//string number union 타입도 가능
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign({}, objA, objB);
}

const mergedObj = merge({ name: 'Max' }, { age: 30 });
console.log(mergedObj.name);

interface Lengthy {
  length: number;
}

//T가 length속성을 가지고 있어야한다
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value.';
  if (element.length > 0) {
    descriptionText = 'Got' + element.length + 'elements.';
  }
  return [element, descriptionText];
}

//number[]에 length: number을 상속받는다.
console.log(countAndDescribe([1, 2, 3, 4, 5]));

//keyof
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U,
) {
  return 'Value: ' + obj[key];
}

extractAndConvert({ name: 'Max' }, 'name');

class DataStorage<T extends string | object> {
  private data: T[] = [];
  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  get items() {
    //사본을 반환
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Max');
textStorage.addItem('Manu');
textStorage.removeItem('Max');
console.log(textStorage.items);

const objStorage = new DataStorage<object>();
const maxobj = { name: 'Max' }; //obj는 참조값이기 때문에 선언해서 넣어준다.
objStorage.addItem(maxobj);
objStorage.addItem({ name: 'Manu' });
objStorage.removeItem(maxobj);
console.log(objStorage.items);

interface CourseGoal {
  title: string;
  desctiption: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  desctiption: string,
  date: Date,
): CourseGoal {
  const courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.desctiption = desctiption;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

const nameArr: Readonly<string[]> = ['Max', 'Sports'];
// nameArr.push('Manu'); 추가 삭제 불가
