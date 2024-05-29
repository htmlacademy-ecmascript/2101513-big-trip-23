import {routes as mockRoutes} from '../mock/routes';
import {destinations as mockDestinations} from '../mock/destinations';
import {offers as mockOffers} from '../mock/offers';

export default class AppModel {
  #routes = [];
  #destinations = [];
  #offers = [];

  constructor() {
    this.#routes = mockRoutes;
    this.#destinations = mockDestinations;
    this.#offers = mockOffers;
  }

  get routes() {
    return this.#routes;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  getOffersByType = (type) => {
    const {offers} = this.offers.find(({type: offerType}) => offerType === type);

    return offers;
  };

  getOffersForRoute = (type, routeOffers) => {
    const offersByType = this.getOffersByType(type);

    if (offersByType) {
      return offersByType.filter(({id}) => routeOffers.includes(id));
    }
  };

  getDestinationForRoute = (id) => this.destinations.find(({id: destinationId}) => destinationId === id);
}
