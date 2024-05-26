import { createElement } from '../render';
import { handleArguments } from '../utils';

const getRoutPointOffersTemplate = (routeOffers) => {
  handleArguments(routeOffers);

  if (routeOffers) {
    return `
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${
  routeOffers.map(({title, price}) => `
          <li class="event__offer">
            <span class="event__offer-title">${title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
          </li>
          `).join('')
}
    </ul>`;
  }
};

export default class RoutePointOffers {
  constructor({ routeOffers }) {
    this.routeOffers = routeOffers || [];
  }

  getTemplate() {
    return getRoutPointOffersTemplate(this.routeOffers);
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
