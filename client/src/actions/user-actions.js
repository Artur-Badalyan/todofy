import { myInfo } from '../api/users';
// import { deleteAuthCookie } from '../utils/helpers';

export const SET_IS_USER_LOGGED_IN = 'USERS/SET_IS_USER_LOGGED_IN';
export const GET_MY_USER_INFO = 'USERS/GET_MY_USER_INFO';


export const setIsUserLoggedIn = (isLoggedIn) => {
  return {
    type: SET_IS_USER_LOGGED_IN,
    payload: isLoggedIn,
  };
};

export const getMe = () => async (dispatch) => {
  const data = await myInfo();
  return dispatch({
    type: GET_MY_USER_INFO,
    payload: data,
  });
};

export const logMeOut = () => async (dispatch) => {
  // deleteAuthCookie();
  return dispatch(setIsUserLoggedIn(false));
};

export default {
  setIsUserLoggedIn,
};
