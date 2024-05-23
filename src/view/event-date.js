import {getHumanizedDate} from '../utils';
import {DateFormats} from '../constants';
import AbstractView from '../framework/view/abstract-view';

const getEventDateTemplate = (dateFrom, dateTo) => `
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getHumanizedDate(dateFrom, DateFormats.DMY_HM)}">
    &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getHumanizedDate(dateTo, DateFormats.DMY_HM)}">
    </div>
  `;

export default class EventDate extends AbstractView {
  #dateFrom = '';
  #dateTo = '';
  constructor({dateFrom, dateTo}) {
    super();
    this.#dateFrom = dateFrom;
    this.#dateTo = dateTo;
  }

  get template() {
    return getEventDateTemplate(this.#dateFrom, this.#dateTo);
  }
}
