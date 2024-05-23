import {routes as mockRoutes} from '../mock/routes';
import {offers as mockOffers} from '../mock/offers';
import {destinations as mockDestinations} from '../mock/destinations';

export default class AppModel {
  #routes = [];
  #offers = [];
  #destinations = [];

  get routes() {
    this.#routes = mockRoutes;

    return this.#routes.slice();
  }

  get offers() {
    this.#offers = mockOffers;

    return this.#offers.slice();
  }

  get destinations() {
    this.#destinations = mockDestinations;

    return this.#destinations;
  }

  getOffersByType = (type) => {
    const {offers} = this.offers.find(({type: offerType}) => offerType === type);

    return offers;
  };

  getOffersForRoute = (type, routeOffers) => {
    const offers = this.getOffersByType(type);

    if (offers) {
      return offers.filter(({id}) => routeOffers.includes(id));
    }
  };

  getDestinationForRoute = (id) => this.destinations.find(({id: destinationId}) => destinationId === id);
}
