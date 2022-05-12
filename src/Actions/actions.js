import {
    SIGN_IN,
    LOG_USERS,
    EDIT_USERNAME,
    LOG_OUT,
    MODIFY_SESSION,
} from '../Constants/constants';

export const signin = (username) => async (dispatch, getState) => {
    const userObj = {
        username,
        entryTime: new Date().getTime(),
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
        entryTime: new Date().getTime(),
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
    const {exitTime} = userLS;

    dispatch({
        type: EDIT_USERNAME,
        payload: {
            username: userName,
            entryTime: new Date().getTime(),
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
            exitTime: new Date().getTime()
        }
    });

    localStorage.removeItem('userData'); 
    localStorage.setItem('users', JSON.stringify(getState().userList.users));
};

export const updateSession = (id, data) => async (dispatch, getState) => {
    // console.log('id: >>',id);
    // console.log('update: ',{
    //     username: data.username,
    //     entryTime: data.entryTime,
    //     exitTime: new Date().getTime()
    // })
    dispatch({
        type: MODIFY_SESSION,
        payload: {
            id,
            update: {
                username: data.username,
                entryTime: data.entryTime,
                exitTime: new Date().getTime()
            }
        }
    });

    localStorage.setItem('userData', JSON.stringify(getState().user.userData)); 
    localStorage.setItem('users', JSON.stringify(getState().userList.users));
}