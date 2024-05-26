import RoutePoint from '../view/route-point';
import FormEditing from '../view/form-editing';
import {render, replace} from '../framework/render';
import {ESC_KEY_NAME} from '../constants';

export default class RoutePresenter {
  #appModel = null;
  #routeComponent = null;
  #formEditingComponent = null;
  #routesListElement = null;
  #route = null;

  constructor({appModel, routesListElement}) {
    this.#appModel = appModel;
    this.#routesListElement = routesListElement;
  }

  init(route) {
    this.#route = route;

    this.#routeComponent = new RoutePoint({
      route: this.#route,
      routeOffers: this.routeOffers,
      routeDestination: this.routeDestination,
      onEditClick: this.#handleOpenFormEditing
    });

    this.#formEditingComponent = new FormEditing({
      route: this.#route,
      destinations: this.destinations,
      offersByType: this.offersByType,
      routeOffers: this.routeOffers,
      routeDestination: this.routeDestination,
      onEditSubmit: this.#handleCloseFormEditing,
      onEditClose: this.#handleCloseFormEditing
    });

    render(this.#routeComponent, this.#routesListElement);
  }

  get destinations() {
    return [...this.#appModel.destinations];
  }

  get offersByType() {
    const {type} = this.#route;

    return [...this.#appModel.getOffersByType(type)];
  }

  get routeOffers() {
    const {type, offers} = this.#route;

    return [...this.#appModel.getOffersForRoute(type, offers)];
  }

  get routeDestination() {
    const {destination} = this.#route;

    return this.#appModel.getDestinationForRoute(destination);
  }

  #handleOpenFormEditing = () => {
    replace(this.#formEditingComponent, this.#routeComponent);
    document.addEventListener('keydown', this.#handleEscKeyDown);
  };

  #handleCloseFormEditing = () => {
    replace(this.#routeComponent, this.#formEditingComponent);
    document.removeEventListener('keydown', this.#handleEscKeyDown);
  };

  #handleEscKeyDown = (evt) => {
    if (evt.key === ESC_KEY_NAME) {
      evt.preventDefault();
      this.#handleCloseFormEditing();
    }
  };
}
