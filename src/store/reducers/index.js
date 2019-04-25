import { combineReducers } from 'redux';
import { requests, toast, modal, drawer, gallery, browser } from './common';
import auth from './auth';
import apartment from './apartment';
import app from './app';
import user from './user';
export default combineReducers({
  auth,
  apartment,
  user,
  app,
  requests,
  ui: combineReducers({
    toast,
    modal,
    drawer,
    gallery,
    browser
  }),
});