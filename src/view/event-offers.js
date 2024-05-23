import AbstractView from '../framework/view/abstract-view';

const getEventOffersItemTemplate = (offerByType, routeOffers) => {
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

const getEventOffersTemplate = (routeOffers, offersByType) => `
    <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">

            ${offersByType.map((offerByType) => getEventOffersItemTemplate(offerByType, routeOffers)).join('')}

        </div>
    </section>
  `;


export default class EventOffers extends AbstractView {
  #routeOffers = [];
  #offersByType = [];

  constructor({routeOffers, offersByType}) {
    super();
    this.#routeOffers = routeOffers;
    this.#offersByType = offersByType;
  }

  get template() {
    return getEventOffersTemplate(this.#routeOffers, this.#offersByType);
  }
}
