abstract class Component<T extends HTMLElement> {
  /** 상위 컴포넌트 */
  parent: T;
  constructor(parentElement: T) {
    this.parent = parentElement;
  }
  abstract render(): void;
}

export default Component;
