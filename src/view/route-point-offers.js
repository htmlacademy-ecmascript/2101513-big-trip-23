import AbstractView from '../framework/view/abstract-view';

const getRoutPointOffersTemplate = (routeOffers) => {
  if (routeOffers.length) {
    return `
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${routeOffers.map(({title, price}) => `
          <li class="event__offer">
            <span class="event__offer-title">${title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
          </li>
          `).join('')}
    </ul>`;
  } else {
    return '';
  }
};

export default class RoutePointOffers extends AbstractView {
  #routeOffers = [];

  constructor({routeOffers}) {
    super();
    this.#routeOffers = routeOffers;
  }

  get template() {
    return getRoutPointOffersTemplate(this.#routeOffers);
  }
}
