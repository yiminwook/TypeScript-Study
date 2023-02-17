import Component from './Component';
import { personalData } from './data_set';
import { getCardStatus, setCardStatus } from './storage';

const cardDiv = (idx: number) => {
  const card_div = document.createElement('div');
  card_div.setAttribute('idx', idx.toString());
  card_div.setAttribute('class', 'card');
  const cardStorage = getCardStatus();
  if (cardStorage[idx] === undefined || cardStorage === null) {
    cardStorage.push({ idx, status: true });
  } else if (cardStorage[idx] && cardStorage[idx].status === false) {
    card_div.classList.toggle('is-flipped');
  }
  setCardStatus(cardStorage);
  card_div.addEventListener('click', () => {
    //is-flipped를 추가제거
    card_div.classList.toggle('is-flipped');
    const cardStorage = getCardStatus();
    //로컬스토리지에 변경사항 저장
    cardStorage[idx] = {
      idx: idx,
      status: card_div.className !== 'card is-flipped',
    };
    setCardStatus(cardStorage);
  });

  return card_div;
};

/** 앞뒤면에 따라서 class가 바뀌도록 */
const cardPlane = (side: string, data: string) => {
  const cardPlane_div = document.createElement('div');
  cardPlane_div.setAttribute('class', 'card_plane card_plane--' + side);
  cardPlane_div.appendChild(document.createTextNode(data));

  return cardPlane_div;
};

class CardView extends Component<HTMLElement> {
  container: HTMLDivElement;
  personalInfo: personalData[];
  constructor(main: HTMLElement) {
    super(main);
    this.container = document.createElement('div');
    this.container.setAttribute('id', 'cards_container');
    this.personalInfo = JSON.parse(
      localStorage.getItem('personalInfo') ?? '[]',
    ) as personalData[];
  }
  createCard(idx: number, nickname: string, mbti: string) {
    const card = cardDiv(idx);
    card.appendChild(cardPlane('front', nickname));
    card.appendChild(cardPlane('back', mbti));
    this.container.appendChild(card);
  }

  infiniteScroll() {
    let target = this.container.lastChild as HTMLDivElement | null;
    let idx = 0;
    const io = new IntersectionObserver(
      (entrys: IntersectionObserverEntry[]) => {
        if (idx >= this.personalInfo.length - 1) return;
        const isVisible = entrys[entrys.length - 1].isIntersecting;
        const renderIdx = +(entrys[entrys.length - 1].target.getAttribute(
          'idx',
        ) as string);
        if (isVisible && idx === renderIdx) {
          idx++;
          const { nickname, mbti } = this.personalInfo[idx];
          this.createCard(idx, mbti, nickname);
          target = this.container.lastChild as HTMLDivElement | null;
          if (target !== null && target !== undefined) {
            io.observe(target);
          }
        }
      },
      { threshold: 0.7 },
    );
    if (target !== null) {
      io.observe(target);
    }
  }

  render() {
    this.createCard(
      0,
      this.personalInfo[0].nickname,
      this.personalInfo[0].mbti,
    );
    this.infiniteScroll();
    this.parent.appendChild(this.container);
  }
}

export default CardView;
