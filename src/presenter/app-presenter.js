import Filters from '../view/filters';
import Sorting from '../view/sorting';
import RoutesList from '../view/routes-list';
import RoutePresenter from './route-presenter';
import {render} from '../framework/render';
import {updateItems} from '../utils/common';

export default class AppPresenter {
  #appModel = null;
  #mainElement = null;
  #filtersElement = null;
  #routesListElement = new RoutesList();
  #routes = [];
  #routePresenters = new Map();

  constructor({appModel, mainElement, filtersElement}) {
    this.#appModel = appModel;
    this.#mainElement = mainElement;
    this.#filtersElement = filtersElement;
  }

  init() {
    this.#routes = this.#appModel.routes.slice();

    this.#renderContent();
  }

  #renderFilters() {
    if (this.#filtersElement) {
      render(new Filters(), this.#filtersElement);
    }
  }

  #renderSorting() {
    if (this.#mainElement) {
      render(new Sorting(), this.#mainElement);
    }
  }

  #renderRoutes() {
    if (this.#routesListElement) {
      render(this.#routesListElement, this.#mainElement);

      for (let i = 0; i < this.#routes.length; i++) {
        this.#renderRoute(this.#routes[i]);
      }
    }
  }

  #renderRoute(route) {
    if (route) {
      const {id} = route;
      const routePresenter = new RoutePresenter({
        appModel: this.#appModel,
        routesListElement: this.#routesListElement.element,
        onDataChange: this.#dataChangeHandler,
        onModeChange: this.#modeChangeHandler
      });

      routePresenter.init(route);
      this.#routePresenters.set(id, routePresenter);
    }
  }

  #renderContent() {
    if (this.#mainElement) {
      this.#renderFilters();
      this.#renderSorting();
      this.#renderRoutes();
    }
  }

  #clearRoutes() {
    this.#routePresenters.forEach((presenter) => presenter.destroy());
    this.#routePresenters.clear();
  }

  #dataChangeHandler = (changedItem) => {
    const {id: changedItemId} = changedItem;

    this.#routes = updateItems(this.#routes, changedItem);
    this.#routePresenters.get(changedItemId).init(changedItem);
  };

  #modeChangeHandler = () => this.#routePresenters.forEach((presenter) => presenter.resetFormEditingView());
}
