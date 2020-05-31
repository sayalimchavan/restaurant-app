import {combineReducers} from 'redux';
import signUp from './authentication/signUp';
import signIn  from './authentication/sign-in-reducer';
import cart  from './menu/menu-reducer';
import order from './checkout/checkout-reducer'

// export default combineReducers({
//   signIn,
//     signUp,
    
// });

const appReducer = combineReducers({
  signIn,
    signUp,
    cart,
    order
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined
  }
  // if (action.type === 'CLEAR_CART') {
  //   state = undefined
  // }
  return appReducer(state, action)
}

export default rootReducer;