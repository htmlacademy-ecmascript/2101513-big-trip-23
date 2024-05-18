import { ErrorMessages, TimeFormats, DurationFormats } from './constants';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const getWordWithCapitalLetter = (word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`;

const handleError = (errorMessage) => {
  throw new Error(errorMessage);
};

const handleArguments = (...args) => {
  const isArray = (value) => value && Array.isArray(value);
  const isObject = (value) => value && typeof value === 'object';
  const isFunction = (value) => value && typeof value === 'function';

  for (const argItem of args) {
    if (isObject(argItem)) {
      const isNotEmptyArray = isArray(argItem) && argItem.length;
      const isNotEmptyFunction = isFunction(argItem) && argItem();
      const isNotEmptyObject = Object.keys(argItem).length;

      if (isNotEmptyArray || isNotEmptyFunction || isNotEmptyObject) {
        return;
      }
    } else if (argItem) {
      return;
    } else {
      throw new Error(ErrorMessages.NO_ARGUMENTS);
    }
  }
};

const getHumanizedDate = (date, dateFormat) => {
  if (!date || !dateFormat) {
    throw new Error(ErrorMessages.NO_DATE);
  }

  return dayjs(date).format(dateFormat);
};

const getDurationGap = (dateFrom, dateTo) => {
  if (!dateFrom || !dateTo) {
    throw new Error(ErrorMessages.NO_DURATION);
  }

  const eventDuration = dayjs(dateTo).diff(dateFrom);

  if (eventDuration < TimeFormats.HOUR) {
    return dayjs(eventDuration).format(DurationFormats.MINUTES);
  }
  if (eventDuration >= TimeFormats.HOUR && eventDuration < TimeFormats.DAY) {
    return dayjs(eventDuration).format(DurationFormats.HOURS_MINUTES);
  }
  if (eventDuration >= TimeFormats.DAY) {
    return dayjs(eventDuration).format(DurationFormats.DAYS_HOURS_MINUTES);
  }
};

export {
  getWordWithCapitalLetter,
  handleError,
  handleArguments,
  getHumanizedDate,
  getDurationGap
};
