import { takeLatest, all, put } from 'redux-saga/effects';
import {
  APP_GET_BUILDINGS,
  APP_GET_APARTMENTS,
  APP_GET_BUILDING_TYPE,
  APP_GET_SINGLE_BUILDING_TYPE
} from '../../store/actions/types';
import building from '../api/building';
import {
  saveBuildingType
} from '../actions/building'

import { createRequestSaga } from './common';
const requestGetBuildings = createRequestSaga({
  request: building.getBuildings,
  key: 'getBuildings',
  success: [],
  failure: []
});
const requestGetApartments = createRequestSaga({
  request: building.getApartments,
  key: 'getApartments',
  success: [],
  failure: []
});
const requestGetBuildingType = createRequestSaga({
  request: building.getBuildingType,
  key: 'getBuildingType',
  success: [
    (res) => saveBuildingType(res.data)
  ],
  failure: []
});
const requestGetSingleBuildingType = createRequestSaga({
  request: building.getSingleBuildingType,
  key: 'getSingleBuildingType',
  success: [],
  failure: []
});


export default [

  function* fetchWatcher() {
    yield all([
      takeLatest(APP_GET_BUILDINGS, requestGetBuildings),
      takeLatest(APP_GET_APARTMENTS, requestGetApartments),
      takeLatest(APP_GET_BUILDING_TYPE, requestGetBuildingType),
      takeLatest(APP_GET_SINGLE_BUILDING_TYPE, requestGetSingleBuildingType),
    ]);
  }
];