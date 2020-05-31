import {post} from '../../apis/proxy';

export const SIGN_UP = 'SIGN_UP';
export const ERROR_MSG = 'ERROR_MSG';

export function postLoginData(firstname,lastname, email,password) {
  return async dispatch => {
    const {data} = await post('/adduser', {
        first_Name: firstname,
        last_Name: lastname,
        address: "",
        e_mail: email,
        phone:"",
        password: password,
        role:"user"
        });
    if(data.message){
        dispatch({
            type: ERROR_MSG,
            data: data.message
        })
    }else {
        dispatch({
            type: SIGN_UP,
            data: data
        });
        dispatch({
            type: ERROR_MSG,
            data: null
        })
    }
}
  
}

