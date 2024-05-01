import Filters from '../view/filters.js';
import Sorting from '../view/sorting.js';
import RoutePoint from '../view/route-point.js';
import RoutesList from '../view/routes-list.js';
import FormCreating from '../view/form-creating.js';
import FormEditing from '../view/form-editing.js';

import {render} from '../render.js';

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
