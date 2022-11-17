import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
    userReducer,
    usersReducer,
    dataReducer,
} from './Reducers/reducers';

const reducer = combineReducers({
    user: userReducer,
    userList: usersReducer,
    additionalData: dataReducer,
});

const userLS = localStorage.getItem('userData') ? 
JSON.parse(localStorage.getItem('userData')) : {};

const usersLS = localStorage.getItem('users') ? 
JSON.parse(localStorage.getItem('users')) : [];

const dataLS = localStorage.getItem('savedData') ? 
JSON.parse(localStorage.getItem('savedData')) : {};

const initialState = {
    user: {userData: userLS},
    userList: {users: usersLS},
    additionalData: {savedData: dataLS},
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;