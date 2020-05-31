export const SIGN_IN = 'SIGN_IN';
export const LOGOUT = 'LOGOUT';
export default (state={}, action) => {
  switch(action.type) {
    case LOGOUT:
      return {};
      case SIGN_IN:
          return {
              ...state,
              data: action.data
          };
      default:
          return state;
  };
}