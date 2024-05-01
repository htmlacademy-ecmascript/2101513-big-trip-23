import {createElement} from '../render.js';

const getEventDestinationTemplate = (description, gallery = []) => `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>

    ${gallery.length ? `
      <div class="event__photos-container">
        <div class="event__photos-tape">

          ${gallery.map(({src, alt}) => `<img class="event__photo" src="${src}" alt="${alt}">`).join('')}

        </div>
      </div>
    ` : ''}
  </section>
`;

export default class EventDestination {
  getTemplate(description, gallery) {
    return getEventDestinationTemplate(description, gallery);
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
