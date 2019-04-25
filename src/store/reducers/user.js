import {
  APP_ADD_FAVORITE,
  APP_REMOVE_FAVORITE,
  SAVE_COUNT_NOTIFICATION,
  SAVE_LIST_NOTIFICATION,
  SAVE_DOCUMENT_LIBRARY,
  SAVE_DATA_GET_ALL_PROJECT,
  USER_SAVE_DATA_TODAY
} from '../../store/actions/types';
const init = {
  favorites: [],
  listNotification: [],
  countUnRead: 0,
  documents: [],
  allProjects: [],
  today: {}
};

export default (state = init, { type, payload }) => {
  switch (type) {


    case APP_ADD_FAVORITE: {
      const index = state.favorites.findIndex(apart => {
        return apart._id === payload._id
      });
      if (index === -1) {
        return { ...state, favorites: [...state.favorites, payload] }
      } else return state;
    }

    case APP_REMOVE_FAVORITE: {
      const index = state.favorites.findIndex(apart => {
        return apart._id === payload._id
      });
      const newFavorites = state.favorites.splice(index, 1);
      return { ...state, favorites: newFavorites };
    }

    case SAVE_COUNT_NOTIFICATION: {
      return {
        ...state,
        countUnRead: payload.data
      };
    }
    case SAVE_LIST_NOTIFICATION: {
      if (payload.page > 1) {
        return {
          ...state,
          listNotification: [...state.listNotification, ...payload.data],
        };
      }
      if (payload.page === 1) {
        return {
          ...state,
          listNotification: payload.data,
        };
      }
      return {
        ...state,
        listNotification: payload.data,
      };
    }
    case SAVE_DOCUMENT_LIBRARY: {
      return {
        ...state,
        documents: payload.data,
      };
    }
    case SAVE_DATA_GET_ALL_PROJECT: {
      return {
        ...state,
        allProjects: payload.data,
      };
    }
    case USER_SAVE_DATA_TODAY: {
      return {
        ...state,
        today: payload.data,
      };
    }
    default:
      return state;
  }
};
