import {getDurationGap, getHumanizedDate} from '../utils';
import {DateFormats} from '../constants';
import RoutePointOffers from './route-point-offers';
import AbstractView from '../framework/view/abstract-view';

const getRoutePointTemplate = (
  route,
  routeOffers,
  routeDestination
) => {
  const {basePrice, dateFrom, dateTo, isFavorite, type} = route;
  const favoriteButtonActiveClassname = 'event__favorite-btn--active';

  return `
  <li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dateFrom}">${getHumanizedDate(dateFrom, DateFormats.MD)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${routeDestination}</h3>
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
      <button class="event__favorite-btn ${isFavorite ? favoriteButtonActiveClassname : ''}" type="button">
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
  #handleGetOffersForRoute = null;
  #handleGetDestinationForRoute = null;
  #handleEditClick = null;

  constructor({route, handleGetOffersForRoute, handleGetDestinationForRoute, handleEditClick}) {
    super();

    this.#route = route;
    this.#handleGetOffersForRoute = handleGetOffersForRoute;
    this.#handleGetDestinationForRoute = handleGetDestinationForRoute;
    this.#handleEditClick = handleEditClick;

    this.#handleEventListeners();
  }

  get template() {
    return getRoutePointTemplate(
      this.#route,
      this.routeOffers,
      this.routeDestination,
    );
  }

  get routeOffers() {
    const {type, offers} = this.#route;

    this.#routeOffers = this.#handleGetOffersForRoute(type, offers);

    return this.#routeOffers;
  }

  get routeDestination() {
    const {destination} = this.#route;
    const {name} = this.#handleGetDestinationForRoute(destination);

    this.#routeDestination = name;

    return this.#routeDestination;
  }

  #onEditClick = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #handleEventListeners() {
    const InteractiveElements = {
      EDIT_FORM: '.event__rollup-btn'
    };

    this.element.querySelector(InteractiveElements.EDIT_FORM).addEventListener('click', this.#onEditClick);
  }
}
