import {DESTINATION_POINTS} from '../constants';
import {createElement} from '../render';

const getDestinationOptionTemplate = (point) => `
    <option value="${point}">${point}</option>
`;

const getDestinationControlTemplate = () => `
  <div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      Flight
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">
    <datalist id="destination-list-1">

        ${DESTINATION_POINTS.map((point) => getDestinationOptionTemplate(point)).join('')}

    </datalist>
  </div>
`;

export default class EventDestinationControl {
  getTemplate() {
    return getDestinationControlTemplate();
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
