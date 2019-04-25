import {
  APP_SAVE_APARTMENT,
  APP_SAVE_BUILDING_TYPE
} from '../../store/actions/types';
// import { apartments } from '../mock/apartments';
const init = {
  types: [],
  buildingType: [],
};

export default (state = init, { type, payload }) => {
  switch (type) {
    case APP_SAVE_APARTMENT:
      return {
        ...state,
        types: payload
      }
    case APP_SAVE_BUILDING_TYPE:
      return {
        ...state,
        buildingType: payload
      }
    default:
      return state;
  }
};
