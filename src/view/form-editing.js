import EventTypes from './event-types';
import EventOffers from './event-offers';
import EventDestinationControl from './event-destination-control';
import EventDestination from './event-destination';
import EventPrice from './event-price';
import EventDate from './event-date';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {getOffersByType, getRouteDestinationById, getRouteDestinationByName, getRouteOffers} from '../utils/common';

const getFormEditingTemplate = ({
  state,
  destinations
}) => {
  const {
    dateFrom,
    dateTo,
    basePrice,
    type,
    routeDestination,
    routeOffers,
    offersByType
  } = state;

  const hasOffersSection = Boolean(offersByType?.length);
  const hasDestinationSection = routeDestination.description || routeDestination.pictures.length;

  return `
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        ${new EventTypes({routeType: type}).template}
        ${new EventDestinationControl({routeName: routeDestination.name, routeType: type, destinations}).template}
        ${new EventDate({dateFrom, dateTo}).template}
        ${new EventPrice({routePrice: basePrice}).template}
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>

      <section class="event__details">
        ${hasOffersSection ? new EventOffers({routeOffers, offersByType}).template : ''}
        ${hasDestinationSection ? new EventDestination({routeDestination}).template : ''}
      </section>

    </form>
  </li>
`;
};

export default class FormEditing extends AbstractStatefulView {
  #route = {};
  #offers = [];
  #destinations = [];
  #handleFormEditingSubmit = null;
  #handleFormEditingClose = null;

  constructor({
    route,
    offers,
    destinations,
    onFormEditingSubmit,
    onFormEditingClose
  }) {
    super();
    this.#route = route;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleFormEditingSubmit = onFormEditingSubmit;
    this.#handleFormEditingClose = onFormEditingClose;

    this._setState(this.#parseEventToState(route));
    this._restoreHandlers();
  }

  get template() {
    return getFormEditingTemplate({
      state: this._state,
      destinations: this.#destinations
    });
  }

  get routeDestination() {
    const {destination: routeDestinationId} = this.#route;

    return getRouteDestinationById(this.#destinations, routeDestinationId);
  }

  get routeOffers() {
    return getRouteOffers(this.#route, this.#offers);
  }

  get offersByType() {
    return getOffersByType(this.#route.type, this.#offers);
  }

  _restoreHandlers() {
    const InteractiveElements = {
      FORM: '.event',
      FORM_CLOSE_BUTTON: '.event__rollup-btn',
      FORM_TYPES: '.event__type-group',
      FORM_DESTINATIONS: '.event__input--destination'
    };

    this.element.querySelector(InteractiveElements.FORM)
      .addEventListener('submit', this.#formEditingCloseHandler);

    this.element.querySelector(InteractiveElements.FORM_CLOSE_BUTTON)
      .addEventListener('click', this.#formEditingCloseHandler);

    this.element.querySelector(InteractiveElements.FORM_TYPES)
      .addEventListener('change', this.#eventTypeChangeHandler);

    this.element.querySelector(InteractiveElements.FORM_DESTINATIONS)
      .addEventListener('change', this.#destinationTypeChangeHandler);
  }

  #formEditingCloseHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormEditingClose();
  };

  #eventTypeChangeHandler = (evt) => {
    evt.preventDefault();
    const newType = evt.target.value;
    const offersByType = getOffersByType(newType, this.#offers);

    this.updateElement({
      ...this._state,
      type: newType,
      offers: [],
      routeOffers: [],
      offersByType: offersByType?.offers
    });
  };

  #destinationTypeChangeHandler = (evt) => {
    evt.preventDefault();
    const newDestination = evt.target.value;
    const routeDestination = getRouteDestinationByName(this.#destinations, newDestination);
    this.updateElement({
      ...this._state,
      routeDestination: {...routeDestination},
    });
  };

  #parseEventToState(route) {
    return {
      ...route,
      routeDestination: this.routeDestination,
      routeOffers: this.routeOffers,
      offersByType: this.offersByType?.offers
    };
  }
}
