import GeneralPresenter from './presenter/general-presenter';
import GeneralModel from './model/general-model';

const filtersContainer = document.querySelector('.trip-controls__filters');
const mainContainer = document.querySelector('.trip-events');
const generalModel = new GeneralModel();

const generalPresenter = new GeneralPresenter({mainContainer, filtersContainer, appModel: generalModel});
generalPresenter.init();
