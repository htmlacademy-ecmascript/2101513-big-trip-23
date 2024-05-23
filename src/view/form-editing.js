import EventTypes from './event-types';
import EventOffers from './event-offers';
import EventDestinationControl from './event-destination-control';
import EventDestination from './event-destination';
import EventPrice from './event-price';
import EventDate from './event-date';
import AbstractView from '../framework/view/abstract-view';

const getFormEditingTemplate = (
  route,
  destinations,
  routeOffers,
  offersByType,
  routeDestination
) => {
  const {dateFrom, dateTo, basePrice, type} = route;

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

        ${new EventOffers({routeOffers, offersByType}).template}

        ${new EventDestination({routeDestination}).template}

      </section>
    </form>
  </li>
`;
};

export default class FormEditing extends AbstractView {
  #route = {};
  #routeOffers = [];
  #routeOffersByType = [];
  #routeDestination = {};
  #destinations = [];
  #handleGetOffersForRoute = null;
  #handleGetOffersByType = null;
  #handleGetDestinationForRoute = null;
  #handleEditClose = null;
  #handleEditSubmit = null;

  constructor({
    route,
    destinations,
    handleGetOffersForRoute,
    handleGetOffersByType,
    handleGetDestinationForRoute,
    handleEditClose,
    handleEditSubmit
  }) {
    super();

    this.#route = route;
    this.#destinations = destinations;
    this.#handleGetOffersForRoute = handleGetOffersForRoute;
    this.#handleGetOffersByType = handleGetOffersByType;
    this.#handleGetDestinationForRoute = handleGetDestinationForRoute;
    this.#handleEditClose = handleEditClose;
    this.#handleEditSubmit = handleEditSubmit;

    this.#handleEventListeners();
  }

  get template() {
    return getFormEditingTemplate(
      this.#route,
      this.#destinations,
      this.routeOffers,
      this.offersByType,
      this.routeDestination
    );
  }

  get routeOffers() {
    const {type, offers} = this.#route;

    this.#routeOffers = this.#handleGetOffersForRoute(type, offers);

    return this.#routeOffers;
  }

  get offersByType() {
    const {type} = this.#route;

    this.#routeOffersByType = this.#handleGetOffersByType(type);

    return this.#routeOffersByType;
  }

  get routeDestination() {
    const {destination} = this.#route;

    this.#routeDestination = this.#handleGetDestinationForRoute(destination);

    return this.#routeDestination;
  }

  #onEditClose = () => {
    this.#handleEditClose();
  };

  #onEditSubmit = (evt) => {
    evt.preventDefault();
    this.#handleEditSubmit();
  };

  #handleEventListeners() {
    const InteractiveElements = {
      EDIT_FORM: '.event--edit',
      EDIT_FORM_CLOSE_BUTTON: '.event__rollup-btn'
    };

    this.element.querySelector(InteractiveElements.EDIT_FORM).addEventListener('submit', this.#onEditSubmit);
    this.element.querySelector(InteractiveElements.EDIT_FORM_CLOSE_BUTTON).addEventListener('click', this.#onEditClose);
  }
}
