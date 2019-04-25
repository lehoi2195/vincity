import {
  APP_UPLOAD_FILE,
} from './types';

export const uploadFile = (...args) => ({ type: APP_UPLOAD_FILE, args });
