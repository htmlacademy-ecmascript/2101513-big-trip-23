import EventTypes from './event-types';
import EventOffers from './event-offers';
import EventDestinationControl from './event-destination-control';
import EventDestination from './event-destination';
import EventPrice from './event-price';
import EventDate from './event-date';

import {createElement} from '../render';
import { handleArguments } from '../utils';

const getFormEditingTemplate = (
  route,
  destinations,
  handleGetOffers,
  handleGetOffersByType,
  handleGetDestination
) => {
  handleArguments(route, handleGetOffers, handleGetOffersByType, handleGetDestination);

  const {dateFrom, dateTo, basePrice, type, destination, offers} = route;
  const routeOffers = handleGetOffers(type, offers);
  const offersByType = handleGetOffersByType(type);
  const routeDestination = handleGetDestination(destination);

  return `
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">

        ${new EventTypes({routeType: type}).getTemplate()}

        ${new EventDestinationControl({routeName: routeDestination.name, routeType: type, destinations}).getTemplate()}

        ${new EventDate({dateFrom, dateTo}).getTemplate()}

        ${new EventPrice({routePrice: basePrice}).getTemplate()}

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">

        ${new EventOffers({routeOffers, offersByType}).getTemplate()}

        ${new EventDestination({routeDestination}).getTemplate()}

      </section>
    </form>
  </li>
`;
};

export default class FormEditing {
  constructor({ route, destinations, handleGetOffers, handleGetOffersByType, handleGetDestionation }) {
    this.route = route || {};
    this.destinations = destinations || [];
    this.handleGetOffers = handleGetOffers || null;
    this.handleGetOffersByType = handleGetOffersByType || null;
    this.handleGetDestionation = handleGetDestionation || null;
  }

  getTemplate() {
    return getFormEditingTemplate(
      this.route,
      this.destinations,
      this.handleGetOffers,
      this.handleGetOffersByType,
      this.handleGetDestionation
    );
  }

  getElement() {
    if (!this.elem) {
      this.elem = createElement(this.getTemplate());
    }
    return this.elem;
  }

  removeElement() {
    this.elem = null;
  }
}
