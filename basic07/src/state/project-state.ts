/* eslint-disable @typescript-eslint/no-unused-vars */

namespace App {
  type Listener<T> = (items: T[]) => void;

  class State<T> {
    //renderProjects()를 실행시키는 함수를 저장
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
    }
  }

  export class ProjectState extends State<Project> {
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
      //Project를 추가할때마다 listen에 저장된 함수를 실행, 랜더링 시킨다.
      for (const listenerFn of this.listeners) {
        listenerFn(this.projects.slice());
      }
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
      const project = this.projects.find(prj => prj.id === projectId); //객체
      //status가 바뀔때만 작동
      if (project && project.status !== newStatus) {
        project.status = newStatus;
        this.updateListeners();
      }
    }

    private updateListeners() {
      //listen에 저장된 함수를 다시 실행, 재 랜더링
      for (const listenerFn of this.listeners) {
        listenerFn(this.projects.slice());
      }
    }
  }
}
