import { takeLatest, all, put } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { Alert } from 'react-native';
import { Toast } from 'native-base';

import {
    USER_GET_LIST_NOTIFICATION,
    USER_GET_DETAIL_NOTIFICATION,
    USER_DELETE_NOTIFICATION,
    GET_COUNT_NOTIFICATION,
    APP_QUICK_SEARCH,
    APP_GET_CONFIG,
    APP_GET_DOCUMENT_LIBRARY,
    APP_GET_PROJECT_BY_CITY,
    APP_SEARCH_DOCUMENT,
    APP_GET_POLICY,
    APP_GET_ALL_PROJECT,
    APP_GET_ZONES,
    APP_GET_ALL_BUILDING_OF_ZONE,
    APP_GET_BUILDING,
    APP_GET_CONTACT,
    USER_GET_TODAY,
    USER_LIKE_APARTMENT,
    USER_GET_NEWS_DETAIL,
    APP_GET_PROMOTION
} from '../../store/actions/types';
import { saveListNotification, saveCountNotification, saveDocumentLibrary, saveDataGetAllProject, saveDataToday } from '../actions/user';
import { createRequestSaga } from './common';
import user from '../api/user';

const requestGetListNotification = createRequestSaga({
    request: user.getListNotification,
    key: 'getListNotification',
    success: [
        (res) => saveListNotification(res),
    ],
    failure: []
});
const requestGetDetailNotification = createRequestSaga({
    request: user.getDetailNotification,
    key: 'getDetailNotification',
    success: [
        // (res) => saveListNotification(res),
    ],
    failure: []
});
const requestDeleteNotification = createRequestSaga({
    request: user.deleteNotification,
    key: 'deleteNotification',
    success: [
        // (res) => saveListNotification(res),
    ],
    failure: []
});
const requestGetCountNotification = createRequestSaga({
    request: user.getCountNotification,
    key: 'getCountNotification',
    success: [
        (res) => saveCountNotification(res),
    ],
    failure: []
});
const requestQuickSearch = createRequestSaga({
    request: user.getQuickSearch,
    key: 'getQuickSearch',
    success: [],
    failure: []
});
const requestGetConfig = createRequestSaga({
    request: user.getConfig,
    key: 'getConfig',
    success: [],
    failure: []
});
const requestGetDocumentLibrary = createRequestSaga({
    request: user.getDocumentLibrary,
    key: 'getDocumentLibrary',
    success: [
        (res) => saveDocumentLibrary(res)
    ],
    failure: []
});
const requestGetProjectByCity = createRequestSaga({
    request: user.getProjectByCity,
    key: 'getProjectByCity',
    success: [],
    failure: []
});
const requestSearchDocument = createRequestSaga({
    request: user.searchDocument,
    key: 'searchDocument',
    success: [],
    failure: []
});
const requestGetPolicy = createRequestSaga({
    request: user.getPolicy,
    key: 'getPolicy',
    success: [],
    failure: []
});
const requestGetAllProjects = createRequestSaga({
    request: user.getAllProjects,
    key: 'getAllProjects',
    success: [],
    failure: []
});
const requestGetZones = createRequestSaga({
    request: user.getZones,
    key: 'getZones',
    success: [],
    failure: []
});
const requestGetAllBuildingOfZone = createRequestSaga({
    request: user.getAllBuildingOfZone,
    key: 'getAllBuildingOfZone',
    success: [],
    failure: []
});
const requestGetBuilding = createRequestSaga({
    request: user.getBuilding,
    key: 'getBuilding',
    success: [],
    failure: []
});
const requestGetContact = createRequestSaga({
    request: user.getContact,
    key: 'getContact',
    success: [],
    failure: []
});
const requestGetToday = createRequestSaga({
    request: user.getToday,
    key: 'getToday',
    success: [
        (res) => saveDataToday(res)
    ],
    failure: []
});
const requestGetNewsDetail = createRequestSaga({
    request: user.getNewsDetail,
    key: 'getNewsDetail',
    success: [],
    failure: []
});
const requestLikeApartment = createRequestSaga({
    request: user.likeApartment,
    key: 'likeApartment',
    success: [],
    failure: []
});

const requestGetListPromotion = createRequestSaga({
    request: user.getListPromotion,
    key: 'getListPromotion',
    success: [
    ],
    failure: []
});
export default [
    function* fetchWatcher() {
        yield all([
            takeLatest(USER_GET_LIST_NOTIFICATION, requestGetListNotification),
            takeLatest(USER_GET_DETAIL_NOTIFICATION, requestGetDetailNotification),
            takeLatest(USER_DELETE_NOTIFICATION, requestDeleteNotification),
            takeLatest(GET_COUNT_NOTIFICATION, requestGetCountNotification),
            takeLatest(APP_QUICK_SEARCH, requestQuickSearch),
            takeLatest(APP_GET_CONFIG, requestGetConfig),
            takeLatest(APP_GET_DOCUMENT_LIBRARY, requestGetDocumentLibrary),
            takeLatest(APP_GET_PROJECT_BY_CITY, requestGetProjectByCity),
            takeLatest(APP_SEARCH_DOCUMENT, requestSearchDocument),
            takeLatest(APP_GET_POLICY, requestGetPolicy),
            takeLatest(APP_GET_ALL_PROJECT, requestGetAllProjects),
            takeLatest(APP_GET_ZONES, requestGetZones),
            takeLatest(APP_GET_ALL_BUILDING_OF_ZONE, requestGetAllBuildingOfZone),
            takeLatest(APP_GET_BUILDING, requestGetBuilding),
            takeLatest(APP_GET_CONTACT, requestGetContact),
            takeLatest(USER_GET_TODAY, requestGetToday),
            takeLatest(USER_GET_NEWS_DETAIL, requestGetNewsDetail),
            takeLatest(USER_LIKE_APARTMENT, requestLikeApartment),
            takeLatest(APP_GET_PROMOTION, requestGetListPromotion)
        ]);
    }
];