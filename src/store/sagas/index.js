import { fork, all } from 'redux-saga/effects';
import auth from './auth';
import user from './user';
import building from './building';
import apartment from './apartment';
import files from './files';
const rootSaga = function* () {
  yield all([
    ...user.map(watcher => fork(watcher)),
    ...auth.map(watcher => fork(watcher)),
    ...building.map(watcher => fork(watcher)),
    ...apartment.map(watcher => fork(watcher)),
    ...files.map(watcher => fork(watcher)),
  ]);
};
export default rootSaga;