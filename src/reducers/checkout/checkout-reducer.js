export const ORDER = 'ORDER';

export default (state={}, action) => {
  switch(action.type) {
      case ORDER:
          return {
              ...state,
              data: action.data
          };
     
      default:
          return state;
  };
}