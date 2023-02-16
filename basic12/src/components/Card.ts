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
  constructor(main: HTMLElement) {
    super(main);
  }
  render() {
    const containerDiv = document.createElement('div');
    containerDiv.setAttribute('id', 'cards_container');
    const personalInfo = JSON.parse(
      localStorage.getItem('personalInfo') ?? '[]',
    ) as personalData[];

    personalInfo.forEach((info, idx: number) => {
      const card = cardDiv(idx);
      card.appendChild(cardPlane('front', info.nickname));
      card.appendChild(cardPlane('back', info.mbti));
      containerDiv.appendChild(card);
    });

    this.parent.appendChild(containerDiv);
  }
}

export default CardView;
