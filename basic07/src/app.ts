interface validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validatable(validatableInput: validatable) {
  let isValid = true;
  const { value, required, minLength, maxLength, min, max } = validatableInput;
  console.log(typeof value);
  if (required) {
    isValid = isValid && value.toString().trim().length >= 0;
  }
  if (minLength != null && typeof value === 'string') {
    isValid = isValid && value.trim().length >= minLength;
  }
  if (maxLength != null && typeof value === 'string') {
    isValid = isValid && value.trim().length <= maxLength;
  }
  if (min != null && typeof value === 'number') {
    isValid = isValid && value >= min;
  }
  if (max != null && typeof value === 'number') {
    isValid = isValid && value <= max;
  }
  return isValid;
}

function Autobind(_: any, _2: string, decriptor: PropertyDescriptor) {
  const originalMethod = decriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      'project-input',
    ) as HTMLTemplateElement;
    this.hostElement = document.getElementById('app') as HTMLDivElement;
    //노드를 복사, boolean 자식노드 복사여부
    const importedNode = document.importNode(
      this.templateElement.content,
      true,
    );
    //요소의 첫번자식을 반환
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';
    this.titleInputElement = this.element.querySelector(
      '#title',
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      '#description',
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      '#people',
    ) as HTMLInputElement;
    this.configure();

    this.attach();
  }

  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = +this.peopleInputElement.value;
    const titleValidatable: validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: validatable = {
      value: enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };
    if (
      !validatable(titleValidatable) ||
      !validatable(descriptionValidatable) ||
      !validatable(peopleValidatable)
    ) {
      alert('Invalied input, Please try Again!');
      return;
    }

    return [enteredTitle, enteredDescription, enteredPeople];
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, decription, people] = userInput;
      console.log(title, decription, people);
      this.clearInputs();
    }
  }

  //sumit 이벤트가 발생하면 함수를 실행
  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  private attach() {
    //노드를 어느 위치에 넣을지
    //app여는 태그 바로 뒤에
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const pdjinput = new ProjectInput();
