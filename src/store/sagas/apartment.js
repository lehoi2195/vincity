import { takeLatest, all, put } from 'redux-saga/effects';
import {
    APP_GET_APARTMENTS_CATE,
    APP_GET_APARTMENT_TYPE,
} from '../../store/actions/types';
import apartment from '../api/apartment';
import {
    saveApartment,
} from '../actions/apartment';

import { createRequestSaga } from './common';

const requestGetApartmentsCate = createRequestSaga({
    request: apartment.getApartmentsCate,
    key: 'getApartmentsCate',
    success: [],
    failure: []
});
const requestGetApartmentsType = createRequestSaga({
    request: apartment.getApartmentsType,
    key: 'getApartmentsType',
    success: [
        (res) => saveApartment(res.data)
    ],
    failure: []
});


export default [

    function* fetchWatcher() {
        yield all([
            takeLatest(APP_GET_APARTMENTS_CATE, requestGetApartmentsCate),
            takeLatest(APP_GET_APARTMENT_TYPE, requestGetApartmentsType),
        ]);
    }
];