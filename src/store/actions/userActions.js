import * as actionTypes from './actionTypes'


export function fetchUserData(token){
    var getHeaders = new Headers();
    getHeaders.append("Authorization", "Bearer " + token);
    var requestOptions = {
        method: "GET",
        headers: getHeaders,
    };
    return dispatch =>{
        return fetch('https://iticketsystem20211228085301.azurewebsites.net/api/users/profile',requestOptions)
        .then((response)=> response.json())
        .then((json)=>{
            dispatch(loginSuccess(json))
        })
    }
}

const loginSuccess = (user) => {
    return{
        type: actionTypes.LOGIN,
        payload: user
    }
} 

const loginFailed = () => {
    return{
        type: actionTypes.LOGOUT
    }
} 

export const logout = () => {
    return{
        type: actionTypes.LOGOUT
    }
} 

