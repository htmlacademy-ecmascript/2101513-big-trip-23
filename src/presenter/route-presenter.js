import RoutePoint from '../view/route-point';
import FormEditing from '../view/form-editing';
import {render, replace, remove} from '../framework/render';
import {ESC_KEY_NAME, ModeVariants} from '../constants';

export default class RoutePresenter {
  #routeEditingMode = ModeVariants.DEFAULT;
  #appModel = null;
  #routeComponent = null;
  #formEditingComponent = null;
  #routesListElement = null;
  #route = null;
  #handleDataChange = null;
  #handleModeChange = null;

  constructor({appModel, routesListElement, onDataChange, onModeChange}) {
    this.#appModel = appModel;
    this.#routesListElement = routesListElement;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(route) {
    const existingRouteComponent = this.#routeComponent;
    const existingFormEditingComponent = this.#formEditingComponent;
    const isDefaultMode = this.#routeEditingMode === ModeVariants.DEFAULT;
    const isFirstRender = !this.#routeComponent || !this.#formEditingComponent;

    this.#route = route;
    this.#routeComponent = new RoutePoint({
      route: this.#route,
      routeOffers: this.routeOffers,
      routeDestination: this.routeDestination,
      onEditingFormOpen: this.#formEditingOpenHandler,
      onFavoriteClick: this.#favoriteClickHandler
    });
    this.#formEditingComponent = new FormEditing({
      route: this.#route,
      destinations: this.destinations,
      offersByType: this.offersByType,
      routeOffers: this.routeOffers,
      routeDestination: this.routeDestination,
      onFormEditingSubmit: this.#formEditingCloseHandler,
      onFormEditingClose: this.#formEditingCloseHandler
    });

    if (isFirstRender) {
      render(this.#routeComponent, this.#routesListElement);
      return;
    }

    if (isDefaultMode) {
      this.#replaceExistingComponent(this.#routesListElement, existingRouteComponent, this.#routeComponent);
    } else {
      this.#replaceExistingComponent(this.#routesListElement, existingFormEditingComponent, this.#formEditingComponent);
    }

    this.#removeAllExistingComponents(existingRouteComponent, existingFormEditingComponent);
  }

  destroy() {
    remove(this.#routeComponent);
    remove(this.#formEditingComponent);
  }

  resetFormEditingView() {
    if (this.#routeEditingMode === ModeVariants.EDITING) {
      this.#formEditingCloseHandler();
    }
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

  #replaceExistingComponent(containerElement, existingComponent, originalComponent) {
    if (containerElement.contains(existingComponent.element)) {
      replace(originalComponent, existingComponent);
    }
  }

  #removeAllExistingComponents(...components) {
    components.forEach((component) => remove(component));
  }

  #formEditingOpenHandler = () => {
    replace(this.#formEditingComponent, this.#routeComponent);
    document.addEventListener('keydown', this.#escKeydownHandler);
    this.#modeChangeHandler(ModeVariants.EDITING);
  };

  #formEditingCloseHandler = () => {
    replace(this.#routeComponent, this.#formEditingComponent);
    document.removeEventListener('keydown', this.#escKeydownHandler);
    this.#modeChangeHandler(ModeVariants.DEFAULT);
  };

  #favoriteClickHandler = (route) => {
    this.#handleDataChange({...route, isFavorite: !this.#route.isFavorite});
  };

  #escKeydownHandler = (evt) => {
    if (evt.key === ESC_KEY_NAME) {
      evt.preventDefault();
      this.#formEditingCloseHandler();
    }
  };

  #modeChangeHandler = (currentMode) => {
    if (currentMode === ModeVariants.DEFAULT) {
      this.#routeEditingMode = ModeVariants.DEFAULT;
    } else {
      this.#handleModeChange();
      this.#routeEditingMode = ModeVariants.EDITING;
    }
  };
}
