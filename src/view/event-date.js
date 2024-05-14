import {createElement} from '../render';
import { handleArguments, getHumanizedDate } from '../utils';
import { DateFormats } from '../constants';

const getEventDateTemplate = (dateFrom, dateTo) => {
  handleArguments(dateFrom, dateTo);

  return `
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getHumanizedDate(dateFrom, DateFormats.DMY_HM)}">
    &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getHumanizedDate(dateTo, DateFormats.DMY_HM)}">
    </div>
  `;
};

export default class EventDate {
  constructor({dateFrom, dateTo}) {
    this.dateFrom = dateFrom || null;
    this.dateTo = dateTo || null;
  }

  getTemplate() {
    return getEventDateTemplate(this.dateFrom, this.dateTo);
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
