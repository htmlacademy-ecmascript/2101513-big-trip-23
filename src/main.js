import AppPresenter from './presenter/app-presenter';
import AppModel from './model/app-model';

const filtersElement = document.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.trip-events');

const appModel = new AppModel();
const appPresenter = new AppPresenter({mainElement, filtersElement, appModel});

appPresenter.init();
