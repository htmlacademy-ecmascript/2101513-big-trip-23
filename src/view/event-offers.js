import {createElement} from '../render';
import { handleArguments } from '../utils';

const getEventOffersItemTemplate = (offerByType, routeOffers) => {
  handleArguments(offerByType, routeOffers);
  const {id, title, price} = offerByType;
  const isContainOffer = routeOffers.find(({id: routeOfferId}) => id === routeOfferId);

  return `
    <div class="event__offer-selector">
      <input id="event-offer-${title.toLowerCase()}-1"
            class="event__offer-checkbox  visually-hidden"
            type="checkbox"
            name="event-offer-${offerByType.title.toLowerCase()}"
            ${isContainOffer ? 'checked' : ''}
      >
      <label class="event__offer-label" for="event-offer-${title.toLowerCase()}-1">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>
  `;
};

const getEventOffersTemplate = (routeOffers, offersByType) => {
  handleArguments(routeOffers, offersByType);

  return `
    <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">

            ${offersByType.map((offerByType) => getEventOffersItemTemplate(offerByType, routeOffers)).join('')}

        </div>
    </section>
  `;
};


export default class EventOffers {
  constructor({routeOffers, offersByType}) {
    this.routeOffers = routeOffers || [];
    this.offersByType = offersByType || [];
  }

  getTemplate() {
    return getEventOffersTemplate(this.routeOffers, this.offersByType);
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
