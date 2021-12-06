export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

const initialState = {
  isAuthenticating: false,
  user: {},

  signUpError: false,
  signInError: false,

  confirmSignUpError: false,
  confirmLoginError: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        isAuthenticating: true,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        signUpError: true,
        signUpErrorMessage: action.error.message,
      };

    default:
      return state;
  }
};
