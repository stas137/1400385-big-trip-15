import dayjs from "dayjs";

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

  const maxDateGap = 5;
  let firstDate = getRandomInteger(-maxDateGap, maxDateGap);
  let secondDate = getRandomInteger(-maxDateGap, maxDateGap);

  if (firstDate > secondDate) {
    [firstDate, secondDate] = [secondDate, firstDate];
  }

  return [dayjs().add(firstDate, 'day').toDate(), dayjs().add(secondDate, 'day').toDate()];
};

const generateDestination = () => {};


export const generatePoint = () => {

  const date = generateDate();
  const [startDate, endDate] = date;

  return {
    typePoint: generatePointType(),
    destination: generateDestination(),
    startDateTime: startDate,
    endDateTime: endDate,
    price: null,
    offers: null,
  };
};
