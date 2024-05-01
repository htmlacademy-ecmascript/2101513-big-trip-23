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

const OFFERS_OPTIONS = [
  {
    value: 'luggage',
    title: 'Add luggage',
    price: 50,
    isChecked: true
  },
  {
    value: 'comfort',
    title: 'Switch to comfort class',
    price: 80,
    isChecked: true
  },
  {
    value: 'meal',
    title: 'Add meal',
    price: 15
  },
  {
    value: 'seats',
    title: 'Choose seats',
    price: 5
  },
  {
    value: 'train',
    title: 'Travel by train',
    price: 40
  }
];

const DESTINATION_DESCRIPTION_PROPERTIES = {
  description: 'Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it\'s renowned for its skiing.',
  photos: [
    {
      src: 'img/photos/1.jpg'
    },
    {
      src: 'img/photos/2.jpg'
    },
    {
      src: 'img/photos/3.jpg'
    },
    {
      src: 'img/photos/4.jpg'
    },
    {
      src: 'img/photos/5.jpg'
    }
  ]
};

export {
  FILTER_TYPES,
  SORTING_TYPES,
  EVENT_TYPES,
  DESTINATION_POINTS,
  OFFERS_OPTIONS,
  DESTINATION_DESCRIPTION_PROPERTIES
};
