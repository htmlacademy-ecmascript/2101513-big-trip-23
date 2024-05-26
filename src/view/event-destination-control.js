import {createElement} from '../render';
import { handleArguments } from '../utils';

const getDestinationOptionTemplate = (name) => {
  handleArguments(name);

  return `
    <option value="${name}">${name}</option>
  `;
};


const getDestinationControlTemplate = (routeName, routeType, destinations) => {
  handleArguments(routeName, routeType);

  return `
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${routeType}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${routeName}" list="destination-list-1">
      <datalist id="destination-list-1">

          ${destinations.map(({name}) => getDestinationOptionTemplate(name)).join('')}

      </datalist>
    </div>
  `;
};

export default class EventDestinationControl {
  constructor({routeName, routeType, destinations}) {
    this.routeName = routeName || '';
    this.routeType = routeType || 'Flight';
    this.destinations = destinations || [];
  }

  getTemplate() {
    return getDestinationControlTemplate(this.routeName, this.routeType, this.destinations);
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
