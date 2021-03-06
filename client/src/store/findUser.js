// import { get } from "js-cookie";

const FIND_USER = 'FIND_USER';
const REQUEST_FRIEND = 'REQUEST_FRIEND';

export const getUser = (userInfo) => {
    return {
        type: FIND_USER,
        userInfo
    }
}

export const sendHeader = (header) => {
    return {
        type: REQUEST_FRIEND,
        header,
    }
}

export const getUserInfo = (id) => {
    return async dispatch => {
        const res = await fetch('/api/users/', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id})
        });
        const response = await res.json();
        if(response.status === 403){
            dispatch(getUser({message: 'Uh oh....something went wrong...'}))
            return
        }
        if(res.ok){
            // debugger
            dispatch(getUser(response))
        }
    }
}

export const addUser = (fromUserId, toUserId) => {
    return async dispatch => {
        const res = await fetch('/api/add-remove-friend/request', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({fromUserId, toUserId})
        })
    }
}


export default function reducer(state={}, action) {
    switch(action.type){
        case FIND_USER:
            return action.userInfo;
        case REQUEST_FRIEND:
            return {...state, message: action.header}
        default:
            return state;
    }
}