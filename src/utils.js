import { ErrorMessages, TimeFormats, DurationFormats } from './constants';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const getWordWithCapitalLetter = (word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`;

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
  getHumanizedDate,
  getDurationGap
};
