enum Role {
  ADMIN = 5,
  READ_ONLY, //6
  AUTHOR = 'AUTHOR',
}

const person: {
  name: string;
  age: number;
  hobbies: string[];
  //tuple 길이가 고정된 배열
  job: [number, string];
  role: Role;
} = {
  name: 'Maximiliam',
  age: 30,
  hobbies: ['sports', 'cooking'],
  job: [2, 'author'],
  role: Role.ADMIN,
};

//array
//hobby는 string이라고 ts에서 추론
for (const hobby of person.hobbies) {
  console.log('hobby..', hobby.toUpperCase());
}

//tuple
//tuple push는 예외적으로 가능
person.job.push('newJob');
console.log('job..', person.job);

// 새값을 넣어줄때는 type과 length를 맞춰야 한다.
// person.role = [0, 'admin', 'user']; (X)

//enum
console.log(Role);
//{0: 'ADMIN', 1: 'READ_ONLY', 2: 'AUTHOR', ADMIN: 0, READ_ONLY: 1, AUTHOR: 2}
console.log(Role[0]); //ADMIN
console.log(Role.READ_ONLY); // 6
console.log('role..', person.role); //role.. 5
