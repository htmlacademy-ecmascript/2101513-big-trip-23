import AbstractView from '../framework/view/abstract-view';

const getEventDestinationTemplate = (routeDestination) => {
  const {description, pictures} = routeDestination;

  return `
    <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>

    ${pictures.length ? `
      <div class="event__photos-container">
        <div class="event__photos-tape">

          ${pictures.map(({src, description: pictureDescription}) => `<img class="event__photo" src="${src}" alt="${pictureDescription}">`).join('')}

        </div>
      </div>
    ` : ''}
    </section>
  `;
};

export default class EventDestination extends AbstractView{
  #routeDestination = {};
  constructor({routeDestination}) {
    super();
    this.#routeDestination = routeDestination;
  }

  get template() {
    return getEventDestinationTemplate(this.#routeDestination);
  }
}
