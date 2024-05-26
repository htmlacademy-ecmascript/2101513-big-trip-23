import {EVENT_TYPES} from '../constants';
import {createElement} from '../render';
import {getWordWithCapitalLetter, handleArguments} from '../utils';

const getEventsTypesItemTemplate = (eventType, routeType) => {
  handleArguments(eventType, routeType);

  return `
    <div class="event__type-item">
      <input id="event-type-${eventType}-1"
            class="event__type-input  visually-hidden"
            value="${eventType}"
            type="radio"
            name="event-type"
            ${eventType === routeType ? 'checked' : ''}
      >
      <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-1">${getWordWithCapitalLetter(eventType)}</label>
    </div>
  `;
};


const getEventsTypesTemplate = (routeType) => {
  handleArguments(routeType);

  return `
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${routeType}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>

        ${EVENT_TYPES.map((eventType) => getEventsTypesItemTemplate(eventType, routeType)).join('')}

        </fieldset>
      </div>
    </div>
  `;
};

export default class EventTypes {
  constructor({routeType}) {
    this.routeType = routeType || 'flight';
  }

  getTemplate() {
    return getEventsTypesTemplate(this.routeType);
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
