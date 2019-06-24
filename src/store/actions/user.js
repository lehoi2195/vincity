import {
  APP_ADD_FAVORITE,
  APP_REMOVE_FAVORITE,
  USER_GET_LIST_NOTIFICATION,
  USER_GET_DETAIL_NOTIFICATION,
  USER_DELETE_NOTIFICATION,
  SAVE_LIST_NOTIFICATION,
  GET_COUNT_NOTIFICATION,
  SAVE_COUNT_NOTIFICATION,
  APP_QUICK_SEARCH,
  APP_GET_CONFIG,
  APP_GET_DOCUMENT_LIBRARY,
  SAVE_DOCUMENT_LIBRARY,
  APP_GET_PROJECT_BY_CITY,
  APP_SEARCH_DOCUMENT,
  APP_GET_POLICY,
  APP_GET_ALL_PROJECT,
  SAVE_DATA_GET_ALL_PROJECT,
  APP_GET_ZONES,
  APP_GET_ALL_BUILDING_OF_ZONE,
  APP_GET_BUILDING,
  APP_GET_CONTACT,
  USER_GET_TODAY,
  USER_SAVE_DATA_TODAY,
  USER_GET_NEWS_DETAIL,
  USER_LIKE_APARTMENT,
  APP_GET_PROMOTION
} from './types';

export const getListNotification = (...args) => ({ type: USER_GET_LIST_NOTIFICATION, args });
export const getDetailNotification = (...args) => ({ type: USER_GET_DETAIL_NOTIFICATION, args });
export const deleteNotification = (...args) => ({ type: USER_DELETE_NOTIFICATION, args });
export const getCountNotification = (...args) => ({ type: GET_COUNT_NOTIFICATION, args });
export const getQuickSearch = (...args) => ({ type: APP_QUICK_SEARCH, args });
export const getConfig = (...args) => ({ type: APP_GET_CONFIG, args });
export const getDocumentLibrary = (...args) => ({ type: APP_GET_DOCUMENT_LIBRARY, args });
export const getProjectByCity = (...args) => ({ type: APP_GET_PROJECT_BY_CITY, args });
export const searchDocument = (...args) => ({ type: APP_SEARCH_DOCUMENT, args });
export const getPolicy = (...args) => ({ type: APP_GET_POLICY, args });
export const getAllProjects = (...args) => ({ type: APP_GET_ALL_PROJECT, args });
export const getZones = (...args) => ({ type: APP_GET_ZONES, args });
export const getAllBuildingOfZone = (...args) => ({ type: APP_GET_ALL_BUILDING_OF_ZONE, args });
export const getBuilding = (...args) => ({ type: APP_GET_BUILDING, args });
export const getContact = (...args) => ({ type: APP_GET_CONTACT, args });
export const getToday = (...args) => ({ type: USER_GET_TODAY, args });
export const getNewsDetail = (...args) => ({ type: USER_GET_NEWS_DETAIL, args });
export const likeApartment = (...args) => ({ type: USER_LIKE_APARTMENT, args });

export const getListPromotion = (...args) => ({ type: APP_GET_PROMOTION, args });


export const saveListNotification = data => ({
  type: SAVE_LIST_NOTIFICATION,
  payload: data
});
export const addFavorite = data => ({
  type: APP_ADD_FAVORITE,
  payload: data
});
export const removeFavorite = data => ({
  type: APP_REMOVE_FAVORITE,
  payload: data
});
export const saveCountNotification = data => ({
  type: SAVE_COUNT_NOTIFICATION,
  payload: data
});
export const saveDocumentLibrary = data => ({
  type: SAVE_DOCUMENT_LIBRARY,
  payload: data
});
export const saveDataGetAllProject = data => ({
  type: SAVE_DATA_GET_ALL_PROJECT,
  payload: data
});
export const saveDataToday = data => ({
  type: USER_SAVE_DATA_TODAY,
  payload: data
});