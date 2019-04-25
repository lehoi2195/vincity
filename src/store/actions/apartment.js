import {
  APP_SAVE_APARTMENT,
  APP_GET_APARTMENTS_CATE,
  APP_GET_APARTMENT_TYPE,
} from './types';
export const getApartmentsCate = (...args) => ({ type: APP_GET_APARTMENTS_CATE, args });
export const getApartmentsType = (...args) => ({ type: APP_GET_APARTMENT_TYPE, args });

export const saveApartment = data => ({
  type: APP_SAVE_APARTMENT,
  payload: data
});

