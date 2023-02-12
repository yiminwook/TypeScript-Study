/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Component from './base-component';
import { Autobind } from '../decorator/autobind';
import { Project } from '../model/project';
import { ProjectStatus } from '../model/project';
import { DragTarget } from '../model/drag-drop';
import { ProjectState } from '../state/project-state';
import { ProjectItem } from './project-item';

export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: Project[];
  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`);

    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }

  @Autobind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault(); //Drop이 가능하도록 허용
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.add('droppable');
    }
  }

  @Autobind
  dragLeaveHandler(event: DragEvent) {
    event.preventDefault();
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
  }

  @Autobind
  dropHandler(event: DragEvent) {
    const prjId = event.dataTransfer!.getData('text/plain');
    ProjectState.getInstance().moveProject(
      prjId,
      this.type === 'active' ? ProjectStatus.active : ProjectStatus.finished,
    );
  }

  protected configure() {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);

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
