export const isLogged = state => state.auth.loggedIn;
export const getToken = state => {
  if (!state.auth) return null;
  return state.auth.token || null;
};
export const getUserData = state => state.auth.user || {};
