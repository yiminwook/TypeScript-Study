/* eslint-disable indent */
import Header from './components/Header';
import Component from './components/Component';
import HomePage from './page/HomePage';
import SinupPage from './page/SignupPage';
import { setPersonalInfo } from './components/storage';

class App extends Component<HTMLDivElement> {
  constructor(app: HTMLDivElement) {
    super(app);
  }

  async render() {
    /** GNB*/
    const header = new Header(this.parent);
    header.render();
    /** Main*/
    const main = document.createElement('main');
    main.setAttribute('id', 'page_content');
    const homePage = new HomePage(main);
    const signupPage = new SinupPage(main);

    document.addEventListener('urlChange', ((
      e: CustomEvent<{ href: string }>,
    ) => {
      const pathname = e.detail.href;
      //초기화
      main.innerHTML = '';
      switch (pathname) {
        case '/':
          homePage.render();
          break;
        case '/signup':
          signupPage.render();
          break;
        default:
      }
    }) as EventListener);

    await setPersonalInfo();

    this.parent.appendChild(main);
  }
}

export default App;
