import * as actionTypes from '../actions/actionTypes'

const initialState = {
    user:{

    },
    isLogged: false,
    isIT: false,
    isAdmin: false
}

const login = (state,action) =>{
    return{
        ...state,
        isLogged: true,
        isIT: action.payload.role.name == 'IT' ? true : false,
        isAdmin: action.payload.role.name == 'Admin' ? true : false,
        user: action.payload.user
    }
}

const logout = (state,action) =>{
    return{
        ...state,
        isLogged: false,
        isIT: false,
        isAdmin: false,
        user:null
    }
}


const userReducer = (state = initialState, action) =>{
    switch(action.type){
        case (actionTypes.LOGIN): return login(state,action);
        case (actionTypes.LOGOUT): return logout(state,action);
        default: return state;
    }
}

export default userReducer;