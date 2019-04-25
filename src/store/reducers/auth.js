import {
  APP_SET_AUTH_STATE,
  APP_REMOVE_LOGGED_USER,
  APP_SAVE_LOGGED_USER,
  APP_SAVE_REFRESH_TOKEN,
  APP_STATUS_TUTORIAL,
  APP_STATUS_TOUR_GUIDE_HOME,
  APP_STATUS_TOUR_GUIDE_PROJECT
} from '../../store/actions/types';

const init = {
  loggedIn: false,
  token: null,
  isTutorial: false,
  isTourGuideHome: true,
  isTourGuideProject: true,
};

export default (state = init, { type, payload }) => {
  switch (type) {
    case APP_SET_AUTH_STATE:
      return { ...state, loggedIn: payload || false };
    case APP_SAVE_LOGGED_USER: {
      return {
        ...state,
        token: payload.data.token,
      };
    }
    case APP_SAVE_REFRESH_TOKEN:
      return { ...state, token: { ...state.token, ...payload } };
    case APP_REMOVE_LOGGED_USER:
      return { ...state, ...init };
    case APP_STATUS_TUTORIAL:
      console.log('APP_STATUS_TUTORIAL', payload);
      return { ...state, isTutorial: payload };
    case APP_STATUS_TOUR_GUIDE_HOME:
      console.log('APP_STATUS_TOUR_GUIDE_HOME', payload);
      return { ...state, isTourGuideHome: payload };
    case APP_STATUS_TOUR_GUIDE_PROJECT:
      console.log('APP_STATUS_TOUR_GUIDE_PROJECT', payload);
      return { ...state, isTourGuideProject: payload };
    default:
      return state;
  }
};
