import Filters from '../view/filters';
import Sorting from '../view/sorting';
import RoutePoint from '../view/route-point';
import RoutesList from '../view/routes-list';
import FormCreating from '../view/form-creating';
import FormEditing from '../view/form-editing';

import {render} from '../render';

export default class GeneralPresenter {
  routesListInstance = new RoutesList();

  constructor() {
    this.filtersContainer = document.querySelector('.trip-controls__filters');
    this.contentContainer = document.querySelector('.trip-events');
  }

  renderFilters() {
    if (this.filtersContainer) {
      render(new Filters(), this.filtersContainer);
    }
  }

  renderSorting() {
    if (this.contentContainer) {
      render(new Sorting(), this.contentContainer);
    }
  }

  renderFormCreating() {
    if (this.contentContainer) {
      render(new FormCreating(), this.routesListInstance.getElement());
    }
  }

  renderFormEditing() {
    if (this.contentContainer) {
      render(new FormEditing(), this.routesListInstance.getElement());
    }
  }

  renderRoutes() {
    if (this.contentContainer) {
      for (let i = 0; i < 3; i++) {
        render(new RoutePoint(), this.routesListInstance.getElement());
      }
    }
  }

  renderContent() {
    if (this.contentContainer) {
      render(this.routesListInstance, this.contentContainer);

      this.renderFormEditing();
      this.renderFormCreating();
      this.renderRoutes();
    }
  }

  init() {
    this.renderFilters();
    this.renderSorting();
    this.renderContent();
  }
}
