import Filters from '../view/filters';
import Sorting from '../view/sorting';
import RoutePoint from '../view/route-point';
import RoutesList from '../view/routes-list';
import FormEditing from '../view/form-editing';
import {render, replace} from '../framework/render';
import {ESC_KEY_NAME} from '../constants';

export default class GeneralPresenter {
  #routes = [];
  #destinations = [];
  #appModel = {};
  #routesListElement = new RoutesList();

  constructor({mainElement, filtersElement, appModel}) {
    this.mainElement = mainElement || null;
    this.filtersElement = filtersElement || null;
    this.#appModel = appModel;
  }

  #renderFilters() {
    if (this.filtersElement) {
      render(new Filters(), this.filtersElement);
    }
  }

  #renderSorting() {
    if (this.mainElement) {
      render(new Sorting(), this.mainElement);
    }
  }

  #renderRoutes() {
    render(this.#routesListElement, this.mainElement);

    for (let i = 0; i < this.#routes.length; i++) {
      this.#renderRoute({
        route: this.#routes[i],
        destinations: this.#destinations,
        handleGetOffers: this.#appModel.getOffersForRoute,
        handleGetOffersByType: this.#appModel.getOffersByType,
        handleGetDestination: this.#appModel.getDestinationForRoute
      });
    }
  }

  #renderRoute({route, destinations, handleGetOffers, handleGetOffersByType, handleGetDestination}) {
    const routePoint = new RoutePoint({
      route,
      handleGetOffers,
      handleGetDestination,
      handleEditClick: onEditClick
    });

    const editPoint = new FormEditing({
      route,
      destinations,
      handleGetOffers,
      handleGetOffersByType,
      handleGetDestination,
      handleEditClose: onEditClose,
      handleEditSubmit: onEditClose
    });

    function onEditClick() {
      replaceRouteToEdit();
      document.removeEventListener('keydown', handleEscKeyDown);
    }

    function onEditClose() {
      replaceEditToRoute();
      document.removeEventListener('keydown', handleEscKeyDown);
    }

    function replaceRouteToEdit() {
      replace(editPoint, routePoint);
    }

    function replaceEditToRoute() {
      replace(routePoint, editPoint);
    }

    function handleEscKeyDown(evt) {
      if (evt.key === ESC_KEY_NAME) {
        document.removeEventListener('keydown', handleEscKeyDown);
      }
    }

    render(routePoint, this.#routesListElement.element);
  }

  #renderContent() {
    if (this.mainElement) {
      this.#renderFilters();
      this.#renderSorting();
      this.#renderRoutes();
    }
  }

  init() {
    this.#routes = this.#appModel.getRoutes();
    this.#destinations = this.#appModel.getDestinations();

    this.#renderContent();
  }
}
