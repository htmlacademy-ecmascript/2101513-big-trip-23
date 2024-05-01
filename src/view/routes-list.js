import {createElement} from '../render.js';

const getRoutePointListTemplate = () => `
    <ul class="trip-events__list"></ul>
`;

export default class RoutesList {
  getTemplate() {
    return getRoutePointListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
