import {createElement} from '../render';

const getEventOffersItemTemplate = ({value, title, price, isChecked}) => `
  <div class="event__offer-selector">
    <input id="event-offer-${value}-1"
           class="event__offer-checkbox  visually-hidden"
           type="checkbox"
           name="event-offer-${value}"
           ${isChecked ? 'checked' : ''}
    >
    <label class="event__offer-label" for="event-offer-${value}-1">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>
`;
const getEventOffersTemplate = (services) => `
    <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">

            ${services.map((service) => getEventOffersItemTemplate(service)).join('')}

        </div>
  </section>
`;

export default class EventOffers {
  constructor({services}) {
    this.services = services || [];
  }

  getTemplate() {
    return getEventOffersTemplate(this.services);
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
