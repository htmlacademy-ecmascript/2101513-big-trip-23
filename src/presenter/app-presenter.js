import Filters from '../view/filters';
import Sorting from '../view/sorting';
import RoutesList from '../view/routes-list';
import RoutePresenter from './route-presenter';
import InfoMessage from '../view/info-message';
import {render} from '../framework/render';
import {updateItems, sortItems} from '../utils/common';
import {SortingMethods} from '../utils/sorting';
import {getFilters} from '../utils/filters';
import {SortingDirectionVariants, SortingTypes, InfoMessages} from '../constants';

export default class AppPresenter {
  #appModel = null;
  #mainElement = null;
  #filtersElement = null;
  #routesListElement = new RoutesList();
  #routes = [];
  #routePresenters = new Map();
  #activeSortingType = SortingTypes.DAY;
  #activeSortingDirection = SortingDirectionVariants.DESC;

  constructor({appModel, mainElement, filtersElement}) {
    this.#appModel = appModel;
    this.#mainElement = mainElement;
    this.#filtersElement = filtersElement;
  }

  init() {
    this.#routes = sortItems(this.#appModel.routes, SortingMethods[this.#activeSortingType]?.(this.#activeSortingDirection));

    this.#renderContent();
  }

  #renderFilters() {
    if (this.#filtersElement) {
      const filters = getFilters(this.#routes);

      render(new Filters({filters}), this.#filtersElement);
    }
  }

  #renderSorting() {
    if (this.#mainElement) {
      render(new Sorting({
        onSortingChange: this.#sortingChangeHandler,
        activeSortType: this.#activeSortingType
      }), this.#mainElement);
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

  #renderInfoMessage(message) {
    if (this.#mainElement) {
      render(new InfoMessage({message}), this.#mainElement);
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

      if (this.#routes.length) {
        this.#renderRoutes();
      } else {
        this.#renderInfoMessage(InfoMessages.NO_ROUTES);
      }
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

  #sortingChangeHandler = (sortType) => {
    const isSortingTypeMatches = this.#activeSortingType === sortType;
    const sortingMethod = SortingMethods[sortType]?.();

    if (isSortingTypeMatches || !sortingMethod) {
      return;
    }

    this.#activeSortingType = SortingTypes[sortType.toUpperCase()];
    this.#clearRoutes();
    this.#routes = sortItems(this.#routes, sortingMethod);
    this.#renderRoutes();
  };
}
