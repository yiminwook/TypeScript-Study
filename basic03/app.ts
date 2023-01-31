//class와 상속(extends)는 최신 자바스크립트에서 동일하게 사용가능
//그러나 private protected public getter setter 타입배정은 타입스크립트 내에서만 사용이 가능

class Department {
  //정적 속성 클래스가 메모리에 올라갈때부터 사용이 가능
  static fiscalYear = 2020;
  //private Department class 안에서만 사용이 가능하다.
  protected employees: string[] = []; //상속받는 모든 class에서 접근가능
  constructor(private readonly id: string, public name: string) {}
  static createEmployee(name: string) {
    //정적 메서드
    //static property에 접근하려면 this가 아닌 class name으로 접근
    console.log(Department.fiscalYear);
    return { name };
  }
  describe(this: Department) {
    console.log(`Department (${this.id}): ${this.name}`);
  }
  addEmployee(employee: string) {
    this.employees.push(employee);
  }
  printEmployeeInformation() {
    console.log(this.employees.length, this.employees);
  }
}

class ITDepartment extends Department {
  public admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, 'IT'); //name으로 'IT'를 전달
    this.admins = admins;
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;

  constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
    this.lastReport = reports[0];
  }
  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error('No report found.');
  }
  set mostRecentReport(report: string) {
    if (!report) {
      throw new Error('Please pass in a valid value!');
    }
    this.addReport(report);
  }
  addEmployee(employee: string) {
    if (employee === 'max') {
      console.log(`${employee} cannot be employee!!`);
      return;
    }
    this.employees.push(employee);
  }
  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }
  printReport() {
    console.log(this.reports);
  }
}

//정적 메서드에 접근할때는 class네임을 접근한다.
console.log(Department.createEmployee('mike'));

const it = new ITDepartment('d1', ['foo']); //인스턴스 생성
it.describe();
it.addEmployee('max');
it.addEmployee('manu');
it.printEmployeeInformation();
console.log(it.admins);
console.log(it);

const accounting = new AccountingDepartment('d2', []);
accounting.describe();
accounting.addEmployee('max');
accounting.addEmployee('manu');
accounting.printEmployeeInformation();
accounting.addReport('something went wrong..');
accounting.printReport();
console.log(accounting);
console.log(accounting.mostRecentReport); //getter 괄호를 쓰지않는다.
accounting.mostRecentReport = 'Year End Report'; //setter  obj의 값을 바꾸듯이 접근
console.log(accounting.mostRecentReport);
accounting.printReport();
