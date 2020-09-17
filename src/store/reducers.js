import { SET_AUTHENTICATED, SET_PROFILE, SET_REDIRECT } from './actions';
import { combineReducers } from 'redux';

// const initialState = {
//   isAuthenticated: false
// }

function isAuthenticated(state = localStorage.getItem('auth_token'), action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return action.isLoggedIn;
    default:
      return localStorage.getItem('auth_token');
  }
}
function accountProfile(state = false, action) {
  switch (action.type) {
    case SET_PROFILE:
      return action.profile;
    default:
      return state;
  }
}
function redirectAvailable(state = null, action) {
  switch (action.type) {
    case SET_REDIRECT:
      return action.redirect;
    default:
      return state;
  }
}

export default combineReducers({
  isAuthenticated,
  accountProfile,
  redirectAvailable,
});
