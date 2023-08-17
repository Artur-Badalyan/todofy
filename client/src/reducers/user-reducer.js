import {
  GET_MY_USER_INFO,
  SET_IS_USER_LOGGED_IN,
} from '../actions/user-actions';
// import {
//   checkAuthCookie,
//   getClientRolesFromAuthCookie,
// } from '../utils/helpers';

export const initialState = {
  isLoggedIn: !!checkAuthCookie(),
  me: {},
  clientRoles: getClientRolesFromAuthCookie(),
  shouldCorrectLdap: false,
  directorName: '',
  directorEmail: '',
};

export default function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_IS_USER_LOGGED_IN: {
      const { me } = state;
      return {
        ...state,
        me: payload ? me : {},
        isLoggedIn: payload,
        clientRoles: payload ? getClientRolesFromAuthCookie() : [],
      };
    }
    case GET_MY_USER_INFO: {
      return {
        ...state,
        me: payload,
      };
    }
    case SET_REPORTS_TO: {
      return {
        ...state,
        directorName: payload.directorName,
        directorEmail: payload.directorEmail,
        shouldCorrectLdap: payload.shouldCorrectLdap,
      };
    }

    case SMART_APPROVAL: {
      const { me } = state;
      const { SA_enabled_at } = payload;
      return {
        ...state,
        me: { ...me, SA_enabled_at },
      };
    }

    case SMART_FILLING: {
      const { smartFilling } = payload;
      return {
        ...state,
        me: { ...state.me, smartFilling },
      };
    }

    default:
      return state;
  }
}
