/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/triple-slash-reference */
/* eslint-disable @typescript-eslint/no-empty-function */

/// <reference path="base-component.ts" />
/// <reference path="../decorator/autobind.ts" />
/// <reference path="../model/drag-drop.ts" />
/// <reference path="../model/project.ts" />

namespace App {
  export class ProjectItem
    extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable
  {
    private project: Project;

    constructor(hostId: string, project: Project) {
      //새로운 항목을 뒤로 추가한다.
      super('single-project', hostId, false, project.id);
      this.project = project;
      this.configure();
      this.renderContent();
    }

    @Autobind
    dragStartHandler(event: DragEvent) {
      event.dataTransfer!.setData('text/plain', this.project.id);
      event.dataTransfer!.effectAllowed = 'move';
    }

    @Autobind
    dragEndHandler(_: DragEvent) {}

    protected configure() {
      this.element.addEventListener('dragstart', this.dragStartHandler);
      this.element.addEventListener('dragend', this.dragEndHandler);
    }

    protected renderContent() {
      const { title, description } = this.project;
      //this.element <ul> Form
      this.element.querySelector('h2')!.textContent = title;
      this.element.querySelector('h3')!.textContent =
        this.persons + ' assigned';
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
}
