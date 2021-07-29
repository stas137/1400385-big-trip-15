import {menu} from './view/menu.js';

const renderComponent = (container, component, where) => {
    const element = document.querySelector(container);
    element.insertAdjacentHTML(where, component);
};

renderComponent('.trip-controls__navigation', menu(), 'beforeend');