import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';

import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer, createMigrate } from 'redux-persist';
// import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

import reducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
if (process.env.NODE_ENV === 'development') {
    middleware.push(logger);
}
const enhancer = [applyMiddleware(...middleware)];
// window.devToolsExtension && enhancer.push(window.devToolsExtension());

const migrations = {
    0: (state) => {
        return {
            ...state,
            auth: {
                ...state.auth,
                // isTourGuideHome: true,
                // isTourGuideProject: true
            }
        }
    }
}
const persistConfig = {
    storage: AsyncStorage,
    key: 'OceanPark',
    blacklist: ['ui', 'requests', 'apartment', 'app'],
    // debounce: 500,
    // stateReconciler: hardSet,
    version: 0,
    // migrate: createMigrate(migrations, { debug: false })
}

const persistedReducer = persistReducer(persistConfig, reducers)
const store = createStore(persistedReducer, {}, compose(...enhancer));
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);

export default store;