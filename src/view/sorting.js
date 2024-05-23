import {SORTING_TYPES} from '../constants';
import {getWordWithCapitalLetter} from '../utils';
import AbstractView from '../framework/view/abstract-view';

const getSortingItemTemplate = ({value, title, isActive, isChecked}) => `
  <div class="trip-sort__item  trip-sort__item--${value}">
    <input id="sort-${value}"
           class="trip-sort__input  visually-hidden"
           value="sort-${value}"
           type="radio"
           name="trip-sort"
           ${isChecked ? 'checked' : ''}
           ${!isActive ? 'disabled' : ''}
    >
    <label class="trip-sort__btn" for="sort-${value}">${title ? getWordWithCapitalLetter(title) : getWordWithCapitalLetter(value)}</label>
  </div>
`;

const getSortingTemplate = () => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">

    ${SORTING_TYPES.map((type) => getSortingItemTemplate(type)).join('')}

  </form>
`;

export default class Sorting extends AbstractView{
  get template() {
    return getSortingTemplate();
  }
}
