import {createElement} from '../render.js';

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
const getEventOffersTemplate = (extraServices = []) => `
    <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">

            ${extraServices.map((service) => getEventOffersItemTemplate(service)).join('')}

        </div>
  </section>
`;

export default class EventOffers {
  getTemplate(extraServices) {
    return getEventOffersTemplate(extraServices);
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
