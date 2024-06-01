import AbstractView from '../framework/view/abstract-view.js';

const getInfoMessageTemplate = (message) => `
  <p class="trip-events__msg">${message}</p>
`;

export default class InfoMessage extends AbstractView {
  #message = null;

  constructor({message}) {
    super();
    this.#message = message;
  }

  get template() {
    return getInfoMessageTemplate(this.#message);
  }
}
