import {ErrorMessages} from '../constants';

const capitalizeLetter = (word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`;

const updateItems = (items, newItem) => items.map((oldItem) => oldItem.id === newItem.id ? newItem : oldItem);

const getSearchableValue = (value, searchableIndex, separator = '-') => value.trim().split(separator)[searchableIndex];

const sortItems = (items, cb) => {
  if (!Array.isArray(items) || typeof cb !== 'function') {
    throw new Error(ErrorMessages.INVALID_ARGUMENTS);
  }

  return [...items].sort(cb);
};

const getRouteDestinationById = (destinations, routeDestinationId) => destinations.find(({id: destinationId}) => destinationId === routeDestinationId);

const getRouteDestinationByName = (destinations, routeDestinationName) => destinations.find(({name: destinationName}) => destinationName.toLowerCase() === routeDestinationName.toLowerCase());

const getOffersByType = (type, offers) => offers.find(({type: offerType}) => offerType === type);

const getRouteOffers = (route, offers) => {
  const {type, offers: routeOffers} = route;
  const {offers: offersByType} = getOffersByType(type, offers);
  return offersByType.filter(({id}) => routeOffers.includes(id));
};

export {
  capitalizeLetter,
  updateItems,
  getSearchableValue,
  sortItems,
  getRouteDestinationById,
  getRouteDestinationByName,
  getOffersByType,
  getRouteOffers
};
