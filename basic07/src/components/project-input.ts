/* eslint-disable @typescript-eslint/triple-slash-reference */
/* eslint-disable @typescript-eslint/no-empty-function */
/// <reference path="base-component.ts" />
/// <reference path="../decorator/autobind.ts" />
/// <reference path="../util/validation.ts" />
/// <reference path="../state/project-state.ts" />

namespace App {
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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
}
