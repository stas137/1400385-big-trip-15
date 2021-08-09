import {RENDER_POSITION} from './const';

const getRandomInteger = (a = 0, b = 1) => {
  const lower  = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const compareDate = (a, b) => (a.startDateTime > b.startDateTime) ? 1 : -1;

const render = (container, element, place = RENDER_POSITION.beforeend) => {
  switch (place) {
    case RENDER_POSITION.afterbegin:
      container.prepend(element);
      break;
    case RENDER_POSITION.beforeend:
      container.append(element);
      break;
  }
};

const createElement = (template) => {
  const element = document.createElement('div');
  element.innerHTML = template;
  return element.firstChild;
};

export {getRandomInteger, compareDate, render, createElement};
