import {
  checkIsRouteFromThePast,
  checkIsRouteFromTheFuture,
  checkIsRouteFromThePresent
} from './date';
import {
  FilterTypes
} from '../constants';

const FilterMethods = {
  [FilterTypes.EVERYTHING]: (routes) => [...routes],
  [FilterTypes.PAST]: (routes) => routes.filter((route) => checkIsRouteFromThePast(route)),
  [FilterTypes.FUTURE]: (routes) => routes.filter((route) => checkIsRouteFromTheFuture(route)),
  [FilterTypes.PRESENT]: (routes) => routes.filter((route) => checkIsRouteFromThePresent(route))
};

const getFilters = (routes) => Object.entries(FilterMethods).map(([type, method]) => ({type, isActive: Boolean(method(routes).length)}));

export {getFilters};
