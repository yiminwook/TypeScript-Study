import CardView from '../components/Card';
import Component from '../components/Component';
import ContentTitle from '../components/ContentsTitle';

class HomePage extends Component<HTMLElement> {
  constructor(main: HTMLElement) {
    super(main);
  }
  render() {
    const title = new ContentTitle(this.parent, 'Great PeoPle');
    title.render();
    const cardView = new CardView(this.parent);
    cardView.render();
  }
}

export default HomePage;
