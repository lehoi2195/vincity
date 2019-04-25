import {
  APP_GET_BUILDINGS,
  APP_GET_APARTMENTS,
  APP_GET_BUILDING_TYPE,
  APP_SAVE_BUILDING_TYPE,
  APP_GET_SINGLE_BUILDING_TYPE
} from './types';

export const getBuildings = (...args) => ({ type: APP_GET_BUILDINGS, args });
export const getBuildingType = (...args) => ({ type: APP_GET_BUILDING_TYPE, args });
export const getSingleBuildingType = (...args) => ({ type: APP_GET_SINGLE_BUILDING_TYPE, args });
export const getApartments = (...args) => ({ type: APP_GET_APARTMENTS, args });


export const saveBuildingType = data => ({
  type: APP_SAVE_BUILDING_TYPE,
  payload: data
});