import AbstractView from '../framework/view/abstract-view';

const getDestinationOptionTemplate = (name) => `
    <option value="${name}">${name}</option>
  `;


const getDestinationControlTemplate = (routeName, routeType, destinations) => `
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

export default class EventDestinationControl extends AbstractView{
  #routeName = '';
  #routeType = '';
  #destinations = [];
  constructor({routeName, routeType, destinations}) {
    super();
    this.#routeName = routeName;
    this.#routeType = routeType;
    this.#destinations = destinations;
  }

  get template() {
    return getDestinationControlTemplate(this.#routeName, this.#routeType, this.#destinations);
  }
}
