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
  offers,
  offersByType,
  destination
) => {
  const {dateFrom, dateTo, basePrice, type} = route;

  return `
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">

        ${new EventTypes({routeType: type}).template}

        ${new EventDestinationControl({routeName: destination.name, routeType: type, destinations}).template}

        ${new EventDate({dateFrom, dateTo}).template}

        ${new EventPrice({routePrice: basePrice}).template}

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">

        ${new EventOffers({routeOffers: offers, offersByType}).template}

        ${new EventDestination({routeDestination: destination}).template}

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
  #handleGetOffers = null;
  #handleGetOffersByType = null;
  #handleGetDestination = null;
  #handleEditSubmit = null;
  #handleEditClose = null;
  constructor({
    route,
    destinations,
    handleGetOffers,
    handleGetOffersByType,
    handleGetDestination,
    handleEditSubmit,
    handleEditClose
  }) {
    super();

    this.#route = route;
    this.#destinations = destinations;
    this.#handleGetOffers = handleGetOffers;
    this.#handleGetOffersByType = handleGetOffersByType;
    this.#handleGetDestination = handleGetDestination;
    this.#handleEditSubmit = handleEditSubmit;
    this.#handleEditClose = handleEditClose;

    this.#handleEventListeners();
  }

  get template() {
    return getFormEditingTemplate(
      this.#route,
      this.#destinations,
      this.offers,
      this.offersByType,
      this.destination
    );
  }

  get offers() {
    const {type, offers} = this.#route;

    this.#routeOffers = this.#handleGetOffers(type, offers);

    return this.#routeOffers;
  }

  get offersByType() {
    const {type} = this.#route;

    this.#routeOffersByType = this.#handleGetOffersByType(type);

    return this.#routeOffersByType;
  }

  get destination() {
    const {destination} = this.#route;

    this.#routeDestination = this.#handleGetDestination(destination);

    return this.#routeDestination;
  }

  #onEditSubmit = (evt) => {
    evt.preventDefault();
    this.#handleEditSubmit();
  };

  #onEditClose = () => {
    this.#handleEditClose();
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
