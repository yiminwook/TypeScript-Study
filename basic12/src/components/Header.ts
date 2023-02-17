import Component from './Component';

class Header extends Component<HTMLDivElement> {
  constructor(app: HTMLDivElement) {
    super(app);
  }

  createMenuElem(
    divClass: string,
    spanClass: string,
    spanId: string,
    menuText: string,
  ) {
    const div = document.createElement('div');
    div.setAttribute('class', divClass);

    const span = document.createElement('span');
    span.setAttribute('id', spanId);
    span.setAttribute('class', spanClass);

    const text = document.createTextNode(menuText);
    span.appendChild(text);
    div.appendChild(span);
    return div;
  }

  addEvent(element: HTMLElement, href: string) {
    element.addEventListener('click', () => {
      // reload 방지
      // state, 상태 값을 나타내는 것으로 브라우저에서 앞/ 뒤로 갈 때, 넘겨줄 데이터
      // title, 변경할 브라우저 제목 (변경을 원하지 않으면 null)
      // url, 변경할 브라우저 URL
      window.history.pushState('', '', href);
      //커스텀 이벤트 인스턴스 생성
      const urlChange = new CustomEvent('urlChange', {
        detail: { href },
      });
      //이벤트 객체를 전달
      document.dispatchEvent(urlChange);
    });
  }

  render() {
    const header = document.createElement('header');
    // divClass, spanClass, spanId, menuText,
    const home_menu = this.createMenuElem(
      'header header_left',
      'menu_name',
      'menu_home',
      'HOME',
    );
    const signup_menu = this.createMenuElem(
      'header header_right',
      'menu_name',
      'menu_home',
      'SIGNUP',
    );
    this.addEvent(home_menu, '/');
    this.addEvent(signup_menu, '/signup');

    header.append(home_menu, signup_menu);
    this.parent.append(header);
  }
}

export default Header;
