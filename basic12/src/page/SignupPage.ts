import Component from '../components/Component';
import ContentTitle from '../components/ContentsTitle';

class SinupPage extends Component<HTMLElement> {
  constructor(main: HTMLElement) {
    super(main);
  }
  render() {
    const title = new ContentTitle(this.parent, 'Sign UP, GeatePeople!');
    title.render();
  }
}

export default SinupPage;
