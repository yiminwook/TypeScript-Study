enum ProjectStatus {
  active,
  finished,
}

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus,
  ) {}
}
type Listener = (items: Project[]) => void;

class ProjectState {
  private listeners: Listener[] = []; //renderProjects()를 실행시키는 함수를 저장
  private projects: Project[] = []; //inputData를 저장
  private static instance: ProjectState;

  static getInstance() {
    if (ProjectState.instance) {
      return ProjectState.instance;
    }
    ProjectState.instance = new ProjectState();
    return ProjectState.instance;
  }

  addListener(listenerFn: Listener) {
    this.listeners.push(listenerFn);
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.active, //디폴트 active
    );
    this.projects.push(newProject);
    //Project를 추가할때마다 renderProjects()를 실행
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }

  get getProjects() {
    return this.projects.slice();
  }
}

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
      ProjectState.getInstance().addProject(title, decription, people);
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

class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  assignedProjects: Project[];
  constructor(private type: 'active' | 'finished') {
    this.templateElement = document.getElementById(
      'project-list',
    ) as HTMLTemplateElement;
    this.hostElement = document.getElementById('app') as HTMLDivElement;
    this.assignedProjects = []; //빈배열로 초기화

    const importedNode = document.importNode(
      this.templateElement.content,
      true,
    );

    //요소의 첫번자식을 반환
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;

    //renderProjects를 ProjectState에 저장
    ProjectState.getInstance().addListener((projects: Project[]) => {
      this.assignedProjects = projects;
      this.renderProjects();
    });

    this.attach();
    this.renderContent();
  }

  private renderProjects() {
    //project가 추가된후에 실행됌
    const listEl = document.getElementById(
      `${this.type}-projects-list`,
    ) as HTMLUListElement;
    console.log(this.assignedProjects);
    for (const prjItem of this.assignedProjects) {
      const listItem = document.createElement('li');
      listItem.textContent = prjItem.title;
      listEl.appendChild(listItem);
    }
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + '- PROJECTS';
  }

  private attach() {
    //app 닫는 태그 앞에 추가
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }
}

const pdjinput = new ProjectInput();
const activePdjList = new ProjectList('active');
const finishedPdjList = new ProjectList('finished');
