import {RenderPosition} from './const';
import Abstract from './view/abstract.js';

const ESC_CODE = 'Escape';

const isEscEvent = (code) => code === ESC_CODE;

const getRandomInteger = (a = 0, b = 1) => {
  const lower  = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const compareDate = (a, b) => (a.startDateTime > b.startDateTime) ? 1 : -1;

const render = (container, child, place = RenderPosition.BEFOREEND) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
  }
};

const createElement = (template) => {
  const element = document.createElement('div');
  element.innerHTML = template;
  return element.firstChild;
};

const generateId = () => getRandomInteger(0, 250);

export {isEscEvent, getRandomInteger, compareDate, generateId, render, createElement};
