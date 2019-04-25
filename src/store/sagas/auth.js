import { takeLatest, all, put } from 'redux-saga/effects';
import {
  APP_LOGIN,
  APP_LOGOUT,
  APP_VERIFY_TOKEN,
  APP_REGISTER,
  APP_PUSH_TOKEN_FCM
} from '../../store/actions/types';
import auth from '../api/auth';
import { setToast, resetTo, closeDrawer } from '../actions/common';
import {
  setAuthState,
  saveLoggedUser,
  removeLoggedUser
} from '../actions/auth';
import { createRequestSaga } from './common';
import { NavigationActions } from 'react-navigation';
import { Alert } from 'react-native';
import { Toast } from 'native-base';
const requestLogin = createRequestSaga({
  request: auth.login,
  key: 'login',
  cancel: APP_LOGOUT,
  success: [
    (res) => saveLoggedUser(res),
    () => setAuthState(true),
  ],
  failure: []
});
const requestPushTokenFCM = createRequestSaga({
  request: auth.pushTokenFCM,
  key: 'pushTokenFCM',
  cancel: APP_PUSH_TOKEN_FCM,
  success: [],
  failure: []
});

const requestVerifyToken = createRequestSaga({
  request: auth.verifyToken,
  key: 'verify',
  success: [],
  failure: []
});

const requestRegister = createRequestSaga({
  request: auth.register,
  key: 'register',
  functionSuccess: [
    () => Alert.alert(
      'Thông báo',
      `Đăng ký thành công`, [{ text: 'Đồng ý' }],
    ),
  ],
  functionFailure: [
    (error) => Alert.alert(
      'Thông báo',
      `Đăng ký thất bại. ${error.message}`, [{ text: 'Đồng ý' }],
    ),
  ]
})

const requestLogout = function* () {
  yield all([
    yield put(removeLoggedUser()),
    yield put(setAuthState(false)),
    yield put(closeDrawer()),
  ]);
};

// root saga reducer
export default [
  // like case return, this is take => call
  // inner function we use yield*
  // from direct watcher we just yield value
  // other watcher may be background workers
  function* fetchWatcher() {
    // use takeLatest instead of take every, so double click in short time will not trigger more fork
    yield all([
      takeLatest(APP_LOGIN, requestLogin),
      takeLatest(APP_LOGOUT, requestLogout),
      takeLatest(APP_VERIFY_TOKEN, requestVerifyToken),
      takeLatest(APP_REGISTER, requestRegister),
      takeLatest(APP_PUSH_TOKEN_FCM, requestPushTokenFCM),
    ]);
  }
];