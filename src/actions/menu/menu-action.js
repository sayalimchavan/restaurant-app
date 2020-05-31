export const CART = 'CART';
// export const CLEAR_CART = 'CLEAR_CART';
export function fetchCartData(result) {
    return dispatch => {
            
            dispatch({
                type: CART,
                data: result
            });
            
        
    }
}

// export function clearCartData() {
//   return dispatch => {
//     dispatch({
//         type: CLEAR_CART
//     });
//   }
// }
