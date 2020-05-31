import {post, getReq} from '../../apis/proxy';
import {url} from '../../apis/config';
// import jwt from 'jsonwebtoken';

export const SIGN_IN = 'SIGN_IN';
export const ERROR_MSG = 'ERROR_MSG';
export const LOGOUT = 'LOGOUT';

export function fetchLoginData(e_mail, password) {
    return async dispatch => {
        
            
            const userData = await getReq(url, '/login', e_mail +'/'+password);
            
            let result = userData.data ;
            // console.log("res: ", result)
            dispatch({
                type: SIGN_IN,
                data: result
            });
            dispatch({
                type: ERROR_MSG,
                data: null
            })
        
    }
}

export function logout() {
  return dispatch => {
    dispatch({
        type: LOGOUT
    });
  }
}
