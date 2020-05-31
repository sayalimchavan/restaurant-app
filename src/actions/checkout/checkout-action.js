import {post} from '../../apis/proxy';

export const ORDER = 'ORDER';
export const ERROR_MSG = 'ERROR_MSG';

export function postOrderData(userid, menuItems, totalCost, address, phone) {
  return async dispatch => {
    const {data} = await post('/order/addorder', {
      userid: userid,
      menuItems:menuItems,
      totalCost: totalCost,
      address: address,
      phone:phone
        });
    if(data.message){
        dispatch({
            type: ERROR_MSG,
            data: data.message
        })
    }else {
        dispatch({
            type: ORDER,
            data: data
        });
        dispatch({
            type: ERROR_MSG,
            data: null
        })
    }
}
  
}

