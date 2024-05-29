import {EVENT_TYPES} from '../constants';
import {capitalizeLetter} from '../utils/common';
import AbstractView from '../framework/view/abstract-view';

const getEventsTypesItemTemplate = (eventType, routeType) => `
  <div class="event__type-item">
    <input id="event-type-${eventType}-1"
          class="event__type-input  visually-hidden"
          value="${eventType}"
          type="radio"
          name="event-type"
          ${eventType === routeType ? 'checked' : ''}
    >
    <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-1">${capitalizeLetter(eventType)}</label>
  </div>
`;


const getEventsTypesTemplate = (routeType) => `
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

export default class EventTypes extends AbstractView {
  #routeType = '';
  constructor({routeType}) {
    super();
    this.#routeType = routeType;
  }

  get template() {
    return getEventsTypesTemplate(this.#routeType);
  }
}
