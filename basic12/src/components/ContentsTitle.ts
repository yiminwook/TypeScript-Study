import Component from './Component';

class ContentTitle extends Component<HTMLElement> {
  title: string;
  constructor(main: HTMLElement, title: string) {
    super(main);
    this.title = title;
  }
  render() {
    const div = document.createElement('div');
    div.setAttribute('class', 'content_title');

    const h1 = document.createElement('h1');
    const text = document.createTextNode(this.title);
    h1.appendChild(text);
    div.appendChild(h1);
    this.parent.appendChild(div);
  }
}

export default ContentTitle;
