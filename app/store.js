import {createStore,applyMiddleware} from 'redux';
import {logger} from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';
import promise from 'redux-promise-middleware';
import userReducer from './reducers/user';
const middleware = applyMiddleware(logger,thunk,promise());
const store = createStore(userReducer,middleware);
export default store;