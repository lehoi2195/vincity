import auth from './auth';
import user from './user';
import common from './common';
import building from './building';
import apartment from './apartment';
export default {
  ...user,
  ...auth,
  ...common,
  ...building,
  ...apartment,
}