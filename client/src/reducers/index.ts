import { combineReducers } from 'redux';
import auth from './auth';
import surveys from './surveys';

export default combineReducers({
  auth,
  surveys
});
