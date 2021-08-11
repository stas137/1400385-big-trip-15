const getRandomInteger = (a = 0, b = 1) => {
  const lower  = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const compareDate = (a, b) => (a.startDateTime > b.startDateTime) ? 1 : -1;

const generateId = () => getRandomInteger(0, 250);

export {getRandomInteger, compareDate, generateId};
