import dataSet from './data_set';

/** localStorage에 personal data 저장 */
export const setPersonalInfo = async () => {
  const response = await fetch('../data/new_data.json');
  const data: dataSet = await response.json();
  if (!localStorage.getItem('personalInfo')) {
    localStorage.setItem('personalInfo', JSON.stringify(data));
  }
};
