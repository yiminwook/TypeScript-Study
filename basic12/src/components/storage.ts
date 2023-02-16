import { personalData, CardStatus } from './data_set';

/** localStorage에 personal data 저장 */
export const setPersonalInfo = async () => {
  const response = await fetch('../data/new_data.json');
  const data: personalData[] = await response.json();
  if (!localStorage.getItem('personalInfo')) {
    localStorage.setItem('personalInfo', JSON.stringify(data));
  }
};
/** localStorage에 저장 */
export const setCardStatus = (dataArr: CardStatus[]) => {
  localStorage.setItem('cardStatus', JSON.stringify(dataArr));
};
/** localStorage에서 가져오기 */
export const getCardStatus = () => {
  return JSON.parse(localStorage.getItem('cardStatus') ?? '[]') as CardStatus[];
};
