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

export {
  capitalizeLetter,
  updateItems,
  getSearchableValue,
  sortItems
};
