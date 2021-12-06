import reducers from './reducers/index';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const rootReducers = combineReducers(reducers);

export default createStore(rootReducers, applyMiddleware(thunk));
