import {FILTER_TYPES} from '../constants';
import {getWordWithCapitalLetter} from '../utils';
import AbstractView from '../framework/view/abstract-view';

const getFiltersItemTemplate = ({value, isChecked}) => `
    <div class="trip-filters__filter">
      <input id="filter-${value}"
             class="trip-filters__filter-input  visually-hidden"
             value="${value}"
             type="radio"
             name="trip-filter"
             ${isChecked ? 'checked' : ''}
      >
      <label class="trip-filters__filter-label" for="filter-${value}">${getWordWithCapitalLetter(value)}</label>
    </div>
`;

const getFiltersTemplate = () => `
  <form class="trip-filters" action="#" method="get">

    ${FILTER_TYPES.map((type) => getFiltersItemTemplate(type)).join('')}

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
`;

export default class Filters extends AbstractView {
  get template() {
    return getFiltersTemplate();
  }
}
