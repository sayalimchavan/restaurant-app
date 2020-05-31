export const SIGN_UP = 'SIGN_UP';

export default (state={}, action) => {
  switch(action.type) {
      case SIGN_UP:
          return {
              ...state,
              data: action.data
          };
     
      default:
          return state;
  };
}