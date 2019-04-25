import {
    APP_ROTATE,
    APP_ACTION_LIBRARY,
} from '../../store/actions/types';

const init = {
    orientation: "PORTRAIT",
    dropLibrary: {
        isDrop: false,
        titleLibrary: 'Về VinCity'
    }
};

export default (state = init, { type, payload }) => {
    switch (type) {
        case APP_ROTATE:
            console.log("Reducer: ", payload);
            return {
                ...state,
                orientation: payload
            };
        case APP_ACTION_LIBRARY:
            console.log("Reducer: ", payload);
            return {
                ...state,
                dropLibrary: {
                    isDrop: payload.isDrop,
                    titleLibrary: payload.title
                }
            };
        default:
            return state;
    }
};
