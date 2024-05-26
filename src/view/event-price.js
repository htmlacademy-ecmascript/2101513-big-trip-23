import {createElement} from '../render';
import { handleArguments } from '../utils';

const getEventPriceTemplate = (routePrice) => {
  handleArguments(routePrice);

  return `
    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${routePrice}">
    </div>
  `;
};

export default class EventPrice {
  constructor({routePrice}) {
    this.routePrice = routePrice || 0;
  }

  getTemplate() {
    return getEventPriceTemplate(this.routePrice);
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
