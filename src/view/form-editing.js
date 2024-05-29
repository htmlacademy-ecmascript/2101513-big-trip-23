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
  offersByType,
  routeOffers,
  routeDestination
) => {
  const {dateFrom, dateTo, basePrice, type} = route;
  const {name} = routeDestination;

  return `
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        ${new EventTypes({routeType: type}).template}

        ${new EventDestinationControl({routeName: name, routeType: type, destinations}).template}

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
  #destinations = [];
  #offersByType = [];
  #routeOffers = [];
  #routeDestination = {};
  #handleFormEditingSubmit = null;
  #handleFormEditingClose = null;

  constructor({
    route,
    destinations,
    offersByType,
    routeOffers,
    routeDestination,
    onFormEditingSubmit,
    onFormEditingClose
  }) {
    super();

    this.#route = route;
    this.#destinations = destinations;
    this.#offersByType = offersByType;
    this.#routeOffers = routeOffers;
    this.#routeDestination = routeDestination;
    this.#handleFormEditingSubmit = onFormEditingSubmit;
    this.#handleFormEditingClose = onFormEditingClose;

    this.#addEventListenersHandler();
  }

  get template() {
    return getFormEditingTemplate(
      this.#route,
      this.#destinations,
      this.#offersByType,
      this.#routeOffers,
      this.#routeDestination
    );
  }

  #formEditingCloseHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormEditingClose();
  };

  #addEventListenersHandler() {
    const InteractiveElements = {
      EDIT_FORM: '.event--edit',
      EDIT_FORM_CLOSE_BUTTON: '.event__rollup-btn'
    };

    this.element.querySelector(InteractiveElements.EDIT_FORM).addEventListener('submit', this.#formEditingCloseHandler);
    this.element.querySelector(InteractiveElements.EDIT_FORM_CLOSE_BUTTON).addEventListener('click', this.#formEditingCloseHandler);
  }
}
