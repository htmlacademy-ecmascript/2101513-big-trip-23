import {SortingDirectionVariants, ErrorMessages, SortingTypes} from '../constants';
import {getTimeDifference} from './date';

const SortingMethods = {
  [SortingTypes.DAY]: function (sortingDirection = SortingDirectionVariants.DESC) {
    if (!sortingDirection) {
      throw new Error(ErrorMessages.INVALID_ARGUMENTS);
    }

    return function (a, b) {
      const {dateFrom: dateFromForA} = a;
      const {dateFrom: dateFromForB} = b;

      switch (sortingDirection) {
        case SortingDirectionVariants.DESC:
          return new Date(dateFromForB) - new Date(dateFromForA);
        case SortingDirectionVariants.ASC:
          return new Date(dateFromForA) - new Date(dateFromForB);
        default:
          throw new Error(ErrorMessages.INVALID_SORTING_DIRECTION);
      }
    };
  },
  [SortingTypes.TIME]: function (sortingDirection = SortingDirectionVariants.DESC) {
    if (!sortingDirection) {
      throw new Error(ErrorMessages.INVALID_ARGUMENTS);
    }

    return function (a, b) {
      switch (sortingDirection) {
        case SortingDirectionVariants.DESC:
          return getTimeDifference(b) - getTimeDifference(a);
        case SortingDirectionVariants.ASC:
          return getTimeDifference(a) - getTimeDifference(b);
        default:
          throw new Error(ErrorMessages.INVALID_SORTING_DIRECTION);
      }
    };
  },
  [SortingTypes.PRICE]: function (sortingDirection = SortingDirectionVariants.DESC) {
    if (!sortingDirection) {
      throw new Error(ErrorMessages.INVALID_ARGUMENTS);
    }

    return function (a, b) {
      const {basePrice: basePriceForA} = a;
      const {basePrice: basePriceForB} = b;

      switch (sortingDirection) {
        case SortingDirectionVariants.DESC:
          return basePriceForB - basePriceForA;
        case SortingDirectionVariants.ASC:
          return basePriceForA - basePriceForB;
        default:
          throw new Error(ErrorMessages.INVALID_SORTING_DIRECTION);
      }
    };
  }
};

export {SortingMethods};
