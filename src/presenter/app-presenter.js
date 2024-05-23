import Filters from '../view/filters';
import Sorting from '../view/sorting';
import RoutePoint from '../view/route-point';
import RoutesList from '../view/routes-list';
import FormEditing from '../view/form-editing';
import {render, replace} from '../framework/render';
import {ESC_KEY_NAME} from '../constants';

export default class AppPresenter {
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
        handleGetOffersForRoute: this.#appModel.getOffersForRoute,
        handleGetOffersByType: this.#appModel.getOffersByType,
        handleGetDestinationForRoute: this.#appModel.getDestinationForRoute
      });
    }
  }

  #renderRoute({
    route,
    destinations,
    handleGetOffersForRoute,
    handleGetOffersByType,
    handleGetDestinationForRoute
  }) {
    const routePoint = new RoutePoint({
      route,
      handleGetOffersForRoute,
      handleGetDestinationForRoute,
      handleEditClick: onEditClick
    });

    const editPoint = new FormEditing({
      route,
      destinations,
      handleGetOffersForRoute,
      handleGetOffersByType,
      handleGetDestinationForRoute,
      handleEditClose: onEditClose,
      handleEditSubmit: onEditClose
    });

    function onEditClick() {
      replaceRouteToEdit();
      document.addEventListener('keydown', onEscKeyDown);
    }

    function onEditClose() {
      replaceEditToRoute();
      document.addEventListener('keydown', onEscKeyDown);
    }

    function replaceRouteToEdit() {
      replace(editPoint, routePoint);
    }

    function replaceEditToRoute() {
      replace(routePoint, editPoint);
    }

    function onEscKeyDown(evt) {
      if (evt.key === ESC_KEY_NAME) {
        replaceEditToRoute();
        document.removeEventListener('keydown', onEscKeyDown);
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
    this.#routes = this.#appModel.routes;
    this.#destinations = this.#appModel.destinations;

    this.#renderContent();
  }
}
