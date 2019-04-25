import {
    APP_ROTATE,
    APP_ACTION_LIBRARY
} from './types';

export const appRotate = data => ({
    type: APP_ROTATE,
    payload: data
});
export const actionLibrary = data => ({
    type: APP_ACTION_LIBRARY,
    payload: data
});