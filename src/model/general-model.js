import { routes as mockRoutes } from '../mock/routes';
import { destinations as mockDestinations } from '../mock/destinations';
import { offers as mockOffers } from '../mock/offers';
import { handleArguments } from '../utils';

export default class GeneralModel {
  routes = mockRoutes.slice() || [];
  destinations = mockDestinations.slice() || [];
  offers = mockOffers.slice() || [];

  getRoutes() {
    if (this.routes) {
      return this.routes;
    }
  }

  getDestinations() {
    if (this.destinations) {
      return this.destinations;
    }
  }

  getOffers() {
    if (this.offers) {
      return this.offers;
    }
  }

  getOffersByType = (type) => {
    handleArguments(type);

    const {offers} = this.offers.find(({type: offerType}) => offerType === type);

    return offers;
  };

  getOffersForRoute = (type, routeOffers) => {
    handleArguments(type, routeOffers);

    const offers = this.getOffersByType(type);

    if (offers) {
      return offers.filter(({id}) => routeOffers.includes(id));
    }
  };

  getDestinationForRoute = (id) => {
    handleArguments(id);

    return this.destinations.find(({id: destinationId}) => destinationId === id);
  };
}
