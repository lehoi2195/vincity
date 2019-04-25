import { API } from './common';

export default {
  login: (params = {}) => API.post('auths/client/login', params),
  pushTokenFCM: (params = {}) => API.post('auths/client/pushtoken', params),
  // register: (params = {}) => API.post('auths/client/register', params),
  // getProfile: (params = {}) => API.get('users', params)

  verifyToken: (token) =>
    API.get(
      'auths/token/verify',
      {},
      { headers: { Authorization: `access_token ${token}` } }
    ),
};