import { takeLatest, all, put } from 'redux-saga/effects';
import {
  APP_UPLOAD_FILE,
} from '../../store/actions/types';
import files from '../api/files';
import { Alert } from 'react-native';
import { Toast } from 'native-base';
import { createRequestSaga } from './common';
const requestUploadFile = createRequestSaga({
  request: files.uploadFile,
  key: 'uploadFile',
  functionSuccess: [
    // () => Toast.show({
    //   text: 'Wrong password!',
    //   buttonText: 'Okay',
    //   position: 'top',
    // }),
    // () => Alert.alert('Upload file sucess')
  ],
  failure: []
});

export default [

  function* fetchWatcher() {
    yield all([
      takeLatest(APP_UPLOAD_FILE, requestUploadFile),
    ]);
  }
];