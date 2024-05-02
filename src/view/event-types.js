import {EVENT_TYPES} from '../constants';
import {createElement} from '../render';
import {getWordWithCapitalLetter} from '../utils';

const getEventsTypesItemTemplate = ({value, isChecked}) => `
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

const getEventsTypesTemplate = () => `
  <div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
    <span class="visually-hidden">Choose event type</span>
    <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

    <div class="event__type-list">
      <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>

      ${EVENT_TYPES.map((type) => getEventsTypesItemTemplate(type)).join('')}

      </fieldset>
    </div>
  </div>
`;

export default class EventTypes {
  getTemplate() {
    return getEventsTypesTemplate();
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
