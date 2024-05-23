import GeneralPresenter from './presenter/general-presenter';
import GeneralModel from './model/general-model';

const filtersElement = document.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.trip-events');
const generalModel = new GeneralModel();

const generalPresenter = new GeneralPresenter({mainElement, filtersElement, appModel: generalModel});
generalPresenter.init();
