const FILTER_TYPES = [
  {
    value: 'everything',
    isChecked: true
  },
  {
    value: 'future'
  },
  {
    value: 'present'
  },
  {
    value: 'past'
  }
];

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
  FILTER_TYPES,
  DISABLED_SORTING_TYPES,
  EVENT_TYPES,
  ESC_KEY_NAME,
  SortingTypes,
  SortingDirectionVariants,
  ErrorMessages,
  DateFormats,
  TimeFormats,
  DurationFormats,
  ModeVariants
};
