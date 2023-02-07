/* eslint-disable @typescript-eslint/no-empty-function */
enum ProjectStatus {
  active,
  finished,
}

type Listener<T> = (items: T[]) => void;

class State<T> {
  //renderProjects()를 실행시키는 함수를 저장
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
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

class ProjectState extends State<Project> {
  private projects: Project[] = []; //inputData를 저장
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (ProjectState.instance) {
      return ProjectState.instance;
    }
    ProjectState.instance = new ProjectState();
    return ProjectState.instance;
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

//Component Base class
//상속만 가능한 추상클래스
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtstart: boolean,
    newElementId?: string,
  ) {
    this.templateElement = document.getElementById(
      templateId,
    ) as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId) as T;

    const importedNode = document.importNode(
      this.templateElement.content,
      true,
    );
    //요소의 첫번자식을 반환
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }
    this.attach(insertAtstart);
  }

  private attach(insertAtBeginnig: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBeginnig ? 'afterbegin' : 'beforeend',
      this.element,
    );
  }

  protected abstract configure(): void;
  protected abstract renderContent(): void;
}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input');
    this.titleInputElement = this.element.querySelector(
      '#title',
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      '#description',
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      '#people',
    ) as HTMLInputElement;
    this.renderContent();
    this.configure();
  }

  protected configure() {
    //sumit 이벤트가 발생하면 함수를 실행
    this.element.addEventListener('submit', this.submitHandler);
  }

  protected renderContent() {}

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
}

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> {
  private project: Project;

  constructor(hostId: string, project: Project) {
    //새로운 항목을 뒤로 추가한다.
    super('single-project', hostId, false, project.id);
    this.project = project;
    this.configure();
    this.renderContent();
  }

  protected configure() {}

  protected renderContent() {
    const { title, description } = this.project;
    //this.element <ul> Form
    this.element.querySelector('h2')!.textContent = title;
    this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
    this.element.querySelector('p')!.textContent = description;
  }

  get persons() {
    if (this.project.people === 1) {
      return '1 person';
    } else {
      return `${this.project.people} persons`;
    }
  }
}

class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  assignedProjects: Project[];
  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`);

    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }

  protected configure() {
    //renderProjects를 ProjectState에 저장
    ProjectState.getInstance().addListener((projects: Project[]) => {
      //status로 필터링
      const relevantProjects = projects.filter(project => {
        if (this.type === 'active') {
          return project.status === ProjectStatus.active;
        }
        return project.status === ProjectStatus.finished;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }

  protected renderContent() {
    const listId = `${this.type}-projects-list`;
    //<ul> list Id
    this.element.querySelector('ul')!.id = listId;
    //<h2> Form Title
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + '- PROJECTS';
  }

  private renderProjects() {
    //project가 추가된후에 실행됌
    const listEl = document.getElementById(
      `${this.type}-projects-list`,
    ) as HTMLUListElement;
    //중복해서 랜더링 되지않도록 매번 초기화
    listEl.innerHTML = '';
    for (const prjItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
    }
  }
}

const pdjinput = new ProjectInput();
const activePdjList = new ProjectList('active');
const finishedPdjList = new ProjectList('finished');
