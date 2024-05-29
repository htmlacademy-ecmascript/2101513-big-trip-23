import {getDurationGap, getHumanizedDate} from '../utils/date';
import {DateFormats} from '../constants';
import RoutePointOffers from './route-point-offers';
import AbstractView from '../framework/view/abstract-view';

const getRoutePointTemplate = (
  route,
  routeOffers,
  routeDestination
) => {
  const {basePrice, dateFrom, dateTo, isFavorite, type} = route;
  const {name} = routeDestination;

  return `
  <li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dateFrom}">${getHumanizedDate(dateFrom, DateFormats.MD)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateFrom}">${getHumanizedDate(dateFrom, DateFormats.HM)}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateTo}">${getHumanizedDate(dateTo, DateFormats.HM)}</time>
        </p>
        <p class="event__duration">${getDurationGap(dateFrom, dateTo)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
       ${new RoutePointOffers({routeOffers}).template}
      <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>
  `;
};

export default class RoutePoint extends AbstractView {
  #route = {};
  #routeOffers = [];
  #routeDestination = '';
  #handleEditingFormOpen = null;
  #handleFavoriteClick = null;

  constructor({
    route,
    routeOffers,
    routeDestination,
    onEditingFormOpen,
    onFavoriteClick
  }) {
    super();

    this.#route = route;
    this.#routeOffers = routeOffers;
    this.#routeDestination = routeDestination;
    this.#handleEditingFormOpen = onEditingFormOpen;
    this.#handleFavoriteClick = onFavoriteClick;

    this.#addEventListenersHandler();
  }

  get template() {
    return getRoutePointTemplate(this.#route, this.#routeOffers, this.#routeDestination);
  }

  #formEditingOpenHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditingFormOpen();
  };

  #favoriteButtonToggleHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick(this.#route);
  };

  #addEventListenersHandler() {
    const InteractiveElements = {
      EDIT_FORM: '.event__rollup-btn',
      FAVORITE_BUTTON: '.event__favorite-btn'
    };

    this.element.querySelector(InteractiveElements.EDIT_FORM).addEventListener('click', this.#formEditingOpenHandler);
    this.element.querySelector(InteractiveElements.FAVORITE_BUTTON).addEventListener('click', this.#favoriteButtonToggleHandler);
  }
}
