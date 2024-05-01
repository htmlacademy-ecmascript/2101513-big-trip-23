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

const SORTING_TYPES = [
  {
    value: 'day',
    isActive: true,
    isChecked: true
  },
  {
    value: 'event',
    isActive: false
  },
  {
    value: 'time',
    isActive: true
  },
  {
    value: 'price',
    isActive: true
  },
  {
    value: 'offer',
    title: 'offers',
    isActive: false
  }
];

const EVENT_TYPES = [
  {
    value: 'taxi'
  },
  {
    value: 'bus'
  },
  {
    value: 'train'
  },
  {
    value: 'ship'
  },
  {
    value: 'flight',
    isChecked: true
  },
  {
    value: 'check-in'
  },
  {
    value: 'sightseeing'
  },
  {
    value: 'restaurant'
  }
];

const DESTINATION_POINTS = ['Amsterdam', 'Geneva'];

export {
  FILTER_TYPES,
  SORTING_TYPES,
  EVENT_TYPES,
  DESTINATION_POINTS
};
