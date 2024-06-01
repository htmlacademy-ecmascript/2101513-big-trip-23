import AbstractView from '../framework/view/abstract-view';

const getFiltersItemTemplate = ({type, isActive}) => `
    <div class="trip-filters__filter">
      <input id="filter-${type}"
             class="trip-filters__filter-input  visually-hidden"
             value="${type}"
             type="radio"
             name="trip-filter"
             ${isActive ? '' : 'disabled'}
      >
      <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
    </div>
`;

const getFiltersTemplate = (filters) => `
  <form class="trip-filters" action="#" method="get">

    ${filters.map((filter) => getFiltersItemTemplate(filter)).join('')}

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
`;

export default class Filters extends AbstractView {
  #filters = [];

  constructor({filters}) {
    super();

    this.#filters = filters;
  }

  get template() {
    return getFiltersTemplate(this.#filters);
  }
}
