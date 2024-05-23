import AbstractView from '../framework/view/abstract-view';

const getRoutePointListTemplate = () => `
    <ul class="trip-events__list"></ul>
`;

export default class RoutesList extends AbstractView{
  get template() {
    return getRoutePointListTemplate();
  }
}
