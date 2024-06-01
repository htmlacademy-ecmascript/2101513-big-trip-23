const DISABLED_SORTING_TYPES = ['event', 'offers'];

const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const ESC_KEY_NAME = 'Escape';

const SortingTypes = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const FilterTypes = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE',
  PRESENT: 'PRESENT',
  PAST: 'PAST'
};

const InfoMessages = {
  NO_ROUTES: 'Click New Event to create your first point',
  NO_PAST_ROUTES: 'There are no past events now',
  NO_PRESENT_ROUTES: 'There are no present events now',
  NO_FUTURE_ROUTES: 'There are no future events now',
  FAILED_LOAD: 'Failed to load latest route information',
  LOADING: 'Loading...'
};

const SortingDirectionVariants = {
  ASC: 'ASC',
  DESC: 'DESC'
};

const ErrorMessages = {
  NO_DATE: 'Не указана нужная дата и(или) формат даты.',
  NO_DURATION: 'Не указано начало или конец промежутка времени',
  INVALID_ARGUMENTS: 'Не переданы необходимые аргументы функции и(или) некоторые из них не соответсвуют требованиям',
  NO_ELEMENT: 'Безрезультатно. Функция ничего не вернула',
  NO_OFFERS: 'Нет подходящих предложений',
  INVALID_SORTING_DIRECTION: 'Не валидное значение для варианта сортировки'
};

const DateFormats = {
  MD: 'MMM DD',
  DMY_HM: 'DD/MM/YY H:m',
  HM: 'HH:mm',
};

const TimeFormats = {
  HOUR: 3600000,
  DAY: 86400000,
};

const DurationFormats = {
  MINUTES: 'mm[M]',
  HOURS_MINUTES: 'HH[H] mm[M]',
  DAYS_HOURS_MINUTES: 'DD[D] HH[H] mm[M]',
};

const ModeVariants = {
  DEFAULT: 'default',
  EDITING: 'editing'
};

export {
  DISABLED_SORTING_TYPES,
  EVENT_TYPES,
  ESC_KEY_NAME,
  SortingTypes,
  FilterTypes,
  InfoMessages,
  SortingDirectionVariants,
  ErrorMessages,
  DateFormats,
  TimeFormats,
  DurationFormats,
  ModeVariants
};
