import Filters from '../view/filters';
import Sorting from '../view/sorting';
import RoutesList from '../view/routes-list';
import RoutePresenter from './route-presenter';
import {render} from '../framework/render';

export default class AppPresenter {
  #appModel = null;
  #mainElement = null;
  #filtersElement = null;
  #routesListElement = new RoutesList();
  #routes = null;

  constructor({appModel, mainElement, filtersElement}) {
    this.#appModel = appModel;
    this.#mainElement = mainElement;
    this.#filtersElement = filtersElement;
  }

  init() {
    this.#routes = this.#appModel.routes;

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
      const routePresenter = new RoutePresenter({
        appModel: this.#appModel,
        routesListElement: this.#routesListElement.element
      });

      routePresenter.init(route);
    }
  }

  #renderContent() {
    if (this.#mainElement) {
      this.#renderFilters();
      this.#renderSorting();
      this.#renderRoutes();
    }
  }
}
