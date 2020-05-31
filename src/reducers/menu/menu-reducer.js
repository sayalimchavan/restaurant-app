// import { CLEAR_CART } from "../../actions/menu/menu-action";

export const CART = 'CART';
const initialUserState = {
  cartItems:[]
}
export default (state=initialUserState, action) => {
  switch(action.type) {
    // case CLEAR_CART:
    //   return {};
      case CART:
          return {
              ...state,
              cartItems: [...state.cartItems, action.data]
          };
      default:
          return state;
  };
}