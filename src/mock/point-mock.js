import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower  = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generatePointType = () => {
  const pointType = [
    'Taxi',
    'Bus',
    'Train',
    'Ship',
    'Transport',
    'Drive',
    'Flight',
    'Check-in',
    'Sightseeing',
    'Restaurant',
  ];

  const randomIndex = getRandomInteger(0, pointType.length - 1);

  return pointType[randomIndex];
};

const generateDate = () => {

  const maxDateGap = 0;
  let firstDate = getRandomInteger(-maxDateGap, maxDateGap);
  let secondDate = getRandomInteger(-maxDateGap, maxDateGap);

  if (firstDate > secondDate) {
    [firstDate, secondDate] = [secondDate, firstDate];
  }

  return [dayjs().add(firstDate, 'day').toDate(), dayjs().add(secondDate, 'day').toDate()];
};

const generateCityPoint = () => {
  const cityPoint = [
    'Amsterdam',
    'Chamonix',
    'Geneva',
  ];

  const randomIndex = getRandomInteger(0, cityPoint.length - 1);

  return cityPoint[randomIndex];
};

const generatePrice = () => {
  const pricePoint = [
    '200',
    '100',
    '50',
    '15',
    '5',
  ];

  const randomIndex = getRandomInteger(0, pricePoint.length - 1);

  return pricePoint[randomIndex];
};

const generateOffers = (typePoint) => {
  const offersPoint = {
    'Flight': [
      {name: 'Add luggage', price: '50', checked: true},
      {name: 'Switch to comfort', price: '80', checked: true},
      {name: 'Add meal', price: '15', checked: false},
      {name: 'Choose seats', price: '5', checked: false},
      {name: 'Travel by train', price: '40', checked: true},
    ],
    'Taxi': [
      {name: 'Order Uber', price: '20', checked: true},
    ],
    'Drive': [
      {name: 'Rent a car', price: '200', checked: true},
    ],
    'Sightseeing': [
      {name: 'Book tickets', price: '40', checked: true},
      {name: 'Lunch in city', price: '30', checked: false},
    ],
    'Check-in': [
      {name: 'Add breakfast', price: '50', checked: true},
    ],
    'Restaurant': [
      {name: 'Add breakfast', price: '50', checked: true},
    ],
    'Bus': [
      {name: 'Add breakfast', price: '50', checked: true},
    ],
    'Train': [
      {name: 'Add breakfast', price: '50', checked: true},
    ],
    'Ship': [
      {name: 'Add breakfast', price: '50', checked: true},
    ],
    'Transport': [
      {name: 'Add breakfast', price: '50', checked: true},
    ],
  };

  return offersPoint[typePoint];
};

const generateDescription = () => {
  const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
  const sentences = text.split('. ');

  const randomCount = getRandomInteger(1, 5);
  const sentencesSet = new Set();

  while (sentencesSet.size <= randomCount){
    const randomIndex = getRandomInteger(0, sentences.length - 1);
    if (!sentencesSet.has(sentences[randomIndex])) {
      sentencesSet.add(sentences[randomIndex]);
    }
  }

  return sentencesSet;
};

const generatePhoto = () => {

  const MAX_COUNT_PHOTOS = 7;
  const URL_PHOTO = 'http://picsum.photos/248/152?r=';

  const randomCount = getRandomInteger(0, MAX_COUNT_PHOTOS - 1);
  const photosSet = new Set();

  while (photosSet.size <= randomCount) {
    const randomIndex = getRandomInteger(0, MAX_COUNT_PHOTOS - 1);
    if (!photosSet.has(`${URL_PHOTO}${randomIndex}`)) {
      photosSet.add(`${URL_PHOTO}${randomIndex}`);
    }
  }

  return photosSet;
};

const getDurationTripPoint = (durationDays, durationHours, durationMinutes) => {
  if (durationDays > 0) {
    return `${durationDays}D ${durationHours}H ${durationMinutes}M`;
  } else if (durationHours > 0) {
    return `${durationHours}H ${durationMinutes}M`;
  }
  return `${durationMinutes}M`;
};

export const generatePoint = () => {

  const typePoint = generatePointType();
  const date = generateDate();
  const [startDateTime, endDateTime] = date;
  const duration = endDateTime - startDateTime;
  
  const durationDays = dayjs(duration).format('DD');
  const durationHours = dayjs(duration).format('HH');
  const durationMinutes = dayjs(duration).format('MM');

  return {
    typePoint,
    cityPoint: generateCityPoint(),
    startDateTime,
    endDateTime,
    duration: (duration) ? getDurationTripPoint(durationDays, durationHours, durationMinutes) : '00M',
    price: generatePrice(),
    offers: generateOffers(typePoint),
    description: generateDescription(),
    photos: generatePhoto(),
    favorite: Boolean(getRandomInteger(0, 1)),
  };
};
