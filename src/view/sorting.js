import {SortingTypes, DISABLED_SORTING_TYPES} from '../constants';
import {getSearchableValue} from '../utils/common';
import AbstractView from '../framework/view/abstract-view';

const getSortingItemTemplate = (sortType, activeSortType) => `
  <div class="trip-sort__item  trip-sort__item--${sortType}">
    <input id="sort-${sortType}"
           class="trip-sort__input  visually-hidden"
           value="sort-${sortType}"
           type="radio"
           name="trip-sort"
           ${sortType === activeSortType ? 'checked' : ''}
           ${DISABLED_SORTING_TYPES.includes(sortType) ? 'disabled' : ''}
    >
    <label class="trip-sort__btn" for="sort-${sortType}">${sortType}</label>
  </div>
`;

const getSortingTemplate = (activeSortType) => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">

    ${Object.values(SortingTypes).map((type) => getSortingItemTemplate(type, activeSortType)).join('')}

  </form>
`;

export default class Sorting extends AbstractView {
  #handleSortingChange = null;
  #activeSortType = '';

  constructor({onSortingChange, activeSortType}) {
    super();

    this.#handleSortingChange = onSortingChange;
    this.#activeSortType = activeSortType;

    this.#addEventListenersHandler();
  }

  get template() {
    return getSortingTemplate(this.#activeSortType);
  }

  #sortingChangeHandler = (evt) => {
    evt.preventDefault();
    const {target} = evt;
    const InteractiveElements = {
      SORTING_INPUT: 'trip-sort__input'
    };

    if (target.classList.contains(InteractiveElements.SORTING_INPUT)) {
      const {value} = target;
      const sortingValue = getSearchableValue(value, 1);

      if (sortingValue) {
        this.#handleSortingChange(sortingValue);
      }
    }
  };

  #addEventListenersHandler = () => {
    this.element.addEventListener('change', this.#sortingChangeHandler);
  };
}
