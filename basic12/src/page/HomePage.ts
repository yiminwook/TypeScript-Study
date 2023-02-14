import Component from '../components/Component';

class HomePage extends Component<HTMLElement> {
  constructor(main: HTMLElement) {
    super(main);
  }
  render() {
    console.log('home');
  }
}

export default HomePage;
