import {createElement} from '../render.js';
import {
  EVENT_TYPES,
  DESTINATION_POINTS,
  OFFERS_OPTIONS,
  DESTINATION_DESCRIPTION_PROPERTIES
} from '../constants.js';
import {getWordWithCapitalLetter} from '../utils.js';

const getEventsItemTemplate = ({value, isChecked}) => `
  <div class="event__type-item">
    <input id="event-type-${value}-1"
           class="event__type-input  visually-hidden"
           value="${value}"
           type="radio"
           name="event-type"
           ${isChecked ? 'checked' : ''}
    >
    <label class="event__type-label  event__type-label--${value}" for="event-type-${value}-1">${getWordWithCapitalLetter(value)}</label>
  </div>
`;

const getEventsTemplate = () => `
  <div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
    <span class="visually-hidden">Choose event type</span>
    <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

    <div class="event__type-list">
      <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>

      ${EVENT_TYPES.map((type) => getEventsItemTemplate(type)).join('')}

      </fieldset>
    </div>
  </div>
`;

const getDestinationItemTemplate = (point) => `
    <option value="${point}"></option>
`;

const getDestinationTemplate = () => `
  <div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      Flight
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">
    <datalist id="destination-list-1">
        ${DESTINATION_POINTS.map((point) => getDestinationItemTemplate(point)).join('')}
    </datalist>
  </div>
`;

const getOffersItemTemplate = ({value, title, price, isChecked}) => `
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

const getOffersTemplate = () => `
  <div class="event__available-offers">

    ${OFFERS_OPTIONS.map((option) => getOffersItemTemplate(option)).join('')}

  </div>
`;

const getDestinationDescriptionTemplate = ({description = '', photos = []}) => `
  <p class="event__destination-description">${description}</p>

  <div class="event__photos-container">
    <div class="event__photos-tape">

      ${photos.map(({src, alt = 'Event photo'}) => `<img class="event__photo" src="${src}" alt="${alt}">`).join('')}
    </div>
  </div>
`;

const getFormCreatingTemplate = () => `
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
    <header class="event__header">

      ${getEventsTemplate()}

      ${getDestinationTemplate()}

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
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        ${getOffersTemplate()}

      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>

        ${getDestinationDescriptionTemplate(DESTINATION_DESCRIPTION_PROPERTIES)}

      </section>
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
