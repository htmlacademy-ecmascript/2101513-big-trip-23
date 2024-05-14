import Filters from '../view/filters';
import Sorting from '../view/sorting';
import RoutePoint from '../view/route-point';
import RoutesList from '../view/routes-list';
import FormCreating from '../view/form-creating';
import FormEditing from '../view/form-editing';
import {render} from '../render';

export default class GeneralPresenter {
  routesListInstance = new RoutesList();

  constructor({ mainContainer, filtersContainer, appModel }) {
    this.mainContainer = mainContainer || null;
    this.filtersContainer = filtersContainer || null;
    this.appModel = appModel || {};
  }

  renderFilters() {
    if (this.filtersContainer) {
      render(new Filters(), this.filtersContainer);
    }
  }

  renderSorting() {
    if (this.mainContainer) {
      render(new Sorting(), this.mainContainer);
    }
  }

  renderFormCreating() {
    if (this.mainContainer) {
      render(new FormCreating(), this.routesListInstance.getElement());
    }
  }

  renderFormEditing() {
    if (this.mainContainer) {
      render(new FormEditing({
        route: this.routes[0],
        destinations: this.destinations,
        handleGetOffers: this.appModel.getOffersForRoute,
        handleGetOffersByType: this.appModel.getOffersByType,
        handleGetDestionation: this.appModel.getDestinationForRoute
      }), this.routesListInstance.getElement());
    }
  }

  renderRoutes() {
    if (this.mainContainer) {
      for (let i = 0; i < this.routes.length; i++) {
        render(new RoutePoint({
          route: this.routes[i],
          handleGetOffers: this.appModel.getOffersForRoute,
          handleGetDestionation: this.appModel.getDestinationForRoute
        }), this.routesListInstance.getElement());
      }
    }
  }

  renderContent() {
    if (this.mainContainer) {
      render(this.routesListInstance, this.mainContainer);

      this.renderFormEditing();
      this.renderRoutes();
    }
  }

  init() {
    this.routes = this.appModel.getRoutes();
    this.destinations = this.appModel.getDestinations();
    this.renderFilters();
    this.renderSorting();
    this.renderContent();
  }
}
