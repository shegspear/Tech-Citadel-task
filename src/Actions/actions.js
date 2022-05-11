import {
    SIGN_IN,
    LOG_USERS,
    EDIT_USERNAME,
    LOG_OUT,
    GET_SESSIONS
} from '../Constants/constants';

export const signin = (username) => async (dispatch, getState) => {
    const userObj = {
        username,
        entryTime: Date.now(),
        exitTime: null,
    };

    dispatch({
        type: SIGN_IN,
        payload: userObj
    });

    localStorage.setItem('userData', JSON.stringify(getState().user.userData));
};

export const markLog = (username) => async (dispatch, getState) => {
    const userObj = {
        username,
        entryTime: Date.now(),
        exitTime: null,
    };

    dispatch({
        type: LOG_USERS,
        payload: userObj
    });

    localStorage.setItem('users', JSON.stringify(getState().userList.users));
};

export const editUserName = (userName) => async (dispatch, getState) => {
    const userLS = localStorage.getItem('userData') ? 
    JSON.parse(localStorage.getItem('userData')) : {};
    const {entryTime, exitTime} = userLS;

    dispatch({
        type: EDIT_USERNAME,
        payload: {
            username: userName,
            entryTime,
            exitTime
        }
    });

    localStorage.setItem('userData', JSON.stringify(getState().user.userData)); 
    localStorage.setItem('users', JSON.stringify(getState().userList.users));
};

export const logout = () => async (dispatch, getState) => {
    const userLS = localStorage.getItem('userData') ? 
    JSON.parse(localStorage.getItem('userData')) : {};
    const {username, entryTime} = userLS;

    dispatch({
        type: LOG_OUT,
        payload: {
            username,
            entryTime,
            exitTime: Date.now()
        }
    });

    localStorage.removeItem('userData'); 
    localStorage.setItem('users', JSON.stringify(getState().userList.users));
};