import AbstractView from '../framework/view/abstract-view';

const getEventPriceTemplate = (routePrice) => `
    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${routePrice}">
    </div>
  `;

export default class EventPrice extends AbstractView{
  #routePrice;
  constructor({routePrice}) {
    super();
    this.$routePrice = routePrice;
  }

  get template() {
    return getEventPriceTemplate(this.$routePrice);
  }
}
