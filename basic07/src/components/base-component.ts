/* eslint-disable @typescript-eslint/no-unused-vars */
//Component Base class
//상속만 가능한 추상클래스
export default abstract class Component<
  T extends HTMLElement,
  U extends HTMLElement,
> {
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
