import EventTypes from './event-types.js';
import EventOffers from './event-offers.js';
import EventDestinationControl from './event-destination-control.js';
import EventDestination from './event-destination';

import {createElement} from '../render.js';
import {
  destinationDescription,
  destinationGallery,
  extraServices
} from '../mocks.js';

const getFormCreatingTemplate = () => `
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
    <header class="event__header">

      ${new EventTypes().getTemplate()}

      ${new EventDestinationControl().getTemplate()}

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">

        ${new EventOffers().getTemplate(extraServices)}

        ${new EventDestination().getTemplate(destinationDescription, destinationGallery)}

    </section>
  </form>
  </li>
`;

export default class FormCreating {
  getTemplate() {
    return getFormCreatingTemplate();
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
